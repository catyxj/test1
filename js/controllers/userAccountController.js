
mainApp.controller("userAccountController",function($scope, $rootScope, $uibModal){
		
	$scope.userAccount = [];
	$scope.pageSize = 10;
	$scope.totalItems = $scope.userAccount.length;							
		var newdata = {};
        $scope.openModal = function() {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-add-user.html',//script标签中定义的id
                    controller : 'userCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {                   	
                        data : function() {//data作为modal的controller传入的参数                        	                	                       			
                             return $scope.userAccount;//用于传递数据
                        }
                    }
                })
            }
					
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.advisory.length; i++){
			if($scope.advisory[i].num == id){
				$scope.advisory.splice(i,1);
				break;
			}
		}
	}	
	
})

mainApp.controller('userCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		  
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    


