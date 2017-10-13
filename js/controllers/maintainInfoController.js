mainApp.controller("maintainInfoController",function($scope, $modal,maintainData){
	$scope.maintainInfo = maintainData;

	$scope.selectedPageSize($scope.maintainInfo,6);	
	
	var data = [];
	
	$scope.openModal = function() {
                var modalInstance = $modal.open({
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
           
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.maintainInfo.length; i++){
			if($scope.maintainInfo[i].num == id){
				$scope.maintainInfo.splice(i,1);
				$scope.refreshPage($scope.maintainInfo);
//				break;
			}
		}
	}	
	
})




//模态框对应的Controller
mainApp.controller('modalCtrl', function($scope, $modalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $modalInstance.close();
          };
          $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
          }
    });