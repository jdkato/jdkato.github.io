---
layout: post
title:  "Welcome to Jekyll!"
date:   2016-01-26 17:18:59 -0800
category: running
description: An example Jekyll blog post.
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and
re-build the site to see your changes. You can rebuild the site in many
different ways, but the most common way is to run `jekyll serve`, which launches
a web server and auto-regenerates your site when a file is updated.

> **Tip:** You’ll find this post in your `_posts` directory. Go ahead and edit it and
>re-build the site to see your changes. You can rebuild the site in many
>different ways, but the most common way is to run `jekyll serve`, which 
>launches a web server and auto-regenerates your site when a file is updated. -- <cite>Someone</cite>

### Section Two

To add new posts, simply add a file in the `_posts` directory that follows the
convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front
matter. Take a look at the source for this post to get an idea about how it
works.[<sup>[1]</sup>](#ref0)

Jekyll also offers powerful support for code snippets[<sup>[2]</sup>](#ref1) here:

{% highlight python %}
# This is a comment
def Euler(f, t0, y0, h, N):
    t = t0 + arange(N + 1) * h
    y = zeros(N + 1)
    y[0] = y0
    for n in range(N):
        y[n + 1] = y[n] + h * f(t[n], y[n])
        f = (1 + (1 / N)) ^ N
    return y
{% endhighlight %}

### More Formatting

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$

|  Command  |             Arguments            |                      Returns                      |
|:---------:|:--------------------------------:|:-------------------------------------------------:|
| `credits` | space-delimited list of prefixes | number of credits earned in the specified courses |
|   `gpa`   | space-delimited list of prefixes |        GPA earned in the specified courses        |

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most
out of Jekyll. File all bugs/feature requests at
[Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on
[Jekyll Talk][jekyll-talk].

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/

### References

1. [What Is Parkinson’s Disease?](http://www.pdf.org/about_pd) *Parkinson’s Disease* Foundation.
2. [I TWO am a *title* with inline styling.](http://www.pdf.org/about_pd)
