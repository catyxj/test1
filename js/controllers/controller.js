



mainApp.controller("tabController",function($scope){
	
})

mainApp.controller("dashboardController",function($scope){
	$scope.dashboardData = {
		currentNum:2226654,
		alarmNum:256,
		equipmentNum:554,
		totalNum:154445
	};
})

mainApp.controller("DatepickerDemoCtrl", ["$scope", function($scope){
  
 // grab today and inject into field
 
//  $scope.startTime = new Date();
//  $scope.endTime = new Date();
  	$scope.format = "yyyy-MM-dd";
  

  // open min-cal
  $scope.startopen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startopened = true;
  };
  $scope.endopen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.endopened = true;
  };
  
  

}]);









 mainApp.controller("viewCtrl",function($scope,productData){
//	$scope.p_size(4,productData);
	$scope.selectedPageSize(productData,4);
	
	
})

 mainApp.controller("productList",function($scope,productData){
//	$scope.p_size(6,productData);
	$scope.selected = 6;
	$scope.selectedPageSize(productData,6);
	
	
})


mainApp.controller("runtimedataController",function($scope,productDate){
	
})

mainApp.controller("historyController",function($scope){
	$scope.data = [
		{
			num:1,
			time:"2017-09-27 14:52:59",
			steamTemp:41.1,
			exhaustGasTemp:33.4
		},
		{
			num:2,
			time:"2017-09-27 14:55:59",
			steamTemp:43.7,
			exhaustGasTemp:33.4
		},
		{
			num:3,
			time:"2017-09-27 15:02:59",
			steamTemp:41.1,
			exhaustGasTemp:33.4
		},
		{
			num:4,
			time:"2017-09-27 15:02:59",
			steamTemp:41.1,
			exhaustGasTemp:33.4
		},{
			num:5,
			time:"2017-09-27 15:02:59",
			steamTemp:41.1,
			exhaustGasTemp:33.4
		}
	];
//	$scope.p_size(6,$scope.data);
$scope.selectedPageSize($scope.data,6);
})





mainApp.controller("alarmController",function($scope){
	$scope.alarm = [];
//	$scope.p_size(6,$scope.alarm);
$scope.selectedPageSize($scope.alarm,6);
})

mainApp.controller("maintainController",function($scope){
	$scope.maintain = [];
//	$scope.p_size(6,$scope.maintain);
$scope.selectedPageSize($scope.maintain,6);
})


mainApp.controller("alarmInfoController",function($scope){
	$scope.alarmInfo = [];
//	$scope.p_size(6,$scope.alarmInfo);
$scope.selectedPageSize($scope.alarmInfo,6);
	$scope.alarmMode = "current";
	$scope.setAlarm = function(m){
		$scope.alarmMode = m;
	};
})

mainApp.controller("advisoryController",function($scope){
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
})




mainApp.controller("maintainInfoController",function($scope){
	$scope.maintainInfo = [
		{
			num:1,
			time:"2017-09-22 12:43:48",
			content:"test",
			company:"系统",
			state:"1"
		}
	];
//	$scope.p_size(6,$scope.maintainInfo);
	$scope.selectedPageSize($scope.maintainInfo,6);	
})

