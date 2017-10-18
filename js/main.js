
var mainApp = angular.module("boiler",["ui.router" , "ui.bootstrap", "customFilter","oc.lazyLoad"]);

mainApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/monitor/thumb");

     $stateProvider
        .state("monitor", {
            url: "/monitor",
            templateUrl: "views/monitor/main.html"
        })
        .state("dashboard", {
            url: "/monitor/dashboard",
            templateUrl: "views/monitor/dashboard.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
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
        .state("monitor.productlist", {
            url:"/productlist",
            templateUrl: "views/monitor/productlist.html",
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
        .state("alarm-info", {
            url: "/alarm-info",
            templateUrl: "views/alarm-info.html"
        })
        .state("advisory", {
            url: "/advisory",
            templateUrl: "views/advisory.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([            	
             	'../js/controllers/advisoryController.js'             	
		             ]);
		    }]
		  }
        })
        .state("maintain-info", {
            url: "/maintain-info",
            templateUrl: "views/maintain-info.html",
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





