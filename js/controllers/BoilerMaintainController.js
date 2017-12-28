mainApp.controller("BoilerMaintainController",function($scope, $uibModal,$http,$rootScope, $location){
	bMaintain = this;

    bMaintain.isDone = false;
	
	bMaintain.getBoilers = function () {
        bMaintain.boilers = [];
        for (var i = 0; i < $rootScope.boilers.length; i++) {
            var d = $rootScope.boilers[i];
            d.name = d.Name;
            if (d.Enterprise) {
                d.ent = d.Enterprise.Name;
            } else {
                d.ent = "";
            }

            bMaintain.boilers.push(d);
        }
    };

    $rootScope.$watch('boilers', function () {
        bMaintain.getBoilers();
    });
	
	
	var stringToInts = function (str) {
        var ar = str.split(',');
        for(var i = 0; i < ar.length; i++) {
            ar[i] = +ar[i];
        }
        return ar;
    };
	
	var p = $location.search();
	console.info("ready to Get Maintain:", p);
	$http.get("boiler_maintain_list.json/?boiler=" + p["boiler"]).then(function(res){
		var datasource = res.data;
		
		var num = 0;
        angular.forEach(datasource, function (d, key) {
                    d.num = ++num;
                    d.summary = d.Content;
                    if (d.summary.length > 26) {
                        d.summary = d.summary.substring(0, 26) + "...";
                    }
                    d.status = {
                        burner: stringToInts(d.Burner),                 // 燃烧器
                        importGrate: stringToInts(d.ImportGrate),       // 进料及炉排
                        waterSoftener: stringToInts(d.WaterSoftener), 	// 软水器
                        waterPump: stringToInts(d.WaterPump), 	        // 水泵
                        boilerBody: stringToInts(d.BoilerBody),         // 锅炉本体
                        energySaver: stringToInts(d.EnergySaver),	    // 节能器
                        airPreHeater: stringToInts(d.AirPreHeater),	    // 空预器
                        dustCatcher: stringToInts(d.DustCatcher),	    // 除尘器
                        draughtFan: stringToInts(d.DraughtFan)	        // 引风机
                    };
        });

		$scope.maintainInfo=datasource;
		$scope.isDone = true;
		
		$scope.pageSize = 10;
		$scope.totalItems = $scope.maintainInfo.length;
	});
	
	

	
	
	
	var data = [];
	
	$scope.openModal = function(data) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'directives/modal/boiler_maintain_detail.html',//script标签中定义的id
                    controller : 'modalCtrl',//modal对应的Controller
                    controllerAs: '$modal',
                    size: 'lg', //大小配置 
                    resolve : {
                        currentData : function() {//data作为modal的controller传入的参数                      		
                             return data;//用于传递数据
                        }
                    }
                })
          };
    $scope.addOpenModal = function() {   	
                var modalInstance = $uibModal.open({
                    templateUrl : 'directives/modal/boiler_maintain_detail.html',//script标签中定义的id
                    controller : 'modalCtrl',//modal对应的Controller
                    controllerAs: '$modal',
                    size: 'lg', //大小配置 
                    resolve : {
                        currentData : function() {//data作为modal的controller传入的参数   
                        	var newData = null;                        	
                             return newData;//用于传递数据
                        }
                    }
                });
                modalInstance.opened.then(function() {// 模态窗口打开之后执行的函数
                     console.log('modal is opened');
                 });
                 modalInstance.result.then(function(result) {
                    
                                      
                 }, function(reason) {
                    console.log(reason);                                 
                 });
                
                
                
          };
    
    



	$scope.delete = function (uid) {
        swal({
            title: "确认删除该记录？",
            text: "注意：删除后将无法恢复",
            type: "warning",
            showCancelButton: true,
            //confirmButtonClass: "btn-danger",
            confirmButtonColor: "#d33",
            cancelButtonText: "取消",
            confirmButtonText: "删除",
            closeOnConfirm: false
        }).then(function () {
            $http.post("/boiler_maintain_delete/", {
                uid: uid
            }).then(function (res) {
                swal({
                    title: "维保记录删除成功",
                    type: "success"
                }).then(function () {
                    bMaintain.refreshDataTables();
                });
            }, function (err) {
                swal({
                    title: "删除记录失败",
                    text: err.data,
                    type: "error"
                });
            });
        });

    };


	
})


var bMaintain;

//模态框对应的Controller
mainApp.controller('modalCtrl', function($scope, $uibModalInstance, currentData) {
          	var $modal = this;
          	$modal.currentData = currentData;
          	$modal.boilers = bMaintain.boilers;
          	$modal.today = function() {
		        $modal.inspectDate = new Date();
		    };
		    
		    
		    $modal.maintainDetail = {
		        burner: [0, 0, 0, 0, 0, 0, 0],  // 燃烧器
		        importGrate: [0, 0, 0, 0, 0, 0, 0],	// 进料及炉排
		        waterSoftener: [0, 0, 0],	// 软水器
		        waterPump: [0, 0, 0, 0],	// 水泵
		        boilerBody: [0, 0, 0, 0, 0, 0],// 锅炉本体
		        energySaver: [0, 0, 0],	// 节能器
		        airPreHeater: [0, 0, 0],	// 空预器
		        dustCatcher: [0, 0, 0],	// 除尘器
		        draughtFan: [0, 0, 0],	// 引风机
		    };
		
		    if (currentData) {
		        $modal.title = "编辑参数";
		        $modal.editing = true;
		
		        $modal.boilerId = currentData.Boiler.Uid;
		        $modal.inspectDate = new Date(currentData.InspectDate);
		        $modal.content = currentData.Content;
		        $modal.maintainDetail = currentData.status;
		    } else {
		        $modal.today();
		    }
		    		    		    		    
			$modal.detailindex = 1;
		    $modal.setIndex = function (idx) {
		        $modal.detailindex = idx;
		    };
		    
			//日期选择
			$scope.dat = new Date();
	        $scope.format = "yyyy/MM/dd";
	        $scope.altInputFormats = ['yyyy/M!/d!'];
	 
	        $scope.popup2 = {
	            opened: false
	        };
	        $scope.open2 = function () {
	            $scope.popup2.opened = true;
	        };
		
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    
mainApp.directive("datatableMaintain",function(){
	return {		
   		restrict:"E",
   		templateUrl:"directives/datatable_maintain.html",
   		replace: true
		
 	}
})