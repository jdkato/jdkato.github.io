---
title: On Identifying the Language of Source Code
layout: post
tags : [Projects]
includes:
- pygments
- chartjs
- zero
specific_js:
- /js/2016-08-30.js
---

Language identification is typically associated with natural languages&mdash;[identifying the language of Tweets](http://www.aclweb.org/anthology/W14-1303), for example. However, after reading a [challenge on HackerRank](https://www.hackerrank.com/challenges/programming-language-detection) about detecting Java, C and Python, I became interested in its application to source code. I found a few other attempts at addressing this topic along the way: 

1. [SourceClassifier by Chris Lowis](http://blog.chrislowis.co.uk/2009/01/04/identify-programming-languages-with-source-classifier.html), which identifies programming languages using a Bayesian classifier pre-trained on C, Java, JavaScript, Perl, Python and Ruby. This project has also been [ported to PHP](http://php-nlp-tools.com/blog/category/programming-language-detection/).

2. A paper by [David Klein, Kyle Murray and Simon Weber](https://github.com/simon-weber/Programming-Language-Identification) that discusses using punctuation, keywords and operators as a basis for the identification process. In their paper, they state 48% accuracy on 25 randomly selected source code files.

3. [lang-detector by Toni Sučić](https://github.com/ts95/lang-detector), which is a "fast and small library for detecting the programming language of a code snippet" implemented in JavaScript. It supports 10 languages. 

4. [A recent project by Daniël Heres](https://algorithmia.com/algorithms/PetiteProgrammer/ProgrammingLanguageIdentification) seems to have achieved impressive results using "machine learning and neural networks" across 18 supported languages. He states that, "for more than 99% of the documents we predict the right language in a random subset of the data we use for testing the performance of our model."

I started working on my own solution, [codetype](https://github.com/jdkato/codetype), with the intent of pursuing a strategy similar to (2). My goals were to be accurate, fast and light-weight with minimal reliance on training data. 

### Strategy

My strategy is based on the creation of "signatures," which are JSON files intended to provide a brief description of my target languages: AppleScript, C#, C++, C, D, Go, Haskell, Java, JavaScript, Julia, Lua, OCaml, Objective-C, Perl, PHP, Python, R, Ruby, Rust, Scala and Swift.

```json
{
    "tokens": [
        "def", "Try", "with", "class", "extends", "val", "case", "implicit",
        "Null", "abstract", "override", "private", "Map(", "List(", "String",
        "object", "None", "{", "}", ":", "=>", "@", "`", "~", "->", "++", "<-"
    ],
    "first_line": [
        "^package\\s.+$", "^import\\s[^'\"]*(?<!from)$", "^#!.+scala$"
    ],
    "unique": ["forSome", "Var", "match", "lazy", "trait", "Nil", ":::", "???"],
    "flags": [":\n", "window", "document", "function", "type", "switch"],
    "ignores": ["//", "/*", "'", "\"", "`", "\"\"\""]
}
```

As seen in the Scala example above, each signature consists of five keys:

- **tokens**: A combination of keywords, punctuation and operators that are indicative of a particular language.
- **first_line**: A list of regular expressions designed to match statements typically found on the first line of source code. For example, many Scala files begin with `package <...>` while Python files often start with either an `import` statement or a [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)).
- **unique**: A list of tokens that are uncommon in other languages.
- **flags**: A list of tokens that should not appear in one language but are found in similar languages. For instance, C# has a keyword `struct` but Java does not.
- **ignores**: A list of tokens that represent the start of a line or block that should be excluded from consideration&mdash;such as comments and strings.

These signatures are then used as a means of computing how similar a file or snippet is to each of codetype's known languages.

### Implementation

codetype's core codebase consists 220 lines of Python (excluding comments) and 21 signatures for a total uncompressed weight of approximately 32 KB. [MessagePack](http://msgpack.org/index.html) is the only external dependency.

Each language is associated with a "base project," which I used to measure my progress on a per-language basis throughout development. The base projects are also used to create the MessagePack-formatted version of signatures. In addition to being in binary format, the distribution version of a signature also associates each token with its average number of occurrences in its base project.

When a file or string is passed to codetype, it is split into tokens according to [this regular expression](https://github.com/jdkato/codetype/blob/master/codetype/re_globals.py#L1). A signature is then generated from the tokens and compared to each known signature according to the following algorithm:

```python
total = 1.0
found = 0.0
mult = 2 if lines < 15 else 1
for k, v in known.items():
    if k in ["first_line", "ignores"]:
        continue
    elif k == "unique":
        inc = 4 * mult
        found += sum([inc if token in unknown else 0 for token in v])
    elif k == "flags":
        found -= sum([4 if token in unknown else 0 for token in v])
    else:
        test_value = unknown.get(k)
        if test_value:
            total += math.fabs(v - test_value)
            found += 1
        elif v > 0.10:
            total += 1
            found -= 1
return round(found / total, 3)
```

The similarity scores for each known language are then filtered by their values for `first_line` and `ignores`:

- If any known language matches both the unknown's `first_line` and `ignores`, we consider that as the only possible match. If multiple languages match both, we take the one with the highest score.
- If both the unknown's `first_line` and `ignores` have matches but their union is empty, we take the highest score across both sets.
- If only one of `first_line` and `ignores` have matches, we take the highest score from that set.
- If neither `first_line` nor `ignores` have matches, we simply take the highest score across all known languages.

Consider, for example, the following output from codetype's CLI tool:

```bash
$ codetype 'print("Hello, world!")' -v -m 4 # returns at most the top-4 guesses
Python, Julia, Lua, Haskell
```

The code snippet `print("Hello, world!")` is syntactically valid in many of codetype's supported languages. We can significantly narrow our candidate pool by making a slight change:

```bash
$ codetype 'print("Hello, world!") -- this is a comment' -v -m 4 
Haskell, Lua, AppleScript
```

The language signatures tell us that `--` is a comment character in only AppleScript, Haskell and Lua. This definitely increases the percentage of correctly identified files, but it also heavily relies on accurately identifying comment delimiters.

### Results

**99.4%** of files were correctly identified across the 21 base projects (14,281 files), with C (97.4%) being the least accurate. Haskell was the most common culprit in misidentification cases, contributing significantly to Python and Ruby. However, since the base projects were used to create and refine the signatures, these results are not particularly meaningful.

In order to better measure codetype's ability to identify languages in the "wild," I also tested a project from Github's list of trending repositories for each language. In these randomly selected projects (7,084 files), **97.8%** of files were correctly identified. C and OCaml, at 92.9% and 92.2% respectively, were the least accurate. A summary of the results is shown below (click on a bar for more information).

<div class="row">
  <div class="col-xs-12">
    <canvas id="base-acc-chart"></canvas>
  </div>
  <div class="col-xs-12">
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 class="modal-title" id="modal-lang"></h3>
          </div>
          <div class="modal-body">
            <p id="summary"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

I also performed a head-to-head comparison between codetype, the work published by Klein et al., SourceClassifier (the PHP port) and lang-detector on the [Computer Language Benchmarks Game](https://github.com/nbraud/benchmarksgame) (Heres' work was not tested because it is not free to use).

<table class = "table">
   <caption>Computer Language Benchmarks Game</caption>
   <thead>
      <tr>
         <th>Tool</th>
         <th>Supported Languages</th>
         <th>Total Files</th>
         <th>Correctly Identified (%)</th>
         <th>Time Per File (sec)</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>codetype</td>
         <td>21</td>
         <td>621</td>
         <td>98.7</td>
         <td>0.037</td>
      </tr>
     <tr>
         <td>SourceClassifier</td>
         <td>16</td>
         <td>587</td>
         <td>92.5</td>
         <td>0.157</td>
      </tr>
      <tr>
         <td>lang-detector</td>
         <td>10</td>
         <td>372</td>
         <td>79.0</td>
         <td>0.005</td>
      </tr>
      <tr>
         <td>Klein et al.</td>
         <td>24</td>
         <td>643</td>
         <td>20.2</td>
         <td>3.364</td>
      </tr>
   </tbody>
</table>

As you can see, codetype had the most success at identifying its supported languages while also being the second fastest per file. It is important to note, though, that the test results for both SourceClassifier and the work of Klein et. al are based solely on the training they provided (lang-detector does not require training).

Finally, in an attempt to measure codetype's ability to identify code snippets (rather than complete files), I used the ["Hello world in every programming language"](https://github.com/leachim6/hello-world) project. **90.5%** (19 / 21) of the "Hello, world" snippets were correctly identified. Lua and Swift were both misidentified as Python. However, the code snippet in both cases&mdash;`print("Hello World")`&mdash;was in fact syntactically valid Python.

### Conclusion

I consider the results discussed above to be a promising start, but there are improvements to be made. Text parsing is the most notable area of need: there is currently no support for distinguishing between, for example, `//` as a comment delimiter and a division operator. This is an even larger issue for languages, such as Matlab, that use common operators as comment delimiters. I believe the key to solving this issue is to consider comments within the overall context of their source. In other words, if a file appears to be non-Matlab according to its tokens and first_line matches, then `%` is probably not a comment delimiter. 

Another means of improving comment detection (and consequently language detection) could be adding a signature key for "function definitions." The primary goal of signatures is to be brief, but I believe that enough languages have a construct along the lines of a "function" to warrant its inclusion.

A second area in need of improvement is analysis of first_line patterns. Currently, only the first non-comment line is considered. However, in reality, there are often many lines that could be considered a "first line" match. Take, for instance, the following Python code snippet:

```python
import sys

from math import fabs
from os import path

def foo:
    pass
```

`import sys` is only so useful as many languages have similar statements. Including the subsequent `from <...> import <...>` statements in our analysis would allow us to consider a much smaller candidate list.

Finally, I would like to eliminate the process of scanning each file in the base projects (as mentioned in the implementation section). This aligns with codetype's secondary goals of being standalone (i.e., requiring nothing along the lines of "training data"), light-weight and fast. I currently do this to account for some tokens being more common than others, but ultimately I think it is an unnecessary step. In the future, I plan on creating a "point system" of sorts in which tokens can be hand-assigned values based on their frequency in a given language.

Check back for future updates!

### Further Reading

You may be interested in reading *[Identifying source code programming languages through natural language processing](http://dare.uva.nl/cgi/arno/show.cgi?fid=636817)* and *[Predicting Tags for StackOverflow Questions](http://cs229.stanford.edu/proj2013/SchusterZhuCheng-PredictingTagsforStackOverflowQuestions.pdf)*. There is also Github's [Linguist](https://github.com/github/linguist), a project with the goal of identifying files contained in Git repositories.

