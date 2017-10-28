mainApp.controller("dashboardController",function($scope,$state){
	$scope.dashboardData = {
		runtimeCount:2226654,
		alarmNum:256,
		equipmentNum:554,
		totalNum:154445
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

		

	
})





