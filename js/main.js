
var mainApp = angular.module("BoilerAdmin",[
	"ui.router" , 
	"ui.bootstrap", 
	"customFilter",
	"oc.lazyLoad",
	"angularMoment",
	"ui.select",
	"ngSanitize",
	'frapontillo.bootstrap-switch',
	]);


/* Setup global settings */
mainApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

mainApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/monitor/thumb");

     $stateProvider
        .state("monitor", {
            url: "/monitor",
            templateUrl: "views/monitor/main.html",
            controller: "monitorController",
           resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([				             	
             	'../js/directives/components/filter_monitor.js',
             	'../js/controllers/dashboardController.js'  
             	
		             ]);
		    }]
		  }
        })
        .state("monitor.dashboard", {
            url: "/monitor/dashboard",
            templateUrl: "views/monitor/dashboard.html",
            controller: "DashboardController",
            controllerAs: "dashboard",
            data: {pageTitle: "平台总览"}, 
             resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	           	
		             ]);
		    }]
		  }
        })
        .state("monitor.thumb", {
            url:"/thumb",
            templateUrl: "views/monitor/thumb.html",
            data: {pageTitle: "设备图文"},
            
        })
        .state("monitor.list", {
            url:"/list",
            templateUrl: "views/monitor/list.html",
            data: {pageTitle: "设备列表"},
            
        })
        .state("monitor.map", {
            url:"/map",
            templateUrl: "views/monitor/map.html",
            data: {pageTitle: '设备地图'},
            controller: "mapController",
            
        })
        
        /*============= RUNTIME BEGIN =============*/
    $stateProvider
        .state("runtime", {
            url:"/runtime?:boiler:from",
            templateUrl: "views/runtime/main.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([ 
             	'../js/directives/chart_steam.js',
             	'../js/directives/chart_temperature.js',
             	'../js/directives/chart_smoke-components.js',
                '../js/directives/chart_excess-air.js',
                '../js/directives/chart_heat.js',
                '../js/directives/chart_heat_month.js',
                '../js/directives/chart_dynamic.js',
                '../js/controllers/BoilerRuntimeController.js', 
		             ]);
		    }]
		  }
        })
        .state("runtime.dashboard", {
            url:"/animation",
            templateUrl: "views/runtime/dashboard.html",
            data: {pageTitle: '炉型详图'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([        
             	'../js/directives/boiler_module.js',             	
		             ]);
		    }]
		  }
        })
        .state("runtime.stats", {
            url:"/stats",
            templateUrl: "views/runtime/stats.html",
            data: {pageTitle: '运行参数'},
            
        })
        .state("runtime.history", {
            url:"/history",
            templateUrl: "views/runtime/history.html",
            data: {pageTitle: '历史数据'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/BoilerHistoryController.js',
             	'../js/asset/angular-locale_zh-cn.js'
		             ]);
		    }]
		  }
        })
        .state("runtime.alarm", {
            url:"/alarm",
            templateUrl: "views/runtime/alarm.html",
            data: {pageTitle: '锅炉告警'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/AlarmController.js', 
             	'../js/directives/chart_alarm.js', 
		             ]);
		    }]
		  }
        })
        .state("runtime.maintain", {
            url:"/maintain",
            templateUrl: "views/runtime/maintain.html",
            data: {pageTitle: '维保记录'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/BoilerMaintainController.js',            	
		             ]);
		    }]
		  }
        })
        .state("runtime.info", {
            url: "/info",
            templateUrl: "views/runtime/info.html",
            controller: "BoilerInfoController",
            controllerAs: "info",
            data: {pageTitle: '设备信息'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/BoilerInfoController.js',
                '../js/directives/table_boiler-info.js'            	
		             ]);
		    }]
		  }            
        })
        .state("runtime.developer", {
            url: "/developer",
            templateUrl: "views/runtime/developer.html",
            data: {pageTitle: '调试设置'},
            controller: "BoilerDeveloperController",
            controllerAs: "developer",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	 '../js/controllers/BoilerDeveloperController.js',
		             ]);
		    }]
		  }            
        })

        
        
        
        .state("alarm", {
            url: "/alarm",
            templateUrl: "views/alarm.html",
            data: {pageTitle: '告警信息'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
        		        		
             	'../js/controllers/alarmController.js',   
             	'../js/directives/chart_alarm.js', 
		             ]);
		    }]
		  }
        })
        .state("dialogue", {
            url: "/dialogue",
            templateUrl: "views/dialogue.html",
            data: {pageTitle: '专家咨询'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([ 
             
             	'../js/controllers/dialogueController.js'             	
		             ]);
		    }]
		  }
        })
        .state("boiler-maintain", {
            url: "/boiler-maintain",
            templateUrl: "views/boiler-maintain.html",
            data: {pageTitle: '维保记录'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/BoilerMaintainController.js',            	
		             ]);
		    }]
		  }
        })
        .state("organization", {
            url: "/organization?:tid",
            templateUrl: "views/organization/main.html",
            data: {pageTitle: '企业信息总览'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/organizationController.js',            	
		             ]);
		    }]
		  }
        })
        .state("organization.overview", {
            url: "/overview",
            templateUrl: "views/organization/dashboard.html",
            data: {pageTitle: '企业信息总览'}
        })
        
        
        .state("boiler", {
            url: "/boiler",
            templateUrl: "views/boiler/main.html",
            data: {pageTitle: '锅炉信息总览'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/boilerController.js',            	
		             ]);
		    }]
		  }
        })
        .state("boiler.dashboard", {
            url: "/dashboard",
            templateUrl: "views/boiler/dashboard.html",
            data: {pageTitle: '锅炉信息'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	           	
		             ]);
		    }]
		  }
        })
        .state("boiler.info", {
            url: "/info",
            templateUrl: "views/boiler/info.html",
            data: {pageTitle: '锅炉信息'},
            params:{"bilierInfo":null},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	           	
		             ]);
		    }]
		  }
        })
        .state("terminal", {
            url: "/terminal",
            templateUrl: "views/terminal/main.html",
            data: {pageTitle: '终端管理'},
            controller: "TerminalController",
            controllerAs: "terminal",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/terminalController.js',            	
		             ]);
		    }]
		  }
        })
        .state("terminal.dashboard", {
            url: "/dashboard",
            templateUrl: "views/terminal/dashboard.html",
            data: {pageTitle: '终端列表'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	         	
		             ]);
		    }]
		  }
        })
        .state("terminal.message", {
            url: "/message",
            templateUrl: "views/terminal/message.html",
            data: {pageTitle: '终端消息调试'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	         	
		             ]);
		    }]
		  }
        })
        
        .state("config-runtime-alarm", {
            url: "/config-runtime-alarm",
            templateUrl: "views/config-runtime-alarm.html",
            data: {pageTitle: '告警设置'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/configAlarmController.js',            	
		             ]);
		    }]
		  }
        })
        .state("config-runtime-parameter", {
            url: "/config-runtime-parameter",
            templateUrl: "views/config-runtime-parameter.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/configParamterController.js',            	
		             ]);
		    }]
		  }
        })
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/profileController.js',            	
		             ]);
		    }]
		  }
        })
        .state("profile.account", {
            url:"/account",
            templateUrl: "views/profile/user-info.html",
            data: {pageTitle: '账户设置'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	          	
		             ]);
		    }]
		  }
        })
        .state("profile.password", {
            url:"/account",
            templateUrl: "views/profile/pass-change.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	          	
		             ]);
		    }]
		  }
        })
        .state("wiki", {
            url: "/wiki",
            templateUrl: "views/wiki/main.html",
            data: {pageTitle: '系统帮助'},
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             
             	'../js/controllers/wikiController.js',            	
		             ]);
		    }]
		  }
        })
        .state("wiki.updateHistory", {
            url: "/update",
            templateUrl: "views/wiki/updateHistory.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([            
             	         	
		             ]);
		    }]
		  }
        })
        .state("wiki.user", {
            url: "/user",
            templateUrl: "views/wiki/user.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             
             	         	
		             ]);
		    }]
		  }
        })
        
        .state("user-account", {
            url: "/user-account",
            templateUrl: "views/user-account.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/userAccountController.js',            	
		             ]);
		    }]
		  }
        })
        
        
});


