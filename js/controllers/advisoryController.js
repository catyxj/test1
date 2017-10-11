mainApp.controller("advisoryController",function($scope, $rootScope, $modal){
	$scope.advisory = [
		{
			num:1,
			time:"2017-09-22 12:43:48",
			content:"test",
			company:"系统",
			state:"已回复"
		},
		{
			num:2,
			time:"2017-09-22 12:43:48",
			content:"test",
			company:"系统",
			state:"新咨询"
		}
	];
//	$scope.p_size(6,$scope.advisory);
	$scope.selectedPageSize($scope.advisory,6);
	
	
	var count = 2;
//						$scope.addData = function(id, advisoryTitle , advisoryContent){
//								var addedItem = false;
//								for(var i = 0; i < $scope.advisory.length; i++){
//									if($scope.advisory[i].num == id){
//										addedItem = true;
//										break;
//									}
//								}
//								if(!addedItem){
//									$scope.advisory.push(
//										{
//											num:count+1,
//											time:"2017-09-22 12:43:48",
//											content:advisoryContent,
//											company:advisoryTitle,
//											state:"新咨询"
//										}
//									);
//								}
//								return $scope.advisory;
//							}
						
		
        $scope.openModal = function() {
                var modalInstance = $modal.open({
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
				$scope.refreshPage($scope.advisory);
//				break;
			}
		}
	}
	
	
	
})

mainApp.controller('advisoryCtrl', function($scope, $modalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $modalInstance.close();
          };
          $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
          }
    });