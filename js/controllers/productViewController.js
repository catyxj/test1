mainApp.controller("viewCtrl",function($scope,productData,$uibModal){

	$scope.productData = productData;
	$scope.pageSize = 4;
	$scope.totalItems = $scope.productData.length;
	
	
	$scope.openModal = function(data) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/monitor/modal-view.html',//script标签中定义的id
                    controller : 'viewModalCtrl',//modal对应的Controller
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
mainApp.controller('viewModalCtrl', function($scope, $uibModalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
