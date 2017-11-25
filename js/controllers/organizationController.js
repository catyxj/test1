mainApp.controller("organizationController", function($scope, $rootScope, $uibModal, $http, $location) {
	organization = this;
	organization.isDone = false;
	organization.tid = 0;

	$rootScope.orgTypes = [{
		id: -1,
		name: "企业类型（请选择）"
	}, {
		id: 0,
		name: "默认企业"
	}, {
		id: 1,
		name: "锅炉制造厂"
	}, {
		id: 2,
		name: "用能企业"
	}, {
		id: 3,
		name: "安装企业"
	}, {
		id: 4,
		name: "政府机关"
	}, {
		id: 5,
		name: "监管部门"
	}];

	var p = $location.search();
	if(!p['tid'] || p['tid'].length === 0) {
		p['tid'] = "";
	} else {
		organization.tid = parseInt(p['tid']);
	}
	organization.titles = [
		'企业总表',
		'锅炉制造厂列表',
		'用能企业列表',
		'安装企业列表',
		'政府机关列表',
		'监管部门列表'
	];

	$scope.organization = [];
	$http.get("organization_list.json/?tid=' + organization.tid")
		.then(function(res) {
			$scope.organization = res.data;
			$scope.totalItems = $scope.organization.length;
			var num = 0;
			angular.forEach($scope.organization, function(d, key) {
				d.num = ++num;
			}, function(err) {
				console.error('Get Organization List Error', err);
			});
		})

	$scope.pageSize = 10;

	$scope.openModal = function() {
		var newdata = {};
		newdata.title = "新增企业信息";
		var modalInstance = $uibModal.open({
			templateUrl: 'directives/modal/organization_detail.html', //script标签中定义的id
			controller: 'organizationCtrl', //modal对应的Controller
			size: 'lg', //大小配置 
			resolve: {
				data: function() { //data作为modal的controller传入的参数                        		
					return newdata; //用于传递数据
				}
			}
		})

		modalInstance.opened.then(function() { // 模态窗口打开之后执行的函数
			console.log('modal is opened');
		});
		modalInstance.result.then(function(result) {
			$scope.organization.push({
				name: result.name,
				Address: {
					Address: result.Address.Address,
				},
			});
			//						console.log(result);
		}, function(reason) {
			console.log(reason);
		});

	}

	$scope.editModal = function(data) {
		var orgData = angular.copy(data);
		orgData.title = "企业信息";
		var modalInstance = $uibModal.open({
			templateUrl: 'directives/modal/organization_detail.html', //script标签中定义的id
			controller: 'organizationCtrl', //modal对应的Controller
			size: 'lg', //大小配置 
			resolve: {
				data: function() { //data作为modal的controller传入的参数                        		
					return orgData; //用于传递数据
				}
			}
		})

		modalInstance.result.then(function(selectedItem) {
			data.name = selectedItem.name;
			data.Address.Address = selectedItem.Address.Address;

		}, function() {

		});

	}

	$scope.removeData = function(d) {
		swal({
	            title: "确认删除该企业？\n" + d.name,
	            text: "注意：删除后将无法恢复，且企业相关用户会一并删除。",
	            type: "warning",
	            showCancelButton: true,
	            confirmButtonColor: "#d33",
	            cancelButtonText: "取消",
	            confirmButtonText: "删除",
	           
	        }).then(function(isConfirm){
	        	 if(isConfirm === true)  
                    {                         
                        for(var i = 0; i < $scope.organization.length; i++) {
							if($scope.organization[i].num == d.num) {
								$scope.organization.splice(i, 1);
								$scope.totalItems = $scope.organization.length;   
								console.log($scope.totalItems);
								console.log(i);
							}
						}
                        swal({title:"删除成功！",  
                            text:"您已经永久删除了这条信息。",  
                            type:"success"});
                      
                    } else{
                    	
                    }
	        	
	        })
//		for(var i = 0; i < $scope.organization.length; i++) {
//			if($scope.organization[i].num == id) {
//				
////				var r = confirm("确认删除 " + $scope.organization[i].name + "？")
////				if(r == true) {
////					$scope.organization.splice(i, 1);
////					$scope.totalItems = $scope.organization.length;
////				} else {
////					break;
////				}
//							
//			}
//		}
	}

})

mainApp.controller('organizationCtrl', function($scope, $rootScope, $uibModalInstance, data) {
	$scope.data = data;

	//在这里处理要进行的操作
	$scope.ok = function() {
		$uibModalInstance.close($scope.data);
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	}
});

mainApp.directive("datatableOrganization", function() {
	return {
		restrict: "E",
		templateUrl: "directives/datatable_organization.html",
		replace: true

	}
})