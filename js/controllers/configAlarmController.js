
mainApp.controller("ConfigAlarmController",function($scope, $rootScope, $uibModal, $http){
	confAlarm = this;	
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
						
		
//      $scope.openAddModal = function() {
//      		var newdata = {};
//              var modalInstance = $uibModal.open({
//                  templateUrl : 'views/modal/modal-add-confalarm.html',
//                  controller : 'boilerCtrl',//modal对应的Controller
//                  size: '', //大小配置 
//                  resolve : {
//                      data : function() {//data作为modal的controller传入的参数	
//                      	newdata.priortyText = "中";
//                           return newdata;//用于传递数据
//                      }
//                  }
//              })
//         };
//         
//          $scope.openModal = function(data) { 
//          	var configData = angular.copy(data);
//              var modalInstance = $uibModal.open({
//                  templateUrl : 'views/modal/modal-add-confalarm.html',
//                  controller : 'boilerCtrl',//modal对应的Controller
//                  size: '', //大小配置 
//                  resolve : {
//                      data : function() {//data作为modal的controller传入的参数	
//                           return configData;//用于传递数据
//                      }
//                  }
//              })
//         
//          	modalInstance.opened.then(function() {// 模态窗口打开之后执行的函数
//                   console.log('modal is opened');
//               });
//               modalInstance.result.then(function(result) {                   
//                  data.priortyText = result.priortyText;
//                  data.Delay = result.Delay;
//	                 }, function(reason) {
//	                    console.log(reason);                                 
//	                 });
//          
//          };
//	
	
	 
	confAlarm.animationsEnabled = true;

    confAlarm.new = function () {
        currentData = null;
        confAlarm.open();
    };
    
    confAlarm.view = function (data) {
        currentData = data;        
        confAlarm.open();
        console.log(currentData);
    };

    confAlarm.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: confAlarm.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'directives/modal/alarm_rule_config.html',
            controller: 'ModalAlarmRuleCtrl',
            controllerAs: '$modal',
            size: size,
            appendTo: parentElem,
            windowClass: 'zindex',
        });

        modalInstance.result.then(function (selectedItem) {
            confAlarm.selected = selectedItem;
        }, function () {
           
        });
    };

    confAlarm.toggleAnimation = function () {
        confAlarm.animationsEnabled = !confAlarm.animationsEnabled;
    };
	

})

var confAlarm;
var currentData;


mainApp.controller('ModalAlarmRuleCtrl', function($scope, $uibModalInstance, $http) {
    var $modal = this;
    $modal.editing = false;

    $modal.title = "新建告警规则";

    $modal.boilerFormId = 0;
    $modal.boilerMediumId = 0;
    $modal.boilerFuelTypeId = 0;

    $modal.delay = 10;

    $modal.priority = 1;

    if (currentData) {
        $modal.editing = true;
        $modal.title = "编辑告警规则";

        $modal.paramId = currentData.Parameter.Id;
        $modal.boilerFormId = currentData.BoilerForm.Id;
        $modal.boilerMediumId = currentData.BoilerMedium.Id;
        $modal.boilerFuelTypeId = currentData.BoilerFuelType.Id;
        $modal.boilerCapacityMin = currentData.BoilerCapacityMin;
        $modal.boilerCapacityMax = currentData.BoilerCapacityMax;

        $modal.normalValue = currentData.Normal;
        $modal.warningValue = currentData.Warning;

        $modal.delay = currentData.Delay;
        $modal.priority = currentData.Priority;

        $modal.description = currentData.Description;
    }


    $modal.ok = function () {
        var uid = null;
        if (currentData) {
            uid = currentData.Uid;
        }
        $http.post("/alarm_rule_update/", {
            uid: uid,
            paramId: $modal.paramId,
            boilerFormId: $modal.boilerFormId,
            boilerMediumId: $modal.boilerMediumId,
            boilerFuelTypeId: $modal.boilerFuelTypeId,
            boilerCapacityMin: $modal.boilerCapacityMin,
            boilerCapacityMax: $modal.boilerCapacityMax,

            normalValue: parseFloat($modal.normalValue),
            warningValue: parseFloat($modal.warningValue),
            delay: parseInt($modal.delay),
            priority: $modal.priority,

            description: $modal.description
        }).then(function (res) {
            swal({
                title: "告警规则更新成功",
                type: "success"
            }).then(function () {
                $uibModalInstance.close('success');
                currentData = null;
                confAlarm.refreshDataTables();
            });
        }, function (err) {          
            swal({
                title: "告警规则更新失败",
                text: err.data,
                type: "error"
            });
        });
    };

    $modal.cancel = function () {
        $uibModalInstance.dismiss('cancel');

        currentData = null;
    };
    
    });



mainApp.directive("datatableConfigAlarm",function(){
	return {		
   		restrict:"E",
   		templateUrl:"directives/datatable_conf_alarm.html",
   		replace: true
		
 	}
})


