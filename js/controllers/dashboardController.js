mainApp.controller("dashboardController",function($scope){
	$scope.dashboardData = {
		currentNum:2226654,
		alarmNum:256,
		equipmentNum:554,
		totalNum:154445
	};
	
	
	$(function () {
	    $('#chart_am').highcharts({
	        chart: {
	            type: 'column',
	            margin: 75,
	            options3d: {
	                enabled: true,
	                alpha: 15,
	                beta: 15,
	                depth: 100,
	                fitToPlot: true
	            }
	        },
	        title:{
	        	text: ''
	        },
	        xAxis: {
		        categories: [
		        	'D<=1', '1<D<=2', '1<D<=2', '1<D<=2', '1<D<=2'
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
	        series: [{
	            data: [ 144.0, 176.0, 135.6, 148.5, 216.4 ]
	        }],
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
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }],
        credits:{
			     enabled:false // 禁用版权信息
			}
    });
});

	
	
})