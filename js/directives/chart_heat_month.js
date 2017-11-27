/**
 * Created by JeremiahYan on 2017/1/8.
 */
mainApp.directive('chartHeatMonth', function () {
    return {
        restrict: 'E',
        templateUrl: "directives/chart_heat_month.html",
        link: function(scope, element, attrs) {
            setTimeout(function () {
                initChartHeatMonth(scope.bRuntime);
            }, 2000);
        }
    };
});

//2017-01-03T14:22:54+08:00
var initChartHeatMonth = function(daily) {
    console.info("initChartHeatMonth", daily);
    if (!daily) {
        console.warn("Boiler Runtime Daily Data IS NULL!");
        return;
    }
    if (typeof(AmCharts) === 'undefined' || $('#chart_heat_month').size() === 0) {
        console.warn("There IS NO #chart_heat_month");
        boiler_module_height();
        return;
    }

    var chartData = [];

    for (var i = 0; i < daily.length; i++) {
        //var p = boiler.Parameters[i];
        var da = daily[i];
        if (da.flow <= 0 && da.heat <= 0) {
            continue;
        }

        var d = {
            "num": i,
            "date": da.date,
            "flow": da.flow,
            "heat": da.heat
        };

        chartData.unshift(d);
    }

    console.warn("Daily Data:", chartData);

    var chart = AmCharts.makeChart("chart_heat_month", {
        type: "serial",
        theme: "light",
        fontSize: 11,
        color: "#6c7b88",
        language: "zh",
        marginTop: 8,
        marginRight: 0,
        marginLeft: 0,
        marginBottom: 0,
        dataProvider: chartData,
        valueAxes: [{
            id: "a1",
            //title: "Test",
            //position: "right",
            gridAlpha: 0.04,
            axisAlpha: 0.2,
            unit: "%"
        }, {
            id: "a2",
            position: "right",
            gridAlpha: 0,
            axisAlpha: 0.2,
            // labelsEnabled: true,
            unit: "t"
        }],
        graphs: [{
            id:"g1",
            valueField: "heat",
            valueAxis: "a1",
            balloonText: "平均热效率:[[value]] %",//"[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            bullet: "round",
            bulletSize: 6,
            lineColor: "#32c5d2",
            lineThickness: 2,
            fillAlphas: 0.1,
            lineAlpha: 0.8,
            //negativeLineColor: "#637bb6",
            type: "line"
        }, {
            id:"g2",
            valueField: "flow",
            valueAxis: "a2",
            balloonText: "累计流量:[[value]] t",//"[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            // bullet: "round",
            // bulletSize: 6,
            lineColor: "#89c4f4",
            lineThickness: 1,
            fillAlphas: 0.5,
            lineAlpha: 0.8,
            //negativeLineColor: "#637bb6",
            type: "column"
        }],
        /*
        "chartScrollbar": {
            "graph":"g1",
            "gridAlpha":0,
            "color":"#888888",
            "scrollbarHeight":55,
            "backgroundAlpha":0,
            "selectedBackgroundAlpha":0.1,
            "selectedBackgroundColor":"#888888",
            "graphFillAlpha":0,
            "autoGridCount":true,
            "selectedGraphFillAlpha":0,
            "graphLineAlpha":0.2,
            "graphLineColor":"#c2c2c2",
            "selectedGraphLineColor":"#888888",
            "selectedGraphLineAlpha":1
        },
        */
        chartCursor: {
            categoryBalloonDateFormat: "MMM DD",
            cursorAlpha: 0,
            valueLineEnabled:true,
            valueLineBalloonEnabled:true,
            valueLineAlpha:0.5,
            fullWidth:true
        },
        // dataDateFormat: "YYYY-MM-DD JJ:NN:SS",
        categoryField: "date",
        /*
        categoryAxis: {
            gridPosition: "start",
            axisAlpha: 0.2,
            gridAlpha: 0.04,
            //minorGridAlpha: 0.1,
            //minorGridEnabled: true
        }
        */
        categoryAxis: {
            minPeriod: "DD",
            parseDates: true,
            equalSpacing: true,
            axisAlpha: 0.2,
            gridAlpha: 0.04,
            minorGridAlpha: 0.02,
            minorGridEnabled: true
        }
    });
};
