mainApp.controller('BoilerDeveloperController', function($rootScope, $scope, $http, $location, $timeout, $log, $document, moment, settings) {
    bDeveloper = this;

    var p = $location.search();
    $log.info("At BoilerDeveloperController!");

    $scope.$on('$viewContentLoaded', function() {
        // initialize core components

        // createGauges();
        // setInterval(updateGauges, 5000);
        App.initAjax();

        // set sidebar closed and body solid layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = true;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });

    bDeveloper.getBoilerConfig = function () {
        $http.post('/boiler_config/', {
            uid: p['boiler'],
            config: "IsGenerateData"
        }).then(function (res) {
            console.log("Fetch BoilerConfig Res:", res.data);
            bDeveloper.config = res.data;
            switch (res.data.config) {
                case "IsGenerateData":
                    bDeveloper.isGenerateData = (res.data.value === "true");
                    break;
            }
        }, function (err) {
            //alert('Fetch Err!' + err.status + " | " + err.data);
        });
    };

    bDeveloper.setConfig = function (config) {
        switch (config) {
            case "IsGenerateData":
                var postData = {
                    uid: p['boiler'],
                    config: config,
                    value: bDeveloper.isGenerateData.toString(),
                    cascade: false
                };

                if (bDeveloper.isGenerateData === false) {
                    swal({
                        title: "是否删除已经生成的模拟数据？",
                        text: "警告：如果选择删除，将永久删除本台锅炉的所有模拟数据，且无法恢复。",
                        type: "warning",
                        showCancelButton: true,
                        //confirmButtonClass: "btn-danger",
                        confirmButtonColor: "#d33",
                        cancelButtonText: "取消",
                        confirmButtonText: "删除"
                    }).then(function () {
                        postData.cascade = true;
                        // console.warn("Cascade BoilerConfig:", postData);
                        bDeveloper.sendConfig(postData);
                    }, function (e) {
                        bDeveloper.sendConfig(postData);
                    });
                } else {
                    bDeveloper.sendConfig(postData);
                }

                break;
        }
    };

    bDeveloper.sendConfig = function (postData) {
        $http.post('/boiler_config_set/', postData)
            .then(function (res) {
                console.log("Set BoilerConfig Res:", res.data);
                // bDeveloper.config = res.data;
                // switch (res.data.config) {
                //     case "IsGenerateData":
                //         bDeveloper.isGenerateData = (res.data.value === "true");
                //         break;
                // }
            }, function (err) {
                //alert('Fetch Err!' + err.status + " | " + err.data);
            });
    };
    
    bDeveloper.testMessage = function () {
        $http.post('/boiler_message_send/', {
            uid: p['boiler'],
            isTest: true
        }).then(function (res) {
            console.error("Send Boiler Test Message:", res.data);
            // bDeveloper.config = res.data;
            // switch (res.data.config) {
            //     case "IsGenerateData":
            //         bDeveloper.isGenerateData = (res.data.value === "true");
            //         break;
            // }
        }, function (err) {
            //alert('Fetch Err!' + err.status + " | " + err.data);
        });
    }
});

var bDeveloper;