



mainApp.controller("tabController",function($scope){
	
})



mainApp.controller("DatepickerDemoCtrl", ["$scope", function($scope){
  
 // grab today and inject into field
 
//  $scope.startTime = new Date();
//  $scope.endTime = new Date();
  	$scope.format = "yyyy-MM-dd";
  

  // open min-cal
  $scope.startopen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startopened = true;
  };
  $scope.endopen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.endopened = true;
  };
  
  

}]);











 mainApp.controller("productList",function($scope,productData){
//	$scope.selected = 6;
//	$scope.selectedPageSize(productData,6);
	
	$scope.productData = productData;	
	$scope.p_index = function(){
		$scope.selectedpage = 1;
	}
	$scope.Previous = function(){
		$scope.selectPage($scope.selectedpage - 1);
	};
	
	$scope.Next = function () {
		$scope.selectPage($scope.selectedpage + 1);
	};
	
	
})





mainApp.controller("maintainController",function($scope){
	$scope.maintain = [];
	$scope.selectedPageSize($scope.maintain,6);
})


mainApp.controller("alarmInfoController",function($scope,alarmData,$state,$modal){
	$scope.alarmInfo = alarmData ;
	$scope.selectedPageSize($scope.alarmInfo,6);
	$scope.alarmMode = "current";
	$scope.setAlarm = function(m){
		$scope.alarmMode = m;
	};
	
	
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.alarmInfo.length; i++){
			if($scope.alarmInfo[i].num == id){
				$scope.alarmInfo.splice(i,1);
				$scope.refreshPage($scope.alarmInfo);
//				break;
			}
		}
	}
	
	
	$scope.isShow = function(name){
		return $state.includes(name);
	}
	
	
	$scope.openModal = function(data) {
                var modalInstance = $modal.open({
                    templateUrl : 'views/monitor/modal-alarm.html',//script标签中定义的id
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
mainApp.controller('alarmModalCtrl', function($scope, $modalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $modalInstance.close();
          };
          $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
          }
    });



