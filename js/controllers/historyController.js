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


