
mainApp.controller("configAlarmController",function($scope, $rootScope, $uibModal, $http){
		
	$scope.configAlarm = {};
	$http.get("alarm_rule_list.json").then(function(res){
		var datasource = res.data;
				
		var num = 0;
        angular.forEach(datasource, function(d, key) {
			d.num = ++num;
			var priorityTexts = ["低", "中", "高"];
			d.priortyText = priorityTexts[d.Priority];
			d.formName = d.BoilerForm ? d.BoilerForm.Name : " - ";
			d.mediumName = d.BoilerMedium ? d.BoilerMedium.Name.substring(0, d.BoilerMedium.Name.length - 2) : " - ";
			d.fuelName = d.BoilerFuelType ? d.BoilerFuelType.Name : " - ";
			d.warning = d.Warning > d.Normal ? " ＞ " + d.Warning : " ＜ " + d.Warning;
			//d.danger = d.Danger > 0 ? d.Danger : " - ";
			d.capacity = " 不限 ";
			if(d.BoilerCapacityMax > d.BoilerCapacityMin) {
				d.capacity = d.BoilerCapacityMin + " - " + d.BoilerCapacityMax;
			} else if(d.BoilerCapacityMin > 0) {
				d.capacity = d.BoilerCapacityMin;
			}
		});
		
		 $scope.configAlarm.datasource = datasource;
		 $scope.totalItems = $scope.configAlarm.datasource.length;
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

mainApp.controller('boilerCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;		   
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close($scope.data);
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
