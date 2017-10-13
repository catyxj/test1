
mainApp.controller("advisoryController",function($scope, $rootScope, $modal,advisoryData){
	
	
	$scope.advisory = advisoryData;
	$scope.selectedPageSize($scope.advisory,6);
	
	
	var count = 3;

						
		var newdata = {};
        $scope.openModal = function() {       	
                var modalInstance = $modal.open({
                    templateUrl : 'advisory.html',//script标签中定义的id
                    controller : 'advisoryCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数
                        	newdata.num = 2;                        	
                       		newdata.time="2017-09-22 12:43:48";
							newdata.company = "test";
							newdata.state="新咨询";		
                             return newdata;//用于传递数据
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

mainApp.controller('advisoryCtrl', function($scope,$rootScope, $modalInstance, data,advisoryData) {
          $scope.data= data;
		  var advisory = advisoryData;
		  advisory.push($scope.data);
          //在这里处理要进行的操作
          $scope.ok = function() {
              $modalInstance.close(
              	console.log(advisoryData)
              );
          };
          $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
          }
    });
    



//module.directive( "addAdvisoryData", [ 'advisoryData', function( advisoryData ) {
//  return {
//      restrict: "E",
//          link: function( scope, element, attrs ) {
//          element.bind( "click", function() {
//              advisoryData.push( { title: "Star Wars", author: "George Lucas" } );
//          });
//      }
//  }
//}]);