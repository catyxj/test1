
mainApp.controller("configAlarmController",function($scope, $rootScope, $uibModal, configAlarmData){
	
	
	$scope.configAlarm = configAlarmData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.configAlarm.datasource.length;
	
						
		
        $scope.openAddModal = function() {
        		var newdata = {};
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-add-confalarm.html',
                    controller : 'boilerCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                        	newdata.priortyText = "中";
                             return newdata;//用于传递数据
                        }
                    }
                })
           };
           
            $scope.openModal = function(data) { 
            	var configData = angular.copy(data);
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-add-confalarm.html',
                    controller : 'boilerCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                             return configData;//用于传递数据
                        }
                    }
                })
           
            	modalInstance.opened.then(function() {// 模态窗口打开之后执行的函数
                     console.log('modal is opened');
                 });
                 modalInstance.result.then(function(result) {                   
                    data.priortyText = result.priortyText;
                    data.Delay = result.Delay;
	                 }, function(reason) {
	                    console.log(reason);                                 
	                 });
            
            };
	
})

mainApp.controller('boilerCtrl', function($scope,$rootScope, $uibModalInstance, data,configAlarmData) {
          $scope.data= data;
		  $scope.configAlarmData=configAlarmData;	  
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close($scope.data);
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
