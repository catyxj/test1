
mainApp.controller("userAccountController",function($scope, $rootScope,$http, $uibModal,$filter){
	bAccount = this;
    bAccount.isDone = false;	
	
	$scope.$on('$viewContentLoaded', function() {
        // initialize core components
//      App.initAjax();

        $http.get('user_roles.json/')
            .then(function (res) {
                bAccount.roles = res.data;
                bAccount.init();
            }, function (err) {
                console.error("Get Roles List Err: ", err);
            });

        // set default layout mode
//      $rootScope.settings.layout.pageContentWhite = true;
//      $rootScope.settings.layout.pageBodySolid = true;
//      $rootScope.settings.layout.pageSidebarClosed = false;
    });
	
	
	bAccount.editing = false;	
	bAccount.status = [
        //{id: -1, name: "新用户", hidden: true},
        {id: 0, name: "未激活", hidden: true},
        {id: 1, name: "通常"},
        {id: 2, name: "禁用"}
    ];
	
 	bAccount.refreshDataTables = function () {
        $http.get('user_list.json/')
            .then(function (res) {
                var data = res.data;

                var num = 0;
                angular.forEach(data, function (d, key) {
                    d.num = ++num;
                    d.stat = bAccount.status[d.Status];
                });

                bAccount.datasource = data;
				$scope.pageSize = 10;
				$scope.totalItems = bAccount.datasource.length;
				
				
                bAccount.isDone = true;
                setTimeout(function () {
                    App.stopPageLoading();
                }, 1500);
            });
    };

	$scope.rowCallback  = function(Data) {
        // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
       bAccount.editing = false;
            bAccount.currentData = Data;
            bAccount.currentData.aName = bAccount.currentData.Name;
            bAccount.currentData.aPassword = "";
            bAccount.currentData.resetPassowrd = false;
            bAccount.currentData.aRole = bAccount.currentData.Role.RoleId;
            bAccount.currentData.aStat = bAccount.currentData.Status;
            bAccount.currentData.aOrg = bAccount.currentData.Organization ? bAccount.currentData.Organization.Uid : "";
            $scope.$apply(function() {
                someClickHandler(bAccount.currentData);
            });
            console.log(bAccount.currentData);
            alert("row");
    }


	var someClickHandler = function(info) {
        bAccount.message = info.Uid + ' - ' + info.Name;
    };
    
    bAccount.init = function () {
        bAccount.aRoles = [];
        if ($rootScope.currentUser.Role.RoleId < 10) {
            angular.forEach(bAccount.roles, function (d, key) {
                if (d.RoleId > $rootScope.currentUser.Role.RoleId) {
                    bAccount.aRoles.push({ id: d.RoleId, name: d.Name });
                }
            });
        }

        if (Math.floor($rootScope.currentUser.Role.RoleId / 10) === 1) {
            angular.forEach(bAccount.roles, function (d, key) {
                if (d.RoleId > $rootScope.currentUser.Role.RoleId && d.RoleId < 20) {
                    bAccount.aRoles.push({ id: d.RoleId, name: d.Name });
                }
            });
        }

        if ($rootScope.currentUser.Role.RoleId >= 20) {
            angular.forEach(bAccount.roles, function (d, key) {
                if (d.RoleId >= $rootScope.currentUser.Role.RoleId) {
                    bAccount.aRoles.push({ id: d.RoleId, name: d.Name });
                }
            });
        }
    };
    
    
    bAccount.aStatus = [];

    bAccount.editRow = function() {
        if (!bAccount.currentData) {
            return;
        }

        bAccount.editing = true;
    };

    bAccount.new = function () {
        bAccount.currentData = null;
        bAccount.open();
    };
    bAccount.isOrgs = function () {
        return bAccount.currentData && Math.floor(bAccount.currentData.aRole / 10) === 1;
    };

    bAccount.activeRow = function() {
        var aData = bAccount.currentData;

        $http.post("/user_active/", {
            uid: aData.Uid
        }).then(function (res) {
            swal({
                title: "用户" + aData.Username + "激活成功",
                type: "success"
            }).then(function () {
                bAccount.refreshDataTables();
            });
        }, function (err) {
            swal({
                title: "用户" + aData.Username + "激活失败",
                text: err.data,
                type: "error"
            });
        });

        //oTable.fnDraw();
    };

    bAccount.resetPassword = function () {
        if (bAccount.currentData) {
            bAccount.currentData.resetPassword = true;
        }
    };

    bAccount.deleteRow = function() {
        var aData = bAccount.currentData;
        swal({
            title: "确认删除用户" + aData.Username + "？",
            text: "注意：删除后将无法恢复",
            type: "warning",
            showCancelButton: true,
            //confirmButtonClass: "btn-danger",
            confirmButtonColor: "#d33",
            cancelButtonText: "取消",
            confirmButtonText: "删除",
            closeOnConfirm: false
        }).then(function () {
            $http.post("/user_delete/", {
                uid: aData.Uid
            }).then(function (res) {
                bAccount.refreshDataTables();
                swal({
                    title: "用户" + aData.Username + "删除成功",
                    type: "success"
                }).then(function () {
                    // var idx = bAccount.datasource.indexOf(aData);
                    // if (idx > -1) {
                    //     bAccount.datasource.splice(idx, 1);
                    // }

                });
            }, function (err) {
                swal({
                    title: "删除用户失败",
                    text: err.data,
                    type: "error"
                });
            });
        });


        //oTable.fnDraw();
    };

    bAccount.resetRow = function () {
        bAccount.editing = false;
        bAccount.currentData.aName = bAccount.currentData.Name;
        bAccount.currentData.aPassword = "";
        bAccount.currentData.resetPassowrd = false;
        bAccount.currentData.aRole = bAccount.currentData.Role.RoleId;
        bAccount.currentData.aStat = bAccount.currentData.Status;
        bAccount.currentData.aOrg = bAccount.currentData.Organization ? bAccount.currentData.Organization.Uid : "";
    };

    bAccount.saveRow = function() {
        var aData = bAccount.currentData;

        var org = '';
        if (bAccount.isOrgs()) {
            org = aData.aOrg;
        }

        var data = {
            uid: aData.Uid,
            //username: username,
            fullname: aData.aName,
            role: aData.aRole,
            stat: aData.aStat,
            org: org
        };

        if (aData.aPassword && aData.aPassword.length > 0) {
            data.password_new = aData.aPassword;
        }

        $http.post("/user_update/", data)
            .then(function (res) {
                bAccount.refreshDataTables();
                swal({
                    title: "用户" + aData.Username + "信息修改成功",
                    type: "success"
                }).then(function () {

                });
        }, function (err) {
            swal({
                title: "修改用户信息失败",
                text: err.data,
                type: "error"
            });
        });
    };

    bAccount.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'directives/modal/user_account_info.html',
            controller: 'ModalAccountCtrl',
            controllerAs: '$modal',
            size: size,
            appendTo: parentElem,
            windowClass: 'zindex',
            resolve: {
                currentData: function () {
                    return bAccount.currentData;
                },
                roles: function () {
                    return bAccount.aRoles;
                }
            }
        });
    };
    
    
    
	bAccount.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'directives/modal/user_account_info.html',
            controller: 'ModalAccountCtrl',
            controllerAs: '$modal',
            size: size,
            appendTo: parentElem,
            windowClass: 'zindex',
            resolve: {
                currentData: function () {
                    return bAccount.currentData;
                },
                roles: function () {
                    return bAccount.aRoles;
                }
            }
        });
    };
		
		
	
		var newdata = {};
        $scope.openModal = function() {       	
                var modalInstance = $uibModal.open({
                    templateUrl : 'views/modal/modal-add-user.html',//script标签中定义的id
                    controller : 'userCtrl',//modal对应的Controller
                    size: '', //大小配置 
                    resolve : {                   	
                        data : function() {//data作为modal的controller传入的参数                        	                	                       			
                             return $scope.userAccount;//用于传递数据
                        }
                    }
                })
            }
					
})
var bAccount;
mainApp.controller('userCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		  
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    

mainApp.controller('ModalAccountCtrl', function ($uibModalInstance, $rootScope, $http, $log, currentData, roles) {
    var $modal = this;
    $modal.data = {};
//  $modal.roles = roles;
//  console.warn("init ModalAccountCtrl with roles:", roles);
//  if ($modal.roles.length === 1 && $modal.roles[0]) {
//      $modal.data.role = $modal.roles[0].id;
//  }
//  if (Math.floor($rootScope.currentUser.Role.RoleId / 10) === 1) {
//      $modal.data.org = $rootScope.currentUser.Organization.Uid;
//  }

    $modal.ok = function () {
        Ladda.create(document.getElementById('boiler_ok')).start();
        $modal.data.uid = "";
        $http.post("/user_update/", $modal.data)
            .then(function (res) {
                bAccount.refreshDataTables();
                swal({
                    title: "用户" + $modal.data.username + "添加成功",
                    type: "success"
                }).then(function () {
                    $uibModalInstance.dismiss('cancel');
                });
            }, function (err) {
                swal({
                    title: "添加用户失败",
                    text: err.data,
                    type: "error"
                });
            });
        Ladda.create(document.getElementById('boiler_ok')).stop();
    };

    $modal.delete = function () {

    };

    $modal.cancel = function () {
        $uibModalInstance.dismiss('cancel');

        currentData = null;
    };
});

// Please note that the close and dismiss bindings are from $uibModalInstance.
mainApp.component('modalComponent', {
    templateUrl: '/directives/modal/terminal_config.html',
    bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
    },
    controller: function () {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            // $ctrl.items = $ctrl.resolve.items;
            // $ctrl.selected = {
            //     item: $ctrl.items[0]
            // };
        };

        $ctrl.ok = function () {
            // $ctrl.close({$value: $ctrl.selected.item});
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }
});
