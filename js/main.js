
var mainApp = angular.module("boiler",[
	"ui.router" , 
	"ui.bootstrap", 
	"customFilter",
	"oc.lazyLoad",
//	"ngSanitize",
//	"ui.select",
	]);

mainApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/monitor/thumb");

     $stateProvider
        .state("monitor", {
            url: "/monitor",
            templateUrl: "views/monitor/main.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
		             ]);
		    }]
		  }
        })
        .state("dashboard", {
            url: "/monitor/dashboard",
            templateUrl: "views/monitor/dashboard.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
//           	'../js/asset/jquery.min.js',
//           	'../js/asset/highcharts.js',
             	'../js/asset/highcharts-3d.js',
             	'../js/controllers/dashboardController.js'
             	
		             ]);
		    }]
		  }
        })
        .state("monitor.thumb", {
            url:"/thumb",
            templateUrl: "views/monitor/thumb.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/productViewController.js'           	
		             ]);
		    }]
		  }
        })
        .state("monitor.list", {
            url:"/list",
            templateUrl: "views/monitor/list.html",
            resolve: {
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/modal.js',            	
		             ]);
		    }]
		  }
        })
        .state("runtime", {
            url:"/runtime",
            templateUrl: "views/runtime/main.html"
        })
        .state("runtime.dashboard", {
            url:"/animation",
            templateUrl: "views/runtime/dashboard.html"
        })
        .state("runtime.runtimedata", {
            url:"/runtimedata",
            templateUrl: "views/runtime/runtimedata.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
        
             	'../js/controllers/runtimeController.js',
		             ]);
		    }]
		  }
        })
        .state("runtime.historydata", {
            url:"/historydata",
            templateUrl: "views/runtime/historydata.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/historyController.js',
             	'../js/asset/angular-locale_zh-cn.js'
		             ]);
		    }]
		  }
        })
        .state("runtime.alarm", {
            url:"/alarm",
            templateUrl: "views/runtime/alarm.html"
        })
        .state("runtime.maintain", {
            url:"/maintain",
            templateUrl: "views/runtime/maintain.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/maintainInfoController.js',            	
		             ]);
		    }]
		  }
        })
        .state("alarm", {
            url: "/alarm",
            templateUrl: "views/alarm.html"
        })
        .state("dialogue", {
            url: "/dialogue",
            templateUrl: "views/dialogue.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([ 
             
             	'../js/controllers/advisoryController.js'             	
		             ]);
		    }]
		  }
        })
        .state("boiler-maintain", {
            url: "/boiler-maintain",
            templateUrl: "views/boiler-maintain.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/maintainInfoController.js',            	
		             ]);
		    }]
		  }
        })
        .state("organization", {
            url: "/organization",
            templateUrl: "views/organization/main.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/organizationController.js',            	
		             ]);
		    }]
		  }
        })
        .state("boiler", {
            url: "/boiler",
            templateUrl: "views/boiler/main.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	
             	'../js/controllers/boilerController.js',            	
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
             	'../js/controllers/productViewController.js'           	
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
             	'../js/controllers/productViewController.js'           	
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
			name:"680064",
			company:"东莞天鹿锅炉有限公司",
			registrationCode:688888,
			model:688888,
			state:1,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:2,
			name:"680055",
			company:"青岛胜利锅炉有限公司",
			registrationCode:55555,
			model:655555,
			state:0,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:3,
			name:"锅炉3",
			company:"锅炉制造厂测试3",
			registrationCode:33333,
			model:33333,
			state:1,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:4,
			name:"680092",
			company:"广州特种承压设备检测研究院",
			registrationCode:680092,
			model:680092,
			state:1,
			fuel:"燃油",
			evaporation:2
		},
		{
			num:5,
			name:"锅炉5",
			company:"锅炉制造厂测试8",
			registrationCode:22222,
			model:680055,
			state:1,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:6,
			name:"锅炉1",
			company:"锅炉制造厂测试",
			registrationCode:688888,
			model:688888,
			state:0,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:7,
			name:"锅炉2",
			company:"锅炉制造厂",
			registrationCode:55555,
			model:655555,
			state:0,
			fuel:"燃煤",
			evaporation:2
		},
		{
			num:8,
			name:"锅炉3",
			company:"锅炉制造厂测试3",
			registrationCode:33333,
			model:33333,
			state:0,
			fuel:"燃油",
			evaporation:2
		},
		{
			num:9,
			name:"锅炉4",
			company:"锅炉制造厂测试5",
			registrationCode:666666,
			model:680064,
			state:1,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:10,
			name:"锅炉5",
			company:"锅炉制造厂测试8",
			registrationCode:22222,
			model:680055,
			state:1,
			fuel:"燃油",
			evaporation:2
		},
		{
			num:11,
			name:"锅炉5",
			company:"锅炉制造厂测试8",
			registrationCode:22222,
			model:680055,
			state:1,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:12,
			name:"锅炉2",
			company:"锅炉制造厂",
			registrationCode:55555,
			model:655555,
			state:0,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:13,
			name:"680093 ",
			company:"宏日新能源",
			registrationCode:680093,
			model:680093,
			state:1,
			fuel:"生物质",
			evaporation:2
		},
		{
			num:14,
			name:"锅炉5",
			company:"锅炉制造厂测试8",
			registrationCode:22222,
			model:680055,
			state:1,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:15,
			name:"万隆肉类锅炉 ",
			company:"杭州振兴锅炉容器设备有限公司",
			registrationCode:11203301102005030009,
			model:"DZL4-1.25-AⅡ",
			state:0,
			fuel:"燃气",
			evaporation:2
		}
	]
});
 



