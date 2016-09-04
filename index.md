---
layout: default
title: Home
permalink: /index
---

## About

My name is **Joseph Kato**.

I'm a senior at <a href="https://www.pdx.edu">Portland State University</a> studying mathematics and computer science. My primary interests are data science, software development, running and the NBA.

Feel free to contact me through <a href="mailto:joseph@jdkato.io">email</a> ([public key](https://keybase.io/jdkato/key.asc)). I can also be found on <a href="https://github.com/jdkato">Github</a>.

## Lastest Posts

<ul>
{% for post in site.posts limit:3 %}
<li>
<a href="{{ post.url }}">{{ post.title }} 
  <small>
    <i class="fa fa-calendar"></i>
    {{ post.date | date: '%b. %d, %Y' }}
  </small>
</a>
</li>
{% endfor %}
</ul>

