

mainApp.controller("BoilerRuntimeController",function($rootScope, $scope, $http, $location, $timeout, $uibModal, $document, moment, settings,productData){
	runtime = this;

    $scope.$on('$viewContentLoaded', function() {

        App.initAjax();


        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });

    runtime.init = function () {

        $rootScope.boiler = null;
        $rootScope.instants = [];

        runtime.hasBoiler = false;
        runtime.hasInstants = false;
        runtime.hasRuntime = false;

        var svg = d3.select("svg");
        if (svg) {

            svg.remove();
        }
    };

    runtime.init();

    runtime.fetchBoiler = function () {

        var p = $location.search();

        $http.get('/boiler_list/?boiler=' + p['boiler'])
            .then(function (res) {

                $log.info('Runtime Boiler Get:', res);
                runtime.boiler = res.data[0];
                runtime.hasBoiler = true;
                runtime.fetchStatus(runtime.boiler);
                setTimeout(function () {
                    App.stopPageLoading();
                }, 300);
            });
    };

    runtime.fetchStatus = function (boiler) {
        boiler.isBurning = false;
        $http.get('/boiler/state/is_burning/?boiler=' + boiler.Uid)
            .then(function (res) {
                console.log("Fetch BurningStatus Resp:", res.data);
                boiler.isBurning = (res.data.value === "true");
                runtime.fetchRuntime(runtime.boiler, null, runtime.initCharts);
            }, function (err) {
                console.error('Fetch Status Err!', err);
                runtime.fetchRuntime(runtime.boiler, null, runtime.initCharts);
            });

        $http.get('/boiler/state/has_subscribed/?boiler=' + boiler.Uid + "&uid=" + $rootScope.currentUser.Uid)
            .then(function (res) {
                console.log("Fetch SubscribeStatus Resp:", res.data);
                boiler.hasSubscribed = (res.data.value === "true");
                runtime.fetchRuntime(runtime.boiler, null, runtime.initCharts);
            }, function (err) {
                console.error('Fetch Status Err!', err);
                runtime.fetchRuntime(runtime.boiler, null, runtime.initCharts);
            });
    };

    runtime.fetchRuntime = function (boiler, callback1, callback2) {
        var rtmQ = [1001, 1002, 1003, 1014, 1015, 1016, 1005, 1006,
            1017, 1018, 1019, 1021, 1201, 1202];

        var data = {
            uid: boiler.Uid,
            runtimeQueue: rtmQ,
            limit: 40
        };

        runtime.instants = [];
        runtime.data = { Uid: runtime.boiler.Uid };

        $http.post('/boiler_runtime_instants/', data).then(function (res) {
            boiler.imgName = function() {
                var imgName = '';
                switch (boiler.Template.TemplateId) {
                    case 1:
                    case 4:
                        imgName = 'gasboiler';
                        break;
                    case 2:
                    case 5:
                        imgName = 'coalsingle';
                        break;
                    case 3:
                    case 6:
                        imgName = 'coaldouble';
                        break;
                    case 7:
                        imgName = 'fb';
                        break;
                    case 8:
                        imgName = 'gasboiler_v';
                        break;
                    case 10:
                        imgName = 'boilerwater';
                        break;
                    default:
                        imgName = 'coalsingle';
                        break;
                }

                return imgName;
            };
            $log.info("instants Resp:", res);

            boiler.alarmLevel = boiler.isBurning ? 0 : -1;

            runtime.instants = [];
            for (var i = 0; i < res.data.length; i++) {
                var d = res.data[i];
                var value;
                var name = d.ParameterName;
                var alarmLevel = -1;

                if (boiler.isBurning) {
                    value = d.Value;
                    alarmLevel = d.AlarmLevel;
                } else {
                    value = "-";
                }

                if (alarmLevel > boiler.alarmLevel) {
                    boiler.alarmLevel = alarmLevel;
                }

                var label = "";
                switch (alarmLevel) {
                    case -1:
                        label = "未测定";
                        break;
                    case 0:
                        label = "正常";
                        break;
                    case 1:                        
                        label = "超标";
                        break;
                    case 2:
                        label = "告警";
                        break;
                }

                if (runtime.boiler.Form.Id === 205) {
                    switch (d.Parameter) {
                        case 1005:
                            name = "回水温度";
                            break;
                        case 1006:
                            name = "出水温度";
                            break;
                    }
                }

                runtime.instants.push({
                    id: d.Parameter,
                    name: name,
                    value: value,
                    unit: d.Unit,
                    alarmLevel: alarmLevel,
                    alarmDesc: label,
                    date: new Date(d.CreatedDate)
                });
            }

            $rootScope.boiler = runtime.boiler;
            $rootScope.instants = runtime.instants;

            $log.info("Boiler Inst:", runtime.instants);
            runtime.hasInstants = true;

            if (typeof callback1 === "function") {
                callback1();
            }
        }, function (err) {
            
        });


        $http.post('/boiler_runtime_list/', data).then(function (res) {
            console.info("Runtime Resp:", res);     

            if (res.data.Parameters) {
                for (var i = 0; i < res.data.Parameters.length; i++) {
                    var param = res.data.Parameters[i];
                    var pid = param.Id;

                    runtime.data[pid] = res.data.Runtimes[i];
                }
            }
           
            $rootScope.boilerRuntime = runtime.data;
            console.info("Boiler Runtime Data:", runtime.boiler);
            runtime.hasRuntime = true;
            if (typeof callback2 === "function") {
                runtime.fetchDaily();
            }
        });
    };

    runtime.fetchDaily = function () {
        var p = $location.search();
        var limit = 30;
        $http.post('/boiler_runtime_daily/', {
            uid: p['boiler'],
            limit: limit
        }).then(function (res) {
            console.warn("Runtime Flows Resp:", res);
            var pa = res.data.Parameter;

            runtime.daily = [];
            for (var i = 0; i < limit; i++) {
                var flow = res.data.Flows && i < res.data.Flows.length && res.data.Flows[i] ?
                    res.data.Flows[i].Value : 0;
                var heat = res.data.Heats && i < res.data.Heats.length && res.data.Heats[i] ?
                    res.data.Heats[i].Value : 0;
                var aDay = new Date();
                aDay.setHours(0);
                aDay.setMinutes(0);
                aDay.setSeconds(0);
                aDay.setDate(aDay.getDate() - i);
                var date = res.data.Flows && i < res.data.Flows.length && res.data.Flows[i] ?
                    new Date(res.data.Flows[i].Date) : aDay;

                runtime.daily.push({
                    flow: flow.toFixed(2),
                    heat: heat.toFixed(2),
                    date: date
                });
            }

            $rootScope.bRuntime = runtime.daily;
            console.info("BoilerData:", runtime.daily);
            initChartHeatMonth(runtime.daily);
        });
    };

    runtime.setSubscribe = function (boiler) {
        $http.post('/boiler/state/set_subscribe/', {
            uid: boiler.Uid,
            state: runtime.boiler.hasSubscribed
        }).then(function (res) {
            console.info("Set Subscribe Resp:", res);
        });
    };

    runtime.initCharts = function (boiler) {
        console.info("Runtime initCharts!");
        initChartHeatMonth(boiler);
    };
	
	
});


var runtime;

function boiler_module_height() {
    var mo = document.getElementById('module_height');
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        //判断是否为IE
        console.warn("IsIE");
        if (mo) {
            //已获取到module_height元素,等比缩放1.5x
            mo.setAttribute('height', document.documentElement.clientWidth * 0.50);
        }
        else {
            var MutationObserver = window.MutationObserver ||
                window.WebKitMutationObserver ||
                window.MozMutationObserver;
            var mutationObserverSupport = !!MutationObserver;
            if (mutationObserverSupport) {
                //判断是否支持mutationObserver
                document.getElementById('boiler_module').addEventListener("DOMSubtreeModified", function () {
                    boiler_module_height();
                    console.log('DOMNodeInserted');
                }, false);
            }
            else {
                //不支持mutationObserver使用DOMNodeInserted触发器
                $("#boiler_module").bind('DOMNodeInserted', function (e) {
                    boiler_module_height();
                });
            }
        }
    }
    else {
        console.info("Not Is IE")
    }
}




