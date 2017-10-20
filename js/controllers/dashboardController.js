mainApp.controller("dashboardController",function($scope){
	$scope.dashboardData = {
		currentNum:2226654,
		alarmNum:256,
		equipmentNum:554,
		totalNum:154445
	};
	
	
	var chart = new Highcharts.Chart('container', { // 图表初始化函数，其中 container 为图表的容器 div               
		chart: {
			type: 'bar' //指定图表的类型，默认是折线图（line）
		},
		title: {
			text: '' //指定图表标题
		},
		xAxis: {
			categories: ['苹果', '香蕉', '橙子'] //指定x轴分组
		},
		yAxis: {
			title: {
				text: '达标率' //指定y轴的标题
			}
		},
		series: [{ //指定数据列
			name: '燃煤锅炉，生物质锅炉', //数据列名
			data: [1, 0, 4] //数据
		}, {
			name: '燃油锅炉，燃气锅炉',
			data: [5, 7, 3]
		}]
	});
	
	
	
})