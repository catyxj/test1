



mainApp.controller("tabController",function($scope){
	
})



mainApp.controller("DatepickerDemoCtrl", ["$scope", function($scope){
  
 // grab today and inject into field
 
    $scope.startTime = new Date();
    $scope.endTime = new Date();
  	$scope.format = "yyyy-MM-dd";


	$scope.altInputFormats = ['yyyy/M!/d!'];
	
	  $scope.popup1 = {
	  	opened: false
	  };
	  $scope.popup2 = {
	  	opened: false
	  };
  

  // open min-cal
	$scope.startopen = function($event) {
	  	$event.preventDefault();
   		 $event.stopPropagation();
	  	$scope.popup1.opened = true;
	  };
  $scope.endopen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.popup2.opened = true;
  };
  
  

}]);











 mainApp.controller("productList",function($scope,productData,$filter){

//	$scope.selectedPageSize(productData,6);
	
	$scope.productData = productData;	
//	$scope.totalItems = $scope.productData.length;
	$scope.pageSize = 10;
	
})






mainApp.controller("alarmInfoController",function($scope,alarmData,$state,$uibModal){
	$scope.alarmInfo = alarmData ;
//	$scope.selectedPageSize($scope.alarmInfo,6);
	$scope.pageSize = 10;
	$scope.totalItems = $scope.alarmInfo.length;
	$scope.alarmMode = "current";
	$scope.setAlarm = function(m){
		$scope.alarmMode = m;
	};
	
	
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.alarmInfo.length; i++){
			if($scope.alarmInfo[i].num == id){
				$scope.alarmInfo.splice(i,1);
				break;
			}
		}
	}
	
	
	$scope.isShow = function(name){
		return $state.includes(name);
	}
	
	
	$scope.openModal = function(data) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/runtime/modal-alarm.html',//script标签中定义的id
                    controller : 'alarmModalCtrl',//modal对应的Controller
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
mainApp.controller('alarmModalCtrl', function($scope, $uibModalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });



