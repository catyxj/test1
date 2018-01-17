/**
 * Created by JeremiahYan on 2016/12/20.
 */
var boilerHome = angular.module("BoilerHome", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngCookies",

    "ui.select"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
boilerHome.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
boilerHome.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/
var home;

boilerHome.controller('HomeController', ['$scope', '$http', '$cookies', '$window', function($scope, $http, $cookies, $window) {
    home = this;
    home.roleId = 20;
    home.organizations = [];
    home.isLogin = false;
    home.loginName = "登录";

    const IP_JSON_URL = 'http://ipv4.myexternalip.com/json';

    var getUserRole = function () {
        var role_name = $cookies.get('user_role_zh');
        //var r = /\\u([\d\w]{4})/gi;
        var r = /\\u([\d\w]{1,})/gi;
        var role = role_name.replace(r, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        });

        return decodeURIComponent(role);
    };

    home.setRole = function() {
        //alert("set Role: " + home.roleId);
    };

    home.getCurrentUser = function (fn) {
        $http.get('/user')
            .then(function (res) {
                home.currentUser = res.data;

                if (typeof fn === "function") {
                    fn();
                }
            });
        $scope.ip = "0.0.0.0";

        setTimeout(function () {
            $http.get('/organization_list/?scope=register')
                .then(function (res) {
                    console.info("get organization list:", res.data);
                    for (var i = 0; i < res.data.length; i++) {
                        var d = res.data[i];
                        d.name = d.Name;
                        d.type = d.Type.Name;
                        home.organizations.push(d);
                    }
                }, function (err) {
                    console.log("Get Org List Err: " + err);
                });

            $http.get(IP_JSON_URL).then(function (result) {
                console.log("ip" + result.data.ip);
                $scope.ip = result.data.ip;
            }, function (e) {
                console.error("Get IP Error:", e);
            });
        }, 0);

    };


    var refresh = function () {
        //console.warn("CurrentUser:", home.currentUser);
        if (!home.currentUser || !home.currentUser.Uid) {
            //console.error("CurrentUser is NULL!", home.currentUser);
            home.isLogin = false;
            home.loginName = "登录";
            return;
        }

        home.remark = "欢迎回来！";
        home.isLogin = home.currentUser && home.currentUser.Uid;
        if (home.currentUser) {
            home.picture = '../assets/layouts/boiler' + '/img/' + home.currentUser.Picture;
        } else {
            home.picture = null;
        }

        var loginInfo = home.isLogin ? home.currentUser.Username : "登录";
        var loginRole = home.currentUser.Role.Name;
        var loginStat = "";
        if (home.currentUser.Status === 0) {
            loginStat = "未激活";
            loginInfo += "（" + loginRole + " | " + loginStat + "）";
        } else {
            loginInfo += "（" + loginRole + "）";
        }
        home.loginName = loginInfo;
        //alert("refresh()" + home.loginName + ' | ' + home.currentUser.Username);
    };

    home.register = function() {
        $http.post('/user_register/', {
            username: $scope.username,
            password: $scope.password,
            mobile: $scope.mobile,
            //email: $scope.email,
            //name: $scope.fullname,
            role: home.roleId,
            // org: home.aOrg.Uid,
            ip: $scope.ip
        }).then(function (res) {
            $('#signup-form').modal('hide');
            swal({
                title: "注册成功",
                text: "现在将转到该用户登录",
                type: "success",
                //showCancelButton: true,
                //confirmButtonClass: "btn-danger",
                confirmButtonText: "好的",
                //closeOnConfirm: false
            }).then(function () {
                home.getCurrentUser(refresh);
            });
        }, function (err) {
            var message = err.data;
            swal({
                title: "注册失败",
                text: message + "\n请返回重新填写",
                type: "warning",
                //showCancelButton: true,
                //confirmButtonClass: "btn-danger",
                confirmButtonText: "确定 ",
            });
            this.remark = err.data;
        });
    };


    home.login = function() {
        Ladda.create(document.getElementById('login-submit')).start();
        //   }, function(e) {
        //      console.error("Get IP Error:", e);
        //    }).then(function () {
            $http.post('/user_login/', {
                username: $scope.username,
                password: $scope.password,
                ip: $scope.ip
            }).then(function (res) {
                $('#login-form').modal('hide');
                home.getCurrentUser(function () {
                    refresh();
                    var text = "欢迎回来，" + home.currentUser.Role.Name + " " + home.currentUser.Username + "。";
                    var alertStat = "success";
                    // if (home.currentUser.Status == 0) {
                    //     text += "你的账户尚未激活，请联系管理员进行激活，企业用户请联系你的企业管理员。";
                    //     alertStat = "info";
                    // }
                    swal({
                        title: "登录成功",
                        text: text,
                        type: alertStat,
                        showCancelButton: true,
                        //confirmButtonClass: "btn-danger",
                        cancelButtonText: "留在首页",
                        confirmButtonText: "进入管理平台",
                        //closeOnConfirm: false
                    }).then(function () {
                        $window.location = "/admin";
                    }, function (dismiss) {
                        //alert("login and refresh");
                        //refresh();
                    });
                });
            }, function (err) {
                var message = err.data;
                swal({
                    title: "登录失败",
                    text: message,
                    type: "error",
                    //showCancelButton: true,
                    //confirmButtonClass: "btn-danger",
                    confirmButtonText: "确定",
                });
                this.remark = err.data;
            });
        //  });
        Ladda.create(document.getElementById('login-submit')).stop();
    };

    home.logout = function () {
        swal({
            title: "确认登出？",
            text: "登出后，需要刷新您已经登录的界面。",
            type: "question",
            showCancelButton: true,
            //confirmButtonClass: "btn-danger",
            confirmButtonColor: "#d33",
            cancelButtonText: "取消",
            confirmButtonText: "登出"
            //closeOnConfirm: false
        }).then(function () {
            $http.post('/user_logout/', {
                uid: home.currentUser.Uid
            }).then(function (res) {
                home.currentUser = null;
                refresh();
            }, function (err) {
                console.error('logout failed! ', err.status, err.data);
            });
        });
    };

    home.getCurrentUser(refresh);
}]);

/* Init global settings and run the app */
/*
boilerHome.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);
*/