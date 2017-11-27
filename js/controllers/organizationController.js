mainApp.controller("OrganizationController", function($scope, $rootScope, $uibModal, $http, $location) {
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

	organization.new = function () {        
        currentData = null;
        editing = true;
        organization.open();
    };

    organization.edit = function (uid) {        
        for (var i = 0; i < $scope.organization.length; i++) {
            if ($scope.organization[i].Uid === uid) {
                currentData = $scope.organization[i];
                editing = true;               
                organization.open();
                break;
            }
        }
    };

    organization.view = function (uid) {
        
        for (var i = 0; i < $scope.organization.length; i++) {
            if ($scope.organization[i].Uid === uid) {
                currentData = $scope.organization[i];
                editing = false;
                
                organization.open();
                break;
            }
        }
    };

	

//	$scope.openModal = function() {
//		currentData = null;
//      editing = true;
//		var parentElem = parentSelector ?
//          angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
//		var newdata = {};
//		newdata.title = "新增企业信息";
//		var modalInstance = $uibModal.open({
//			templateUrl: 'directives/modal/organization_detail.html', //script标签中定义的id
//			controller: 'organizationCtrl', //modal对应的Controller
//			size: 'lg', //大小配置 
//			resolve: {
//				data: function() { //data作为modal的controller传入的参数                        		
//					return newdata; //用于传递数据
//				}
//			}
//		})
//
//		modalInstance.opened.then(function() { // 模态窗口打开之后执行的函数
//			console.log('modal is opened');
//		});
//		modalInstance.result.then(function(result) {
//			$scope.organization.push({
//				name: result.name,
//				Address: {
//					Address: result.Address.Address,
//				},
//			});
//			//						console.log(result);
//		}, function(reason) {
//			console.log(reason);
//		});
//
//	}
//
//	$scope.editModal = function(data) {
//		var orgData = angular.copy(data);
//		orgData.title = "企业信息";
//		var modalInstance = $uibModal.open({
//			templateUrl: 'directives/modal/organization_detail.html', //script标签中定义的id
//			controller: 'ModalOrganizationCtrl', //modal对应的Controller
//			size: 'lg', //大小配置 
//			resolve: {
//				data: function() { //data作为modal的controller传入的参数                        		
//					return orgData; //用于传递数据
//				}
//			}
//		})
//
//		modalInstance.result.then(function(selectedItem) {
//			data.name = selectedItem.name;
//			data.Address.Address = selectedItem.Address.Address;
//
//		}, function() {
//
//		});
//
//	}
	
	organization.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'directives/modal/organization_detail.html',
            controller: 'ModalOrganizationCtrl',
            controllerAs: '$modal',
            size: size,
            appendTo: parentElem,
            windowClass: 'zindex',
        });

        modalInstance.result.then(function (selectedItem) {
           
        }, function () {
           
        });
    };



	$scope.removeData = function (o) {
        swal({
            title: "确认删除该企业？\n" + o.Name,
            text: "注意：删除后将无法恢复，且企业相关用户会一并删除。",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonText: "取消",
            confirmButtonText: "删除",
            closeOnConfirm: false
        }).then(function () {
            $http.post("/organization_delete/", {
                uid: o.Uid
            }).then(function (res) {
                swal({
                    title: "企业删除成功",
                    type: "success"
                }).then(function () {
                    organization.refreshDataTables();
                });
            }, function (err) {
                swal({
                    title: "企业删除失败",
                    text: err.data,
                    type: "error"
                });
            });
        });
    };

//	$scope.removeData = function(o) {		
//		for(var i = 0; i < $scope.organization.length; i++) {
//			if($scope.organization[i].num == id) {				
//				var r = confirm("确认删除 " + $scope.organization[i].name + "？")
//				if(r == true) {
//					$scope.organization.splice(i, 1);
//					$scope.totalItems = $scope.organization.length;
//				} else {
//					break;
//				}							
//			}
//		}
//	}

})

var organization;
var currentData;
var editing;

