var boilerHome = angular.module("BoilerHome", [    
    "ui.bootstrap", 
    "ngCookies",
]);


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
        var r = /\\u([\d\w]{1,})/gi;
        var role = role_name.replace(r, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        });

        return decodeURIComponent(role);
    };

    home.setRole = function() {
    	
    };

    home.getCurrentUser = function (fn) {
        $http.get('/user')
            .then(function (res) {
                home.currentUser = res.data;

                if (fn != null && fn != undefined) {
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
        if (!home.currentUser || !home.currentUser.Uid) {
            home.loginName = "登录";
            return;
        }

        home.remark = "欢迎回来！";
        home.isLogin = home.currentUser && home.currentUser.Uid;

        var loginInfo = home.isLogin ? home.currentUser.Username : "登录";
        var loginRole = home.currentUser.Role.Name;
        var loginStat = "";
        if (home.currentUser.Status == 0) {
            loginStat = "未激活";
            loginInfo += "（" + loginRole + " | " + loginStat + "）";
        } else {
            loginInfo += "（" + loginRole + "）";
        }
        home.loginName = loginInfo;
    };

    home.register = function() {
        $http.post('/user_register/', {
            username: $scope.username,
            password: $scope.password,
            mobile: $scope.mobile,
            role: home.roleId,
            ip: $scope.ip
        }).then(function (res) {
            $('#signup-form').modal('hide');
            swal({
                title: "注册成功",
                text: "现在将转到该用户登录",
                type: "success",
                confirmButtonText: "好的",
            }).then(function () {
                home.getCurrentUser(refresh);
            });
        }, function (err) {
            var message = err.data;
            swal({
                title: "注册失败",
                text: message + "\n请返回重新填写",
                type: "warning",
                confirmButtonText: "确定 ",
            });
            this.remark = err.data;
        });
    };


    home.login = function() {
        Ladda.create(document.getElementById('login-submit')).start();
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
                    swal({
                        title: "登录成功",
                        text: text,
                        type: alertStat,
                        showCancelButton: true,                        
                        cancelButtonText: "留在首页",
                        confirmButtonText: "进入管理平台",                        
                    }).then(function () {
                        $window.location = "/admin";
                    }, function (dismiss) {
                    });
                });
            }, function (err) {
                var message = err.data;
                swal({
                    title: "登录失败",
                    text: message,
                    type: "error",
                    confirmButtonText: "确定",
                });
                this.remark = err.data;
            });
        Ladda.create(document.getElementById('login-submit')).stop();
    };

    home.logout = function() {
            $http.post('/user_login/', {
                username: $scope.username,
                password: $scope.password,
                ip: $scope.ip
            }).then(function (res) {
                $('#login-form').modal('hide');
                refresh();
            }, function (err) {
                var message = err.data;
                swal({
                    title: "登出失败",
                    text: message,
                    type: "error",
                    confirmButtonText: "确定",
                });
                this.remark = err.data;
            });
    };

    home.getCurrentUser(refresh);
}]);

