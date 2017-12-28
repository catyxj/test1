
mainApp.controller("configParamController",function($scope, $rootScope, $uibModal,$http){
	
	
	$scope.configparamData = {};
	$http.get("runtime_parameters.json").then(function(res){
		var datasource = res.data;
		
		angular.forEach(datasource, function (d, key) {                   
                    d.name = d.Name;
                    angular.forEach(d.BoilerMediums, function (boiler, key) {
                        boiler.Name = boiler.Name.substring(0, boiler.Name.length - 2);
                    });
                });
		
		$scope.configparamData.datasource=datasource;
		$scope.totalItems = $scope.configparamData.datasource.length;
	})
	
	
	$scope.pageSize = 10;
	
	
						
		
        $scope.openAddModal = function() {
        	var newdata = {};
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-add-confalarm.html',
                    controller : 'boilerCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                             return newdata;//用于传递数据
                        }
                    }
                })
           }		
	
})

mainApp.controller('boilerCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		  $scope.configAlarm = configAlarmData;
		  
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