mainApp.service("advisoryData",function(){
	return [
		{
			num:1,
			title:11,
			time:"2017-09-22 12:43:48",
			content:"test",
			company:"系统",
			state:"已回复"
		},
		{
			num:2,
			title:22,
			time:"2017-09-22 12:43:48",
			content:"test",
			company:"系统",
			state:"新咨询"
		}
	]
});


mainApp.service("alarmData",function(){
	return [
		{
			num:1,
			boiler:"5555",
			monitor:"test",
			priority:1,
			time:"2017-09-22 12:43:48",
			state:1
		},
		{
			num:2,
			boiler:"dddd",
			monitor:"test",
			priority:1,
			time:"2017-09-22 12:43:48",
			state:1
		},
		{
			num:3,
			boiler:"5555",
			monitor:"test",
			priority:1,
			time:"2017-09-22 12:43:48",
			state:1
		}
	]
})



mainApp.service("maintainData",function(){
	return [
		{
			num:1,
			time:"2017-09-22 12:43:48",
			content:"test",
			company:"系统",
			state:"1"
		},
		{
			num:2,
			time:"2017-09-22 12:43:48",
			content:"test",
			company:"系统ee",
			state:"2"
		}
	]
});

mainApp.service("organizationData",function(){
	return [
		{
			num:1,
			name:"厚德能源",
			Address: {
				Location:{
					LocationName:"浙江省 杭州市 滨江区"
				},
				Address:"滨文路32号"
			} ,
			type:"默认机构"
		},
		{
			num:2,
			name:"Test003",
			Address: {
				Location:{
					LocationName:"浙江省 杭州市 滨江区"
				},
				Address:"Test0031"
			} ,
			type:"默认机构"
		},
		{
			num:3,
			name:"江苏威孚锅炉有限公司",
			Address: {
				Location:{
					LocationName:"江苏省 镇江市 丹徒区"
				},
				Address:"镇江市丹徒区镇南工业园辛三路15号"
			} ,
			type:"锅炉制造厂"
		}
	]
});


mainApp.service("terminalData",function(){
	return {	
		datasource:[
	 	{
			num:1,
			name:"佑康锅炉终端",
			code:"010001",
			online:"离线",
			Boilers:[
				{
					name:"佑康锅炉#1",
				},
				{
					name:"佑康锅炉#2",
				}
			],
			simNum:"",
			ip:""
		},
		{
			num:2,
			name:"大地印染锅炉采集终端",
			code:"010022",
			online:"离线",
			Boilers:[
				{
					name:"大地印染锅炉",
				}
			],
			simNum:"",
			ip:"111.193.92.140"
		},
		{
			num:3,
			name:"航民热电采集终端",
			code:"010027",
			online:"在线",
			Boilers:[
				{
					name:"航民热电1# ",
				},
				{
					name:"航民热电2# ",
				},
				{
					name:"航民热电3# ",
				},
				{
					name:"航民热电4#",
				}
			],
			simNum:"",
			ip:""
		}
		
		]
		
		
	}
});


mainApp.service("configAlarmData",function(){
	return {	
		datasource:[
	 	{
			num:1,
			Parameter:{
				name:"蒸汽温度",
			},
			mediumName:"默认",
			fuelName:"不限",
			BoilerCapacityMin:"",
			BoilerCapacityMax:"",
			capacity:"不限",
			Normal:"0",
			warning:">200",
			Delay:"0",
			priortyText:"中",
			Description:""
		},
		{
			num:2,
			Parameter:{
				name:"蒸汽压力",
			},
			mediumName:"默认",
			fuelName:"不限",
			BoilerCapacityMin:"",
			BoilerCapacityMax:"",
			capacity:"不限",
			Normal:"0",
			warning:">1.2",
			Delay:"1",
			priortyText:"高",
			Description:""
		},
		{
			num:3,
			Parameter:{
				name:"排烟温度(高)",
			},
			mediumName:"默认",
			fuelName:"不限",
			BoilerCapacityMin:"",
			BoilerCapacityMax:"",
			capacity:"不限",
			Normal:"0",
			warning:">300",
			Delay:"5",
			priortyText:"中",
			Description:""
		},
		
		{
			num:4,
			Parameter:{
				name:"排烟温度(低)",
			},
			mediumName:"默认",
			fuelName:"生物质",
			BoilerCapacityMin:"0",
			BoilerCapacityMax:"1",
			capacity:"0-1",
			Normal:"0",
			warning:">230",
			Delay:"5",
			priortyText:"高",
			Description:""
		},
		{
			num:5,
			Parameter:{
				name:"烟气O2含量",
			},
			mediumName:"默认",
			fuelName:"不限",
			BoilerCapacityMin:"",
			BoilerCapacityMax:"",
			capacity:"不限",
			Normal:"0",
			warning:">100",
			Delay:"5",
			priortyText:"低",
			Description:""
		}
		
		
		]
		
		
	}
});

mainApp.service("configparamData",function(){
	return {	
		datasource:[
		 	{
				id:1001,
				name:"蒸汽温度",
				Scale:"0.1",
				Unit:"℃",
				Length:"2",
				BoilerMediums:[
					{
						name:"蒸汽",
					}
				],
				Remark:"实际值=寄存器值*0.1"
			},
			{
				id:1002,
				name:"蒸汽压力",
				Scale:"0.001",
				Unit:"MPa",
				Length:"2",
				BoilerMediums:[
					{
						name:"蒸汽",
					}
				],
				Remark:""
			},
			{
				id:1004,
				name:"给水温度",
				Scale:"0.1",
				Unit:"℃",
				Length:"2",
				BoilerMediums:[
					{
						name:"蒸汽",
					},
					{
						name:"热水",
					}
				],
				Remark:""
			},
		
		]
		
		
	}
});



