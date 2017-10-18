
mainApp.controller("configParamController",function($scope, $rootScope, $uibModal,configparamData){
	
	
	$scope.configparamData = configparamData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.configparamData.datasource.length;
	
						
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

mainApp.controller('boilerCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		  $scope.configAlarm = configAlarmData;
		  
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
