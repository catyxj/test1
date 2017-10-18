
mainApp.controller("configAlarmController",function($scope, $rootScope, $uibModal, configAlarmData){
	
	
	$scope.configAlarm = configAlarmData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.configAlarm.datasource.length;
	
						
		var newdata = {};
        $scope.openAddModal = function() {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-add-confalarm.html',
                    controller : 'boilerCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                             return newdata;//用于传递数据
                        }
                    }
                })
           }		
	
})

mainApp.controller('boilerCtrl', function($scope,$rootScope, $uibModalInstance, data,configAlarmData) {
          $scope.data= data;
		  $scope.configAlarm = configAlarmData;
		  $scope.data.priortyText = "中";
		  
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
