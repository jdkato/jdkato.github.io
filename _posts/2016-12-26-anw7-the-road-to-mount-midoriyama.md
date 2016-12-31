---
title: "ANW7 (Part 2): The Road to Mount Midoriyama"
layout: post
tags : [ANW]
custom_js:
- 2016-09-17
- 2016-12-26
- bootstrap3-typeahead.min
---

In the [first installment of this series](https://jdkato.github.io/2016/12/21/anw7-a-look-back-at-an-historic-season.html), I gave an overview of the database I've created for analyzing various aspects of American Ninja Warrior. Now, it's time to start exploring this data in more detail&mdash;starting with the Qualifying and City Finals rounds.

There were plenty of memorable moments prior to reaching Las Vegas in season 7, including sub-60-second qualifying runs by Kevin Bull and Lorin Ball, witnessing 38 people complete the Kansas City Finals course, and the debut of one of the most challenging qualifying obstacles in ANW history. In this post, we'll take a closer look at many of these moments as we recap the first 12 episodes of ANW7. 

### The Courses

<form class="bs-example bs-example-form" data-example-id="input-group-with-button">
  <div class="row">
    <div class="btn-group" data-toggle="buttons" id="course-type">
      <label class="btn btn-primary active">
        <input type="radio" name="options" id="option1" value="Qualifying" autocomplete="off" checked> Qualifying
      </label>
      <label class="btn btn-primary">
        <input type="radio" name="options" id="option2" autocomplete="off" value="Finals"> Finals
      </label>
    </div>
  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
      <span>Select a City</span> <span class="caret"></span>
    </button>
    <ul class="dropdown-menu" role="menu" id="city">
      <li><a>Houston</a></li>
      <li><a>Kansas City</a></li>
      <li><a>Orlando</a></li>
      <li><a>Pittsburgh</a></li>
      <li><a>San Pedro</a></li>
      <li><a>Venice</a></li>
    </ul>
  </div>
  </div>
  <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
  <table class="table table-demo">
    <thead>
      <tr>
        <th>Finishers</th>
        <th>Average Finish Time (sec)</th>
        <th>Best Finish Time (sec)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td id="finishers">15</td>
        <td id="time">172.82</td>
        <td id="point">90.78</td>
      </tr>
    </tbody>
  </table>
</form>

Course Flow plots the median time of all competitors inside a shaded region indicating the range of observed values at each point on the course. This is sort of a "zoomed out" version of the Run Flow chart (which was discussed in part 1) in the sense that it provides a representation of how time was spent across the entire field rather than just a single run. Here are a few features I noticed:

- Finals courses have significantly less time variation than qualifying courses. The median time on the first 6 obstacles also decreases, on average, between the qualifying and final rounds.
- The Warped Wall, oddly enough, had a wider range of times during the finals than during qualifying on all but the Orlando and Pittsburgh courses.
- Snake Crossing's median completion time of 33.06 seconds was 27.29 seconds longer than the next most time consuming third obstacle (Floating Tiles) in the qualifying round. In the finals, it was 29.46 seconds longer than any other third obstacle.
- San Pedro saw the slowest average finish times in both rounds, with its fastest qualifying run coming in at over a minute slower than the others.
- Kansas City and Venice were the two most similar courses pace-wise while also having the highest and lowest number of completions, respectively.[^1]

The last point is particularly interesting: Kansas City's qualifying course saw 38 competitors finish&mdash;which was 13 more than the next most-completed qualifying course (Orlando) and more than Houston, Venice, and San Pedro registered *combined*. To get a better idea of what lead to such a large discrepancy, take a look at the distribution of failures across each course:

<form class="bs-example bs-example-form" data-example-id="input-group-with-button">
  <div class="row">
  <div class="btn-group" data-toggle="buttons" id="course-type2">
      <label class="btn btn-primary active">
        <input type="radio" name="options" id="option1" value="Qualifying" autocomplete="off" checked> Qualifying
      </label>
      <label class="btn btn-primary">
        <input type="radio" name="options" id="option2" autocomplete="off" value="Finals"> Finals
      </label>
    </div>
  <div id="fails" style="height: 400px; margin: auto; min-width: 310px;"></div>
  </div>
</form>

Kansas City and Venice saw the fewest and second-fewest failures, respectively, up to the 5th obstacle&mdash;which offers an explanation for why they were found to be the most similar courses pace-wise in the qualifying round. However, we can see that they took distinctly different paths after that point: Venice's 5th obstacle (Hourglass Drop) added 26 failures, while Kansas City's (Bungee Road) only added 5. Overall, in terms of finishers, the 3 easiest qualifying courses had 8 or fewer failures on the 5th obstacle, while the 3 hardest had 15 or more. To highlight just how important the 5th obstacle was in qualifying, consider the progress through the first 4 obstacles:

<table class = "table">
   <thead>
      <tr>
         <th>City</th>
         <th>Failures through 4th Obstacle</th>
         <th>Percent of Field</th>
         <th>Median Time</th>
         <th>Failures After 5th Obstacle</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Venice</td>
         <td>14</td>
         <td>26</td>
         <td>29.72</td>
         <td>40</td>
      </tr>
     <tr>
         <td>Kansas City</td>
         <td>15</td>
         <td>26</td>
         <td>37.82</td>
         <td>20</td>
      </tr>
      <tr>
         <td>Pittsburgh</td>
         <td>16</td>
         <td>33</td>
         <td>69.16</td>
         <td>24</td>
      </tr>
      <tr>
         <td>Orlando</td>
         <td>20</td>
         <td>37</td>
         <td>54.19</td>
         <td>27</td>
      </tr>
      <tr>
         <td>Houston</td>
         <td>23</td>
         <td>43</td>
         <td>47.73</td>
         <td>38</td>
      </tr>
      <tr>
         <td>San Pedro</td>
         <td>25</td>
         <td>48</td>
         <td>60.98</td>
         <td>41</td>
      </tr>
   </tbody>
</table>

As you can see, Venice&mdash;the course that only saw 7 finishers&mdash;was the *easiest* through 4 obstacles. In other words, the Hourglass Drop single-handedly took Venice from being the easiest to the hardest course in all of qualifying.

The City Finals, in contrast, didn't have a uniformly decisive point. The Hourglass Drop remained the most potent of the first 6 obstacles, but Cannonball Alley (Orlando; 8th), the Walking Bar (Houston; 8th), the Body Prop (Kansas City; 9th), and the Invisible Ladder (Pittsburgh; 10th) all saw a comparable number of failures on the back end of the courses. San Pedro was the only finals course that didn't have a single obstacle take out more competitors than the others, as both the I-Beam Cross and Salmon Ladder claimed a course-high of 5.

### Best Performances

In the qualifying round, there were a few runs that stood above the rest:

|        Name       |     City    | Time (sec) | Finish |
|:-----------------|:-----------|:------------|:--------|
|     Daniel Gil    |   Houston   |    90.78   |   1st  |
|     Lorin Ball    | Kansas City |    58.34   |   1st  |
|    Paul Kasemir   | Kansas City |    63.07   |   2nd  |
|   Jon Alexis Jr.  |   Orlando   |    97.75   |   1st  |
|     Elet Hall     |  Pittsburgh |    82.71   |   1st  |
| Robin Pietschmann |  San Pedro  |   185.51   |   1st  |
|     Kevin Bull    |    Venice   |    56.4    |   1st  |

Kevin Bull had the fastest time of the round, but the average finish time at Venice was also over 20 seconds faster than any other qualifying course. In addition, 8 of the 26 people who failed on the Hourglass Drop reached that point in under 40 seconds&mdash;making Venice clearly the fastest qualifying course.

The next fastest runs came from Lorin Ball and Paul Kasemir. However, Kansas City not only saw the most finishers of the qualifying round but it also had the second-fastest average finish time. Kansas City also posted the most finishers of the final round, making the course appear to be the easiest overall.

Elet Hall's qualifying time was the most impressive in comparison to the average finish time, while Jon Alexis Jr. came away with the largest margin of victory. 

|        Name        |     City    | Through 6 Obstacles (sec) | Differential (sec) | Total (sec) |
|:------------------|:-----------|:-------------------------:|:------------------:|-------------|
|    James McGrath   |   Orlando   |           102.78          |        5.03        |    330.5    |
| Nicholas Coolridge |    Venice   |           71.96           |        15.56       |    366.69   |
|   Dustin McKinney  |  San Pedro  |           221.1           |        35.29       |    588.75   |
|   Jeremiah Morgan  |   Houston   |           141.03          |        50.25       |    376.68   |
|     Lance Pekus    | Kansas City |           154.36          |        96.02       |    338.44   |
|    Geoff Britten   |  Pittsburgh |           216.5           |       133.79       |    404.81   |

In the finals, James McGrath not only posted the fastest finish time but he also came within 5.03 seconds of matching the best time through 6 obstacles from qualifying. Geoff Britten was the fastest on the 4 new obstacles, which was perhaps an indication of what was to come.

### Up Next

In the next post, we'll recap the action at Mount Midoriyama: from all-time records of 38 and 8 competitors completing stage 1 and 2 respectively, to witnessing the crowning of America's first Ninja Warrior. 

---

[^1]: Pace similarity was calculated by treating Course Flow as a [simple polygonal chain](https://en.wikipedia.org/wiki/Polygonal_chain#Variations) and then using the [Fréchet distance](https://www.cs.duke.edu/courses/spring07/cps296.2/scribe_notes/lecture23.pdf) algorithm.
