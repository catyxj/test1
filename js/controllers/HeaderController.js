/**
 * Created by JeremiahYan on 2017/6/5.
 */

var app = angular.module('BoilerAdmin');

/* Setup Layout Part - Header */
app.controller('HeaderController', ['$rootScope', '$scope', '$http', '$cookies',  "$location", "$window", '$uibModal', '$log', function($rootScope, $scope, $http, $cookies, $location, $window, $uibModal, $log) {
    header = this;

    console.warn("Header init!");

//  $scope.$on('$includeContentLoaded', function() {
//      Layout.initHeader(); // init header
//
//      $rootScope.getCurrentUser(header.refresh);
//  });

//  $rootScope.getCurrentUser = function (fn) {
//      
//      $http.get('/user')
//          .then(function (res) {
//              $rootScope.currentUser = res.data;
//
//              if (fn !== null && fn !== undefined) {
//                  fn();
//              }
//          });
//  };

//  $rootScope.isOrgs = function () {
//      if ($rootScope.currentUser === null ||
//          $rootScope.currentUser === undefined ||
//          $rootScope.currentUser.Uid === undefined) {
//          return false;
//      }
//
//      return Math.floor($rootScope.currentUser.Role.RoleId / 10) === 1;
//  };

    header.openLogin = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/directives/modal/user-login-third.html',
            controller: 'ModalLoginCtrl',
            controllerAs: '$modal',
            size: size,
            appendTo: parentElem,
            windowClass: 'zindex',
            // resolve: {
            //     items: function () {
            //         return dialogue.items;
            //     }
            // }
        });
    };

    header.openSignup = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/directives/modal/user-signup-third.html',
            controller: 'ModalLoginCtrl',
            controllerAs: '$modal',
            size: size,
            appendTo: parentElem,
            windowClass: 'zindex',
            // resolve: {
            //     items: function () {
            //         return dialogue.items;
            //     }
            // }
        });
    };

    header.refresh = function () {
        //alert($cookies.get('isLogin') + "|" + $cookies.get('username') + "（" + getUserRole() + "）");
        if ((!$rootScope.currentUser || !$rootScope.currentUser.Uid) &&
            $rootScope.currentUser.Status !== 3) {
            console.error("CurrentUser is NULL!", $rootScope.currentUser);
            header.loginName = "登录";
            return;
        }

        var loginInfo = $rootScope.currentUser.Name;//$cookies.get('username');
        var loginRole = $rootScope.currentUser.Role.Name;
        var loginStat = "";
        if ($rootScope.currentUser.Status === 0) {
            loginStat = "未激活";
            loginInfo += "（" + loginRole + " | " + loginStat + "）";
        } else {
            loginInfo += "（" + loginRole + "）";
        }

        header.loginName = loginInfo;
        header.picture = $rootScope.settings.layoutPath + "/img/" + "avatar0.png";
        console.warn("$rootScope.currentUser.Picture", $rootScope.currentUser.Picture);
        if ($rootScope.currentUser.Picture.indexOf("avatar") > -1) {
            header.picture = $rootScope.settings.layoutPath + "/img/" + $rootScope.currentUser.Picture;
        } else {
            header.picture = $rootScope.currentUser.Picture;
        }

        var isCommonUser = function () {
            return $rootScope.currentUser.Role.RoleId === 20;
        };

        var isInactive = function () {
            return $rootScope.currentUser.Status === 0;
        };

        var isThirdUser = function () {
            return $rootScope.currentUser.Status === 3;
        };

        if (isThirdUser()) {
            header.openLogin();
        } else if (isCommonUser() || isInactive()) {
            var msg = "您好，" + $rootScope.currentUser.Role.Name + " " + $rootScope.currentUser.Username + "。<br>";
            if (isCommonUser()) {
                msg += "你可以查看演示信息以了解平台功能。";
                if (isInactive()) {
                    msg += "<br>如果你是管理员或机构用户，"
                }
            } else {
                msg += "你的账户尚未激活，目前只能查看演示锅炉。<br>";
            }
            if (isInactive()) {
                msg += "请联系管理员进行激活，机构用户请联系你的企业或机构管理员。"
            }

            var alertStat = "info";
            swal({
                title: "提示",
                html: msg,
                type: alertStat,
                //cancelButtonText: "好的",
                //confirmButtonText: "登出",
                //closeOnConfirm: false
            });

        }
    };

    this.logout = function () {
        swal({
            title: "确认登出？",
            text: "",
            type: "question",
            showCancelButton: true,
            //confirmButtonClass: "btn-danger",
            confirmButtonColor: "#d33",
            cancelButtonText: "取消",
            confirmButtonText: "登出",
            //closeOnConfirm: false
        }).then(function () {
            $http.post('/user_logout/', {
                uid: $rootScope.currentUser.Uid
            }).then(function (res) {
                $scope.isLogin = false;
                $window.location = "/";
            }, function (err) {
                console.error('logout failed! ', err.status, err.data);
            });
        });

    }
}]);

var header;

app.directive('headerFixed', ['$window', function ($window) {

    return {
        link: link,
        restrict: 'A'
    };
    function link(scope, element, attrs){
        angular.element($window).on('ready', function () {
            scope.windowWidth = $window.innerWidth;
        });
        angular.element($window).on('resize', function(){
            scope.windowWidth = $window.innerWidth;
        });
    }
}]);