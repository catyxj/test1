
mainApp.controller("organizationController",function($scope, $rootScope, $uibModal,organizationData){
	
	
	$scope.organization = organizationData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.organization.length;
	
						
		var newdata = {};
        $scope.openModal = function() {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-add-organization.html',//script标签中定义的id
                    controller : 'organizationCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数                        		
                             return newdata;//用于传递数据
                        }
                    }
                })
                
                  
//	            modalInstance.result.then(function(selectedItem) {
//	              $scope.selected = selectedItem;
//	            }, function() {
//	              
//	            });
                
            }
	
		
	
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.organization.length; i++){
			if($scope.organization[i].num == id){
				var r = confirm("确认删除 "+$scope.organization[i].name +"？")
				if(r==true){
					$scope.organization.splice(i,1);
				}
				else{
					break;
				}
//				
			}
		}
	}
	
	
	
})

mainApp.controller('organizationCtrl', function($scope,$rootScope, $uibModalInstance, data,organizationData) {
          $scope.data= data;
		  $scope.organization = organizationData;
        //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();                            
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    

