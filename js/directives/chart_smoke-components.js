/**
 * Created by JeremiahYan on 2017/1/8.
 */

mainApp.directive('chartSmokeComponents', function ($rootScope) {
    return {
        restrict: 'E',
        templateUrl: "directives/chart_smoke-components.html",
        controller: "ChartSmokeComponentController",
        controllerAs: "chartSmokeComp"
    };
}).controller("ChartSmokeComponentController", function ($rootScope, $scope, $http) {
    var bChart = this;
    bChart.range = RUNTIME_RANGE_DEFAULT;
    var domId = "chart_smoke-components";
    var dataField = "components";

    var pids = {
        1016: "o2",
        1017: "co",
        1018: "co2",
        1019: "nox"
    };

    var keys = [];
    for (var i = 0; i < Object.keys(pids).length; i++) {
        var k = Object.keys(pids)[i];
        keys.push(parseInt(k));
    }

    $rootScope.$watch('boilerRuntime', function () {
        if (bChart.range === RUNTIME_RANGE_DEFAULT) {
            bChart.refreshChart();
        }
    });

    $scope.$watch(dataField, function () {
        console.warn("components $scope.$watch(" + dataField + ")");
        if (!$scope[dataField]) {
            console.warn("There is no $scope.components!!");
            return;
        }

        var chartData = [];
        for (var i = 0; i < Object.keys(pids).length; i++) {
            var id = Object.keys(pids)[i];
            var field = pids[id];
            var rtms = $scope[dataField][id];
            if (!rtms) {
                continue;
            }
            for (var j = 0; j < rtms.length; j++) {
                var r = rtms[j];
                var d = {};
                if (j < chartData.length) {
                    d = chartData[chartData.length - 1 - j];
                } else {
                    d = {};
                    d.num = j;
                    d.date = r.CreatedDate;
                    d[field] = 0;
                }

                d[field] = r.Value;

                if (j >= chartData.length) {
                    chartData.unshift(d);
                }
            }
        }

        console.info("ChartData:", chartData);

        for (var i = 0; i < bChart.chart.graphs.length; i++) {
            var g = bChart.chart.graphs[i];
            if (chartData.length > 160) {
                g.bullet = "none";
            } else {
                g.bullet = "round";
            }
        }

        bChart.chart.dataProvider = chartData;
        bChart.chart.write(domId);
        bChart.chart.validateData();
    });

    bChart.initChart = function () {
        AmCharts.theme = AmCharts.themes.light;
        var chart = new AmCharts.AmSerialChart();
        chart.fontSize = 11;
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
            gridAlpha: 0.04,
            axisAlpha: 0.2,
            unit: "%",
            stackType: "regular"
        }];

        chart.graphs = [{
            id:"g1",
            valueField: "o2",
            balloonText: "O<sub>2</sub>:[[value]]%",//"[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            //bullet: "round",
            bulletSize: 2,
            //lineColor: "#F4D03F",
            //lineThickness: 1,
            fillAlphas: 0.2,
            lineAlpha: 0.6,
            //negativeLineColor: "#637bb6",
            //type: "column"
        }, {
            id:"g2",
            valueField: "co",
            balloonText: "CO:[[value]]%",
            bulletSize: 2,
            //lineColor: "#3598DC",
            fillAlphas: 0.2,
            lineAlpha: 0.6,
            //type: "column"
        }, {
            id:"g3",
            valueField: "co2",
            balloonText: "CO<sub>2</sub>:[[value]]%",
            bulletSize: 2,
            //lineColor: "#26C281",//"#d1655d",
            fillAlphas: 0.2,
            lineAlpha: 0.6,
            //type: "column"
        }, {
            id:"g4",
            valueField: "nox",
            balloonText: "NO<sub>x</sub>:[[value]]%",
            bulletSize: 2,
            fillAlphas: 0.2,
            lineAlpha: 0.6,
            //type: "column"
        }];

        chart.chartCursor = {
            cursorAlpha: 0,
            valueLineEnabled:true,
            valueLineBalloonEnabled:true,
            valueLineAlpha:0.5,
            fullWidth:true,
            //zoomable: false,
            bulletsEnabled: true,
            bulletSize: 6,

            categoryBalloonDateFormat: "MMM DD JJ:NN",
            categoryBalloonColor: "#e26a6a",
            categoryBalloonAlpha: 0.8
        };

        chart.categoryAxis = categoryAxis;

        bChart.chart = chart;
    };

    bChart.refreshChart = function (range) {
        console.warn("component bChart.refreshChart");
        if ((!range || range === RUNTIME_RANGE_DEFAULT) && !$rootScope.boilerRuntime) {
            console.warn("Chart BoilerRuntimeData IS NULL!");
            return;
        }
        if (typeof(AmCharts) === 'undefined' || $('#' + domId).size() === 0) {
            console.warn("There IS NO #chart_steam");
            return;
        }

        var since;

        if (bChart.range === range && range != RUNTIME_RANGE_DEFAULT) {
            return;
        }

        bChart.range = range;
        switch (range) {
            case RUNTIME_RANGE_TODAY:
            case RUNTIME_RANGE_THERE_DAY:
            case RUNTIME_RANGE_WEEK:
                var postData = {
                    uid: $rootScope.boilerRuntime.Uid,
                    runtimeQueue: keys,
                    range: range
                };
                if (since && typeof since === 'object') {
                    postData.since = since;
                }
                Ladda.create(document.getElementById('chartSmokeComp' + range)).start();
                $http.post('/boiler_runtime_list/', postData).then(function (res) {
                    console.warn("Ranged:", range, "Runtime Resp:", res);

                    var datasource = { Uid: $rootScope.boilerRuntime.Uid };

                    for (var i = 0; i < res.data.Parameters.length; i++) {
                        var param = res.data.Parameters[i];
                        var pid = param.Id;

                        datasource[pid] = res.data.Runtimes[i];
                    }

                    $scope[dataField] = datasource;
                    Ladda.create(document.getElementById('chartSmokeComp' + range)).stop();
                });
                break;
            case RUNTIME_RANGE_DEFAULT:
            default:
                $scope[dataField] = $rootScope.boilerRuntime;
                break;
        }
    };

    bChart.initChart();
});