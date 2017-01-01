/* global $, Highcharts */
var course2Info = {
  'Houston Qualifying': {
    'obs': [
      'Quintuple Steps', 'Tilting Slider', 'Spinning Log', 'Cargo Crossing',
      'Swinging Spikes', 'Warped Wall'
    ],
    'fails': [3, 8, 6, 6, 15, 0],
    'ranges': [
            ['Quintuple Steps', 2.99, 35.66],
            ['T1', 3.23, 50.84],
            ['Tilting Slider', 7.33, 24.57],
            ['T2', 4.46, 38.56],
            ['Spinning Log', 1.07, 5.1],
            ['T3', 1.1, 36.56],
            ['Cargo Crossing', 24.71, 43.87],
            ['T4', 8.62, 35.53],
            ['Swinging Spikes', 18.71, 35.9],
            ['T5', 3.27, 32.39],
            ['Warped Wall', 4.27, 28.06]
    ],
    'averages': [
            ['Quintuple Steps', 8.59],
            ['T1', 11.34],
            ['Tilting Slider', 12.56],
            ['T2', 13.86],
            ['Spinning Log', 1.38],
            ['T3', 14.72],
            ['Cargo Crossing', 31.77],
            ['T4', 21.34],
            ['Swinging Spikes', 20.62],
            ['T5', 19.94],
            ['Warped Wall', 7.59]
    ],
    'finishers': 15,
    'time': 172.82,
    'point': 90.78
  },
  'Kansas City Qualifying': {
    'obs': [
      'Quintuple Steps', 'Big Dipper', 'Floating Tiles', 'Modified Ring Toss',
      'Bungee Road', 'Warped Wall'
    ],
    'fails': [1, 9, 2, 3, 5, 0],
    'ranges': [
            ['Quintuple Steps', 1.63, 22.82],
            ['T1', 3.77, 26.28],
            ['Big Dipper', 3.03, 11.93],
            ['T2', 3.44, 24.17],
            ['Floating Tiles', 2.14, 10.77],
            ['T3', 3.2, 27.36],
            ['Modified Ring Toss', 16.1, 58.06],
            ['T4', 1.9, 52.97],
            ['Bungee Road', 12.16, 38.04],
            ['T5', 2.1, 53.76],
            ['Warped Wall', 3.55, 14.65]
    ],
    'averages': [
            ['Quintuple Steps', 4.33],
            ['T1', 9.52],
            ['Big Dipper', 7.62],
            ['T2', 10.58],
            ['Floating Tiles', 5.77],
            ['T3', 14.19],
            ['Modified Ring Toss', 20.37],
            ['T4', 21.93],
            ['Bungee Road', 18.94],
            ['T5', 22.64],
            ['Warped Wall', 5.46]
    ],
    'finishers': 38,
    'time': 132.87,
    'point': 58.34
  },
  'Orlando Qualifying': {
    'obs': [
      'Quintuple Steps', 'Rolling Log', 'Paddle Boards', 'Tire Swing',
      'Double Tilt Ladder', 'Warped Wall'
    ],
    'fails': [0, 6, 6, 8, 7, 1],
    'ranges': [
            ['Quintuple Steps', 1.56, 13.07],
            ['T1', 5.94, 35.9],
            ['Rolling Log', 5.89, 14.37],
            ['T2', 8.93, 75.77],
            ['Paddle Boards', 1.4, 2.08],
            ['T3', 6.6, 57.03],
            ['Tire Swing', 11.77, 40.87],
            ['T4', 5.13, 74.03],
            ['Double Tilt Ladder', 19.53, 38.31],
            ['T5', 2.0, 60.16],
            ['Warped Wall', 3.52, 10.74]
    ],
    'averages': [
            ['Quintuple Steps', 4.92],
            ['T1', 15.37],
            ['Rolling Log', 8.54],
            ['T2', 23.66],
            ['Paddle Boards', 1.7],
            ['T3', 16.84],
            ['Tire Swing', 29.4],
            ['T4', 22.87],
            ['Double Tilt Ladder', 30.63],
            ['T5', 23.52],
            ['Warped Wall', 5.48]
    ],
    'finishers': 25,
    'time': 198.07,
    'point': 97.75
  },
  'Pittsburgh Qualifying': {
    'obs': [
      'Quintuple Steps', 'Log Grip', 'Snake Crossing', 'Wind Chimes',
      'Devil Steps', 'Warped Wall'
    ],
    'fails': [1, 5, 8, 2, 8, 1],
    'ranges': [
            ['Quintuple Steps', 2.46, 18.1],
            ['T1', 3.61, 27.03],
            ['Log Grip', 3.27, 6.46],
            ['T2', 1.68, 39.76],
            ['Snake Crossing', 11.42, 71.63],
            ['T3', 1.53, 71.03],
            ['Wind Chimes', 20.26, 77.1],
            ['T4', 6.04, 57.51],
            ['Devil Steps', 19.24, 52.23],
            ['T5', 1.93, 27.46],
            ['Warped Wall', 4.14, 35.67]
    ],
    'averages': [
            ['Quintuple Steps', 6.56],
            ['T1', 12.44],
            ['Log Grip', 4.2],
            ['T2', 12.9],
            ['Snake Crossing', 33.06],
            ['T3', 27.63],
            ['Wind Chimes', 30.79],
            ['T4', 21.1],
            ['Devil Steps', 34.1],
            ['T5', 8.71],
            ['Warped Wall', 5.96]
    ],
    'finishers': 22,
    'time': 211.64,
    'point': 82.71
  },
  'San Pedro Qualifying': {
    'obs': [
      'Quintuple Steps', 'Jump Hang', 'Log Runner', 'Monkey Pegs',
      'I-Beam Cross', 'Warped Wall'
    ],
    'fails': [3, 7, 7, 8, 16, 0],
    'ranges': [
            ['Quintuple Steps', 4.56, 12.53],
            ['T1', 6.7, 14.83],
            ['Jump Hang', 19.73, 45.76],
            ['T2', 9.11, 30.59],
            ['Log Runner', 1.48, 2.67],
            ['T3', 13.23, 35.83],
            ['Monkey Pegs', 31.74, 70.76],
            ['T4', 7.97, 77.94],
            ['I-Beam Cross', 40.03, 66.0],
            ['T5', 1.87, 44.23],
            ['Warped Wall', 4.17, 8.48]
    ],
    'averages': [
            ['Quintuple Steps', 7.26],
            ['T1', 10.96],
            ['Jump Hang', 28.87],
            ['T2', 14.63],
            ['Log Runner', 1.96],
            ['T3', 22.8],
            ['Monkey Pegs', 43.45],
            ['T4', 41.2],
            ['I-Beam Cross', 41.72],
            ['T5', 15.34],
            ['Warped Wall', 5.25]
    ],
    'finishers': 10,
    'time': 236.36,
    'point': 185.81
  },
  'Venice Qualifying': {
    'obs': [
      'Quintuple Steps', 'Mini Silk Slider', 'Tilting Table', 'Spin Cycle',
      'Hourglass Drop', 'Warped Wall'
    ],
    'fails': [0, 4, 1, 3, 25, 0],
    'ranges': [
            ['Quintuple Steps', 2.76, 26.43],
            ['T1', 2.44, 31.43],
            ['Mini Silk Slider', 1.96, 7.0],
            ['T2', 1.13, 22.7],
            ['Tilting Table', 1.09, 1.93],
            ['T3', 1.2, 52.2],
            ['Spin Cycle', 5.0, 26.6],
            ['T4', 3.34, 33.7],
            ['Hourglass Drop', 14.1, 35.27],
            ['T5', 4.2, 20.87],
            ['Warped Wall', 3.66, 4.64]
    ],
    'averages': [
            ['Quintuple Steps', 4.73],
            ['T1', 10.76],
            ['Mini Silk Slider', 3.06],
            ['T2', 9.84],
            ['Tilting Table', 1.33],
            ['T3', 18.23],
            ['Spin Cycle', 12.25],
            ['T4', 17.67],
            ['Hourglass Drop', 19.0],
            ['T5', 20.87],
            ['Warped Wall', 3.93]
    ],
    'finishers': 7,
    'time': 111.41,
    'point': 56.4
  },
  'Venice Finals': {
    'obs': [
      'Quintuple Steps', 'Mini Silk Slider', 'Tilting Table', 'Spin Cycle',
      'Hourglass Drop', 'Warped Wall', 'Salmon Ladder', 'Rumbling Dice',
      'Clear Climb', 'Invisible Ladder'
    ],
    'ranges': [
            ['Quintuple Steps', 2.66, 7.2],
            ['T1', 3.94, 14.89],
            ['Mini Silk Slider', 2.28, 3.34],
            ['T2', 1.0, 7.21],
            ['Tilting Table', 0.89, 2.41],
            ['T3', 1.21, 14.6],
            ['Spin Cycle', 4.87, 47.41],
            ['T4', 4.74, 25.53],
            ['Hourglass Drop', 12.93, 35.37],
            ['T5', 4.74, 24.63],
            ['Warped Wall', 3.2, 18.1],
            ['T6', 21.97, 77.06],
            ['Salmon Ladder', 11.66, 24.84],
            ['T7', 0, 0],
            ['Rumbling Dice', 20.3, 43.17],
            ['T8', 27.49, 85.36],
            ['Clear Climb', 19.44, 47.0],
            ['T9', 48.1, 112.53],
            ['Invisible Ladder', 28.06, 28.06]
    ],
    'averages': [
            ['Quintuple Steps', 4.58],
            ['T1', 7.17],
            ['Mini Silk Slider', 2.71],
            ['T2', 3.05],
            ['Tilting Table', 1.35],
            ['T3', 4.04],
            ['Spin Cycle', 18.41],
            ['T4', 14.33],
            ['Hourglass Drop', 24.79],
            ['T5', 10.76],
            ['Warped Wall', 4.13],
            ['T6', 36.53],
            ['Salmon Ladder', 15.47],
            ['T7', 0],
            ['Rumbling Dice', 38.54],
            ['T8', 45.34],
            ['Clear Climb', 32.17],
            ['T9', 78.57],
            ['Invisible Ladder', 28.06]
    ],
    'finishers': 1,
    'time': 366.69,
    'point': 366.69
  },
  'San Pedro Finals': {
    'obs': [
      'Quintuple Steps', 'Jump Hang', 'Log Runner', 'Monkey Pegs',
      'I-Beam Cross', 'Warped Wall', 'Salmon Ladder', 'Swinging Frames',
      'Globe Grasper', 'Invisible Ladder'
    ],
    'ranges': [
            ['Quintuple Steps', 4.53, 6.03],
            ['T1', 4.39, 13.7],
            ['Jump Hang', 18.13, 35.0],
            ['T2', 6.37, 30.86],
            ['Log Runner', 1.77, 2.49],
            ['T3', 12.54, 44.33],
            ['Monkey Pegs', 29.25, 54.29],
            ['T4', 5.8, 65.73],
            ['I-Beam Cross', 27.23, 47.1],
            ['T5', 2.82, 41.33],
            ['Warped Wall', 3.21, 70.33],
            ['T6', 10.77, 90.26],
            ['Salmon Ladder', 10.57, 33.39],
            ['T7', 0, 0],
            ['Swinging Frames', 22.03, 29.4],
            ['T8', 12.1, 89.8],
            ['Globe Grasper', 24.83, 37.66],
            ['T9', 48.56, 96.81],
            ['Invisible Ladder', 29.16, 29.16]
    ],
    'averages': [
            ['Quintuple Steps', 4.86],
            ['T1', 5.86],
            ['Jump Hang', 24.4],
            ['T2', 11.2],
            ['Log Runner', 2.13],
            ['T3', 21.63],
            ['Monkey Pegs', 42.78],
            ['T4', 34.52],
            ['I-Beam Cross', 40.4],
            ['T5', 25.73],
            ['Warped Wall', 4.83],
            ['T6', 55.16],
            ['Salmon Ladder', 19.34],
            ['T7', 0, 0],
            ['Swinging Frames', 25.43],
            ['T8', 60.7],
            ['Globe Grasper', 33.13],
            ['T9', 72.81],
            ['Invisible Ladder', 29.16]
    ],
    'finishers': 1,
    'time': 588.75,
    'point': 588.75
  },
  'Pittsburgh Finals': {
    'obs': [
      'Quintuple Steps', 'Log Grip', 'Snake Crossing', 'Wind Chimes',
      'Devil Steps', 'Warped Wall', 'Salmon Ladder', 'Floating Monkey Bars',
      'Doorknob Arch', 'Invisible Ladder'
    ],
    'ranges': [
            ['Quintuple Steps', 2.56, 7.2],
            ['T1', 3.54, 24.37],
            ['Log Grip', 4.0, 10.46],
            ['T2', 4.67, 34.2],
            ['Snake Crossing', 13.83, 44.94],
            ['T3', 5.64, 26.76],
            ['Wind Chimes', 17.48, 42.64],
            ['T4', 12.56, 45.1],
            ['Devil Steps', 21.2, 42.04],
            ['T5', 12.63, 29.84],
            ['Warped Wall', 3.14, 5.93],
            ['T6', 26.9, 58.64],
            ['Salmon Ladder', 11.03, 20.9],
            ['T7', 0, 0],
            ['Floating Monkey Bars', 19.8, 33.74],
            ['T8', 26.7, 55.73],
            ['Doorknob Arch', 17.93, 42.9],
            ['T9', 39.67, 63.64],
            ['Invisible Ladder', 15.23, 33.42]
    ],
    'averages': [
            ['Quintuple Steps', 4.61],
            ['T1', 12.13],
            ['Log Grip', 5.77],
            ['T2', 12.88],
            ['Snake Crossing', 32.03],
            ['T3', 15.99],
            ['Wind Chimes', 24.98],
            ['T4', 33.33],
            ['Devil Steps', 31.06],
            ['T5', 26.6],
            ['Warped Wall', 4.44],
            ['T6', 38.23],
            ['Salmon Ladder', 13.16],
            ['T7', 0, 0],
            ['Floating Monkey Bars', 24.82],
            ['T8', 43.81],
            ['Doorknob Arch', 23.6],
            ['T9', 52.23],
            ['Invisible Ladder', 24.33]
    ],
    'finishers': 2,
    'time': 426.87,
    'point': 404.81
  },
  'Orlando Finals': {
    'obs': [
      'Quintuple Steps', 'Rolling Log', 'Paddle Boards', 'Tire Swing',
      'Double Tilt Ladder', 'Warped Wall', 'Salmon Ladder', 'Cannonball Alley',
      'Double Helix', 'Invisible Ladder'
    ],
    'ranges': [
            ['Quintuple Steps', 1.59, 8.99],
            ['T1', 3.43, 26.67],
            ['Rolling Log', 9.0, 19.79],
            ['T2', 15.07, 36.67],
            ['Paddle Boards', 1.33, 15.75],
            ['T3', 1.4, 51.27],
            ['Tire Swing', 7.3, 24.2],
            ['T4', 5.27, 39.16],
            ['Double Tilt Ladder', 19.1, 36.23],
            ['T5', 3.94, 43.03],
            ['Warped Wall', 2.77, 6.36],
            ['T6', 15.44, 78.03],
            ['Salmon Ladder', 12.8, 25.46],
            ['T7', 0, 0],
            ['Cannonball Alley', 6.7, 15.74],
            ['T8', 25.23, 59.29],
            ['Double Helix', 29.77, 39.56],
            ['T9', 36.44, 88.2],
            ['Invisible Ladder', 21.2, 72.18]
    ],
    'averages': [
            ['Quintuple Steps', 4.43],
            ['T1', 7.82],
            ['Rolling Log', 14.5],
            ['T2', 28.36],
            ['Paddle Boards', 1.63],
            ['T3', 19.26],
            ['Tire Swing', 15.61],
            ['T4', 25.86],
            ['Double Tilt Ladder', 24.43],
            ['T5', 18.93],
            ['Warped Wall', 3.63],
            ['T6', 51.1],
            ['Salmon Ladder', 19.03],
            ['T7', 0, 0],
            ['Cannonball Alley', 9.69],
            ['T8', 41.2],
            ['Double Helix', 34.9],
            ['T9', 49.9],
            ['Invisible Ladder', 47.03]
    ],
    'finishers': 2,
    'time': 366.29,
    'point': 330.5
  },
  'Kansas City Finals': {
    'obs': [
      'Quintuple Steps', 'Big Dipper', 'Floating Tiles', 'Modified Ring Toss',
      'Bungee Road', 'Warped Wall', 'Salmon Ladder', 'Flying Shelf Grab',
      'Body Prop', 'Invisible Ladder'
    ],
    'ranges': [
            ['Quintuple Steps', 2.86, 6.89],
            ['T1', 5.96, 12.43],
            ['Big Dipper', 5.1, 10.06],
            ['T2', 5.84, 29.13],
            ['Floating Tiles', 2.24, 2.97],
            ['T3', 5.79, 29.66],
            ['Modified Ring Toss', 15.17, 32.7],
            ['T4', 7.44, 34.83],
            ['Bungee Road', 15.7, 28.0],
            ['T5', 13.77, 44.27],
            ['Warped Wall', 3.76, 33.87],
            ['T6', 13.1, 64.3],
            ['Salmon Ladder', 9.3, 21.7],
            ['T7', 0, 0],
            ['Flying Shelf Grab', 14.87, 26.87],
            ['T8', 14.0, 75.69],
            ['Body Prop', 36.77, 121.23],
            ['T9', 34.53, 47.0],
            ['Invisible Ladder', 12.48, 19.68]
    ],
    'averages': [
            ['Quintuple Steps', 4.76],
            ['T1', 9.31],
            ['Big Dipper', 6.81],
            ['T2', 11.78],
            ['Floating Tiles', 2.58],
            ['T3', 11.82],
            ['Modified Ring Toss', 16.68],
            ['T4', 17.13],
            ['Bungee Road', 21.22],
            ['T5', 20.58],
            ['Warped Wall', 4.7],
            ['T6', 27.13],
            ['Salmon Ladder', 14.74],
            ['T7', 0, 0],
            ['Flying Shelf Grab', 17.7],
            ['T8', 28.71],
            ['Body Prop', 38.84],
            ['T9', 34.53],
            ['Invisible Ladder', 15.21]
    ],
    'finishers': 3,
    'time': 412.60,
    'point': 338.44
  },
  'Houston Finals': {
    'obs': [
      'Quintuple Steps', 'Tilting Slider', 'Spinning Log', 'Cargo Crossing',
      'Swinging Spikes', 'Warped Wall', 'Salmon Ladder', 'Walking Bar',
      'Crazy Cliffhanger', 'Invisible Ladder'
    ],
    'ranges': [
            ['Quintuple Steps', 2.43, 13.33],
            ['T1', 3.1, 23.3],
            ['Tilting Slider', 7.47, 20.8],
            ['T2', 1.1, 33.9],
            ['Spinning Log', 1.0, 10.29],
            ['T3', 1.37, 42.0],
            ['Cargo Crossing', 18.87, 50.77],
            ['T4', 10.89, 49.46],
            ['Swinging Spikes', 10.81, 35.23],
            ['T5', 3.77, 84.44],
            ['Warped Wall', 3.57, 52.27],
            ['T6', 16.46, 97.03],
            ['Salmon Ladder', 10.27, 33.91],
            ['T7', 0, 0],
            ['Walking Bar', 32.54, 67.51],
            ['T8', 38.72, 101.82],
            ['Crazy Cliffhanger', 22.17, 23.07],
            ['T9', 17.1, 63.46],
            ['Invisible Ladder', 14.83, 15.55]
    ],
    'averages': [
            ['Quintuple Steps', 4.78],
            ['T1', 7.63],
            ['Tilting Slider', 11.08],
            ['T2', 6.98],
            ['Spinning Log', 1.16],
            ['T3', 15.4],
            ['Cargo Crossing', 32.27],
            ['T4', 31.51],
            ['Swinging Spikes', 17.73],
            ['T5', 20.81],
            ['Warped Wall', 4.44],
            ['T6', 39.73],
            ['Salmon Ladder', 18.17],
            ['T7', 0, 0],
            ['Walking Bar', 41.97],
            ['T8', 71.06],
            ['Crazy Cliffhanger', 22.62],
            ['T9', 40.28],
            ['Invisible Ladder', 15.19]
    ],
    'finishers': 2,
    'time': 450.04,
    'point': 376.68
  }
}

