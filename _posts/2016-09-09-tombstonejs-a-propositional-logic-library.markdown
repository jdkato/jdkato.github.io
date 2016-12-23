---
title: "Tombstone.js: A Propositional Logic Library"
layout: post
tags : [Projects, JavaScript, Algorithms]
custom_css:
- 2016-09-09
custom_js:
- 2016-09-09
---

Propositional logic (or propositional calculus) is, [according to Wikipedia](https://en.wikipedia.org/wiki/Propositional_calculus), "a branch of mathematical logic concerned with the study of propositions (whether they are true or false) that are formed by other propositions with the use of logical connectives, and how their value depends on the truth value of their components."

I was introduced to this topic during my third-year of college in a course titled Introduction to Formal Logic. I did not have high expectations going in (my primary motivation was avoiding more writing-intensive electives), but it turned out to be one of my favorite courses. One aspect that I found particularly intriguing about the course was that much of the material seemed to lend itself nicely to automation &ndash; whether it be the construction of truth tables or even the analysis of proofs. Indeed, there are a number of existing online tools such as:

- The [Logic Daemon](http://logic.tamu.edu/daemon.html) by Texas A&M University, which "checks proofs and can provide hints for students attempting to construct proofs in a natural deduction system for sentential (propositional) and first-order predicate (quantifier) logic";
- truth table generators by [Michael Rieppel](http://mrieppel.net/prog/truthtable.html), [Jamie Wong](http://jamie-wong.com/experiments/truthtabler/SLR1/) or [Lawrence Turner](http://turner.faculty.swau.edu/mathematics/materialslibrary/truth/) (among others); and
- the various utilities developed by [Logictools](http://logictools.org/index.html).

I intend to re-implement (and, where possible, try to improve upon) much of the functionality mentioned above with the goals of gaining a more thorough understanding of the topic and releasing a full-featured, open-source library named [Tombstone.js](https://github.com/jdkato/Tombstone.js) (if you're wondering why I chose the name "Tombstone," it was inspired by the [typographical symbol](https://en.wikipedia.org/wiki/Tombstone_(typography))).

### Evaluating Well-Formed Formulas

The first step was to implement the ability to evaluate arbitrary [well-formed formulas](https://en.wikipedia.org/wiki/Well-formed_formula) (WFFs). This requires a definition of our vocabulary, which consists of sentence variables ($\\{A,B, \dots, Z\\}$), parentheses and connectives.

<table class = "table">
   <caption>Logical Connectives (descending order of precedence)</caption>
   <thead>
      <tr>
         <th>Symbol</th>
         <th>Name</th>
         <th>Example</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>~</td>
         <td>negation</td>
         <td>~P ("not P")</td>
      </tr>
      <tr>
         <td>&amp;</td>
         <td>conjunction</td>
         <td>P &amp; Q ("P and Q")</td>
      </tr>
      <tr>
         <td>||</td>
         <td>disjunction</td>
         <td>P || Q ("P or Q")</td>
      </tr>
      <tr>
         <td>-></td>
         <td>implication</td>
         <td>P -> Q ("If P, then Q")</td>
      </tr>
      <tr>
         <td><-></td>
         <td>equivalence</td>
         <td>P <-> Q ("P if and only if Q")</td>
      </tr>
   </tbody>
</table>

A formula is considered well-formed according to the following conditions:

1. All sentence variables are WFFs.
2. If $\phi$ is a WFF, then ~$\phi$ is also a WFF.
3. If $\phi$ and $\psi$ are WFFs, then ($\phi$ & $\psi$), ($\phi$ \|\| $\psi$), ($\phi$ -> $\psi$) and ($\phi$ <-> $\psi$) are WFFs.
4. Nothing else is a WFF.

From here, I decided to use the [shunting-yard algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm) to convert WFFs to [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) (RPN) for evaluation. In RPN, every operator follows its operands &ndash; for example, `P & Q` becomes `P Q &`. This parsing strategy is more commonly associated with mathematical expressions but it seems to work well for logic too. You can see the algorithm in action below.

<form class="bs-example bs-example-form" data-example-id="input-group-with-button">
    <div class="row clearfix">
    <div class="col-xs-12">
            <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">Formula</span>
                <input id="formula-rpn" class="form-control" placeholder="(P & ~Q) -> S" aria-describedby="basic-addon1"> <span class="input-group-btn"> <button id="parse-rpn" class="btn btn-default" type="button">Evaluate</button> </span></div>
        </div>
        <div class="col-xs-12">
            <table class="table" id="tab_logic">
                <thead>
                    <tr >
                        <th class="text-center">
                            Token
                        </th>
                        <th class="text-center">
                            Output
                        </th>
                        <th class="text-center">
                            Operator Stack
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr id='addr0'>
                        <td>(</td>
                        <td></td>
                        <td>(</td>
                    </tr>
                    <tr id='addr1'></tr>
                </tbody>
            </table>
        </div>
        <a id="add_row" class="btn btn-default pull-left control-btn">Next Step</a><a id='delete_row' class="pull-right btn btn-default control-btn disabled">Back</a>
    </div>
</form>

Once in RPN, we can easily evaluate the expression or construct a graphical representation of the formula's structure (known as a [parse tree](https://en.wikipedia.org/wiki/Parse_tree)) as seen below.

<form class="bs-example bs-example-form" data-example-id="input-group-with-button">
    <div class="row">
        <div class="col-xs-12">
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon2">Formula</span>
                <input id="formula" class="form-control" placeholder="(P & ~Q) -> S" aria-describedby="basic-addon2"> <span class="input-group-btn"> <button id="parse" class="btn btn-default" type="button">Evaluate</button> </span> </div>
        </div>
        <div class="col-xs-12">
            <div id="tree"></div>
        </div>
    </div>
</form>

### Truth Tables

Now that we can evaluate arbitrary WFFs, generating truth tables is just a matter of evaluating an expression at all of its variable combinations.

<form class="bs-example bs-example-form" data-example-id="input-group-with-button">
    <div class="row">
        <div class="col-xs-12">
            <div class="input-group">
                <span class="input-group-addon" id="basic-addon2">Formula</span>
                <input id="formula-md" class="form-control" placeholder="(P & ~Q) -> S" aria-describedby="basic-addon2"> <span class="input-group-btn"> <button id="parse-md" class="btn btn-default" type="button">Evaluate</button> </span> </div>
        </div>
    </div>
    <div id="md-table"></div>
</form>

### Conclusion

While Tombstone.js is still in its early stages of development, I think this is a promising start. An approximate roadmap for future development is as follows.

- Extend truth table generation to allow for copying in HTML, Markdown, $\LaTeX$, reStructuredText or plain text;
- add the ability to analyze proofs; and
- create a website to showcase Tombstone.js.

I am also considering re-writing the project (that is, the two files it currently contains) in [TypeScript](https://www.typescriptlang.org/). This seems like it would offer a number of interesting features without sacrificing browser support, which is something I would like to keep as high as possible.

Check back for future updates!

### References

- Allen, Colin and Michael Hand. *Logic Primer*. Cambridge, Mass.: MIT Press, 2001. Print.
