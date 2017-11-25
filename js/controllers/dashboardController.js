mainApp.controller("monitorController",function($scope){
	$scope.itemArray= [{ id: 1, name: '东莞天鹿锅炉有限公司' },  
                   {id: 2, name: '青岛胜利锅炉有限公司' },  
                   {id: 3, name: '广州特种承压设备检测研究院' },  
                   {id: 4, name: '长宏南雁锅炉01' },  
                   {id: 5, name: '东南毛纺织染锅炉' }];  
   	$scope.selected = { value: $scope.itemArray[0] }; 
	$scope.evaporates = [
            {id: 0, Text: '额定蒸发量（不限）'},
            {id: 1, Text: 'D≤1'},
            {id: 2, Text: '1<D≤2'},
            {id: 3, Text: '2<D≤8'},
            {id: 4, Text: '8<D≤20'},
            {id: 5, Text: 'D>20'}
        ];

})

mainApp.controller("DashboardController",function($scope, $rootScope, $http, $filter, $state){
    bMonitor = this;
    bMonitor.isDone = false;
    

	//统计图表
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



mainApp.controller("viewCtrl",function($scope,productData,$uibModal){

	$scope.productData = productData;
	$scope.pageSize = 4;
	$scope.totalItems = $scope.productData.length;

	var boiler = $scope.productData;
	$scope.openModal = function(data) {
		var modalInstance = $uibModal.open({
			templateUrl: 'directives/modal/boiler_calculate_gas.html', //script标签中定义的id
//			if (boiler.Fuel.Type.Id === 1 || boiler.Fuel.Type.Id === 4) {
//	            templateUrl = '/directives/modal/boiler_calculate_coal.html';
//	        } else {
//	            templateUrl = '/directives/modal/boiler_calculate_gas.html';
//	        },
			controller: 'viewModalCtrl', //modal对应的Controller
			size: 'lg', //大小配置 
			resolve: {
				data: function() { //data作为modal的controller传入的参数
	
					return data; //用于传递数据
				}
			}
		})
	}
	
})

//模态框对应的Controller
mainApp.controller('viewModalCtrl', function($scope, $uibModalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });



 mainApp.controller("productList",function($scope,productData,$filter){
	$scope.productData = productData;
	$scope.pageSize = 10;

})



mainApp.controller("mapController",function($scope,$location,productData){
	$scope.data = productData;
	var map = new BMap.Map("map-container"); // 创建地图
	 
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	map.addControl(new BMap.NavigationControl()); 
	map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
	
	var long = 0;
    var lat = 0;
    var count = 0;
    for (var i = 0; i < $scope.data.length; i++) {
            var b = $scope.data[i];
            if (!b.Address || b.Address.Longitude == 0 || b.Address.Latitude == 0) {
                continue;
            }
            var longitude = b.Address.Longitude;
            var latitude = b.Address.Latitude;
            count ++;
            long += longitude;
            lat += latitude;
            var point = new BMap.Point(longitude, latitude);
            var marker = new BMap.Marker(point);
            var label = new BMap.Label(i);
            var offsetX = 0;
            var fontSize = 12;
            if (i < 10) {
                offsetX = 5;
            } else if (i < 100) {
                offsetX = 1;
            } else if (i < 1000) {
                fontSize = 10;
            }
            label.setStyle({
                'font-family': 'sans-serif',
                'font-size': fontSize + 'px',
                'text-align': 'center',
                'color': '#fff',
                'border': 'none',
                'background-color': 'transparent'});
            label.setOffset(new BMap.Size(offsetX, 2));
            marker.setTitle(b.Name);
            marker.setLabel(label);
            marker.addEventListener("click", function(){
                $location.hash('b' + b.num);
            });
            marker.addEventListener("dblclick", function(){
                $state.go("runtime.dashboard", {boiler: b.Uid});
            });
            map.addOverlay(marker);
            marker.setAnimation('BMAP_ANIMATION_DROP');
        }
        var cenLong = long / count;
        var cenLat = lat / count;
        console.warn("BMap Center", cenLong, cenLat, long, lat, count + "/" + $scope.data.length);
        var center = new BMap.Point(cenLong, cenLat);
		map.centerAndZoom(center, 15); 
	
	$scope.bdGEO = function(boiler){
		var newAddress=boiler.Address.Location.LocationName + boiler.Address.Address;
		var city = boiler.Address.Location.LocationName;
		geocodeSearch(newAddress,city);
	}
	
	// 创建地址解析器实例     
	var myGeo = new BMap.Geocoder();      
	// 将地址解析结果显示在地图上，并调整地图视野  
	
	function geocodeSearch(add,city){		
		myGeo.getPoint(add, function(point){      
	    if (point) { 
	    	$scope.longitude = point.lng;
            $scope.latitude = point.lat;
	    	map.centerAndZoom(point, 15);   
	    	var marker = new BMap.Marker(point);        // 创建标注    
			map.addOverlay(marker);                     // 将标注添加到地图中 
	    }      
	 }, 
	"city");
	}


	$scope.local = new BMap.LocalSearch(map, {
            renderOptions: {
                map: map,
                panel: "results",
                autoViewport: true,
                selectFirstResult: true
            },
            pageCapacity: 8
        });
        
 		$scope.$watch('address', function () {
            /**
             * 查询输入的地址并显示在地图上、调整地图视野
             */
            $scope.local.search($scope.address);
            /**
             * 将输入的地址解析为经纬度
             */
//          myGeo.getPoint($scope.address, function (point) {
//              if (point) {
//                  /**
//                   * 将地址解析为经纬度并赋值给$scope.longitude和$scope.latitude
//                   */
//                  $scope.longitude = point.lng;
//                  $scope.latitude = point.lat;
//              }
//          });
        });
	
	
	bMonitor.mapRowClicked = function (boiler) {
        // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
        console.warn("Click Row:", boiler);
        if (!boiler.Address) {
            console.warn("Boiler Has No Address!");
            return;
        }

        console.warn("Ready to Move:", boiler.Address.Longitude, boiler.Address.Latitude);
        var point = new BMap.Point(boiler.Address.Longitude, boiler.Address.Latitude);
        map.setZoom(14);
        map.panTo(point);
    };	
	
	
})






