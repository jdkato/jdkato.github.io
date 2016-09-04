var langData = {
  labels: [
    'AppleScript', 'C', 'C#', 'C++', 'D', 'Go', 'Haskell', 'Java',
    'JavaScript', 'Julia', 'Lua', 'OCaml', 'Objective-C', 'Perl', 'PHP',
    'Python', 'R', 'Ruby', 'Rust', 'Scala', 'Swift'
  ],
  datasets: [{
    type: 'bar',
    label: 'Base Project',
    data: [
      100, 97.4, 99.4, 99.6, 99.4, 99.9, 100, 100, 98.7, 98.9, 100, 99.4,
      99.2, 100, 100, 98.5, 98.4, 98.7, 100, 100, 100
    ],
    backgroundColor: 'rgba(92, 184, 92, 0.5)',
    borderColor: 'rgba(92, 184, 92, 1)',
    borderWidth: 1
  }, {
    type: 'line',
    label: 'Random Project',
    data: [
      96.6, 92.9, 95.6, 96.6, 96.7, 100, 98.5, 96.6, 100, 99.3, 99.5, 92.2,
      100, 95.8, 98.6, 98.9, 96.2, 99.2, 100, 100, 97.6
    ],
    fill: false,
    backgroundColor: 'rgba(29, 127, 179, 0.8)',
    borderColor: 'rgba(29, 127, 179, 1)'
  }]
}

var lang2Stats = {
  'AppleScript': [
    'LaunchBar-Scripts', 'https://github.com/Zettt/LaunchBar-Scripts',
    '37 / 37', 'tree-tools', 'https://github.com/RobTrew/tree-tools', '84 / 87'
  ],
  'C': [
    'Git', 'https://github.com/git/git', '371 / 381', 'libuv',
    'https://github.com/libuv/libuv', '208 / 224'
  ],
  'C#': [
    'Nancy', 'https://github.com/NancyFx/Nancy', '956 / 962', 'RocketBot',
    'https://github.com/TheUnnameOrganization/RocketBot', '153 / 160'
  ],
  'C++': [
    'Electron', 'https://github.com/electron/electron', '231 / 232',
    'TensorFlow', '1032 / 1068'
  ],
  'D': [
    'Phobos', 'https://github.com/dlang/phobos', '171 / 172', 'Terminix',
    'https://github.com/gnunn1/terminix', '29 / 30'
  ],
  'Go': [
    'Docker', 'https://github.com/docker/docker', '2740 / 2743', 'Caddy',
    'https://github.com/mholt/caddy', '180 / 180'
  ],
  'Haskell': [
    'Cabal', 'https://github.com/haskell/cabal', '455 / 456', 'Pandoc',
    'https://github.com/jgm/pandoc', '133 / 135'
  ],
  'Java': [
    'Spring', 'https://github.com/spring-projects/spring-framework',
    '1719 / 1719', 'okHttp', 'https://github.com/square/okhttp', '265 / 266'
  ],
  'JavaScript': [
    'Vue', 'https://github.com/vuejs/vue', '154 / 156', 'Open MCT',
    'https://github.com/nasa/openmct', '839 / 839'
  ],
  'Julia': [
    'Bio.jl', 'https://github.com/BioJulia/Bio.jl', '94 / 95', 'Gadfly.jl',
    'https://github.com/dcjones/Gadfly.jl', '147 / 148'
  ],
  'Lua': [
    'Kong', 'https://github.com/Mashape/kong', '306 / 306', 'KOReader',
    'https://github.com/koreader/koreader', '213 / 214'
  ],
  'OCaml': [
    'Coq', 'https://github.com/coq/coq', '822 / 827', 'BuckleScript',
    'https://github.com/bloomberg/bucklescript', '747 / 810'
  ],
  'Objective-C': [
    'Adium', 'https://github.com/adium/adium', '701 / 707', 'AFNetworking',
    'https://github.com/AFNetworking/AFNetworking', '46 / 46'
  ],
  'Perl': [
    'Mojo', 'https://github.com/kraih/mojo', '134 / 134', 'OTRS',
    'https://github.com/OTRS/otrs', '1214 / 1231'
  ],
  'PHP': [
    'WordPress', 'https://github.com/WordPress/WordPress', '741 / 741',
    'Laravel', 'https://github.com/laravel/laravel', '46 / 48'
  ],
  'Python': [
    'Django', 'https://github.com/django/django', '1817 / 1843',
    'PokemonGo-Bot', 'https://github.com/PokemonGoF/PokemonGo-Bot', '87 / 88'
  ],
  'R': [
    'Shiny', 'https://github.com/rstudio/shiny', '121 / 123', 'forcats',
    'https://github.com/hadley/forcats', '25 / 26'
  ],
  'Ruby': [
    'Ruby on Rails', 'https://github.com/rails/rails', '2096 / 2123',
    'fastlane', 'https://github.com/fastlane/fastlane', '745 / 751'
  ],
  'Rust': [
    'Cargo', 'https://github.com/rust-lang/cargo', '164 / 164', 'futures-rs',
    'https://github.com/alexcrichton/futures-rs', '62 / 62'
  ],
  'Scala': [
    'Squbs', 'https://github.com/paypal/squbs', '297 / 297', 'Play Framework',
    'https://github.com/playframework/playframework', '656 / 656'
  ],
  'Swift': [
    'NMessenger', 'https://github.com/eBay/NMessenger', '51 / 51', 'Alamofire',
    'https://github.com/Alamofire/Alamofire', '40 / 41'
  ]
}

var summary = "1817 / 1843 total Python files in the base project (Django) were correctly identified. In the random project (PokemonGo-Bot), 87 / 88 files were correctly identified."
var ctx = document.getElementById('base-acc-chart').getContext('2d')
var accuracyChart = new Chart(ctx, {
  type: 'bar',
  data: langData,
  options: {
    tooltips: {
      enabled: false
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Percent (%)'
        }
      }]
    },
    onClick: function (e, a, b) {
      var lang = langData.labels[a[0]._index]
      var stats = lang2Stats[lang]
      var base = '<a href="' + stats[1] + '">' + stats[0] + '</a>'
      var random = '<a href="' + stats[4] + '">' + stats[3] + '</a>'
      var summary = stats[2] + ' total ' + lang + ' files in the base project (' +
      base + ') were correctly identified. In the random project (' + random +
      '), ' + stats[5] + ' files were correctly identified.'
      $('#summary').html(summary)
      $('#modal-lang').html(lang)
      $('#myModal').modal()
    }
  }
})