//配置动态加载  
mainApp.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",  
    function($provide, $compileProvider, $controllerProvider, $filterProvider) {  
        mainApp.controller = $controllerProvider.register;  
        mainApp.directive = $compileProvider.directive;  
        mainApp.filter = $filterProvider.register;  
        mainApp.factory = $provide.factory;  
        mainApp.service = $provide.service;  
        mainApp.constant = $provide.constant;  
    }  
]); 


 mainApp.service("productData",function(){
	return[
		{
			num:1,
			Uid:1,
			name:"680064",
			company:"东莞天鹿锅炉有限公司",
			registrationCode:688888,
			model:688888,
			state:1,
			evaporation:2,
			Address: {
				Location:{
					LocationName:"浙江省 杭州市 滨江区"
				},
				Address:"滨文路32号",
				Longitude: 120.021273,
				Latitude: 29.959489,
			} ,
			Enterprise:{
				Name:"东莞天鹿锅炉有限公司",
			},
			isBurning:0,
			Fuel:{
				Type:{
					Id:1,
					name:"燃煤",					
				}
			},
			alarmLevel:1,
			runtime:[
				[
					{
						name:"热效率",
						value:"555",
					},
					{
						name:"蒸汽压力",
						value:"44",
					},
				],
				[
					{
						name:"排烟温度(低)",
						value:"28.2 ℃",
					},
					{
						name:"蒸汽温度",
						value:"41.1 ℃",
					},
				],
				
			],
			EvaporatingCapacity: 3,
			Form: {
				Id: 201,
				Name: "卧式单筒锅炉",
				Type: {
					Id: 2,
					Name: "卧式锅炉",				
				}
			},
			Calculate: 
			{
				Uid: "00a55dc6-9cfd-11e7-be6e-7cd30ac4f6d2",
				Name: "680064",
				NameEn: "",
				Remark: "",
				CreatedDate: "2017-09-19T13:40:10+08:00",
				CreatedBy: null,
				UpdatedDate: "2017-09-19T13:40:10+08:00",
				UpdatedBy: null,				
				Boiler: {
					Uid: "7551c963-76ff-4fe0-a50a-c65aa40537e4",
					Name: "",
					NameEn: "",
					Remark: "",
					CreatedDate: "0001-01-01T00:00:00Z",
					CreatedBy: null,
					UpdatedDate: "0001-01-01T00:00:00Z",
					UpdatedBy: null,
					IsDemo: false,
					IsDeleted: false,
					Form: null,
					Medium: null,
					Usage: null,
					Fuel: null,
					Template: null,
					Factory: null,
					Enterprise: null,
					Installed: null,
					Address: null,
					FactoryNumber: "",
					RegisterCode: "",
					RegisterOrg: null,
					CertificateNumber: "",
					DeviceCode: "",
					ModelCode: "",
					EvaporatingCapacity: 0,
					Contact: null,
					Terminal: null,
					TerminalCode: "",
					TerminalSetId: 0,					
					Status: null,
					Runtime: null,
					Calculate: null,
					Maintenance: null,
					Subscribers: null
				},
				CoalQnetvar: 0,
				CoalAar: 0,
				CoalMar: 0,
				CoalVdaf: 30,
				CoalClz: 0,
				CoalClm: 0,
				CoalCfh: 0,
				CoalDed: 0,
				CoalDsc: 0,
				CoalAlz: 0,
				CoalAlm: 0,
				CoalAfh: 0,
				CoalQ3: 30,
				CoalM: 10,
				CoalN: 20,
				CoalTlz: 0,
				CoalCtLz: 0,
				GasDed: 0,
				GasDsc: 0,
				GasApy: 0,
				GasQ3: 0,
				GasM: 0,
				GasN: 0,
				ConfParam1: 50,
				ConfParam2: 0,
				ConfParam3: 0,
				ConfParam4: 0,
				ConfParam5: 0,
				ConfParam6: 0,
				AlarmThreshold1: 0,
				AlarmThreshold2: 0,
				AlarmThreshold3: 0,
				AlarmThreshold4: 0,
				AlarmThreshold5: 0,
				AlarmThreshold6: 0,
				AlarmThreshold7: 0,
				AlarmThreshold8: 0,
				Reserved1: 0,
				Reserved2: "2017-09-19T13:40:10+08:00",
				Reserved3: 0,
				Reserved4: 0
			}
			,
		},
		{
			num:2,
			Uid:2,
			name:"680055",
			company:"青岛胜利锅炉有限公司",
			registrationCode:680055,
			model:680055,
			state:0,
			evaporation:2,
			Address: {
				Location:{
					LocationName:"山东省 临沂市 兰山区	"
				},
				Address:"山东省临沂市兰山区枣园镇永安路55号",
				Longitude: 119.902244,
				Latitude: 30.090539,
			} ,
			Enterprise:{
				Name:"青岛胜利锅炉有限公司",
			},
			isBurning:1,
			Fuel:{
				Type:{
					Id:3,
					name:"燃气",
				}
			},
			alarmLevel:-1,
			runtime:[
				[
					{
						name:"热效率",
						value:"555",
						alarmLevel:0,
					},
					{
						name:"蒸汽压力",
						value:"44",
						alarmLevel:1,
					},
				],
				[
					{
						name:"排烟温度(低)",
						value:"28.2 ℃",
						alarmLevel:0,
					},
					{
						name:"蒸汽温度",
						value:"41.1 ℃",
						alarmLevel:2,
					},
				],
				
			],
			EvaporatingCapacity: 2,
			Form: {
				Id: 201,
				Name: "卧式单筒锅炉",
				Type: {
					Id: 2,
					Name: "卧式锅炉",				
				}
			},
			Calculate: [
			{
				Uid: "00a55dc6-9cfd-11e7-be6e-7cd30ac4f6d2",
				Name: "680064",
				NameEn: "",
				Remark: "",
				CreatedDate: "2017-09-19T13:40:10+08:00",
				CreatedBy: null,
				UpdatedDate: "2017-09-19T13:40:10+08:00",
				UpdatedBy: null,				
				Boiler: {
					Uid: "7551c963-76ff-4fe0-a50a-c65aa40537e4",
					Name: "",
					NameEn: "",
					Remark: "",
					CreatedDate: "0001-01-01T00:00:00Z",
					CreatedBy: null,
					UpdatedDate: "0001-01-01T00:00:00Z",
					UpdatedBy: null,
					IsDemo: false,
					IsDeleted: false,
					Form: null,
					Medium: null,
					Usage: null,
					Fuel: null,
					Template: null,
					Factory: null,
					Enterprise: null,
					Installed: null,
					Address: null,
					FactoryNumber: "",
					RegisterCode: "",
					RegisterOrg: null,
					CertificateNumber: "",
					DeviceCode: "",
					ModelCode: "",
					EvaporatingCapacity: 0,
					Contact: null,
					Terminal: null,
					TerminalCode: "",
					TerminalSetId: 0,					
					Status: null,
					Runtime: null,
					Calculate: null,
					Maintenance: null,
					Subscribers: null
				},
				CoalQnetvar: 0,
				CoalAar: 0,
				CoalMar: 0,
				CoalVdaf: 0,
				CoalClz: 0,
				CoalClm: 0,
				CoalCfh: 0,
				CoalDed: 0,
				CoalDsc: 0,
				CoalAlz: 0,
				CoalAlm: 0,
				CoalAfh: 0,
				CoalQ3: 0,
				CoalM: 0,
				CoalN: 0,
				CoalTlz: 0,
				CoalCtLz: 0,
				GasDed: 0,
				GasDsc: 0,
				GasApy: 0,
				GasQ3: 0,
				GasM: 0,
				GasN: 0,
				ConfParam1: 0,
				ConfParam2: 0,
				ConfParam3: 0,
				ConfParam4: 0,
				ConfParam5: 0,
				ConfParam6: 0,
				AlarmThreshold1: 0,
				AlarmThreshold2: 0,
				AlarmThreshold3: 0,
				AlarmThreshold4: 0,
				AlarmThreshold5: 0,
				AlarmThreshold6: 0,
				AlarmThreshold7: 0,
				AlarmThreshold8: 0,
				Reserved1: 0,
				Reserved2: "2017-09-19T13:40:10+08:00",
				Reserved3: 0,
				Reserved4: 0
			}
			],
		},
		{
			num:3,
			Uid:3,
			name:"68009211111",
			company:"广州特种承压设备检测研究院",
			registrationCode:680092,
			model:680092,
			state:0,
			evaporation:2,
			Address: {
				Location:{
					LocationName:"广东省 东莞市"
				},
				Address:"东莞市莞城鸿裕一街1幢3楼10号",
				Longitude: 119.732945,
				Latitude: 29.820494,
			} ,
			Enterprise:{
				Name:"广州特种承压设备检测研究院",
			},
			isBurning:1,
			Fuel:{
				Type:{
					Id:6,
					name:"燃气",
					
				}
			},
			alarmLevel:2,
			runtime:[
				[
					{
						name:"热效率",
						value:"555",
						alarmLevel:0,
					},
					{
						name:"蒸汽压力",
						value:"44",
						alarmLevel:0,
					},
				],
				[
					{
						name:"排烟温度(低)",
						value:"28.2 ℃",
						alarmLevel:0,
					},
					{
						name:"蒸汽温度",
						value:"41.1 ℃",
						alarmLevel:2,
					},
				],
				
			],
			EvaporatingCapacity: 2,
			Form: {
				Id: 201,
				Name: "卧式单筒锅炉",
				Type: {
					Id: 2,
					Name: "卧式锅炉",				
				}
			},	
			Calculate: [
			{
				Uid: "00a55dc6-9cfd-11e7-be6e-7cd30ac4f6d2",
				Name: "680064",
				NameEn: "",
				Remark: "",
				CreatedDate: "2017-09-19T13:40:10+08:00",
				CreatedBy: null,
				UpdatedDate: "2017-09-19T13:40:10+08:00",
				UpdatedBy: null,				
				Boiler: {
					Uid: "7551c963-76ff-4fe0-a50a-c65aa40537e4",
					Name: "",
					NameEn: "",
					Remark: "",
					CreatedDate: "0001-01-01T00:00:00Z",
					CreatedBy: null,
					UpdatedDate: "0001-01-01T00:00:00Z",
					UpdatedBy: null,
					IsDemo: false,
					IsDeleted: false,
					Form: null,
					Medium: null,
					Usage: null,
					Fuel: null,
					Template: null,
					Factory: null,
					Enterprise: null,
					Installed: null,
					Address: null,
					FactoryNumber: "",
					RegisterCode: "",
					RegisterOrg: null,
					CertificateNumber: "",
					DeviceCode: "",
					ModelCode: "",
					EvaporatingCapacity: 0,
					Contact: null,
					Terminal: null,
					TerminalCode: "",
					TerminalSetId: 0,					
					Status: null,
					Runtime: null,
					Calculate: null,
					Maintenance: null,
					Subscribers: null
				},
				CoalQnetvar: 0,
				CoalAar: 0,
				CoalMar: 0,
				CoalVdaf: 0,
				CoalClz: 0,
				CoalClm: 0,
				CoalCfh: 0,
				CoalDed: 0,
				CoalDsc: 0,
				CoalAlz: 0,
				CoalAlm: 0,
				CoalAfh: 0,
				CoalQ3: 0,
				CoalM: 0,
				CoalN: 0,
				CoalTlz: 0,
				CoalCtLz: 0,
				GasDed: 0,
				GasDsc: 0,
				GasApy: 0,
				GasQ3: 0,
				GasM: 0,
				GasN: 0,
				ConfParam1: 0,
				ConfParam2: 0,
				ConfParam3: 0,
				ConfParam4: 0,
				ConfParam5: 0,
				ConfParam6: 0,
				AlarmThreshold1: 0,
				AlarmThreshold2: 0,
				AlarmThreshold3: 0,
				AlarmThreshold4: 0,
				AlarmThreshold5: 0,
				AlarmThreshold6: 0,
				AlarmThreshold7: 0,
				AlarmThreshold8: 0,
				Reserved1: 0,
				Reserved2: "2017-09-19T13:40:10+08:00",
				Reserved3: 0,
				Reserved4: 0
			}
			],
		},
		{
			num:4,
			Uid:4,
			name:"680100 ",
			company:"长宏南雁锅炉01",
			registrationCode:680100 ,
			model:680100 ,
			state:1,
			evaporation:2,
			Address: {
				Location:{
					LocationName:"湖南省 衡阳市 雁峰区"
				},
				Address:"湖南省衡阳市白沙洲工业园区工业大道3号",
				Longitude: 0,
				Latitude: 0,
			} ,
			Enterprise:{
				Name:"长宏南雁锅炉01",
			},
			isBurning:1,
			Fuel:{
				Type:{
					Id:4,
					name:"生物质",
				}
			},
			alarmLevel:-1,
			runtime:[
				[
					{
					name:"热效率",
					value:"555",
					alarmLevel:0,
					},
					{
						name:"蒸汽压力",
						value:"44",
						alarmLevel:0,
					},
				],
				[
					{
						name:"排烟温度(低)",
						value:"28.2 ℃",
						alarmLevel:0,
					},
					{
						name:"蒸汽温度",
						value:"41.1 ℃",
						alarmLevel:0,
					},
				],
				
			],
			EvaporatingCapacity: 1,
			Form: {
				Id: 201,
				Name: "卧式单筒锅炉",
				Type: {
					Id: 2,
					Name: "卧式锅炉",				
				}
			},
			Calculate: [
			{
				Uid: "00a55dc6-9cfd-11e7-be6e-7cd30ac4f6d2",
				Name: "680064",
				NameEn: "",
				Remark: "",
				CreatedDate: "2017-09-19T13:40:10+08:00",
				CreatedBy: null,
				UpdatedDate: "2017-09-19T13:40:10+08:00",
				UpdatedBy: null,				
				Boiler: {
					Uid: "7551c963-76ff-4fe0-a50a-c65aa40537e4",
					Name: "",
					NameEn: "",
					Remark: "",
					CreatedDate: "0001-01-01T00:00:00Z",
					CreatedBy: null,
					UpdatedDate: "0001-01-01T00:00:00Z",
					UpdatedBy: null,
					IsDemo: false,
					IsDeleted: false,
					Form: null,
					Medium: null,
					Usage: null,
					Fuel: null,
					Template: null,
					Factory: null,
					Enterprise: null,
					Installed: null,
					Address: null,
					FactoryNumber: "",
					RegisterCode: "",
					RegisterOrg: null,
					CertificateNumber: "",
					DeviceCode: "",
					ModelCode: "",
					EvaporatingCapacity: 0,
					Contact: null,
					Terminal: null,
					TerminalCode: "",
					TerminalSetId: 0,					
					Status: null,
					Runtime: null,
					Calculate: null,
					Maintenance: null,
					Subscribers: null
				},
				CoalQnetvar: 0,
				CoalAar: 0,
				CoalMar: 0,
				CoalVdaf: 0,
				CoalClz: 0,
				CoalClm: 0,
				CoalCfh: 0,
				CoalDed: 0,
				CoalDsc: 0,
				CoalAlz: 0,
				CoalAlm: 0,
				CoalAfh: 0,
				CoalQ3: 0,
				CoalM: 0,
				CoalN: 0,
				CoalTlz: 0,
				CoalCtLz: 0,
				GasDed: 0,
				GasDsc: 0,
				GasApy: 0,
				GasQ3: 0,
				GasM: 0,
				GasN: 0,
				ConfParam1: 0,
				ConfParam2: 0,
				ConfParam3: 0,
				ConfParam4: 0,
				ConfParam5: 0,
				ConfParam6: 0,
				AlarmThreshold1: 0,
				AlarmThreshold2: 0,
				AlarmThreshold3: 0,
				AlarmThreshold4: 0,
				AlarmThreshold5: 0,
				AlarmThreshold6: 0,
				AlarmThreshold7: 0,
				AlarmThreshold8: 0,
				Reserved1: 0,
				Reserved2: "2017-09-19T13:40:10+08:00",
				Reserved3: 0,
				Reserved4: 0
			}
			],
		},
		{
			num:5,
			Uid:5,
			name:"东南毛纺织染锅炉",
			company:"青岛胜利锅炉有限公司",
			registrationCode:680055,
			model:680055,
			state:0,
			evaporation:2,
			Address: {
				Location:{
					LocationName:"山东省 临沂市 兰山区	"
				},
				Address:"山东省临沂市兰山区枣园镇永安路55号",
				Longitude: 0,
				Latitude: 0,
			} ,
			Enterprise:{
				Name:"青岛胜利锅炉有限公司",
			},
			isBurning:1,
			Fuel:{
				Type:{
					Id:2,
					name:"燃油",
				}
			},
			alarmLevel:0,
			runtime:[
				[
					{
					name:"热效率",
					value:"555",
					alarmLevel:0,
					},
					{
						name:"蒸汽压力",
						value:"44",
						alarmLevel:0,
					},
				],
				[
					{
						name:"排烟温度(低)",
						value:"28.2 ℃",
						alarmLevel:0,
					},
					{
						name:"蒸汽温度",
						value:"41.1 ℃",
						alarmLevel:0,
					},
				],				
			],
			EvaporatingCapacity: 2,
			Form: {
				Id: 201,
				Name: "卧式单筒锅炉",
				Type: {
					Id: 2,
					Name: "卧式锅炉",				
				}
			},
		},
		{
			num:6,
			Uid:6,
			name:"680092",
			company:"广州特种承压设备检测研究院",
			registrationCode:680092,
			model:680092,
			state:0,
			evaporation:2,
//			Address: {
//				Location:{
//					LocationName:""
//				},
//				Address:""
//			} ,
			Enterprise:{
				Name:"广州特种承压设备检测研究院",
			},
			isBurning:0,
			Fuel:{
				Type:{
					Id:3,
					name:"燃气",
				}
			},
			alarmLevel:-1,
			runtime:[
				[
					{
						name:"热效率",
						value:"555",
						
					},
					{
						name:"蒸汽压力",
						value:"44",
						
					},
				],
				[
					{
						name:"排烟温度(低)",
						value:"28.2 ℃",
						
					},
					{
						name:"蒸汽温度",
						value:"41.1 ℃",
						
					},
				],
				
			],
			EvaporatingCapacity: 3,
			Form: {
				Id: 205,
				Name: "热水锅炉",
				Type: {
					Id: 2,
					Name: "卧式锅炉",				
				}
			},
		},
		{
			num:7,
			Uid:7,
			name:"680055",
			company:"青岛胜利锅炉有限公司",
			registrationCode:680055,
			model:680055,
			state:0,
			evaporation:2,
			Address: {
				Location:{
					LocationName:"山东省 临沂市 兰山区	"
				},
				Address:"山东省临沂市兰山区枣园镇永安路55号",
				Longitude: 0,
				Latitude: 0,
			} ,
			Enterprise:{
				Name:"青岛胜利锅炉有限公司",
			},
			isBurning:1,
			Fuel:{
				Type:{
					Id:3,
					name:"燃气",
				}
			},
			alarmLevel:-1,
			runtime:[
				[
					{
						name:"热效率",
						value:"555",
						alarmLevel:0,
					},
					{
						name:"蒸汽压力",
						value:"644",
						alarmLevel:0,
					},
				],
				[
					{
						name:"排烟温度(低)",
						value:"28.2 ℃",
						alarmLevel:0,
					},
					{
						name:"蒸汽温度",
						value:"41.1 ℃",
						alarmLevel:0,
					},
				],
				
			],
			EvaporatingCapacity: 2,
			Form: {
				Id: 201,
				Name: "卧式单筒锅炉",
				Type: {
					Id: 2,
					Name: "卧式锅炉",				
				}
			},
		},
		{
			num:8,
			Uid:8,
			name:"680092",
			company:"广州特种承压设备检测研究院",
			registrationCode:680092,
			model:680092,
			state:0,
			evaporation:2,
			Address: {
				Location:{
					LocationName:"广东省 东莞市"
				},
				Address:"东莞市莞城鸿裕一街1幢3楼10号",
				Longitude: 0,
				Latitude: 0,
			} ,
			Enterprise:{
				Name:"广州特种承压设备检测研究院",
			},
			isBurning:0,
			Fuel:{
				Type:{
					Id:4,
					name:"生物质",
				}
			},
			alarmLevel:-1,
			runtime:[
				[
					{
						name:"热效率",
						value:"555",					

					},
					{
						name:"蒸汽压力",
						value:"44",
						
					},
				],
				[
					{
						name:"排烟温度(低)",
						value:"28.2 ℃",
						
					},
					{
						name:"蒸汽温度",
						value:"41.1 ℃",
						
					},
				],
				
			],
			EvaporatingCapacity: 2,
			Form: {
				Id: 202,
				Name: "卧式双筒锅炉",
				Type: {
					Id: 2,
					Name: "卧式锅炉",				
				}
			},
		},
		
	]
});
 

