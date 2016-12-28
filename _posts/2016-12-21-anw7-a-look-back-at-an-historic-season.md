---
title: "ANW7 (Part 1): A Look Back at a Historic Season"
layout: post
tags : [ANW]
custom_css:
- 2016-09-09
custom_js:
- 2016-09-17
- 2016-12-21
- bootstrap3-typeahead.min
---

I have not missed an episode of [American Ninja Warrior](https://en.wikipedia.org/wiki/American_Ninja_Warrior) (ANW) since its fourth season in 2012. And while ANW is certainly more of a reality TV show than a traditional sport, it feels like too little emphasis is placed on its few sport-like qualities. This is perhaps most evident in the practically nonexistent use of data and statistics&mdash;two cornerstones of most sports. Questions like "What's Elet Hall's average time on the Quintuple Steps?" or "How long does Joe Moravsky usually rest between obstacles?" go largely unanswered.

In an attempt to answer some of these questions, I've collected data on every televised run during season 7. In a series of posts, I intend to discuss the process, my findings, a few opportunities for visualizations, and a new statistic&mdash;similar to the NBA's [Player Efficiency Rating](https://en.wikipedia.org/wiki/Player_efficiency_rating)&mdash;that will aid in the creation of ANW power rankings.

### Data Collection


Obviously, there are a number of challenges involved in trying to take accurate splits from a TV broadcast&mdash;a few of which are outlined below.

1. **Misrepresentation of elapsed time**: You'll notice that in many runs there are "jumps" in time. For example, after showing a competitor's family for three seconds, the clock will have jumped 40 seconds.
2. **Camera panning**: The key points for split-taking are when a competitor starts and completes an obstacle. Unfortunately, these moments are not always available to the viewer.
3. **Not every competitor is shown**: A competitor's run can be completely shown, partially shown, or not shown at all.

The workaround for (1) is to only use the official clock (rather than a stopwatch, for instance). This ensures that the split estimates sum to the official run time. Consider, for example, Kevin Bull's Qualifying run from season 7:

| Transition | Elapsed Time (sec) |     Obstacle     | Elapsed Time (sec) |
|:----------:|:------------------:|:----------------:|:------------------:|
|      0     |          0         |  Quintuple Steps |        2.73        |
|      1     |        7.09        | Mini Silk Slider |        2.41        |
|      2     |        1.07        |   Tilting Table  |        1.29        |
|      3     |        1.14        |    Spin Cycle    |        8.93        |
|      4     |        3.50        |  Hourglass Drop  |        18.91       |
|      5     |        5.56        |    Warped Wall   |        3.77        |

We see that the sum of Kevin's individual splits (56.4 seconds) matches his [official clocking](http://sasukepedia.wikia.com/wiki/American_Ninja_Warrior_7). And while this may seem rather time consuming at first glance, it doesn't require much more effort than simply watching does. This is especially true since I've written two simple Python scripts to do most of the heavy lifting: [split_taking.py](https://gist.github.com/jdkato/e2b5fabe2daf795e2438469c944d4409) (for courses with no time limit) and [split_taking_mt.py](https://gist.github.com/jdkato/072f400daef57191283123351fad328e) (for courses with a time limit&mdash;e.g., 2:30.00).

(2) and (3), on the other hand, are simply limitations of the method: we're going to have incomplete data due to some runs not being shown and we're going to have some inaccuracy introduced by inconvenient camera positions. That said, I still think this project provides an interesting look at the role that data and statistics could play in ANW.

### The Database

<img src="/img/database.png" alt="Database Structure" class="img-thumbnail">

As I watched each episode, I created CSV files consisting of rows like the following:

```
Kevin Bull,30,M,2.73,7.09,2.41,1.07,1.29,1.14,8.93,3.50,18.91,5.56,3.77,56.4,Completed
```

These CSV files are then converted into a SQLite database (the structure of which is shown above), making the answers to many interesting questions a mere query away. For example, the fastest times on the Quintuple Steps from Venice Qualifying:

<ul class="nav nav-tabs" id="product-table">
  <li><a href="#1" data-toggle="tab">Results</a></li>
  <li><a href="#2" data-toggle="tab">Query</a></li>
</ul>
<div class="tab-content">
  <div class="tab-pane" id="1">
    <table>
<thead>
<tr class="header">
<th align="left">Name</th>
<th align="left">City</th>
<th align="left">Category</th>
<th align="right">Time (sec)</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Kevin Bull</td>
<td align="left">Venice</td>
<td align="left">Qualifying</td>
<td align="right">2.73</td>
</tr>
<tr class="even">
<td align="left">Brendon Ayanbadejo</td>
<td align="left">Venice</td>
<td align="left">Qualifying</td>
<td align="right">2.91</td>
</tr>
<tr class="odd">
<td align="left">David Campbell</td>
<td align="left">Venice</td>
<td align="left">Qualifying</td>
<td align="right">2.92</td>
</tr>
<tr class="even">
<td align="left">Alan Connealy</td>
<td align="left">Venice</td>
<td align="left">Qualifying</td>
<td align="right">3.03</td>
</tr>
<tr class="odd">
<td align="left">Brian Kretsch</td>
<td align="left">Venice</td>
<td align="left">Qualifying</td>
<td align="right">3.86</td>
</tr>
</tbody>
</table>
  </div>
  <div class="tab-pane" id="2">
    <div class="language-sql highlighter-rouge"><div class="zero-clipboard mobile-hide"><span class="btn-clipboard">Copy</span></div><pre class="highlight"><code><span class="k">SELECT</span>
    <span class="n">Ninja</span><span class="p">.</span><span class="n">name</span><span class="p">,</span>
    <span class="n">Course</span><span class="p">.</span><span class="n">city</span><span class="p">,</span>
    <span class="n">Course</span><span class="p">.</span><span class="n">category</span><span class="p">,</span>
    <span class="n">ObstacleResult</span><span class="p">.</span><span class="n">time</span>
<span class="k">FROM</span> <span class="n">ObstacleResult</span>
<span class="k">JOIN</span> <span class="n">Ninja</span>
    <span class="k">ON</span> <span class="p">(</span><span class="n">ObstacleResult</span><span class="p">.</span><span class="n">ninja_id</span><span class="o">=</span><span class="n">Ninja</span><span class="p">.</span><span class="n">id</span><span class="p">)</span>
<span class="k">JOIN</span> <span class="n">Obstacle</span>
    <span class="k">ON</span> <span class="p">(</span><span class="n">ObstacleResult</span><span class="p">.</span><span class="n">obstacle_id</span><span class="o">=</span><span class="n">Obstacle</span><span class="p">.</span><span class="n">id</span><span class="p">)</span>
<span class="k">JOIN</span> <span class="n">Course</span>
    <span class="k">ON</span> <span class="p">(</span><span class="n">Obstacle</span><span class="p">.</span><span class="n">course_id</span><span class="o">=</span><span class="n">Course</span><span class="p">.</span><span class="n">id</span><span class="p">)</span>
<span class="k">WHERE</span> <span class="p">(</span><span class="n">Obstacle</span><span class="p">.</span><span class="n">obstacle_name</span><span class="o">=</span><span class="nv">"Quintuple Steps"</span> <span class="k">AND</span> <span class="n">ObstacleResult</span><span class="p">.</span><span class="n">completed</span><span class="o">=</span><span class="mi">1</span> <span class="k">AND</span> <span class="n">Course</span><span class="p">.</span><span class="n">id</span><span class="o">=</span><span class="mi">6</span><span class="p">)</span>
<span class="k">ORDER</span> <span class="k">BY</span> <span class="n">ObstacleResult</span><span class="p">.</span><span class="n">time</span> <span class="k">ASC</span>
</code></pre>
</div>
  </div>
</div>

I'm sure this list isn't particularly surprising to anyone who follows ANW but, as you can probably imagine, a database like this can answer *many* more questions (some of which will be discussed in subsequent posts).

### Run Flow

The first visualization we're going to discuss is called the "Run Flow." It attempts to provide a means for both analyzing an individual run and comparing two different runs. Check it out below!

<form class="bs-example bs-example-form" data-example-id="input-group-with-button">
    <div class="row">
        <div class="form-group col-sm-6">
            <label for="comp1" class="h4">Ninja 1</label>
            <input type="text" class="form-control" id="comp1" placeholder="Kevin Bull" data-provide="typeahead" autocomplete="off">
        </div>
        <div class="form-group col-sm-6">
            <label for="comp2" class="h4">Ninja 2</label>
            <input type="text" class="form-control" id="comp2" placeholder="Alan Connealy" data-provide="typeahead" autocomplete="off">
        </div>
    </div>
    <div id="container" style="min-width: 310px;min-height: 400px; margin: 0 auto"></div>
</form>

As you can see, the default parameters compare the two fastest runners of the night: Kevin Bull and Alan Connealy. It was a fairly tight race until the third transition, at which point Bull pulled away for good. Another interesting comparison is between Alan Connealy and Nicholas Coolridge, who collectively had the closest finishing times of the night.

### Up Next

In the next post in this series, I plan to take a closer look at the Qualifying and City Finals episodes: Which course and obstacle were the most difficult? Who had the most impressive run?

I've also considered making this data freely available through a website consisting of information such as a leaderboard (overall, men, and women) of the top-15 competitors and an individualized profile page for each competitor containing career, course and obstacle statistics. I'll discuss this idea more thoroughly in future posts but, in the meantime, you can stop by the project's [Github repository](https://github.com/jdkato/ninjaref).

As always, feel free to [contact me](/) with any comments or suggestions.
