mainApp.controller("monitorController",function($rootScope,$scope,$filter,productData,$http){
	
	$scope.productData = productData;
		
	$scope.getBoilers = function () {
        $scope.datasource = $rootScope.boilers;
        for (var i = 0; i < $scope.datasource.length; i++) {
            var d = $scope.datasource[i];
            d.num = i;
            d.name = d.Name;
            if (d.name.length > 12) {
                d.name = d.name.substring(0, 10) + '...';
            }
//          $scope.fetchStatus(d);		
        }
        $scope.initSearch();       
        console.log($scope.datasource);
        $scope.isDone = $rootScope.boilers.length > 0;
    };	
    
    $rootScope.$watch('boilers', function () {
        // $log.warn("$rootScope.$watch.boilers: ", $rootScope.boilers);
        $scope.getBoilers();            
    });
    
	
	 $scope.initSearch = function () {
        $scope.provinces = $rootScope.locations;
        $scope.citis = [];
        $scope.regions = [];
        $scope.organizations = [{Uid: '', name: '所属企业（不限）'}];
        $scope.aBurning = undefined;
        $scope.evaporates = [
            {id: 0, Text: '额定蒸发量（不限）'},
            {id: 1, Text: 'D≤1'},
            {id: 2, Text: '1<D≤2'},
            {id: 3, Text: '2<D≤8'},
            {id: 4, Text: '8<D≤20'},
            {id: 5, Text: 'D>20'}
        ];
        $scope.mediums = [{Name: '锅炉介质（不限）'}];
        $scope.forms = [{Name: '锅炉型态（不限）'}];
        $scope.fuels = [{Name: '锅炉燃料（不限）'}];

		
		
        for (var i = 0; $rootScope.organizations && i < $rootScope.organizations.length; i++) {
            var org = $rootScope.organizations[i];
            if ($scope.organizations.indexOf(org) > -1) {
                continue;
            }
            $scope.organizations.push(org);                 
       }
		

        for (var i = 0; $rootScope.boilerMediums && i < $rootScope.boilerMediums.length; i++) {
            var med = $rootScope.boilerMediums[i];
            $scope.mediums.push(med);
        }
		
	
        for (var i = 0; $rootScope.boilerForms && i < $rootScope.boilerForms.length; i++) {
            var form = $rootScope.boilerForms[i];
            if (form.Id === 0 || $scope.forms.indexOf(form) > -1) {
                continue;
            }

            $scope.forms.push(form);
        }

        for (var i = 0; $rootScope.fuelTypes && i < $rootScope.fuelTypes.length; i++) {
            var fuel = $rootScope.fuelTypes[i];
            if (fuel.Id === 0 || fuel.Id >= 5 || $scope.fuels.indexOf(fuel) > -1) {
                continue;
            }
            $scope.fuels.push(fuel);
        }
        
        



		//初始化选项
        $scope.aEvaporate = $scope.evaporates[0];
        $scope.aForm = $scope.forms[0];
        $scope.aMedium = $scope.mediums[0];
        $scope.aOrg = $scope.organizations[0];
        //bMonitor.aProvince = bMonitor.provinces[0];
        $scope.aFuel = $scope.fuels[0];

//      bMonitor.aLocation = null;
        $scope.aQuery = "";

//      console.info("bMonitor.aOrg:", bMonitor.aOrg);
    };
	
	
	
	
	
	$scope.fetchStatus = function (boiler) {
        $http.get('/boiler/state/is_burning/?boiler=' + boiler.Uid)
            .then(function (res) {
                //console.log("Fetch Status Resp:", res.data);
                boiler.isBurning = (res.data.value === "true");
            }, function (err) {
                console.error('Fetch Status Err!', err);
            });
    };
	
	
	$scope.fetchThumbParam = function (boiler) {
        
        var rtmQ = [1201, 1015, 1002, 1202];
        $http.get('boiler_runtime_instants.json/').then(function (res) {
            boiler.imgName = function() {
                var imgName = boiler.Form.Id === 101 ? 'fb' : 'coalsingle';
        
                if (boiler.Fuel && boiler.Fuel.Type) {
                    switch (boiler.Fuel.Type.Id) {
                        case 1:
                        case 4:
                            if (boiler.Form.Id === 201 || boiler.Form.Id === 203) {
                                imgName = 'coalsingle';
                            } else if (boiler.Form.Id === 202 || boiler.Form.Id === 204) {
                                imgName = 'coaldouble';
                            } else if (boiler.Form.Id === 101) {
                                imgName = 'fb';
                            }
                            break;
                        case 2:
                        case 3:
                            if (boiler.Form.Id === 101) {
                                imgName = 'gasboiler_v';
                            } else {
                                imgName = 'gasboiler';
                            }
                    }
                }

                if (boiler.Form.Id === 205 || boiler.Medium.Id === 2) {
                    imgName = 'boilerwater';
                }

                return imgName;
            };
           
            
//          boiler.alarmLevel = boiler.isBurning ? 0 : -1;
            boiler.img = boiler.imgName() + (boiler.isBurning ? '.gif' : '.png');

            boiler.runtime = [[], []];

            for (var i = 0; i < Math.min(res.data.length, 4); i++) {
                var d = res.data[i];
                var value;
                var name = d.ParameterName;
                var alarmLevel = boiler.isBurning ? 0 : -1;

                if (d.Parameter == 1202) {
                    name = "过量空气系数"
                }

                if (boiler.isBurning) {
                    value = d.Value;
                    alarmLevel = d.AlarmLevel;

                    value += " " + d.Unit;
                } else {
                    value = "-";
                }

                if (alarmLevel > boiler.alarmLevel) {
                    boiler.alarmLevel = alarmLevel;
                }

                boiler.runtime[i % 2].push({
                    name: name,
                    value: value,
                    alarmLevel: alarmLevel
                });
            }

        }, function (err) {
           
        });
    };
	
	
	
	
	
	
	
	
	//filter_monitor过滤	
	var aForm = null;
	var selectedFuel = null;
	var aEvaporate = null;
	
	//Form select
	$scope.selectModel = function(newCategory){
		aForm = newCategory;
		if(aForm.Id==null){
			aForm=null;
		}
		$scope.selectedpage = 1;
		console.log(aForm);
	}
	$scope.modelFilterFn = function(product){
		return aForm == null ||
		product.Form.Id == aForm.Id;		 
	}	
	
	//Fuel select
	$scope.selectFuel = function(newCategory){
		selectedFuel = newCategory;
		if(selectedFuel.Id==null){
			selectedFuel=null;
		}
		$scope.selectedpage = 1;
		console.log(selectedFuel);
	}
	$scope.fuelFilterFn = function(product){
		return selectedFuel == null ||
		 product.Fuel.Type.Id == selectedFuel.Id;
	}
	
	//aEvaporate select
	$scope.selectaEvaporate = function(newCategory){
		aEvaporate = newCategory;
		if(aEvaporate.id==0){
			aEvaporate=null;
		}
		$scope.selectedpage = 1;
		console.log(aEvaporate);
	}					
	$scope.aEvaporateFilterFn = function(product){
		return aEvaporate == null ||
		product.EvaporatingCapacity == aEvaporate.id;
	}
	
	
	//isburning
	$scope.filterBurning = function (product) { 		
		return $scope.aBurning == null ||
		product.isBurning == $scope.aBurning; 		
    };
	
	
	
	
	//企业
	var aOrg = null;
	$scope.filterBoilers=function(aorg){
		aOrg = aorg;
		if(aOrg==null||aOrg.Uid==''){
			aOrg=null;
		}
		$scope.selectedpage = 1;		
//		var res = $filter("filter")($scope.productData,function(product){
//			return aOrg == null ||
//			product.company == aOrg.name;			
//		});		
		console.log(aOrg);
	};
	
	$scope.aOrgFilterFn = function(product){		
		return aOrg == null ||
		product.Factory && product.Factory.Uid === aOrg.Uid||		
        product.Enterprise && product.Enterprise.Uid === aOrg.Uid ||
        product.Installed && product.Installed.Uid === aOrg.Uid;
	}
	
	
	//location
	var aProvince,aCity,aRegion;
	var aLocation=null;
	
	$scope.changeProvince = function (Province) {
        aProvince = Province;
        aLocation = aProvince;
        $scope.aLocation = aLocation;
   };
    $scope.changeCity = function (City) {
        aCity = City;
        aLocation = aCity;
       $scope.aLocation = aLocation;
    };

    $scope.changeRegion = function (Region) {
        aRegion = Region;
        aLocation = aRegion;
        $scope.aLocation = aLocation;
    };
	
		 
	
})