mainApp.service("advisoryData",function(){
	return [
		{
			num:1,
			title:"hhhh",
			time:"2017-09-22 12:43:48",
			content:[
				{
					contentText:"test",
					time:"2017-09-22 12:43:48",
					user:"ddd",
				},
				{
					contentText:"hhhhh",
					time:"2017-09-22 12:45:49",
					user:"系统",
				}
			
			],
			orgName:"系统",
			username:"system",
			state:"已回复"
		},
		{
			num:2,
			title:"a咨询hhh",
			time:"2017-09-22 12:43:48",
			content:[
				{
					contentText:"咨询hhh",
					time:"2017-09-22 12:43:48",
					user:"ddd",
				}			
			],
			orgName:"用户",
			username:"天台的毒蜘蛛",
			state:"新咨询"
		}
	]
});


mainApp.controller("mainCtrl", function($scope,$state) {
	$scope.options = [
		{
			name: "默认",
			value: ""
		},
		{
			name: "天蓝色",
			value: "../css/theme-a.css"
		},
		{
			name: "绿色",
			value: "../css/theme-b.css"
		}
	];
	//默认选择第一个样式
	$scope.theme = "";

	   

})


mainApp.controller("SidebarController",function($scope,$state){
    
})

mainApp.run(["$rootScope", "settings", "$state","$stateParams","$http","$timeout","$injector", function($rootScope, settings, $state , $stateParams,$http,$timeout,$injector) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    $rootScope.$stateParams = $stateParams;
    
    $rootScope.showLoading = false;
            $rootScope.$on('loading:show', function () {
                $rootScope.showLoading = true;
            });

            $rootScope.$on('loading:hide', function () {
                $rootScope.showLoading = false;
            });

            $rootScope.$on('request:404', function () {
                swal({
                    title: "请求出错!",
                    type: "error",
                    timer: 1000,
                    showConfirmButton: false,
                    allowOutsideClick:true
                });
            });      
    
    
    

    
    $rootScope.getBoilerList = function () {
        $rootScope.boilers = [];
            $http.get('boiler_list.json/')
                .then(function (res) {                  
                    $rootScope.boilers = res.data;
                    for (var i = 0; i < $rootScope.boilers.length; i++) {
                        var ab = $rootScope.boilers[i];
                        $rootScope.getBoilerCalculateParameter(ab);
                    }   
                    $timeout(function () {
			        $rootScope.getAlarmList();
			        }, 2000);
                });
        };
        
	$rootScope.getBoilerCalculateParameter = function (boiler) {
            $http.get('boiler_calculate_parameter.json/?boiler=' + boiler.Uid)
                .then(function (res) {
                    boiler.Calculate = res.data;
                });
        };
    
   	$rootScope.getAlarmList = function() {
		$http.get('boiler_alarm_list.json/')
			.then(function(res) {
				if(res.data) {
					$rootScope.boilerAlarms = res.data;
				} else {
					$rootScope.boilerAlarms = [];
				}
			});
	};
	
	$rootScope.organizations = [];
	$http.get('organization_list.json/')
            .then(function (res) {                                
                for (var i = 0; i < res.data.length; i++) {
//              	var org = {};
                    var d = res.data[i];
                    d.name = d.Name;
                    d.type = d.Type.Name;
                    $rootScope.organizations.push(d); 
                } 
                console.log($rootScope.organizations.length);
            });
	
    $http.get('runtime_parameters.json/')
            .then(function (res) {
                $rootScope.parameters = res.data;
            });
            
    $http.get('boiler_fuel_list.json/')
            .then(function (res) {
                $rootScope.fuels = res.data;
            });
        $http.get('boiler_fuel_type_list.json/')
            .then(function (res) {
                $rootScope.fuelTypes = res.data;
            });
        $http.get('boiler_form_list.json/')
            .then(function (res) {
                $rootScope.boilerForms = res.data;
            });
        $http.get('boiler_medium_list.json/')
            .then(function (res) {
                $rootScope.boilerMediums = res.data;               
            });
            
    
                    
     $rootScope.getBoilerList();                
      
      
      
      
      
    
}]);


