

mainApp.controller("alarmInfoController",function($scope,alarmData,$state,$uibModal){	
	$scope.alarm = alarmData ;	
	$scope.pageSize = 10;

	$scope.alarmMode = "current";
	$scope.setAlarm = function(m){
		$scope.alarmMode = m;
	};
	
	$scope.alarm.priorityIcons = {
        0: [0],
        1: [0, 1],
        2: [0, 1, 2]
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
                    templateUrl : 'directives/modal/boiler_alarm_feedback.html',//script标签中定义的id
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
          };
          
          
    
    
    
    	
    
    
    
                        
          
    });
    
    


