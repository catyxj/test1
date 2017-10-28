mainApp.controller("monitorController",function($scope){
	
})



mainApp.controller("viewCtrl",function($scope,productData,$uibModal,$state){

	$scope.productData = productData;
	$scope.pageSize = 4;
	$scope.totalItems = $scope.productData.length;
	
	
	$scope.openModal = function(data) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/monitor/modal-view.html',//script标签中定义的id
                    controller : 'viewModalCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数
                       	
                             return data;//用于传递数据
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



 mainApp.controller("productList",function($scope,productData,$filter,$state){	
	$scope.productData = productData;
	$scope.pageSize = 10;
})



mainApp.controller("mapController",function($scope,organizationData){
	$scope.data = organizationData;
	
	var map = new BMap.Map("map-container"); 
	
	var point = new BMap.Point(116.404, 39.915); 
	map.centerAndZoom(point, 15);  
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	map.addControl(new BMap.NavigationControl()); 
	
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
	    	point = new BMap.Point(point.lng, point.lat);
	    	map.centerAndZoom(point, 15);   	             
			
	    }      
	 }, 
	"city");
	}
	
	
	
	
	
})



