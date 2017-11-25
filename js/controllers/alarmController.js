
mainApp.controller("alarmInfoController",function($scope,$state,$uibModal,$http){
	
	
	$scope.mode = "current";
	$scope.setMode = function(mode){
		$scope.mode = mode;
	};
	
	$scope.statusTexts = {
        0: "默认",
        1: "新告警",
        2: "未查阅",
        3: "已查阅",
        4: "驳回",
        5: "已审核",
        10: "已关闭"
    };
	$scope.priorityIcons = {
        0: [0],
        1: [0, 1],
        2: [0, 1, 2]
    };


	$scope.alarm={};	
	$http.get("boiler_alarm_list.json")
	.then(function successCallback(response){
			$scope.alarm.datasource = response.data;			
			for (var i = 0; i <  $scope.alarm.datasource.length; i++) {
                    var d =  $scope.alarm.datasource[i];
                    d.num = i;
             };             
		}, function errorCallback(response){
			 $scope.alarm.error = response.error;
		});

	
	
	$scope.pageSize = 10;
	
   //历史告警列表
    $scope.alarm.historyData=[];
    $scope.refreshHistory = function() {
        var historyData = [];

        $http.get('boiler_alarm_history_list.json/')
            .then(function (res) {
                console.warn("Get Alarm History List:", res);
                historyData = res.data;
                for (var i = 0; i < historyData.length; i++) {
                    var d = historyData[i];
                    d.num = i;
                }

                $scope.alarm.historyData = historyData;

               
            });
    };
    $scope.refreshHistory();
    console.log($scope.alarm);
    
	
	
	$scope.confirm = function (uid) {
        $log.info("bAlarm.confirm:", uid);
        for (var i = 0; i < $scope.alarm.datasource.length; i++) {
            if ($scope.alarm.datasource[i].Uid === uid) {
                currentData = $scope.alarm.datasource[i];
                
                $log.info("bAlarm.confirm GET:", currentData);
                $scope.open('lg');
                break;
            }
        }
    };
	
	
	
	
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.alarmInfo.length; i++){
			if($scope.alarmInfo[i].num == id){
				$scope.alarmInfo.splice(i,1);
				break;
			}
		}
	}
	
	
	
	
	
	$scope.openModal = function(data) {
		var modalInstance = $uibModal.open({
			templateUrl: 'directives/modal/boiler_alarm_feedback.html', //script标签中定义的id
			controller: 'alarmModalCtrl', //modal对应的Controller
			size: 'lg', //大小配置 
			resolve: {
				data: function() { //data作为modal的controller传入的参数	
					return data; //用于传递数据
				}
			}
		});
		
		modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            
        });
	
	}
	
	

	
	
	
})



//模态框对应的Controller
mainApp.controller('alarmModalCtrl', function($scope, $uibModalInstance, data) {
          $scope.data= data;
          
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          };
                                     
          
    });
    
    