mainApp.controller("DashboardController",function($scope, $rootScope, $http, $filter, $state){
    
    bMonitor = this;
    bMonitor.isDone = false;
    
    bMonitor.getRuntimeCount = function () {
        $http.get('boiler_runtime_count.json/')
            .then(function (res) {
//              console.warn("boiler_runtime_count resp:", res);
                bMonitor.runtimeCount = res.data;
            });
    };
    
     bMonitor.fetchTotal = function () {
        var week = 4;

        $http.get('boiler_status_running.json/')
            .then(function (res) {
//              console.info("boiler_status_running_total resp:", res);
                var total = 0;
                for (var i = 0; i < Object.values(res.data).length; i++) {
                    var due = Object.values(res.data)[i];
                    total += due;
                }
//              console.info("total duration: ", due);
                var duraText = '';
                var duration = total / 1000 / 1000 / 1000;   //sec
                var dHour = Math.floor(duration / 60 / 60);

                duraText += dHour > 0 ? dHour : '';
           

                bMonitor.runningTotal = duraText;
               
        });

        $http.get('boiler_evaporate_rank.json/').then(function (res) {
            console.warn("boiler_evaporate_rank RESP:", res);
            var chart = new AmCharts.AmSerialChart();
            chart.theme = AmCharts.themes.light;
            chart.color = "#333";
//          chart.language = "zh";
//          chart.dataDateFormat = 'MMM DDD';           
            chart.valueAxes = [{
//              stackType: "none",
                position: "left",
                maximum: 105,
                showLastLabel: false,
                unit: '%',
                title: '达标率'
            }];
           
            chart.startDuration = 1;  
            chart.colors= [
				"#67b7dc",
				"#c4e479",
				"#84b761",
				"#cc4748",
				"#cd82ad",
				"#2f4074",
				"#448e4d",
				"#b7b83f",
				"#b9783f",
				"#b93e3d",
				"#913167"
			];          
//          chart.plotAreaFillAlphas = 0.1;
            chart.depth3D = 15;
            chart.angle = 30;
            chart.legend = { 
            	horizontalGap: 10,
		        useGraphSettings: true,
		        markerSize: 10,
//              valueText: "[[value]]",
                valueWidth: 50,
//              valueAlign: "left",
                equalWidths: false,
//              periodValueText: "total: [[value.sum]]"
            
            };

            chart.categoryField = "evaporate";
            chart.categoryAxis = {               
                axisAlpha: 0.2,
                gridPosition: "start",
                title: "燃煤锅炉、生物质锅炉　　　　　　　　　　",
                　　　　	position:"left"　　
            };
            chart.allLabels = [
                {
                    text: "燃油锅炉、燃气锅炉",
                    align: "right",
                    size: 12,
                    bold: true,
                    x: '92%',
                    y: 328
                }
            ];
            chart.export = {
                enabled: true
            };
			
            var ids = ['c0', 'c1', 'c2', 'c3', 'c4', 'g0', 'g1'];
            var evaporates = ['D≤1<br>(≥61%)', '1＜D≤2<br>(≥69%)', '2＜D≤8<br>(≥71%)', '8＜D≤20<br>(≥72%)', 'D＞20<br>(≥72%)', 'D≤2<br>(≥79%)', 'D＞2<br>(≥81%)'];

            var dataProvider = [];
			
            for (var i = 0; i < ids.length; i++) {
                var data = {};
                data.id = ids[i];
                data.evaporate = evaporates[i];
                data.countSuccess = 0;
                data.countFailed = 0;
                data.percentSuccess = 0.0;
                data.percentFailed = 0.0;
                data.colorSuccess = "#67b7dc";
                data.colorFailed = "#fdd400";

                var items = $filter('filter')(res.data, function (item) {
                    if (item['evaporate_id'] === data.id) {
                        return true;
                    }
                    return false;
                });

                if (items && items.length > 0) {
                    for (var j = 0; j < items.length; j++) {
                        var it = items[j];
                        if (it.rank === 'success') {
                            data.countSuccess = parseInt(it.count);
                        } else {
                            data.countFailed = parseInt(it.count);
                        }
                    }
                }

                if (data.countSuccess + data.countFailed > 0) {
                    data.percentSuccess = (data.countSuccess * 100) / (data.countSuccess + data.countFailed);
                    data.percentFailed = 100 - data.percentSuccess;

                    data.percentSuccess = data.percentSuccess.toFixed(1);
                    data.percentFailed = data.percentFailed.toFixed(1);
                }

                dataProvider.push(data);                
            }

            var status = ['Success', 'Failed'];
                       

            for (var is = 0; is < status.length; is++) {
                var st = status[is];

                var graph = new AmCharts.AmGraph();
                graph.fillAlphas = 0.66;
                graph.lineAlpha = 0.1;
                graph.title = st;
                graph.fillColorsField= "color";
                graph.highField = "count" + st;
                graph.labelText = "[[ high ]]";
                graph.labelFunction = function (graphDataItem) {
                    var field = "count" + (graphDataItem.color === "#67b7dc" ? "Success" : "Failed");
                    var text = graphDataItem.dataContext[field];
                    
                    return text + " 台";
                };
                graph.type = "column";
//              graph.colorField = "color" + st;
                graph.valueField = "percent" + st;
                graph.balloonText = "[[value]]" + " %";
                graph.color = "#888888";
                
                chart.addGraph(graph);
            }

            chart.dataProvider = dataProvider;
            

            if ("undefined" != typeof AmCharts && 0 !== $("#dashboard_amchart_3d").size()) {
                chart.write("dashboard_amchart_3d");
            }
        });

        
    };
    
    
    bMonitor.initAmChartPie = function () {
           if (!$rootScope.boilers || $rootScope.boilers.length === 0) {
               return;
           }
        
        var chartData = [];

            chartData.push({
                range: 'D＜1',
                count: 0
            });
            chartData.push({
                range: '1＜D≤2',
                count: 0
            });
            chartData.push({
                range: '2＜D≤8',
                count: 0
            });
            chartData.push({
                range: '8＜D≤20',
                count: 0
            });
            chartData.push({
                range: 'D＞20',
                count: 0
            });
            
            
            
            console.log($rootScope.boilers);
            
            for (var i = 0; i < $rootScope.boilers.length; i++) {
                var boiler = $rootScope.boilers[i];
                var rate = boiler.EvaporatingCapacity;
                if (rate <= 1) {
                    chartData[0].count++;
                } else if (rate <= 2) {
                    chartData[1].count++;
                } else if (rate <= 8) {
                    chartData[2].count++;
                } else if (rate <= 20) {
                    chartData[3].count++;
                } else {
                    chartData[4].count++;
                }
            };
            
            console.log(chartData);

			var balloonText = function (graphDataItem, graph) {
//              console.error("balloonText", graphDataItem, graph);
                var title = graphDataItem.title;
                var count = graphDataItem.value;
                var percents = graphDataItem.percents.toFixed(2);
                return title + "<br><b>" + count + "台</b><br>(" + percents + "%)";
            };
            
            var chart = new AmCharts.AmPieChart();
            chart.type = "pie";
            chart.theme = "light";
            chart.language = "zh";
            chart.valueField = "count";
            chart.titleField = "range";
			
			chart.colors= [
				"#84b761",
				"#fdd400",
				"#5fbfdb",
				"#c4e479",
				"#cd82ad",
				"#2f4074",
				"#448e4d",
				"#b7b83f",
				"#b9783f",
				"#b93e3d",
				"#913167"
			]; 
	
            // chart.startDuration = 1;
            //
            // chart.plotAreaFillAlphas = 0.1;
            chart.outlineAlpha = .4;
            chart.depth3D = 12;
	
  			chart.legend={
  				position:"bottom",
			    marginRight:10,
			    markerSize: 10,
			    valueText: "",
			    align: "center",
			    autoMargins:false
  			};

            
            chart.angle = 30;
            chart.labelRadius = 8;
            chart.minRadius = 145;

            chart.accessibleLabel = "[[title]]<br>[[value]] 台 ([[percents]]%)";
            chart.labelText = "[[title]]<br>[[percents]]%";
            chart.balloonFunction = balloonText;

            chart.export = { enabled: true };

            chart.dataProvider = chartData;

            // console.error("dataProvider:", chartData);

            chart.write("dashboard_amchart_pie");

    };
	
    $rootScope.$watch('boilers', function () {
        bMonitor.initAmChartPie();           
    });
		
	


   

})



