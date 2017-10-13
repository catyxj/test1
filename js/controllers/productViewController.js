 mainApp.controller("viewCtrl",function($scope,productData, $modal){

	$scope.selectedPageSize(productData,4);
	$scope.productData = productData;
		
	   $scope.openModal = function(data) {
                var modalInstance = $modal.open({
                    templateUrl : 'modal.html',//script标签中定义的id
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
mainApp.controller('viewModalCtrl', function($scope, $modalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $modalInstance.close();
          };
          $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
          }
    });

