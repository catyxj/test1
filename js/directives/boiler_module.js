/**
 * Created by JeremiahYan on 2017/4/10.
 */
mainApp.directive('boilerModule', function () {
    return {
        restrict: 'E',
        templateUrl: "directives/boiler_module.html",
        controller: "BoilerModuleController",
        controllerAs: "module"
    };
}).controller("BoilerModuleController", function ($rootScope, $scope, $http, $location, $timeout, $log, $document, moment ,productData) {
    var bModule = this;

    bModule.valueLabels = {};

    $rootScope.$watch('boiler', function () {
        // console.error("$rootScope.$watch('instants')", $rootScope.boiler, bModule.boiler);
        bModule.initModule();
    });

    bModule.initModule = function () {
//      if (!$rootScope.boiler ||
//          !$rootScope.instants || $rootScope.instants.length <= 0 ||
//          bModule.boiler === $rootScope.boiler || bModule.instants === $rootScope.instants) {
//          return;
//      }
//      bModule.boiler = $rootScope.boiler;
//      bModule.instants = $rootScope.instants;

		bModule.boiler = productData[2];
		bModule.instants = [];
		
        // console.error("Runtime initModule!", bModule.instants);
        var module = d3.select("#boiler_module");
        if (!module) {
            console.warn("There IS NO #boiler_module!");
            return;
        }

        // console.error("Runtime drawModule!", runtime.instants);
        // if (hasInitModule) {
        //     console.error("Already initModule!");
        //     return;
        // }
        // hasInitModule = true;

        var svgName = "/img/boiler_coal_double.svg";
        bModule.moduleId = 1;
        switch (bModule.boiler.Fuel.Type.Id) {
        	case 2:
                bModule.moduleId = 2;
                break;
            case 3:
                bModule.moduleId = 3;
                break;
            case 5:
                bModule.moduleId = 5;
                break;    
            default:
                bModule.moduleId = 1;
                break;
        }

//      if (bModule.boiler.Medium.Id === 2 ||
//          bModule.boiler.Form.Id === 205) {
//          bModule.moduleId = 4;
//      }

        switch (bModule.moduleId) {
            case 1:
                svgName = "../img/boiler_coal_double.svg";
                break;
            case 2:
                svgName = "../img/boiler_coal_single.svg";
                break;
            case 3:
                svgName = "../img/boiler_gas.svg";
                break;
            case 4:
                svgName = "../img/boiler_water.svg";
                break;
            case 5:
                svgName = "../img/electricity2.svg";
                break;
            default:
                svgName = "../img/boiler_coal_double.svg";
                break;
        }

        d3.xml(svgName).mimeType("image/svg+xml").get(function(error, xml) {
            if (error) throw error;
            var svgNode = xml.getElementsByTagName("svg")[0];
            if (!svgNode || !module.node()) {
                console.warn("There IS NO SVG Container!");
                return;
            }

            var svg = module.select("svg");
            if (svg) {
                console.warn("Find SVG & Remove IT");
                svg.remove();
            }

            module.node().appendChild(svgNode);
            bModule.svg = module.select("svg");

            bModule.gauge = bModule.svg.select("#gauge_container");
            bModule.dash = bModule.svg.select("#dash_container");

            /*
             var min = 0;
             var max = 100;

             var config = {
             size: 80,
             label: "Gauge",
             x: 20,
             y: 220,
             min: undefined != min ? min : 0,
             max: undefined != max ? max : 100,
             minorTicks: 5
             };

             var range = config.max - config.min;
             config.yellowZones = [{from: config.min + range * 0.75, to: config.min + range * 0.9}];
             config.redZones = [{from: config.min + range * 0.9, to: config.max}];

             gauges[name] = new Gauge("gauge_container", config);
             gauges[name].render();
             */

            var moduleOptionsDef = {
                align: "left",  //"left", "justify"

                baseWidth: 110,
                height: 54,
                gap: 10,

                baseX: 20,
                baseY: 0
            };

            var copy = function (obj) {
                var aObj = {};

                for (var i = 0; i < Object.keys(obj).length; i++) {
                    var key = Object.keys(obj)[i];
                    var value = obj[key];
                    aObj[key] = ((typeof value) === 'object' ? copy(value) : value);
                }

                return aObj;
            };

            var isTerminalConnected = (bModule.boiler.Terminal && bModule.boiler.Terminal.IsOnline) || bModule.boiler.isBurning;
            var statData = [
                [
                    {id: 0, name: "终端状态", text: isTerminalConnected ? "已连接" : "未连接", type: "status", value: !!isTerminalConnected},
                    {id: 0, name: "燃烧状态", text: bModule.boiler.isBurning ? "已点燃" : "未点燃", type: "status", value: bModule.boiler.isBurning},
                    {id: 0, name: "告警状态", text: "", type: "status", value: bModule.boiler.alarmLevel}
                ],
                [
                    {id: 0, name: "热效率(正平衡)"},
                    {id: 1201, name: "热效率(反平衡)"}
                ]
                // "蒸汽超压", "环境温度",
                // "运行时间(每天)", "运行时间(累积)"
            ];

            var statOptions = copy(moduleOptionsDef);
            statOptions.align = "justify";

            var steamData = [];
            var steamOptions = copy(moduleOptionsDef);

            var waterLvData = [
                [{id: 0, type: "status", text: "", name: "高水位", value: true}],
                [{id: 0, type: "status", text: "", name: "低水位", value: true}]
            ];
            var waterLvOptions = copy(moduleOptionsDef);

            var waterData = [];
            var waterOptions = copy(moduleOptionsDef);

            var fuelData = [];
            var fuelOptions = copy(moduleOptionsDef);

            var smokeData = [];
            var smokeOptions = copy(moduleOptionsDef);

            switch (bModule.moduleId) {
                case 3:
                    var swData = [];
                    var swOptions = copy(moduleOptionsDef);

                    var water1Data = [];
                    var water1Options = copy(moduleOptionsDef);

                    steamData = [
                        [
                            {id: 1001, name: "蒸汽温度"},
                            {id: 1002, name: "蒸汽压力"}
                        ],
                        [{id: 1003, name: "蒸汽流量(瞬时)"}],
                        [{id: 0, name: "蒸汽流量(累计)"}]
                    ];

                    waterData = [
                        [
                            {id: 1010, name: "给水流量(瞬时)"},
                            {id: 0, name: "给水量(累计)"}
                        ]
                    ];

                    water1Data = [
                        [{id: 1005, name: "给水温度(冷)"}],
                        [{id: 0, type: "status", text: "", name: "软水硬度", value: true}]
                    ];

                    smokeData = [
                        [{id: 1014, name: "排烟温度(前)"}],
                        [{id: 1202, name: "过量空气系数"}],
                        [{id: 1016, name: "排烟氧量"}]
                    ];

                    swData = [
                        [
                            {id: 1006, name: "给水温度(热)"},
                            {id: 1015, name: "排烟温度(后)"}
                        ]
                    ];

                    fuelData = [
                        [
                            {id: 0, name: "燃料流量(瞬时)"},
                            {id: 0, name: "燃料量(累计)"}
                        ]
                    ];

                    steamOptions.align = "right";
                    steamOptions.baseX = 320;
                    steamOptions.baseY = 140;

                    waterOptions.baseX = 730;
                    waterOptions.baseY = 630;

                    water1Options.baseX = 1020;
                    water1Options.baseY = 220;

                    waterLvOptions.baseX = 360;
                    waterLvOptions.baseY = 330;

                    smokeOptions.baseX = 730;
                    smokeOptions.baseY = 136;

                    swOptions.baseX = 630;
                    swOptions.baseY = 42;

                    fuelOptions.baseX = 120;
                    fuelOptions.baseY = 600;

                    renderStatusModule("#sw_container", swData, swOptions);
                    renderStatusModule("#water1_container", water1Data, water1Options);

                    break;

                case 4:
                    var waterOutData = [];
                    var waterOutOptions = copy(moduleOptionsDef);

                    var waterInData = [];
                    var waterInOptions = copy(moduleOptionsDef);

                    waterOutData = [
                        [
                            {id: 1006, name: "出水温度"},
                        ]
                    ];

                    waterInData = [
                        [
                            {id: 1005, name: "回水温度"},
                        ]
                    ];

                    smokeData = [
                        [{id: 1014, name: "排烟温度(前)"}],
                        [{id: 1202, name: "过量空气系数"}],
                        [{id: 1016, name: "排烟氧量"}]
                    ];

                    fuelData = [
                        [
                            {id: 0, name: "燃料流量(瞬时)"},
                            {id: 0, name: "燃料量(累计)"}
                        ]
                    ];

                    waterInOptions.baseX = 460;
                    waterInOptions.baseY = 120;

                    waterOutOptions.baseX = 960;
                    waterOutOptions.baseY = 120;

                    smokeOptions.baseX = 1130;
                    smokeOptions.baseY = 380;

                    fuelOptions.baseX = 180;
                    fuelOptions.baseY = 600;

                    renderStatusModule("#water_in_container", waterInData, waterInOptions);
                    renderStatusModule("#water_out_container", waterOutData, waterOutOptions);

                    break;

                default:
                    steamData = [
                        [
                            {id: 1001, name: "蒸汽温度"},
                            {id: 1002, name: "蒸汽压力"}
                        ],
                        [
                            {id: 1003, name: "蒸汽流量(瞬时)"},
                            {id: 0, name: "蒸汽流量(累计)"}
                        ]
                    ];

                    waterData = [
                        [{id: 0, type: "status", text: "", name: "软水硬度", value: true}],

                        [{id: 1006, name: "给水温度(热)"}],
                        [{id: 1005, name: "给水温度(冷)"}],
                        [{id: 1010, name: "给水流量(瞬时)"}],
                        [{id: 0, name: "给水流量(累计)"}]
                    ];

                    smokeData = [
                        [
                            {id: 1202, name: "过量空气系数"},
                            {id: 1016, name: "排烟氧量"},
                            {id: 1014, name: "排烟温度(前)"},
                            {id: 1015, name: "排烟温度(后)"}
                        ]
                    ];

                    fuelData = [
                        [{id: 0, name: "进煤量(瞬时)"}],
                        [{id: 0, name: "进煤量(累计)"}]
                    ];

                    steamOptions.baseX = 490;
                    steamOptions.baseY = 100;

                    waterLvOptions.baseX = 20;
                    waterLvOptions.baseY = 300;

                    waterOptions.baseX = 850;
                    waterOptions.baseY = 128;

                    smokeOptions.baseX = 640;
                    smokeOptions.baseY = 680;

                    fuelOptions.baseX = 20;
                    fuelOptions.baseY = 440;
                    break;
            }

            renderStatusModule("#status_container", statData, statOptions);
            renderStatusModule("#steam_container", steamData, steamOptions);
            renderStatusModule("#water_container", waterData, waterOptions);
            renderStatusModule("#water_lv_container", waterLvData, waterLvOptions);
            renderStatusModule("#smoke_container", smokeData, smokeOptions);
            renderStatusModule("#fuel_container", fuelData, fuelOptions);

            if (bModule.boiler.isBurning) {
                switch (bModule.moduleId) {
                    case 3:
                        renderGasFire("#fire_container");
                        renderGasDashes("#dash_container");
                        renderGasSmokeDashes("#dash_smoke_container");
                        break;
                    case 4:
                        renderWaterFire("#fire_container");
                        renderWaterDashes("#dash_container");
                        renderWaterValues();
                        break;
                    case 5:
                    	renderElectricDashes("#dash_container");
                    	break;
                    default:
                        renderCoalDashes("#dash_container");
                }
            }

        });
    };

    var renderStatusModule = function (id, data, options) {

        $log.info("ready to renderStatusModule", id, data, options);
        var align = options.align;

        var baseWidth = options.baseWidth;
        var height = options.height;
        var gap = options.gap;
        var fontSize = Math.round(baseWidth / 7);

        var baseX = options.baseX;
        var baseY = options.baseY;

        var statusModule = bModule.svg.select(id);

        if (!statusModule) {
            $log.warn("There IS NO " + id + "!");
            return;
        }

        var maxRowLength = 0;
        for (var row = 0; row < data.length; row++) {
            if (data[row].length > maxRowLength) {
                maxRowLength = data[row].length;
            }
        }

        for (var row = 0; row < data.length; row++) {
            var rowData = data[row];
            for (var col = 0; col < rowData.length; col++) {
                var width, cx, cy;
                cy = baseY + (height + gap) * row;

                switch (align) {
                    case "left":
                        width = baseWidth;
                        cx = baseX + (width + gap) * col;
                        break;
                    case "right":
                        width = baseWidth;
                        cx = baseX + (width + gap) * (maxRowLength - rowData.length) + (width + gap) * col;
                        break;
                    case "justify":
                        width = (baseWidth * maxRowLength + gap * (maxRowLength - rowData.length)) / rowData.length;
                        cx = baseX + (width + gap) * col;
                        break;
                    default:
                        width = baseWidth;
                        cx = baseX + (width + gap) * col;
                        break;
                }

                var d = rowData[col];

                var barColor = d.type === "status" ? "#4c87b9" : "#bfcad1";
                var text = d.type === "status" ? d.text : "未测定";
                var textColor = d.type === "status" ? "#fff" : "#aaa";
                1
                if (bModule.boiler.isBurning && d.type !== "status" && d.id > 0) {
                    for (var i = 0; i < bModule.instants.length; i++) {
                        var ins = bModule.instants[i];
                        if (d.id == ins.id && ins.value != "-") {
                            barColor = "#4c87b9";
                            text = ins.value + ins.unit;
                            textColor = "#80898e";
                            break;
                        }
                    }
                }

                //Bar Drawing
                statusModule.append("rect")
                    .attr("x", cx)
                    .attr("y", cy)
                    .attr("width", width)
                    .attr("height", height)
                    //.attr("rx", 6)
                    .style("fill", "none")
                    .style("stroke", barColor)
                    .style("stroke-width", "1");
                statusModule.append("rect")
                    .attr("x", cx)
                    .attr("y", cy)
                    .attr("width", width)
                    .attr("height", height / 2)
                    .style("fill", barColor);

                if (d.type === "status") {
                    //StatusColor Drawing
                    var bgColor = "#32c5d2";
                    if (typeof d.value === "boolean") {
                        bgColor = d.value ? "#32c5d2" : "#e7505a";
                    } else if (typeof d.value === "number") {
                        switch (d.value) {
                            case 0:
                                bgColor = "#32c5d2";
                                break;
                            case 1:
                                bgColor = "#f3c200";
                                break;
                            case 2:
                                bgColor = "#e7505a";
                                break;
                        }
                    }

                    statusModule.append("rect")
                        .attr("x", cx + 4)
                        .attr("y", cy + height / 2 + 4)
                        .attr("width", width - 8)
                        .attr("height", height / 2 - 8)
                        .attr("rx", 6)
                        .attr("ry", 6)
                        .style("fill", bgColor);
                }

                //Label Drawing
                statusModule.append("text")
                    .attr("x", cx + width / 2)
                    .attr("y", cy + fontSize / 2 + 2)
                    .attr("dy", fontSize / 2)
                    .attr("text-anchor", "middle")
                    .text(d.name)
                    .style("font-size", fontSize + "px")
                    //.style("font-weight", "bold")
                    .style("fill", "#fff")
                    .style("stroke-width", "0px");

                //Text Drawing
                statusModule.append("text")
                    .attr("x", cx + width / 2)
                    .attr("y", cy + height / 2 + fontSize / 2 + 2)
                    .attr("dy", fontSize / 2)
                    .attr("text-anchor", "middle")
                    .text(text)
                    .style("font-size", fontSize - 2 + "px")
                    //.style("font-weight", "bold")
                    .style("fill", textColor)
                    .style("stroke-width", "0px");
            }
        }
    };

    var renderCoalDashes = function (id) {
        var size = 8;
        var sec = 4096;

        var color = "#fff";

        var dashModule = bModule.svg.select(id);
        if (!dashModule) {
            console.warn("There IS NO " + id + "!");
            return;
        }

        // var pathSteam = [
        //     {
        //         cx: 443,
        //         cy: 320
        //     },
        //     {
        //         cx: 443,
        //         cy: 58,
        //         duration: sec / 2
        //     },
        //     {
        //         cx: 690,
        //         cy: 58,
        //         duration: sec / 2
        //     }
        // ];
        // var steam = bModule.dash
        //     .append("circle").attr("cx", pathSteam[0].cx).attr("cy", pathSteam[0].cy).attr("r", size / 2).style("fill", color);
        // d3.selectAll("circle").transition().duration(pathSteam[1].duration).ease(d3.easeLinear).attr("cx", pathSteam[1].cx).attr("cy", pathSteam[1].cy);
        // var dd = function (path) {
        //     d3.select(twizzleLock).transition().duration(pathSteam[1].duration).ease(d3.easeLinear).attr("cx", pathSteam[1].cx).attr("cy", pathSteam[1].cy)
        // };
        // steamDash.remove();

        var dashSteam = function () {
            //d3.active(this).enter()
            dashModule
                .append("circle").attr("cx", 443).attr("cy", 320).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 58)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cx", 690)
                .remove();
        };

        var dashWater = function () {
            dashModule.append("circle").attr("cx", 1200).attr("cy", 135).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 6).ease(d3.easeLinear).attr("cx", 1108)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 440)
                .transition().duration(sec / 16).ease(d3.easeLinear).attr("cx", 1090)
                .remove();

            dashModule.append("circle").attr("cx", 1010).attr("cy", 462).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 5).ease(d3.easeLinear).attr("cx", 924)
                .transition().duration(sec / 5).ease(d3.easeLinear).attr("cy", 570)
                .remove();

            dashModule
                .append("circle").attr("cx", 804).attr("cy", 570).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 238)
                .transition().duration(sec / 3).ease(d3.easeLinear).attr("cx", 606)
                .transition().duration(sec / 6).ease(d3.easeLinear).attr("cy", 320)
                .remove();
        };

        var dashSmoke = function () {
            //d3.active(this).enter()
            dashModule
                .append("circle").attr("cx", 630).attr("cy", 402).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 3).ease(d3.easeLinear).attr("cx", 758)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 620)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cx", 1000)
                .remove();
        };

        var dashAir = function () {
            //d3.active(this).enter()
            dashModule
                .append("circle").attr("cx", 270).attr("cy", 716).attr("r", size / 2).style("fill", "#666")
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cx", 436)
                .transition().duration(sec / 4).ease(d3.easeLinear).attr("cy", 650)
                .remove();
        };

        dashModule
            .transition().on("start", function repeat() {
            dashModule
                .transition().delay(260).on("start", function () {
                dashSteam();
                dashWater();
                dashSmoke();
                dashAir();
                repeat();
            });
        });
    };

    var renderGasDashes = function (id) {
        var size = 8;
        var sec = 4096;

        var color = "#fff";

        var dashModule = bModule.svg.select(id);
        if (!dashModule) {
            console.warn("There IS NO " + id + "!");
            return;
        }

        var dashSteam = function () {
            dashModule
                .append("circle").attr("cx", 611).attr("cy", 340).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 88)
                .transition().duration(sec / 6).ease(d3.easeLinear).attr("cx", 540)
                .remove();
        };

        var dashWater = function () {
            dashModule
                .append("circle").attr("cx", 1200).attr("cy", 377).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 5).ease(d3.easeLinear).attr("cx", 1104)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 626)
                .transition().duration(sec / 16).ease(d3.easeLinear).attr("cx", 1086)
                .remove();

            dashModule
                .append("circle").attr("cx", 1002).attr("cy", 648).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 16).ease(d3.easeLinear).attr("cx", 981)
                .transition().duration(sec / 1.5).ease(d3.easeLinear).attr("cy", 230)
                .transition().duration(sec / 8).ease(d3.easeLinear).attr("cx", 922)
                .remove();

            dashModule
                .append("circle").attr("cx", 922).attr("cy", 144).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 8).ease(d3.easeLinear).attr("cx", 981)
                .transition().duration(sec / 12).ease(d3.easeLinear).attr("cy", 110)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cx", 672)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 340)
                .remove();
        };

        var dashFuel = function () {
            dashModule
                .append("circle").attr("cx", 130).attr("cy", 514).attr("r", size / 2).style("fill", "#eee")
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cx", 436)
                .remove();
        };

        dashModule
            .transition().on("start", function repeat() {
            dashModule
                .transition().delay(260).on("start", function () {
                dashSteam();
                dashWater();
                dashFuel();
                repeat();
            });
        });
    };

    var renderGasSmokeDashes = function (id) {
        var size = 8;
        var sec = 4096;

        var dashSmokeModule = bModule.svg.select(id);
        if (!dashSmokeModule) {
            console.warn("There IS NO " + id + "!");
            return;
        }

        var dashSmoke = function () {
            dashSmokeModule
                .append("circle").attr("cx", 896).attr("cy", 330).attr("r", size / 2).style("fill", "#999")
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 80)
                .transition().duration(sec / 3).ease(d3.easeLinear).attr("cx", 1064)
                .remove();
        };

        dashSmokeModule
            .transition().on("start", function repeat() {
            dashSmokeModule
                .transition().delay(260).on("start", function () {
                dashSmoke();
                repeat();
            });
        });
    };

    var renderWaterDashes = function (id) {
        var waterSize = 6;
        var size = 8;
        var sec = 4096;

        var color = "#fff";

        var dashModule = bModule.svg.select(id);
        if (!dashModule) {
            console.warn("There IS NO " + id + "!");
            return;
        }

        var dashWaterIn = function () {
            //d3.active(this).enter()
            dashModule
                .append("circle").attr("cx", 400).attr("cy", 220).attr("r", waterSize / 2).style("fill", color)
                .transition().duration(sec / 1.2).ease(d3.easeLinear).attr("cx", 635)
                .transition().duration(sec / 1.8).ease(d3.easeLinear).attr("cy", 330)
                .remove();

            dashModule
                .append("circle").attr("cx", 400).attr("cy", 262).attr("r", waterSize / 2).style("fill", color)
                .transition().duration(sec / 1.2).ease(d3.easeLinear).attr("cx", 615)
                .transition().duration(sec / 2.6).ease(d3.easeLinear).attr("cy", 330)
                .remove();
        };

        var dashWaterOut = function () {
            dashModule.append("circle").attr("cx", 898).attr("cy", 330).attr("r", waterSize / 2).style("fill", color)
                .transition().duration(sec / 1.8).ease(d3.easeLinear).attr("cy", 222)
                .transition().duration(sec / 1.2).ease(d3.easeLinear).attr("cx", 1135)
                .remove();

            dashModule.append("circle").attr("cx", 918).attr("cy", 330).attr("r", waterSize / 2).style("fill", color)
                .transition().duration(sec / 2.6).ease(d3.easeLinear).attr("cy", 260)
                .transition().duration(sec / 1.2).ease(d3.easeLinear).attr("cx", 1135)
                .remove();
        };

        var dashSmoke = function () {
            //d3.active(this).enter()
            dashModule
                .append("circle").attr("cx", 955).attr("cy", 540).attr("r", size / 2).style("fill", "#999")
                .transition().duration(sec / 3).ease(d3.easeLinear).attr("cx", 1100)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 350)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cx", 1240)
                .remove();
        };

        var dashFuel = function () {
            dashModule
                .append("circle").attr("cx", 195).attr("cy", 548).attr("r", size / 2).style("fill", "#eee")
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cx", 420)
                .remove();
        };

        dashModule
            .transition().on("start", function repeat() {
            dashModule
                .transition().delay(360).on("start", function () {
                dashWaterIn();
                dashWaterOut();
                dashSmoke();
                dashFuel();
                repeat();
            });
        });
    };

	var renderElectricDashes = function (id) {
        var size = 6;
        var sec = 4096;
        var color = "#fff";

        var dashModule = bModule.svg.select(id);
        if (!dashModule) {
            console.warn("There IS NO " + id + "!");
            return;
        }

        var dashWater = function () {
            dashModule.append("circle").attr("cx", 263).attr("cy", 270).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 6).ease(d3.easeLinear).attr("cx", 294)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cy", 441)
                .transition().duration(sec / 3).ease(d3.easeLinear).attr("cx", 400)
                .remove();

            dashModule.append("circle").attr("cx", 402).attr("cy", 540).attr("r", size / 2).style("fill", color)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("cx", 260)                
                .remove();           
        };
                
        dashModule
            .transition().on("start", function repeat() {
            dashModule
                .transition().delay(260).on("start", function () {              
                dashWater();
                repeat();
            });
        });
    };



    var renderGasFire = function (id) {
        console.info("renderGasFire");
        var fireG = bModule.svg.select(id);
        if (!fireG) {
            console.warn("There IS NO " + id + "!");
            return;
        }

        var svgName = "../img/module/boiler_gas_fire.svg";

        var baseX = 540;
        var baseY = 475;

        var fire = fireG.append("svg:image")
            .attr("xlink:href", svgName)
            .attr("width", 120)
            .attr("height", 60)
            .attr("x", baseX)
            .attr("y", baseY);

        var sec = 600;

        var burn = function () {
            fire.transition().duration(sec / 2).ease(d3.easeLinear).attr("width", 180).attr("height", 90).attr("y", baseY - 15)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("width", 120).attr("height", 60).attr("y", baseY);
        };

        d3.interval(function () {
            burn();
        }, sec);
    };

    var renderWaterFire = function (id) {
        console.info("renderWaterFire");
        var fireG = bModule.svg.select(id);
        if (!fireG) {
            console.warn("There IS NO " + id + "!");
            return;
        }

        var svgName = "../img/module/boiler_water_fire.svg";

        var baseX = 660;
        var baseY = 519;

        var fire = fireG.append("svg:image")
            .attr("xlink:href", svgName)
            .attr("width", 100)
            .attr("height", 50)
            .attr("x", baseX)
            .attr("y", baseY);

        var sec = 600;

        var burn = function () {
            fire.transition().duration(sec / 2).ease(d3.easeLinear).attr("width", 160).attr("height", 80).attr("y", baseY - 15)
                .transition().duration(sec / 2).ease(d3.easeLinear).attr("width", 100).attr("height", 50).attr("y", baseY);
        };

        d3.interval(function () {
            burn();
        }, sec);
    };

    var renderWaterValues = function () {
        d3.interval(function () {
            runtime.fetchRuntime(bModule.boiler, updateWaterText);
            //runtime.values["#water_in_container"].text(num);
        }, 30000)
    };

    var updateWaterText = function () {
        console.warn("updateWaterText()");
        var updates = [1005, 1006, 1014, 1201, 1202, 1016];
        for (var i = 0; i < bModule.instants.length; i++) {
            var ins = bModule.instants[i];
            if (updates.indexOf(ins.id) > -1) {
                //console.warn("updates.indexOf(ins.id) > -1", ins);
                if (bModule.valueLabels[ins.id]) {
                    //console.warn("runtime.valueLabels[ins.id].text(ins.value + ins.unit);");
                    bModule.valueLabels[ins.id].text(ins.value + ins.unit);
                }
            }
        }
    };
});

var hasInitModule = false;