mainApp.controller("viewCtrl",function($scope,$uibModal){


	$scope.pageSize = 4;
//	$scope.totalItems = $scope.datasource.length;
	
	var boiler = $scope.productData;
	$scope.openModal = function(data) {
		
		var modalInstance = $uibModal.open({
			templateUrl: 'directives/modal/boiler_calculate_gas.html', //script标签中定义的id
//			if (boiler.Fuel.Type.Id === 1 || boiler.Fuel.Type.Id === 4) {
//	            templateUrl = '/directives/modal/boiler_calculate_coal.html';
//	        } else {
//	            templateUrl = '/directives/modal/boiler_calculate_gas.html';
//	        },
			controller: 'viewModalCtrl', //modal对应的Controller
			controllerAs: '$modal',
			size: 'lg', //大小配置 
			resolve: {
				currentBoiler: function() { //data作为modal的controller传入的参数	
					return data; //用于传递数据
				}
			}
		})
	}
	
})

//模态框对应的Controller
mainApp.controller('viewModalCtrl', function($scope, $uibModalInstance, $http, currentBoiler) {
	var $modal = this;
    $modal.editing = false;
    $modal.boiler = currentBoiler;
	
    if (!currentBoiler) {
        $uibModalInstance.close('null object');
        return;
    }

    $modal.initCalc = function () {
        $modal.data = {};
        $modal.data.boiler_id = $modal.boiler.Uid;
        $modal.data.fuel_type_id = $modal.boiler.Fuel.Type.Id;

        $http.get('boiler_runtime_instants.json/').then(function (res) {
            // console.warn("Get Instant Tempers:", res);
            $modal.data.smoke_temper = res.data[0].Value;
            $modal.data.wind_temper = res.data[1].Value;
            $modal.data.smoke_o2 = res.data[2].Value;
        }, function (err) {
            console.warn("Get Instant Tempers Error:", err);
        });

        if (currentBoiler.Calculate) {
            var calcParam = currentBoiler.Calculate;
			console.log(currentBoiler.Calculate);
            $modal.data.parameter_id = calcParam.Uid;
            if ($modal.data.fuel_type_id === 1 || $modal.data.fuel_type_id === 4) {
                // COAL
                $modal.data.qnetvar = calcParam.CoalQnetvar;
                $modal.data.aar = calcParam.CoalAar;
                $modal.data.mar = calcParam.CoalMar;
                $modal.data.vdaf = calcParam.CoalVdaf;
                $modal.data.clz = calcParam.CoalClz;
                $modal.data.clm = calcParam.CoalClm;
                $modal.data.cfh = calcParam.CoalCfh;
                $modal.data.ded = calcParam.CoalDed;
                $modal.data.dsc = calcParam.CoalDsc;
                $modal.data.alz = calcParam.CoalAlz;
                $modal.data.alm = calcParam.CoalAlm;
                $modal.data.afh = calcParam.CoalAfh;
                $modal.data.tlz = calcParam.CoalTlz;
                $modal.data.ct_lz = calcParam.CoalCtLz;


                $modal.data.m = calcParam.CoalM;
                $modal.data.n = calcParam.CoalN;

                $modal.data.q3 = calcParam.CoalQ3;
                $modal.data.q5 = calcParam.ConfParam1;
            } else {
                // GAS
                $modal.data.ded = calcParam.GasDed;

                $modal.data.m = calcParam.GasM;
                $modal.data.n = calcParam.GasN;

                $modal.data.q3 = calcParam.GasQ3;
                $modal.data.q5 = calcParam.ConfParam1;
            }
        }
    };

    $modal.reset = function () {
        $modal.initCalc();
    };

    $modal.calculate = function () {
        Ladda.create(document.getElementById('boiler_ok')).start();

        $http.post("/boiler_calculate/", $modal.data)
            .then(function (res) {
                console.warn("Boiler Calculate Res:", res);
                $modal.data.q2 = res.data.q2;
                $modal.data.q3 = res.data.q3;
                $modal.data.q4 = res.data.q4;
                $modal.data.q5 = res.data.q5;
                $modal.data.q6 = res.data.q6;
                $modal.data.excessAir = res.data.apy;
                $modal.data.heat = res.data.Heat;
            }, function (err) {
                swal({
                    title: "参数计算失败",
                    text: err.data,
                    type: "error"
                });
            });
        Ladda.create(document.getElementById('boiler_ok')).stop();
    };

    $modal.save = function () {
        Ladda.create(document.getElementById('boiler_ok')).start();
        $http.post("/boiler_calculate_parameter_update/", $modal.data)
            .then(function (res) {
            console.log("res", res);
            swal({
                title: "计算参数更新成功",
                type: "success"
            }).then(function () {
                $rootScope.getBoilerCalculateParameter($modal.boiler);
            });
        }, function (err) {
            swal({
                title: "计算参数更新失败",
                text: err.data,
                type: "error"
            });
        });
        Ladda.create(document.getElementById('boiler_ok')).stop();
    };

    $modal.cancel = function () {
        $uibModalInstance.dismiss('cancel');

        currentBoiler = null;
    };

    $modal.initCalc();
	
	
	
//        $scope.data= data;
//        //在这里处理要进行的操作
//        $scope.ok = function() {
//            $uibModalInstance.close();
//        };
//        $scope.cancel = function() {
//            $uibModalInstance.dismiss('cancel');
//        }
    });



 mainApp.controller("productList",function($scope,$filter){
	$scope.pageSize = 10;

})



