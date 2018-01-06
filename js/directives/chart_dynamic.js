/**
 * Created by JeremiahYan on 2017/11/8.
 */
mainApp.directive('chartDynamic', function () {
    return {
        restrict: 'E',
        templateUrl: "directives/chart_dynamic.html",
        controller: "ChartDynamicController",
        controllerAs: "dChart"
    };
}).controller("ChartDynamicController", function ($rootScope, $scope, $http) {
    var bChart = this;
    bChart.range = RUNTIME_RANGE_DEFAULT;
    bChart.keys = [];

    var domId = "chart_dynamic";
    var dataField = "data";

    $rootScope.$watch('instants', function (newVal, oldVal) {
        // console.error("Dynamic Instants:", $rootScope.instants);
        if (!newVal || newVal.length === 0) {
            return;
        }

        var instants = [];
        for (var i = 0; i < $rootScope.instants.length; i++) {
            var ins = $rootScope.instants[i];
            if (ins.category !== 11) {
                instants.push(ins);
            }
        }
        bChart.instants = instants;

        if (!bChart.keys || bChart.keys.length <= 0) {
            bChart.keys = [bChart.instants[0].id];
        }

        bChart.refreshChart(RUNTIME_RANGE_DEFAULT, bChart.keys);
    });

    $rootScope.$watch('boilerRuntime', function () {
        if (bChart.range === RUNTIME_RANGE_DEFAULT) {
            bChart.refreshChart(RUNTIME_RANGE_DEFAULT);
        }
    });

    $scope.$watch(dataField, function () {
        // console.error("components $scope.$watch(" + dataField + ")");
        if (!$scope[dataField]) {
            console.warn("There is no $scope." + dataField +"!!");
            return;
        }

        bChart.refreshChartData();
    });

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

        /*
        chart.valueAxes = [{
            id: "a1",
            //title: "Test",
            //position: "right",
            gridAlpha: 0.04,
            axisAlpha: 0.2,
            unit: "℃"
        }];

        chart.graphs = [{
            id:"g1",
            valueField: "value0",
            balloonText: "排烟#1温度:[[value]] ℃",//"[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            bullet: "round",
            bulletSize: 4,
            lineColor: "#0D8ECF",//"#F4D03F",
            lineThickness: 1,
            lineAlpha: 0.8,
            negativeLineColor: "#637bb6",
            type: "smoothedLine"
        }, {
            id:"g2",
            valueField: "value1",
            balloonText: "排烟#2温度:[[value]] ℃",//"[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            bullet: "round",
            bulletSize: 4,
            lineColor: "#F3C200",
            lineThickness: 1,
            lineAlpha: 0.8,
            negativeLineColor: "#637bb6",
            type: "smoothedLine"
        }];
        */

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
        bChart.chart.write(domId);
    };

    bChart.refreshChartData = function () {
        var chartData = [];
        for (var i = 0; i < bChart.keys.length; i++) {
            var id = bChart.keys[i];
            for (var j = 0; j < bChart.instants.length; j++) {

            }

            var field = "value" + i;
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

        // console.error("Dynamic ChartData:", chartData);

        var param;
        if (bChart.params && bChart.params.length > 0) {
            param = bChart.params[0];
        }

        bChart.chart.valueAxes = [{
            id: "a1",
            //title: "Test",
            //position: "right",
            gridAlpha: 0.04,
            axisAlpha: 0.2,
            unit: param.unit
        }];

        bChart.chart.graphs = [{
            id:"g1",
            valueField: "value0",
            balloonText: param.name + ":[[value]] " + param.unit,//"[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            bullet: "round",
            bulletSize: 4,
            lineColor: "#0D8ECF",//"#F4D03F",
            lineThickness: 1,
            lineAlpha: 0.8,
            negativeLineColor: "#637bb6",
            type: "smoothedLine"
        }/*, {
            id:"g2",
            valueField: "value1",
            balloonText: "排烟#2温度:[[value]] ℃",//"[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            bullet: "round",
            bulletSize: 4,
            lineColor: "#F3C200",
            lineThickness: 1,
            lineAlpha: 0.8,
            negativeLineColor: "#637bb6",
            type: "smoothedLine"
        }*/];

        for (var i = 0; i < bChart.chart.graphs.length; i++) {
            var g = bChart.chart.graphs[i];
            if (chartData.length > 160) {
                g.bullet = "none";
            } else {
                g.bullet = "round";
            }
        }

        bChart.chart.dataProvider = chartData;
        bChart.chart.validateData();
    };

    bChart.refreshChart = function (range, keys) {
        // console.error("Init bChart.refreshChart:", range, keys);
        var isInit = false;
        if (!keys || keys.length <= 0) {
            if (!bChart.instants || bChart.instants.length <= 0) {
                // console.error("Instants Is Null!");
                return;
            }

            keys = [bChart.instants[0].id];
            isInit = true;
        }

        if (typeof range !== "number" || range < RUNTIME_RANGE_DEFAULT) {
            range = RUNTIME_RANGE_DEFAULT;
        }

        if (bChart.keys === keys && bChart.range === range) {
            console.error("Chart NO Change!");
            return;
        }

        if (((!bChart.keys || bChart.keys.length <= 0) && isInit) || !isInit) {
            bChart.keys = keys;
        }

        bChart.title = "";
        bChart.params = [];
        for (var i = 0; i < bChart.keys.length; i++) {
            for (var j = 0; j < bChart.instants.length; j++) {
                var ins = bChart.instants[j];
                // console.warn("ins, id:", ins, pids[i]);
                if (ins.id === bChart.keys[i]) {
                    bChart.title += ins.name;
                    bChart.params.push({
                        id: ins.id,
                        name: ins.name,
                        unit: ins.unit
                    });
                    // console.error("matched!:", ins, pids[i]);
                    if (i < bChart.keys.length - 1) {
                        bChart.title += "/";
                    }
                }
            }
        }

        if ((!range || range === RUNTIME_RANGE_DEFAULT) && !$rootScope.boilerRuntime) {
            console.warn("Chart BoilerRuntimeData IS NULL!");
            return;
        }
        if (typeof(AmCharts) === 'undefined' || $('#' + domId).size() === 0) {
            console.warn("There IS NO #chart_dynamic");
            return;
        }

        var since;

        // console.warn("bChart.refreshChart Set Range");

        if (!range) {
            bChart.range = 0;
        } else {
            bChart.range = range;
        }

        switch (range) {
            case RUNTIME_RANGE_TODAY:
            case RUNTIME_RANGE_THERE_DAY:
            case RUNTIME_RANGE_WEEK:
                var postData = {
                    uid: $rootScope.boilerRuntime.Uid,
                    runtimeQueue: bChart.keys,
                    range: range
                };
                if (since && typeof since === 'object') {
                    postData.since = since;
                }
                Ladda.create(document.getElementById('dChart' + range)).start();
                $http.post('/boiler_runtime_list/', postData).then(function (res) {
                    console.warn("Ranged:", range, "Runtime Resp:", res);
                    var datasource = { Uid: $rootScope.boilerRuntime.Uid };

                    for (var i = 0; i < res.data.Parameters.length; i++) {
                        var param = res.data.Parameters[i];
                        var pid = param.Id;

                        datasource[pid] = res.data.Runtimes[i];
                    }

                    $scope[dataField] = datasource;
                    Ladda.create(document.getElementById('dChart' + range)).stop();
                });
                break;
            case RUNTIME_RANGE_DEFAULT:
            default:
                $scope[dataField] = $rootScope.boilerRuntime;
                bChart.refreshChartData();
                break;
        }
    };

    bChart.initChart();
});