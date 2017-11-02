mainApp.controller("dashboardController",function($scope,$state){
    bMonitor = this;
	$scope.dashboard = {
		runtimeCount:2226654,
		alarmNum:256,
		equipmentNum:554,
        runningTotal:154445
	};

	
	$(function () {
	    $('#chart_am').highcharts({
	        chart: {
	            type: 'column',
//	            margin: 75,
	            options3d: {
	                enabled: true,
	                alpha: 15,
	                beta: 10,
	                depth: 100,
	                fitToPlot: true
	            }
	        },
	        colors: ['#7cb5ec', '#e1ef6d'] ,
	        title:{
	        	text: ''
	        },
	        xAxis: {
	        	
		        categories: [
		        	'D≤1<br>(≥61%)', '1＜D≤2<br>(≥69%)', '2＜D≤8<br>(≥71%)', '8＜D≤20<br>(≥72%)', 'D＞20<br>(≥72%)', 'D≤2<br>(≥79%)', 'D＞2<br>(≥81%)'
		        ]
		    },
		    yAxis: {
		        title: {
		            text: '达标率'
		        }
		    },
	        plotOptions: {
	            column: {
	                depth: 25
	            }
	        },
	        series: [ 
		        {
		        	name: '燃煤锅炉、生物质锅炉',
		            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
		       },
		        {
		            name: '燃油锅炉、燃气锅炉',
		            data: [83.6, 78.8, 98.5, 0, 106.0, 84.5, 105.0]
		        }
		        ],
	        credits:{
			     enabled:false // 禁用版权信息
			}
	    });
	});


	$(function () {
    $('#chart_pie').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
                point: {
                    events: {
                        click: function() {
                            console.log(this);
                            this.update({
                                sliced: true
                            })
                        }
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['D＜1',   45.0],
                ['1＜D≤2',       26.8],
                {
                    name: '2＜D≤8',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['8＜D≤20',    8.5],
                ['D＞20',     6.2]
               
            ]
        }],
        credits:{
			     enabled:false // 禁用版权信息
			}
    });
});

    var ids = ['c0', 'c1', 'c2', 'c3', 'c4', 'g0', 'g1'];
    var evaporates = ['D≤1<br>(≥61%)', '1＜D≤2<br>(≥69%)', '2＜D≤8<br>(≥71%)', '8＜D≤20<br>(≥72%)', 'D＞20<br>(≥72%)', 'D≤2<br>(≥79%)', 'D＞2<br>(≥81%)'];

    var chart = AmCharts.makeChart("dashboard_amchart_3d", {
        "theme": "light",
        "type": "serial",
        "startDuration": 1,
        "dataProvider": [{
            "country": "D≤1<br>(≥61%)",
            "Success": 25,
            "Failed":0,
        }, {
            "country": "1＜D≤2<br>(≥69%)",
            "Success": 82,
            "Failed":60,
        },  {
            "country": "2＜D≤8<br>(≥71%)",
            "Success": 65,
            "Failed":0,
        }, {
            "country": "Russia",
            "Success": 80,
            "Failed":40,
        },  {
            "country": "Brazil",
            "Success": 95,
            "Failed":10,
        }, {
            "country": "Italy",
            "Success": 86,
            "Failed":56,
        },{
            "country": "Taiwan",
            "Success": 58,
            "Failed":20,
        }],
        "valueAxes": [{
            "position": "left",
            "maximum": 105,
            "showLastLabel": false,
            "unit": '%',
            "title": "达标率"
        }],
        "graphs": [
            {
                "balloonText": "Success<br/>[[category]]: <b>[[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 1,
                "labelText": "[[value]]台",
                "lineAlpha": 0.1,
                "type": "column",
                "valueField": "Success",
                "title": "Success",
                "color": "#888888",

        },{
                "balloonText": "Failed<br/>[[category]]: <b>[[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 1,
                "labelText": "[[value]]台",
                "lineAlpha": 0.1,
                "type": "column",
                "valueField": "Failed",
                "title": "Failed",
                "color": "#888888",

            },

        ],
        "depth3D": 15,
        "angle": 30,
        "legend": {
            "horizontalGap": 10,
            "useGraphSettings": true,
            "markerSize": 10
        },
        "categoryField": "country",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 0,
            "position": "left"
            // "title":["燃煤锅炉、生物质锅炉","燃油锅炉，燃气锅炉"]
        },
        "export": {
            "enabled": true
        }


});


    bMonitor.initAmChartPie = function () {
        // if (!$rootScope.boilers || $rootScope.boilers.length === 0) {
        //     return;
        // }


            var chartData = [
                {
                    "range": 'D＜1',
                    "count": 60
                },
                {
                    "range": '1＜D≤2',
                    "count": 30
                },
                {
                    "range": '2＜D≤8',
                    "count": 10
                },
                {
                    "range": '8＜D≤20',
                    "count": 30
                },
                {
                    "range": 'D＞20',
                    "count": 50
                }
            ];


            var chart = new AmCharts.AmPieChart();
            chart.type = "pie";
            chart.theme = "light";
            chart.language = "zh";
            chart.valueField = "count";
            chart.titleField = "range";

            // chart.startDuration = 1;
            //
            // chart.plotAreaFillAlphas = 0.1;
            chart.outlineAlpha = .4;
            chart.depth3D = 15;
            chart.angle = 30;
            // chart.labelRadius = 16;
            // chart.radius = 120;

            chart.accessibleLabel = "[[title]]<br>[[value]] 台 ([[percents]]%)";
            chart.labelText = "[[title]]<br>[[percents]]%";
            // chart.balloonFunction = balloonText;

            chart.export = { enabled: true };

            chart.dataProvider = chartData;

            // console.error("dataProvider:", chartData);

            chart.write("dashboard_amchart_pie");

    };

    bMonitor.initAmChartPie();



})