mainApp.controller("mapController",function($scope,$location,productData){
	$scope.data = productData;
	var map = new BMap.Map("map-container"); // 创建地图
	 
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	map.addControl(new BMap.NavigationControl()); 
	map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
	
	var long = 0;
    var lat = 0;
    var count = 0;
    for (var i = 0; i < $scope.data.length; i++) {
            var b = $scope.data[i];
            if (!b.Address || b.Address.Longitude == 0 || b.Address.Latitude == 0) {
                continue;
            }
            var longitude = b.Address.Longitude;
            var latitude = b.Address.Latitude;
            count ++;
            long += longitude;
            lat += latitude;
            var point = new BMap.Point(longitude, latitude);
            var marker = new BMap.Marker(point);
            var label = new BMap.Label(i);
            var offsetX = 0;
            var fontSize = 12;
            if (i < 10) {
                offsetX = 5;
            } else if (i < 100) {
                offsetX = 1;
            } else if (i < 1000) {
                fontSize = 10;
            }
            label.setStyle({
                'font-family': 'sans-serif',
                'font-size': fontSize + 'px',
                'text-align': 'center',
                'color': '#fff',
                'border': 'none',
                'background-color': 'transparent'});
            label.setOffset(new BMap.Size(offsetX, 2));
            marker.setTitle(b.Name);
            marker.setLabel(label);
            marker.addEventListener("click", function(){
                $location.hash('b' + b.num);
            });
            marker.addEventListener("dblclick", function(){
                $state.go("runtime.dashboard", {boiler: b.Uid});
            });
            map.addOverlay(marker);
            marker.setAnimation('BMAP_ANIMATION_DROP');
        }
        var cenLong = long / count;
        var cenLat = lat / count;
        console.warn("BMap Center", cenLong, cenLat, long, lat, count + "/" + $scope.data.length);
        var center = new BMap.Point(cenLong, cenLat);
		map.centerAndZoom(center, 15); 
	
	$scope.bdGEO = function(boiler){
		var newAddress=boiler.Address.Location.LocationName + boiler.Address.Address;
		var city = boiler.Address.Location.LocationName;
		geocodeSearch(newAddress,city);
	}
	
	// 创建地址解析器实例     
	var myGeo = new BMap.Geocoder();      
	// 将地址解析结果显示在地图上，并调整地图视野  
	
	function geocodeSearch(add,city){		
		myGeo.getPoint(add, function(point){      
	    if (point) { 
	    	$scope.longitude = point.lng;
            $scope.latitude = point.lat;
	    	map.centerAndZoom(point, 15);   
	    	var marker = new BMap.Marker(point);        // 创建标注    
			map.addOverlay(marker);                     // 将标注添加到地图中 
	    }      
	 }, 
	"city");
	}


	$scope.local = new BMap.LocalSearch(map, {
            renderOptions: {
                map: map,
                panel: "results",
                autoViewport: true,
                selectFirstResult: true
            },
            pageCapacity: 8
        });
        
 		
	
	

	
	
})


var bMonitor;



