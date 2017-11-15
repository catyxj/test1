
mainApp.controller("organizationController",function($scope, $rootScope, $uibModal,organizationData){
	
	
	$scope.organization = organizationData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.organization.length;
	
						
		
        $scope.openModal = function() {  
        	var newdata = {};
        	newdata.title="新增企业信息";
            var modalInstance = $uibModal.open({
                    templateUrl : 'directives/modal/organization_detail.html',//script标签中定义的id
                    controller : 'organizationCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数                        		
                             return newdata;//用于传递数据
                        }
                    }
                })
                
                  
	            modalInstance.opened.then(function() {// 模态窗口打开之后执行的函数
                     console.log('modal is opened');
                 });
                 modalInstance.result.then(function(result) {                   
                    $scope.organization.push({
						name:result.name,
						Address: {						
							Address:result.Address.Address,	
	                  },
						});
//						console.log(result);
	                 }, function(reason) {
	                    console.log(reason);                                 
	                 });
                
                
            }
	
		$scope.editModal = function(data) { 
				data.title="企业信息";
                var modalInstance = $uibModal.open({
                    templateUrl : 'directives/modal/organization_detail.html',//script标签中定义的id
                    controller : 'organizationCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数                        		
                             return data;//用于传递数据
                        }
                    }
                })
                
                  
	            modalInstance.result.then(function(selectedItem) {
	              $scope.selected = selectedItem;
	            }, function() {
	              
	            });
                
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

mainApp.controller('organizationCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		  
        //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close($scope.data);                            
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    

