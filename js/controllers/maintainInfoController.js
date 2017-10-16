mainApp.controller("maintainInfoController",function($scope, $uibModal,maintainData){
	$scope.maintainInfo = maintainData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.maintainInfo.length;
//	$scope.selectedPageSize($scope.maintainInfo,6);	
	
	
	
	var data = [];
	
	$scope.openModal = function(data) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal-maintain.html',//script标签中定义的id
                    controller : 'modalCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数                      		
                             return data;//用于传递数据
                        }
                    }
                })
          };
    $scope.addOpenModal = function() {
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal-maintain.html',//script标签中定义的id
                    controller : 'addModalCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数
                       		
                             return data;//用于传递数据
                        }
                    }
                })
          };
    
    
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.maintainInfo.length; i++){
			if($scope.maintainInfo[i].num == id){
				$scope.maintainInfo.splice(i,1);
				$scope.totalItems = $scope.maintainInfo.length;
//				$scope.refreshPage($scope.maintainInfo);
//				break;
			}
		}
	}	
	
})




//模态框对应的Controller
mainApp.controller('modalCtrl', function($scope, $uibModalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    
mainApp.controller('addModalCtrl', function($scope, $uibModalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });