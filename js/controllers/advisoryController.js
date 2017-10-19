
mainApp.controller("advisoryController",function($scope, $rootScope, $uibModal,advisoryData){
	
	
	$scope.advisory = advisoryData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.advisory.length;
	
						
		var newdata = {};
        $scope.openModal = function() {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'advisory.html',//script标签中定义的id
                    controller : 'advisoryCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数                        	                	                       			
                             return $scope.advisory;//用于传递数据
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

mainApp.controller('advisoryCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		  
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    


