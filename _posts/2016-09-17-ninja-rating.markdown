---
title: "Ninja Rating: Bringing Analytics to ANW"
layout: post
tags : [Projects, ANW]
custom_js:
- 2016-09-17
---

I have not missed an episode of [American Ninja Warrior](https://en.wikipedia.org/wiki/American_Ninja_Warrior) (ANW) since its fourth season in 2012. And while ANW is certainly more of a reality TV show than a traditional sport, I have always felt that too little emphasis is placed on quantitative data. This makes it difficult to compare individual competitors, which is something I am sure many of us have thought about.

This is where Ninja Rating (NR) comes into play. Similar to the NBA's [Player Efficiency Rating](https://en.wikipedia.org/wiki/Player_efficiency_rating) or the NFL's [Total Quarterback Rating](https://en.wikipedia.org/wiki/Total_quarterback_rating), NR attempts to consolidate many different factors into a single number that can be used to compare individual competitors. Its formula, in contrast to PER and QBR, is quite simple:

```
NR = speed + consistency + success
```

where `speed`, `consistency` and `success` measure different aspects of being an overall elite Ninja Warrior (the specifics of these factors are very much a work-in-progress).

`speed` rewards those who minimize time spent on the course, including both on-obstacle and transition periods. It is calculated as follows (you can read about the [database here](https://github.com/jdkato/ninjaref/wiki/Database-Design)).

```python
# Get all obstacles from a given course.
ids = cursor.execute(
    "SELECT id FROM Obstacle WHERE course_id={0}".format(cid)
).fetchall()
places = []
for oid in ids:
    # For each obstacle, rank competitors in ascending order by 
    # obstacle time + transition time, given that transition time
    # is less than 30 seconds and they completed the obstacle.
    cursor.execute(
        """
        SELECT ninja_id FROM ObstacleResult
        WHERE (obstacle_id={0} AND completed=1 AND transition<30)
        ORDER BY time + transition ASC
        """.format(oid[0])
    )
    leaders = [t[0] for t in cursor.fetchall()]
    if nid in leaders:
        # If their id is present in the list, append their position to `places`.
        places.append(leaders.index(nid) + 1)
    else:
        # Otherwise append 0.
        places.append(0)
speed = 3 * sum(x > 0 for x in places) - (sum(places) / len(places))
```

I do not simply use finish time in an attempt to avoid conflating `speed` with `success`. A major drawback to this technique is that competitors who are not shown during the broadcast are going to be penalized. Averages could be used in place of missing values to limit the extent to which they are penalized, though. `consistency` and `success` are much simpler:

```
consistency = average finish * # seasons

success = 4 * career-best finish
```

The data required to calculate NR will also allow for nearly endless analysis. Questions like *"who has the fastest average time on the Quintuple Steps?"* or *"what is Elet Hall's average rest time between obstacles?"* will be easily answered.

### Data Collection

Obviously, there are a number of challenges involved in trying to take accurate splits from a TV broadcast &ndash; a few of which are outlined below.

1. **Misrepresentation of elapsed time**: You'll notice that in many runs there are "jumps" in time. For example, after showing a competitor's family for three seconds, the clock will have jumped 40 seconds.
2. **Camera panning**: The key points for split-taking are when a competitor starts and completes an obstacle. Unfortunately, these moments are not always broadcast to the viewer and we therefore will have some slight inaccuracies.
3. **Not every competitor is shown**: A competitor's run can be completely shown, partially shown or not shown at all. This means that our database will have incomplete data.

The workaround for (1) is to only use the official clock (rather than a stopwatch, for instance). This ensures that the split estimates match the official run time. Consider, for example, Kevin Bull's Qualifying run from season 7:

| Transition | Elapsed Time (sec) |     Obstacle     | Elapsed Time (sec) |
|:----------:|:------------------:|:----------------:|:------------------:|
|      0     |          0         |  Quintuple Steps |        2.73        |
|      1     |        7.09        | Mini Silk Slider |        2.41        |
|      2     |        1.07        |   Tilting Table  |        1.29        |
|      3     |        1.14        |    Spin Cycle    |        8.93        |
|      4     |        3.50        |  Hourglass Drop  |        18.91       |
|      5     |        5.56        |    Warped Wall   |        3.77        |

We see that Kevin's total time (56.4 seconds) matches his [official clocking](http://sasukepedia.wikia.com/wiki/American_Ninja_Warrior_7) even though the individual splits are hand-timed estimates. Using this technique, I have taken splits for all of season 7's Qualifying and City Finals episodes. Ultimately, I would like to have data dating back to at least season 4.

The data is recorded in [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) format, sorted by course type (i.e., Qualifying or City Finals) and season. It is then converted into a [PostgreSQL](https://www.postgresql.org) database. This data will be completely free and open-source; everything I record will be made available on the project's [Github repository](https://github.com/jdkato/ninjaref). I have also started writing [timing guidelines](https://github.com/jdkato/ninjaref/wiki/Timing-Guidelines), should anyone else want to help out.

### Sample Results

The following are a few examples indented to demonstrate the kind of questions that can be answered with more detailed data.

<table>
<caption>Fastest times on the Quintuple Steps</caption>
<thead>
<tr class="header">
<th align="left">name</th>
<th align="left">location</th>
<th align="left">type</th>
<th align="right">time (sec)</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Drew Drechsel</td>
<td align="left">Orlando</td>
<td align="left">Qualifying</td>
<td align="right">1.56</td>
</tr>
<tr class="even">
<td align="left">Flip Rodriguez</td>
<td align="left">Orlando</td>
<td align="left">Qualifying</td>
<td align="right">1.59</td>
</tr>
<tr class="odd">
<td align="left">Flip Rodriguez</td>
<td align="left">Orlando</td>
<td align="left">Finals</td>
<td align="right">1.59</td>
</tr>
<tr class="even">
<td align="left">Lorin Ball</td>
<td align="left">Kansas City</td>
<td align="left">Qualifying</td>
<td align="right">1.63</td>
</tr>
<tr class="odd">
<td align="left">Jon Alexis Jr.</td>
<td align="left">Orlando</td>
<td align="left">Finals</td>
<td align="right">1.79</td>
</tr>
<tr class="even">
<td align="left">Devin Harrelson</td>
<td align="left">Orlando</td>
<td align="left">Qualifying</td>
<td align="right">2.13</td>
</tr>
<tr class="odd">
<td align="left">Travis Iverson</td>
<td align="left">Houston</td>
<td align="left">Finals</td>
<td align="right">2.43</td>
</tr>
<tr class="even">
<td align="left">Paul Kasemir</td>
<td align="left">Kansas City</td>
<td align="left">Qualifying</td>
<td align="right">2.45</td>
</tr>
<tr class="odd">
<td align="left">Elet Hall</td>
<td align="left">Pittsburgh</td>
<td align="left">Qualifying</td>
<td align="right">2.46</td>
</tr>
<tr class="even">
<td align="left">Elet Hall</td>
<td align="left">Pittsburgh</td>
<td align="left">Finals</td>
<td align="right">2.56</td>
</tr>
</tbody>
</table>

This list is not particularly surprising but it is interesting nonetheless. We can see that Flip and Elet made the top ten in both their Qualifying and City Final runs, while Drew had the fastest time overall.

<table>
<caption>Elet Hall's Transitions</caption>
<thead>
<tr class="header">
<th align="left">type</th>
<th align="left">obstacle_name</th>
<th align="right">transition (sec)</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Qualifying</td>
<td align="left">Quintuple Steps</td>
<td align="right">0</td>
</tr>
<tr class="even">
<td align="left">Qualifying</td>
<td align="left">Log Grip</td>
<td align="right">3.61</td>
</tr>
<tr class="odd">
<td align="left">Qualifying</td>
<td align="left">Snake Crossing</td>
<td align="right">1.68</td>
</tr>
<tr class="even">
<td align="left">Qualifying</td>
<td align="left">Wind Chimes</td>
<td align="right">1.64</td>
</tr>
<tr class="odd">
<td align="left">Qualifying</td>
<td align="left">Devil Steps</td>
<td align="right">6.04</td>
</tr>
<tr class="even">
<td align="left">Qualifying</td>
<td align="left">Warped Wall</td>
<td align="right">1.93</td>
</tr>
<tr class="odd">
<td align="left">Finals</td>
<td align="left">Quintuple Steps</td>
<td align="right">0</td>
</tr>
<tr class="even">
<td align="left">Finals</td>
<td align="left">Log Grip</td>
<td align="right">3.54</td>
</tr>
<tr class="odd">
<td align="left">Finals</td>
<td align="left">Snake Crossing</td>
<td align="right">5.6</td>
</tr>
<tr class="even">
<td align="left">Finals</td>
<td align="left">Wind Chimes</td>
<td align="right">5.64</td>
</tr>
<tr class="odd">
<td align="left">Finals</td>
<td align="left">Devil Steps</td>
<td align="right">12.56</td>
</tr>
<tr class="even">
<td align="left">Finals</td>
<td align="left">Warped Wall</td>
<td align="right">12.63</td>
</tr>
<tr class="odd">
<td align="left">Finals</td>
<td align="left">Salmon Ladder</td>
<td align="right">26.9</td>
</tr>
<tr class="even">
<td align="left">Finals</td>
<td align="left">Floating Monkey Bars</td>
<td align="right">0</td>
</tr>
<tr class="odd">
<td align="left">Finals</td>
<td align="left">Doorknob Arch</td>
<td align="right">26.7</td>
</tr>
</tbody>
</table>

Through season 7's Qualifying and City Finals competitions, Elet Hall had an average transition time of approximately 13.56 seconds. The Salmon Ladder and Doorknob Arch both saw much longer transitions than the other obstacles. Finally, here are the Ninja Rating rankings:

<ul class="nav nav-tabs" id="product-table">
  <li><a href="#1" data-toggle="tab">Men</a></li>
  <li><a href="#2" data-toggle="tab">Women</a></li>
</ul>
<div class="tab-content">
  <div class="tab-pane" id="1">
    <table>
      <thead>
        <tr class="header">
          <th align="left">name</th>
          <th align="right">nr_speed</th>
          <th align="right">nr_consistency</th>
          <th align="right">nr_success</th>
          <th align="right">rating</th>
          <th align="left">best_finish</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">James McGrath</td>
          <td align="right">21.7</td>
          <td align="right">32</td>
          <td align="right">48</td>
          <td align="right">101.7</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="even">
          <td align="left">Nicholas Coolridge</td>
          <td align="right">20.4</td>
          <td align="right">32</td>
          <td align="right">48</td>
          <td align="right">100.4</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="odd">
          <td align="left">Joe Moravsky</td>
          <td align="right">15.8</td>
          <td align="right">32</td>
          <td align="right">48</td>
          <td align="right">95.8</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="even">
          <td align="left">Adam Arnold</td>
          <td align="right">15.5</td>
          <td align="right">32</td>
          <td align="right">48</td>
          <td align="right">95.5</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="odd">
          <td align="left">Jeremiah Morgan</td>
          <td align="right">18.7</td>
          <td align="right">28</td>
          <td align="right">48</td>
          <td align="right">94.7</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="even">
          <td align="left">Geoff Britten</td>
          <td align="right">14.5</td>
          <td align="right">32</td>
          <td align="right">48</td>
          <td align="right">94.5</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="odd">
          <td align="left">Brendan Crouvreux</td>
          <td align="right">13.9</td>
          <td align="right">32</td>
          <td align="right">48</td>
          <td align="right">93.9</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="even">
          <td align="left">Dustin McKinney</td>
          <td align="right">13.6</td>
          <td align="right">32</td>
          <td align="right">48</td>
          <td align="right">93.6</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="odd">
          <td align="left">Kevin Bull</td>
          <td align="right">18.7</td>
          <td align="right">30</td>
          <td align="right">44</td>
          <td align="right">92.7</td>
          <td align="left">City Finals (9 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Elet Hall</td>
          <td align="right">23.2</td>
          <td align="right">28</td>
          <td align="right">40</td>
          <td align="right">91.2</td>
          <td align="left">City Finals (8 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Sam Sann</td>
          <td align="right">10.9</td>
          <td align="right">32</td>
          <td align="right">48</td>
          <td align="right">90.9</td>
          <td align="left">City Finals (complete)</td>
        </tr>
        <tr class="even">
          <td align="left">Isaac Caldiero</td>
          <td align="right">22.4</td>
          <td align="right">28</td>
          <td align="right">40</td>
          <td align="right">90.4</td>
          <td align="left">City Finals (8 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Travis Rosen</td>
          <td align="right">21.9</td>
          <td align="right">28</td>
          <td align="right">40</td>
          <td align="right">89.9</td>
          <td align="left">City Finals (8 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Drew Drechsel</td>
          <td align="right">15.8</td>
          <td align="right">30</td>
          <td align="right">44</td>
          <td align="right">89.8</td>
          <td align="left">City Finals (9 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Flip Rodriguez</td>
          <td align="right">15.3</td>
          <td align="right">30</td>
          <td align="right">44</td>
          <td align="right">89.3</td>
          <td align="left">City Finals (9 obstacles)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="tab-pane" id="2">
    <table>
      <thead>
        <tr class="header">
          <th align="left">name</th>
          <th align="right">nr_speed</th>
          <th align="right">nr_consistency</th>
          <th align="right">nr_success</th>
          <th align="right">rating</th>
          <th align="left">best_finish</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">Jessie Graff</td>
          <td align="right">17.3</td>
          <td align="right">24</td>
          <td align="right">40</td>
          <td align="right">81.3</td>
          <td align="left">City Finals (8 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Meagan Martin</td>
          <td align="right">2.6</td>
          <td align="right">14</td>
          <td align="right">28</td>
          <td align="right">44.6</td>
          <td align="left">City Finals (1 obstacle)</td>
        </tr>
        <tr class="odd">
          <td align="left">Michelle Warnky</td>
          <td align="right">3.8</td>
          <td align="right">12</td>
          <td align="right">20</td>
          <td align="right">35.8</td>
          <td align="left">City Finals (2 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Cassie Craig</td>
          <td align="right">3.67</td>
          <td align="right">8</td>
          <td align="right">20</td>
          <td align="right">31.67</td>
          <td align="left">Qualifying (4 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Annie Dudek</td>
          <td align="right">2.83</td>
          <td align="right">8</td>
          <td align="right">20</td>
          <td align="right">30.83</td>
          <td align="left">Qualifying (4 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Asya Grechka</td>
          <td align="right">1.17</td>
          <td align="right">8</td>
          <td align="right">20</td>
          <td align="right">29.17</td>
          <td align="left">Qualifying (4 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Marybeth Wang</td>
          <td align="right">0</td>
          <td align="right">8</td>
          <td align="right">20</td>
          <td align="right">28</td>
          <td align="left">Qualifying (4 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Kacy Catanzaro</td>
          <td align="right">5.67</td>
          <td align="right">6</td>
          <td align="right">16</td>
          <td align="right">27.67</td>
          <td align="left">Qualifying (3 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Tory Garcia</td>
          <td align="right">4.83</td>
          <td align="right">6</td>
          <td align="right">16</td>
          <td align="right">26.83</td>
          <td align="left">Qualifying (3 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Rose Wetzel</td>
          <td align="right">4</td>
          <td align="right">6</td>
          <td align="right">16</td>
          <td align="right">26</td>
          <td align="left">Qualifying (3 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Amanda Graham</td>
          <td align="right">3.33</td>
          <td align="right">6</td>
          <td align="right">16</td>
          <td align="right">25.33</td>
          <td align="left">Qualifying (3 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Caitlin Shukwit</td>
          <td align="right">2.17</td>
          <td align="right">6</td>
          <td align="right">16</td>
          <td align="right">24.17</td>
          <td align="left">Qualifying (3 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Emily Durham</td>
          <td align="right">2.17</td>
          <td align="right">6</td>
          <td align="right">16</td>
          <td align="right">24.17</td>
          <td align="left">Qualifying (3 obstacles)</td>
        </tr>
        <tr class="even">
          <td align="left">Amber Holbrook</td>
          <td align="right">1.83</td>
          <td align="right">6</td>
          <td align="right">16</td>
          <td align="right">23.83</td>
          <td align="left">Qualifying (3 obstacles)</td>
        </tr>
        <tr class="odd">
          <td align="left">Shannon Silver</td>
          <td align="right">1.83</td>
          <td align="right">6</td>
          <td align="right">16</td>
          <td align="right">23.83</td>
          <td align="left">Qualifying (3 obstacles)</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

When evaluating these results, it is important to keep in mind the small sample size: as previously stated, I have only collected data from season 7's Qualifying and City Finals competitions so far. Notably, this means that Isaac Caldiero and Geoff Britten's success on later stages is *not* included. With that said, I think the results are fairly reasonable but I am sure the formula will need to be edited as more data is collected.

### Going Forward

I would like to launch a website with a leaderboard and individual athlete profiles ahead of season 9. I have started working on it, but the project is still in the very early stages of development (a profile screenshot is below).

![ninjaref Profile](/img/profile-1.png){:class="img-responsive"}

There is also a lot of data to be collected. I would like to have seasons 4 through 8 done before season 9 starts. If you would like to contribute (or share any general thoughts), feel free to contact me <a href="mailto:joseph@jdkato.io">via email</a> or drop by the project's [Github repository](https://github.com/jdkato/ninjaref)!
