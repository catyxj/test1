
var mainApp = angular.module("BoilerAdmin",[
	"ui.router" , 
	"ui.bootstrap", 
	"customFilter",
	"oc.lazyLoad",
	"angularMoment",
	"ui.select",
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
            resolve: {
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	          	
		             ]);
		    }]
		  }
        })
        .state("runtime", {
            url:"/runtime",
            templateUrl: "views/runtime/main.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([        
             	
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
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([        		             	
             	'../js/controllers/runtimeController.js',
             	'../js/directives/chart_steam.js',
             	'../js/directives/chart_temperature.js',
		             ]);
		    }]
		  }
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
             	'../js/controllers/alarmController.js',            	
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
				Address:"滨文路32号"
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
				Address:"山东省临沂市兰山区枣园镇永安路55号"
			} ,
			Enterprise:{
				Name:"青岛胜利锅炉有限公司",
			},
			isBurning:1,
			Fuel:{
				Type:{
					Id:5,
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
				Address:"东莞市莞城鸿裕一街1幢3楼10号"
			} ,
			Enterprise:{
				Name:"广州特种承压设备检测研究院",
			},
			isBurning:1,
			Fuel:{
				Type:{
					Id:3,
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
				Address:"湖南省衡阳市白沙洲工业园区工业大道3号"
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
				Address:"山东省临沂市兰山区枣园镇永安路55号"
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
				Address:"山东省临沂市兰山区枣园镇永安路55号"
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
				Address:"东莞市莞城鸿裕一街1幢3楼10号"
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


mainApp.service("maintainData",function(){
	return [
		{
			num:1,
			Boiler:{
				Name:"Test680344",
				Enterprise:{
					Name:"测试企业2001",
				},
			},				
			InspectDate:"2017-09-22",
			CreatedBy:{
				Name:"厚德能源测试",
			},
			content:"test",						
			maintainDetail:{
				burner:[0,0,0,0,0,0,0],
				importGrate:[0,0,0,0,0,0,0],
				waterSoftener:[0,0,0],
				waterPump:[0,0,0,0],
				boilerBody:[0,0,0,0,0,0],
				energySaver:[0,0,0],
				airPreHeater:[0,0,0],
				dustCatcher:[0,0,0],
				draughtFan:[0,0,0],
			},
			summary:"",
			status:{
				burner:[0,0,0,0,0,0,0],
				importGrate:[0,0,0,0,0,0,0],
				waterSoftener:[0,0,0],
				waterPump:[0,0,0,0],
				boilerBody:[0,0,0,0,0,0],
				energySaver:[0,0,0],
				airPreHeater:[0,0,0],
				dustCatcher:[0,0,0],
				draughtFan:[0,0,0],
			},
		},
		{
			num:2,
			Boiler:{
				Name:"哈尔滨红光锅炉集团有限公司锅炉#2 ",
				Enterprise:{
					Name:"",
				},
			},
			InspectDate:"2017-09-22",
			CreatedBy:{
				Name:"红光锅炉",
			},
			content:"test",					
			maintainDetail:{
				burner:[1,0,0,0,0,0,0],
				importGrate:[0,0,0,0,0,0,0],
				waterSoftener:[0,0,0],
				waterPump:[0,0,0,0],
				boilerBody:[0,0,0,0,0,0],
				energySaver:[0,0,0],
				airPreHeater:[0,0,0],
				dustCatcher:[0,0,0],
				draughtFan:[0,0,0],
			},
			summary:"haha",
			status:{
				burner:[1,0,0,0,0,0,0],
				importGrate:[0,0,0,0,0,0,0],
				waterSoftener:[0,0,0],
				waterPump:[0,0,0,0],
				boilerBody:[0,0,0,0,0,0],
				energySaver:[0,0,0],
				airPreHeater:[0,0,0],
				dustCatcher:[0,0,0],
				draughtFan:[0,0,0],
			}, 
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

	
    $scope.setPage = function(m){
        $scope.currentPage = m;
    };

})


mainApp.controller("SidebarController",function($scope,$state){
    
})

mainApp.run(["$rootScope", "settings", "$state","$stateParams","$http","$timeout", function($rootScope, settings, $state , $stateParams,$http,$timeout) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    $rootScope.$stateParams = $stateParams;
    
    
//  $rootScope.getBoilerList = function () {
//      $rootScope.boilers = [];
//          $http.get('boiler_list.json/')
//              .then(function (res) {                  
//                  $rootScope.boilers = res.data;
//                  for (var i = 0; i < $rootScope.boilers.length; i++) {
//                      var ab = $rootScope.boilers[i];
//                      $rootScope.getBoilerCalculateParameter(ab);
//                  }                  
//              });
//      };
//      
//	$rootScope.getBoilerCalculateParameter = function (boiler) {
//          $http.get('/boiler_calculate_parameter/?boiler=' + boiler.Uid)
//              .then(function (res) {
//                  boiler.Calculate = res.data;
//              });
//      };
    
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
	
	$http.get('organization_list.json/')
            .then(function (res) {                
                $rootScope.organizations = [];
                for (var i = 0; i < res.data.length; i++) {
                    var d = res.data[i];
                    d.name = d.Name;
                    d.type = d.Type.Name;
                    $rootScope.organizations.push(d);
                }
            }, function (err) {
                
            });
	
    
    $timeout(function () {
        $rootScope.getAlarmList();
        }, 2000);
                    
//   $rootScope.getBoilerList();                
                    
    
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