mainApp.controller('ModalOrganizationCtrl', function($scope, $rootScope, $uibModalInstance,  $http) {
//	$scope.data = data;
//
//	//在这里处理要进行的操作
//	$scope.ok = function() {
//		$uibModalInstance.close($scope.data);
//	};
//	$scope.cancel = function() {
//		$uibModalInstance.dismiss('cancel');
//	}

	 var $modal = this;
    $modal.editing = editing;
    $modal.org = currentData;
    $modal.title = "新增企业信息";
    $modal.typeId = -1;

    $modal.isSuper = false;
    $modal.supervisor = null;

    $modal.showBrand = false;
    $modal.brandName = "";

//  $modal.aProvince = $rootScope.locations[0];
//  $modal.aProvince.Name = "所在区域";
//  $modal.location = $modal.aProvince;
//
//  $modal.changeProvince = function () {
//      $modal.location = $modal.aProvince;
//      
//  };
//
//  $modal.changeCity = function () {
//      $modal.location = $modal.aCity;
//      // dashboard.filterBoilers();
//  };
//
//  $modal.changeRegion = function () {
//      $modal.location = $modal.aRegion;
//      // dashboard.filterBoilers();
//  };
//
//  var getLocation = function (locationId, locationList, locationScope) {
//      for (var pi = 0; pi < locationList.length; pi++) {
//          var local = locationList[pi];
//          if (local.LocationId === Math.floor(locationId / 10000) ||
//              local.LocationId === Math.floor(locationId / 100) ||
//              local.LocationId === locationId) {
//              switch (locationScope) {
//                  case "province":
//                      $modal.aProvince = local;
//                      break;
//                  case "city":
//                      $modal.aCity = local;
//                      break;
//                  case "region":
//                      $modal.aRegion = local;
//                      break;
//              }
//              break;
//          }
//      }
//
//      if (locationId < 100) {
//          return;
//      }
//
//      switch (locationScope) {
//          case "province":
//              getLocation(locationId, $modal.aProvince.cities, "city");
//              break;
//          case "city":
//              getLocation(locationId, $modal.aCity.regions, "region");
//              break;
//          case "region":
//              break;
//      }
//  };

    if (currentData) {
        $modal.title = "企业信息";
        $modal.name = currentData.Name;
        $modal.typeId = currentData.Type.TypeId;
        $modal.address = currentData.Address.Address;
        $modal.location = currentData.Address.Location;

        $modal.showBrand = currentData.ShowBrand;
        $modal.brandName = currentData.BrandName;

        $modal.isSuper = currentData.IsSupervior;
        $modal.supervisor = currentData.SuperOrganization;

//      var locationId = $modal.location.LocationId;
//      getLocation(locationId, $rootScope.locations, "province");
    }



    $modal.ok = function () {
        Ladda.create(document.getElementById('boiler_ok')).start();
        var uid = "";        
        var postData = {
            uid: uid,
            name: $modal.name,
            type_id: $modal.typeId,
            address: $modal.address,
            location_id: $modal.location.LocationId,
            generate_sample_boilers: false,
            generate_sample_data: false
        };
        if ($rootScope.currentUser.Role.RoleId <= 2) {
            postData.show_brand = $modal.showBrand;
            postData.brand_name = $modal.brandName;

            postData.is_super = $modal.isSuper;
            postData.supervisor = $modal.supervisor;
        }

        if (!currentData && (postData.type_id === 1 || postData.type_id === 2)) {
            swal({
                title: "是否为该企业创建示例锅炉？",
                text: "将创建燃煤锅炉、燃气锅炉、生物质锅炉、热水锅炉各一台。注意：所创建的锅炉将录入正式锅炉信息中，如需移除，请在锅炉信息列表中进行删除，或联系平台管理员协助操作。",
                type: "question",
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            }).then(function () {
                postData.generate_sample_boilers = true;
                swal({
                    title: "是否为生成示例数据？",
                    text: "示例数据旨在展示平台的数据采集分析流程，不可作为锅炉运行状态检查和故障诊断使用，如需关闭，请联系平台管理员进行关闭。",
                    type: "question",
                    showCancelButton: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(function () {
                    postData.generate_sample_data = true;
                    post(postData);
                }, function () {
                    postData.generate_sample_data = false;
                    post(postData);
                });
            }, function () {
                postData.generate_sample_boilers = false;
                postData.generate_sample_data = false;
                post(postData);
            });
        } else {
            post(postData);
        }

    };

    var post = function (data) {
        $http.post("/organization_update/", data)
            .then(function (res) {
                organization.refreshDataTables();
                if (data.generate_sample_boilers) {
                    $rootScope.getBoilerList();
                }
                swal({
                    title: "企业信息提交成功",
                    type: "success"
                }).then(function () {
                    $uibModalInstance.close('success');
                    currentData = null;
                });
            }, function (err) {
                swal({
                    title: "企业信息提交失败",
                    text: err.data,
                    type: "error"
                });
            });
        Ladda.create(document.getElementById('boiler_ok')).stop();
    };

    $modal.cancel = function () {
        $uibModalInstance.dismiss('cancel');

        currentData = null;
    };


});

mainApp.directive("datatableOrganization", function() {
	return {
		restrict: "E",
		templateUrl: "directives/datatable_organization.html",
		replace: true

	}
})