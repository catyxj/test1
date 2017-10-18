
mainApp.controller("terminalController",function($scope, $rootScope, $uibModal,terminalData){
	
	
	$scope.terminal = terminalData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.terminal.datasource.length;
	
						
		var newdata = {};
        $scope.openAddModal = function() {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-terminal.html',
                    controller : 'terminalCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                             return newdata;//用于传递数据
                        }
                    }
                })
           };
           
         $scope.openSetModal = function(data) {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-set-terminal.html',
                    controller : 'terminalCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                             return data;//用于传递数据
                        }
                    }
                })
            };   
	
	
	
	
	
	
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.terminal.length; i++){
			if($scope.terminal[i].num == id){
				$scope.terminal.splice(i,1);
				break;
			}
		}
	}
	
	
	
})

mainApp.controller('terminalCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		 
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    


