var ninja2Run = {
  'Kevin Bull': [2.73, 9.82, 12.23, 13.3, 14.59, 15.73, 24.66, 28.16, 47.07, 52.63, 56.4],
  'Alan Connealy': [3.03, 8.33, 10.86, 14.2, 15.36, 21.16, 40.26, 62.82, 80.46, 84.66, 88.32],
  'Kyle Cochran': [4.48, 11.28],
  'Nick Hanson': [4.59, 8.3, 11.16, 19.07, 20.66, 55.13, 81.73, 99.4],
  'Nicholas Coolridge': [4.23, 15.16, 18.2, 25.16, 26.59, 31.76, 52.03, 66.82, 80.92, 85.56, 89.49],
  'John Ryan': [7.4, 18.16, 21.33, 39.82],
  'Jessie Graff': [5.03, 18.4, 21.46, 38.99, 40.92, 65.59, 78.76, 100.07],
  'Grant McCartney': [4.66, 17.56, 20.4, 27.99, 29.36, 47.69, 69.33, 103.03, 138.3, 150.89, 155.53],
  'Rob Moravsky': [4.73, 12.2],
  'Alvaro Campos': [4.79, 10.3, 12.59, 22.43, 23.63, 31.4, 42.36, 60.46, 81.23, 102.1, 106.32],
  'David Campbell': [2.92, 9.4, 11.36, 13.03, 14.23, 17.33, 22.5, 27.36],
  'Arnold Hernandez': [5.03, 11.5, 15.36, 31.63, 33.26, 52.33, 78.59, 91.89],
  'Shannon Silver': [5.33, 30.79, 34.03, 56.73, 57.82, 85.23],
  'Brian Kretsch': [3.86, 13.07, 15.73, 21.3, 22.46, 74.66, 82.82, 115.69],
  'Kevin Clearly': [5.53, 29.03],
  'April Gould': [26.43, 57.86],
  'Jeff Clement': [12.8, 15.93, 27.06, 28.36, 45.03, 50.03],
  'Jackson Meyer': [9.46, 21.1, 24.76, 43.13, 44.63, 62.76, 74.1, 90.73],
  'Brendon Ayanbadejo': [2.91, 15.27, 19.22, 29.07, 30.52, 28.31, 58.83]
}
var ninjas = Object.keys(ninja2Run)
var chart = null
var options = {
  title: {
    text: 'Venice Qualifying'
  },

  subtitle: {
    text: 'Season 7'
  },

  xAxis: {
    tickInterval: 1,
    tickWidth: 0,
    categories: ['Quintuple Steps', 'T1', 'Mini Slik Slider', 'T2', 'Tilting Table', 'T3', 'Spin Cycle', 'T4', 'Hourglass Drop', 'T5', 'Total'],
    labels: {
      align: 'left'
    }
  },

  yAxis: [{ // left y axis
    title: {
      text: 'seconds'
    },
    labels: {
      align: 'left',
      x: 3,
      y: 16,
      format: '{value:.,0f}'
    },
    showFirstLabel: false
  }],

  legend: {
    align: 'left',
    verticalAlign: 'top',
    y: 20,
    floating: true,
    borderWidth: 0
  },

  tooltip: {
    shared: true,
    crosshairs: true
  },

  plotOptions: {
    series: {
      marker: {
        lineWidth: 1
      }
    }
  },

  series: [{
    name: 'Kevin Bull',
    data: [2.76, 5.20, 12.20, 13.33, 14.46, 15.66, 24.69, 28.03, 47.03, 52.53, 56.4]
  }, {
    name: 'Alan Connealy',
    data: [3.03, 8.33, 10.86, 14.2, 15.36, 21.16, 40.26, 62.82, 80.46, 84.66, 88.32]
  }]
}

$(function () {
  $('#comp1').typeahead({source: ninjas})
  $('#comp2').typeahead({source: ninjas})
  chart = new Highcharts.Chart('container', options)
})

$('#comp1').change(function () {
  var ninja = $('#comp1').val()
  if (ninja in ninja2Run) {
    chart.destroy()
    options.series[0].name = ninja
    options.series[0].data = ninja2Run[ninja]
    chart = new Highcharts.Chart('container', options)
  }
})

$('#comp2').change(function () {
  var ninja = $('#comp2').val()
  if (ninja in ninja2Run) {
    chart.destroy()
    options.series[1].name = ninja
    options.series[1].data = ninja2Run[ninja]
    chart = new Highcharts.Chart('container', options)
  }
})