angular.module('BoilerAdmin').controller('ModalLoginCtrl', function ($uibModalInstance, $rootScope, $scope, $http) {
    var $modal = this;
    $modal.editing = false;
    $modal.roleId = 20;
    $modal.organizations = [];
    setTimeout(function () {
        $http.get('/organization_list/?scope=register')
            .then(function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    var d = res.data[i];
                    d.name = d.Name;
                    d.type = d.Type.Name;
                    $modal.organizations.push(d);
                }
            }, function (err) {
                console.log("Get Register OrgList Err: " + err);
            });

        $http.get(IP_JSON_URL).then(function (result) {
            console.log("ip" + result.data.ip);
            $modal.ip = result.data.ip;
        }, function (e) {
            console.error("Get IP Error:", e);
        });
    }, 0);

    $modal.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $modal.gotoSignup = function () {
        $uibModalInstance.dismiss('cancel');

        header.openSignup();
    };

    $modal.gotoLogin = function () {
        $uibModalInstance.dismiss('cancel');

        header.openLogin();
    };

    $modal.signup = function() {
        $http.post('/user_register_bind_third/', {
            username: $modal.username,
            password: $modal.password,
            mobile: $modal.mobile,
            role: $modal.roleId,
            ip: $modal.ip
        }).then(function (res) {
            $('#signup-form').modal('hide');
            swal({
                title: "注册成功",
                text: "您的平台账号 " + $modal.username + " 已经绑定微信，之后您可以通过用户名和密码进行登录，或者使用微信扫码直接登录平台，\n现在将转到该用户登录",
                type: "success",
                confirmButtonText: "好的",
            }).then(function () {
                $uibModalInstance.close('success');
                $rootScope.currentUser.Status = 1;
                header.refresh();
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

    $modal.login = function() {
        var ip = "";
        $http.get(IP_JSON_URL).then(function(result) {
            console.log("ip" + result.data.ip);
            ip = result.data.ip;
        }, function(e) {
            console.error("Get IP Error:", e);
        }).then(function () {
            $http.post('/user_login_bind_third/', {
                username: $modal.username,
                password: $modal.password,
                ip: ip,
            }).then(function (res) {
                $rootScope.getCurrentUser(function () {
                    header.refresh();
                    var text = "欢迎回来，" + $rootScope.currentUser.Role.Name + " " + $rootScope.currentUser.Username + "。";
                    text += "\n您的微信账号已经绑定成功，之后您可以通过微信扫码直接登录平台。"
                    swal({
                        title: "登录成功",
                        text: text,
                        type: "success",
                        confirmButtonText: "好的",

                    }).then(function () {
                        $uibModalInstance.close('success');
                        header.refresh();
                    }, function (dismiss) {
                    });
                });
            }, function (err) {
                swal({
                    title: "登录失败",
                    text: err.data,
                    type: "error",
                    confirmButtonText: "确定",
                });
            });
        });
    };


});


mainApp
    .config(['$httpProvider',
        function ($httpProvider) {
            var requestInterceptor = ['$q', '$injector', '$rootScope',
                function ($q, $injector, $rootScope) {
                    return {
                        request: function (config) {
                            $rootScope.$broadcast('loading:show');
                            return config || $q.when(config);
                        },
                        response: function (response) {
                            $rootScope.$broadcast('loading:hide');
                            return response;
                        },
                        responseError: function (response) {
                            $rootScope.$broadcast('loading:hide');
                            return $q.reject(response);
                        },
                        requestError: function (response) {
                            $rootScope.$broadcast('loading:hide');
                            return response;
                        }
                    };
                }];
            $httpProvider.interceptors.push(requestInterceptor);
        }]);


