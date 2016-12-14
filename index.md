---
layout: default
title: Home
permalink: /index
---

## About

My name is **Joseph Kato**.

I have a B.S. in mathematics from <a href="https://www.pdx.edu">Portland State University</a> (2012 - 2016). My interests include data science, software and web development, and artificial intelligence. I also enjoy running and watching the NBA.

Feel free to contact me through email at <img class="inline-img" src="img/inline-em.png"> ([public key](https://keybase.io/jdkato/key.asc)). I can also be found at <a href="https://github.com/jdkato">Github</a>, <a href="https://teamtreehouse.com/josephkato">Treehouse</a>, and <a href="https://forum.sublimetext.com/users/jdkato/activity">Sublime Text</a>.

## Recent Posts

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