var options = {
  credits: false,
  title: {
    text: 'Houston Qualifying'
  },

  subtitle: {
    text: 'Course Flow'
  },

  xAxis: {
  },

  yAxis: {
    title: {
      text: 'Seconds'
    },
    min: 0
  },

  tooltip: {
    crosshairs: true,
    shared: true,
    valueSuffix: 's'
  },

  legend: {
  },

  series: [{
    name: 'Median',
    showInLegend: false,
    data: course2Info['Houston Qualifying'].averages,
    zIndex: 1,
    marker: {
      fillColor: 'white',
      lineWidth: 2,
      lineColor: Highcharts.getOptions().colors[0]
    }
  }, {
    name: 'Range',
    data: course2Info['Houston Qualifying'].ranges,
    type: 'arearange',
    lineWidth: 0,
    linkedTo: ':previous',
    color: Highcharts.getOptions().colors[0],
    fillOpacity: 0.3,
    zIndex: 0
  }]
}
var qFails = [
  {
    name: 'Houston',
    data: [3, 8, 6, 6, 15, 0]
  }, {
    name: 'Kansas City',
    data: [1, 9, 2, 3, 5, 0]
  }, {
    name: 'Orlando',
    data: [0, 6, 6, 8, 7, 1]
  }, {
    name: 'Pittsburgh',
    data: [1, 5, 8, 2, 8, 1]
  },
  {
    name: 'San Pedro',
    data: [3, 7, 7, 8, 16, 0]
  },
  {
    name: 'Venice',
    data: [1, 9, 5, 4, 26, 0]
  }
]
var fFails = [
  {
    name: 'Houston',
    data: [0, 0, 0, 0, 6, 0, 3, 12, 2, 0]
  }, {
    name: 'Kansas City',
    data: [0, 1, 2, 1, 4, 0, 3, 4, 12, 0]
  }, {
    name: 'Orlando',
    data: [0, 2, 0, 1, 2, 0, 2, 10, 2, 3]
  }, {
    name: 'Pittsburgh',
    data: [1, 0, 5, 0, 2, 0, 2, 8, 4, 10]
  },
  {
    name: 'San Pedro',
    data: [0, 1, 0, 0, 5, 2, 5, 2, 4, 2]
  },
  {
    name: 'Venice',
    data: [0, 3, 0, 4, 11, 0, 1, 3, 3, 2]
  }
]
var options2 = {
  title: {
    text: 'Failures by Obstacle',
    x: -20 // center
  },
  subtitle: {
    text: 'Click on a city\'s name to filter the chart.',
    x: -20
  },
  xAxis: {
    categories: ['1', '2', '3', '4', '5', '6'],
    title: {
      text: 'Obstacle'
    }
  },
  yAxis: {
    allowDecimals: false,
    title: {
      text: 'Number of Failures'
    },
    min: 0,
    plotLines: [{
      value: 0,
      width: 1,
      color: '#808080'
    }]
  },
  tooltip: {
    crosshairs: true,
    valueSuffix: ' failures',
    formatter: function () {
      var name = this.series.name + ' ' + failsType
      var obs = course2Info[name].obs[this.x - 1]
      return name + '<br/><b>' + obs + '</b>: <b>' + this.y + '</b> failures'
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
  },
  series: qFails
}
var chart = null
var failsChart = null
var run2Info = {
  'Venice Qualifying': {
    '11': 'Kevin Bull',
    '7.71': 'Alan Connealy (2nd)',
    '7.29': 'Nicholas Coolridge (3rd)',
    '7.77': 'Alvaro Campos (4th)',
    '6.4': 'Grant McCartney (6th)'
  },
  'San Pedro Qualifying': {
    '11': 'Robin Pietschmann',
    '8.94': 'Seth Caskey (3rd)',
    '9.73': 'Ahmed Toure (4th)',
    '7.41': 'Ryan Stratis (9th)',
    '7.84': 'Dustin McKinney (10th)'
  },
  'Pittsburgh Qualifying': {
    '11': 'Elet Hall',
    '8.74': 'Joe Moravsky (2nd)',
    '7.5': 'Luciano Acuna Jr. (6th)',
    '5.34': 'P.J. Granger (11th)'
  },
  'Orlando Qualifying': {
    '11': 'Jon Alexis Jr.',
    '7.72': 'Flip Rodriguez (3rd)',
    '8.1': 'Travis Rosen (4th)',
    '7.62': 'Drew Drechsel (7th)'
  },
  'Kansas City Qualifying': {
    '11': 'Lorin Ball',
    '9.62': 'Paul Kasemir (2nd)',
    '8.08': 'Lance Pekus (4th)',
    '6.91': 'Isaac Caldiero (11th)'
  },
  'Houston Qualifying': {
    '11': 'Daniel Gil (1st)',
    '8.97': 'Brent Steffensen (2nd)'
  }
}
$(function () {
  chart = Highcharts.chart('container', options)
  failsChart = Highcharts.chart('fails', options2)
})

var courseType = 'Qualifying'
var courseName = 'Houston'
$('#course-type').change(function () {
  courseType = $('input[name=options]:checked', '#course-type').val()
  var name = courseName + ' ' + courseType
  chart.destroy()
  options.title.text = name
  options.series[0].data = course2Info[name].averages
  options.series[1].data = course2Info[name].ranges
  $('#finishers').html(course2Info[name].finishers)
  $('#time').html(course2Info[name].time)
  $('#point').html(course2Info[name].point)
  chart = new Highcharts.Chart('container', options)
})

$('#city li a').click(function (e) {
  courseName = $(this).text()
  var name = courseName + ' ' + courseType
  chart.destroy()
  options.title.text = name
  options.series[0].data = course2Info[name].averages
  options.series[1].data = course2Info[name].ranges
  $('#finishers').html(course2Info[name].finishers)
  $('#time').html(course2Info[name].time)
  $('#point').html(course2Info[name].point)
  chart = new Highcharts.Chart('container', options)
})

var failsType = 'Qualifying'
$('#course-type2').change(function () {
  failsType = $('input[name=options]:checked', '#course-type2').val()
  failsChart.destroy()
  if (failsType === 'Finals') {
    options2.xAxis.categories = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    options2.series = fFails
    failsChart = new Highcharts.Chart('fails', options2)
  } else {
    options2.xAxis.categories = ['1', '2', '3', '4', '5', '6']
    options2.series = qFails
    failsChart = new Highcharts.Chart('fails', options2)
  }
})
