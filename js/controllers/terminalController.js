
mainApp.controller("terminalController",function($scope, $rootScope, $uibModal,$http){
	
	
	$scope.terminal = {};
	$http.get("terminal_list.json").then(function(res){
		var datasource = res.data;
		var num = 0;               
        angular.forEach(datasource, function (d, key) {
                    d.num = ++num;
                    d.code = d.TerminalCode.toString();
                    if (d.code.length < 6) {
                        for (var l = d.code.length; l < 6; l++) {
                            d.code = "0" + d.code;
                        }
                    }
                    d.simNum = d.SimNumber.length > 0 ? d.SimNumber : " - ";
                    d.ip = d.LocalIp.length > 0 ? d.LocalIp : " - ";
                    d.online = d.IsOnline ? "在线" : "离线";

//                  if (currentData && currentData.Uid === d.Uid) {
//                      currentData = d;
//                  }
                });

		$scope.terminal.datasource = datasource;
		$scope.totalItems = $scope.terminal.datasource.length;
	});
	
	$scope.pageSize = 10;
	
	
						
		var newdata = {};
        $scope.openAddModal = function() {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-terminal.html',
                    controller : 'terminalCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                             return newdata;//用于传递数据
                        }
                    }
                })
           };
           
         $scope.openSetModal = function(data) {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-set-terminal.html',
                    controller : 'terminalCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数	
                             return data;//用于传递数据
                        }
                    }
                })
            };   
	
	
	
	
	
	
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.terminal.length; i++){
			if($scope.terminal[i].num == id){
				$scope.terminal.splice(i,1);
				break;
			}
		}
	}
	
	
	
})

mainApp.controller('terminalCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		 
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    


