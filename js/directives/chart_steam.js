/**
 * Created by JeremiahYan on 2017/1/8.
 */
mainApp.directive('chartSteam', function () {
    return {
        restrict: 'E',
        templateUrl: "directives/chart_steam.html",
        controller: "ChartSteamController",
        controllerAs: "chartSteam"
    };
}).controller("ChartSteamController", function ($rootScope, $scope, $http) {
    var bChart = this;
    bChart.range = RUNTIME_RANGE_DEFAULT;
    var domId = "chart_steam";
    var dataField = "steams";

    var pids = {
        1001: "temperature",
        1002: "pressure",
        1003: "flow"
    };

    var keys = [];
    for (var i = 0; i < Object.keys(pids).length; i++) {
        var k = Object.keys(pids)[i];
        keys.push(parseInt(k));
    }

//  $rootScope.$watch('boilerRuntime', function () {
//      if (bChart.range === RUNTIME_RANGE_DEFAULT) {
//          bChart.refreshChart();
//      }
//  });
//
//  $scope.$watch(dataField, function () {
//      // console.error("$scope.$watch('datasource', function ()", $scope.datasource);
//      if (!$scope[dataField]) {
//          console.warn("There is no $scope(" + dataField + ")!!");
//          return;
//      }
//
//      var chartData = [];
//      for (var i = 0; i < Object.keys(pids).length; i++) {
//          var id = Object.keys(pids)[i];
//          var field = pids[id];
//          if (!$scope[dataField] || !$scope[dataField][id]) {
//              break;
//          }
//          var rtms = $scope[dataField][id];
//          if (!rtms) {
//              continue;
//          }
//          for (var j = 0; j < rtms.length; j++) {
//              var r = rtms[j];
//              var d = {};
//              if (j < chartData.length) {
//                  d = chartData[chartData.length - 1 - j];
//              } else {
//                  d = {};
//                  d.num = j;
//                  d.date = r.CreatedDate;
//                  d[field] = 0;
//              }
//
//              d[field] = r.Value;
//
//              if (j >= chartData.length) {
//                  chartData.unshift(d);
//              }
//          }
//      }
//
//      console.info("ChartData:", chartData);
//
//      for (var i = 0; i < bChart.chart.graphs.length; i++) {
//          var g = bChart.chart.graphs[i];
//          if (chartData.length > 160) {
//              g.bullet = "none";
//          } else {
//              g.bullet = "round";
//          }
//      }
//
//      bChart.chart.dataProvider = chartData;
//      bChart.chart.write(domId);
//      bChart.chart.validateData();
//  });

    bChart.initChart = function () {
        var chart = new AmCharts.AmSerialChart();
        chart.fontSize = 11;
        chart.theme = AmCharts.themes.light;
        chart.color = "#6c7b88";
        chart.language = "zh";

        chart.marginTop = 8;
        chart.marginBottom = 0;
        chart.marginLeft = 0;
        chart.marginRight = 0;

        chart.fontFamily = "Open Sans";
        chart.dataDateFormat = 'YYYY-MM-DD HH:NN:SS';

        // chart.addClassNames = true;
        chart.startDuration = 0;

        chart.categoryField = "date";

        var categoryAxis = new AmCharts.CategoryAxis();
        categoryAxis.minPeriod = "mm";
        categoryAxis.parseDates = true;
        categoryAxis.equalSpacing = true;
        categoryAxis.axisAlpha = 0.2;
        categoryAxis.gridAlpha = 0.04;


        chart.valueAxes = [{
            id: "a1",
            //title: "Test",
            position: "left",
            gridAlpha: 0,
            axisAlpha: 0.2,
            unit: "℃"
        }, 
        ];

        var graphFlow = new AmCharts.AmGraph();		
		chart.graphs = [{
	        id: "g1",
	        valueField: "value",
	        title: "蒸汽温度",
	        type: "smoothedLine",
	        valueAxis: "a1",
	        lineColor: "#89c4f4",
	        lineThickness: 1,        
	        legendValueText: "[[value]] ℃",
	        bullet: "round",
//	      	bulletColor: "#b0de09",
//	      	bulletBorderColor: "#02617a",
	        bulletSize: 2,
//      	fillAlphas: 0.4,        
	        balloonText: "温度:[[value]] ℃",
//      	legendPeriodValueText: "总计: [[value]]",        
	        labelPosition: "right",
	    }];
		
		

        chart.chartCursor = {
            //zoomable: false,
            bulletsEnabled: true,
            bulletSize: 6,
            categoryBalloonDateFormat: "MMM DD JJ:NN",
            cursorAlpha: 0,
            categoryBalloonColor: "#e26a6a",
            categoryBalloonAlpha: 0.8,
            fullWidth: true,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha:0.2,
            //valueBalloonsEnabled: false
            };
            chart.dataProvider = [{
            	"date": "2012-07-29 13:50",
            	"value": 15
            }, {
            	"date": "2012-07-30 13:50",
            	"value": 16
            }, {
            	"date": "2012-07-31 13:50",
            	"value": 18
            }, {
            	"date": "2012-08-01 13:50",
            	"value": 13
            }, {
            	"date": "2012-08-02",
            	"value": 22
            }, {
            	"date": "2012-08-03",
            	"value": 23
            }, {
            	"date": "2012-08-04",
            	"value": 20
            }, {
            	"date": "2012-08-05",
            	"value": 17
            }, {
            	"date": "2012-08-06",
            	"value": 16
            }, {
            	"date": "2012-08-07",
            	"value": 18
            }, {
            	"date": "2012-08-08",
            	"value": 21
            }, {
            	"date": "2012-08-09",
            	"value": 26
            }, {
            	"date": "2012-08-10",
            	"value": 24
            }, {
            	"date": "2012-08-11",
            	"value": 29
            }, {
            	"date": "2012-08-12",
            	"value": 32
            }, {
            	"date": "2012-08-13",
            	"value": 18
            }, {
            	"date": "2012-08-14",
            	"value": 24
            }, {
            	"date": "2012-08-15",
            	"value": 22
            }, {
            	"date": "2012-08-16",
            	"value": 18
            }, {
            	"date": "2012-08-17",
            	"value": 19
            }, {
            	"date": "2012-08-18",
            	"value": 14
            }, {
            	"date": "2012-08-19",
            	"value": 15
            }, {
            	"date": "2012-08-20",
            	"value": 12
            }, {
            	"date": "2012-08-21",
            	"value": 8
            }, {
            	"date": "2012-08-22",
            	"value": 9
            }, {
            	"date": "2012-08-23",
            	"value": 8
            }, {
            	"date": "2012-08-24",
            	"value": 7
            }, {
            	"date": "2012-08-25",
            	"value": 5
            }, {
            	"date": "2012-08-26",
            	"value": 11
            }, {
            	"date": "2012-08-27",
            	"value": 13
            }, {
            	"date": "2012-08-28",
            	"value": 18
            }, {
            	"date": "2012-08-29",
            	"value": 20
            }, {
            	"date": "2012-08-30",
            	"value": 29
            }, {
            	"date": "2012-08-31",
            	"value": 33
            }, {
            	"date": "2012-09-01",
            	"value": 42
            }, {
            	"date": "2012-09-02",
            	"value": 35
            }, {
            	"date": "2012-09-03",
            	"value": 31
            }, {
            	"date": "2012-09-04",
            	"value": 47
            }, {
            	"date": "2012-09-05",
            	"value": 52
            }, {
            	"date": "2012-09-06",
            	"value": 46
            }, {
            	"date": "2012-09-07",
            	"value": 41
            }, {
            	"date": "2012-09-08",
            	"value": 43
            }, {
            	"date": "2012-09-09",
            	"value": 40
            }, {
            	"date": "2012-09-10",
            	"value": 39
            }, {
            	"date": "2012-09-11",
            	"value": 34
            }, {
            	"date": "2012-09-12",
            	"value": 29
            }, {
            	"date": "2012-09-19",
            	"value": 55
            }]        
        chart.categoryAxis = categoryAxis;

        bChart.chart = chart;
        
       	chart.write(domId);
        chart.validateData();
        
        
        
        
    };

//  bChart.refreshChart = function (range) {
//      // console.error("initChartSteamAm", $rootScope.boilerRuntime);
//      if ((!range || range === RUNTIME_RANGE_DEFAULT) && !$rootScope.boilerRuntime) {
//          console.warn("ChartSteamAm BoilerRuntimeData IS NULL!");
//          return;
//      }
//      if (typeof(AmCharts) === 'undefined' || $('#' + domId).size() === 0) {
//          console.warn("There IS NO #chart_steam");
//          return;
//      }
//
//      var since;
//
//      if (bChart.range === range && range != RUNTIME_RANGE_DEFAULT) {
//          return;
//      }
//
//      bChart.range = range;
//      switch (range) {
//          case RUNTIME_RANGE_TODAY:
//          case RUNTIME_RANGE_THERE_DAY:
//          case RUNTIME_RANGE_WEEK:
//              var postData = {
//                  uid: $rootScope.boilerRuntime.Uid,
//                  runtimeQueue: keys,
//                  range: range
//              };
//              if (since && typeof since === 'object') {
//                  postData.since = since;
//              }
//              Ladda.create(document.getElementById('chartSteam' + range)).start();
//              $http.post('/boiler_runtime_list/', postData).then(function (res) {
//                  console.warn("Ranged:", range, "Runtime Resp:", res);
//
//                  var datasource = { Uid: $rootScope.boilerRuntime.Uid };
//
//                  for (var i = 0; i < res.data.Parameters.length; i++) {
//                      var param = res.data.Parameters[i];
//                      var pid = param.Id;
//
//                      datasource[pid] = res.data.Runtimes[i];
//                  }
//
//                  $scope[dataField] = datasource;
//                  Ladda.create(document.getElementById('chartSteam' + range)).stop();
//              });
//              break;
//          case RUNTIME_RANGE_DEFAULT:
//          default:
//              $scope[dataField] = $rootScope.boilerRuntime;
//              break;
//      }
//  };

    bChart.initChart();
});

const RUNTIME_RANGE_DEFAULT = 0;
const RUNTIME_RANGE_TODAY = 1;
const RUNTIME_RANGE_THERE_DAY = 2;
const RUNTIME_RANGE_WEEK = 3;
const RUNTIME_RANGE_CUSTOM = 4;












//mainApp.directive('newfile', function () {
//  return {
//      restrict: 'E',
//      templateUrl: "directives/new_file.html",
//      controller: "newfileController",
//      controllerAs: "chartnew"
//  };
//})




