
mainApp.controller("boilerController",function($scope, $rootScope, $uibModal,productData){
	
	
	$scope.productData = productData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.productData.length;
	
						
		
        $scope.openModal = function() {  
        		var newdata = {};
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-boiler.html',
                    controller : 'boilerCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                             return newdata;//用于传递数据
                        }
                    }
                })
            }
	
	
	
	
	
//	var someClickHandler = function(info) {
//      bInfo.message = info.Uid + ' - ' + info.Name;
//      $state.go("boiler.info", {boiler: info.Uid, from: 'boiler-list'});
//  };
//	
//	$scope.viewInfo = function (data) {
//      console.warn("Boiler View Uid:", data);
//      bInfo.currentData = data;
//      bInfo.setMode('edit');
//      
//      someClickHandler(bInfo.currentData);
//  };
//  bInfo.setMode = function (mode) {
//      bInfo.dataMode = mode;
//  };
//var someClickHandler = function(info) {
//      bInfo.message = info.Uid + ' - ' + info.Name;
//      $state.go("boiler.info", {boiler: info.Uid, from: 'boiler-list'});
//  };	
	
	
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.productData.length; i++){
			if($scope.productData[i].num == id){
				$scope.productData.splice(i,1);
				break;
			}
		}
	}
	
	
	
})

mainApp.controller('boilerCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		 
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    

mainApp.directive("tableBoilerInfo",function(){
	return {		
   		restrict:"E",
   		templateUrl:"directives/table_boiler-info.html",
   		replace: true
		
   	}
})


mainApp.controller("boilerInfoCtrl",function($scope,$stateParams,productData){
	$scope.info = $stateParams.bilierInfo;
	
})

