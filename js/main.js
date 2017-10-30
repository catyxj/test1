
var mainApp = angular.module("boiler",[
	"ui.router" , 
	"ui.bootstrap", 
	"customFilter",
	"oc.lazyLoad",
	"angularMoment",
	]);

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
             	'../js/controllers/monitorController.js' ,
             	
		             ]);
		    }]
		  }
        })
        .state("dashboard", {
            url: "/monitor/dashboard",
            templateUrl: "views/monitor/dashboard.html",
            data: {pageTitle: "平台总览"}, 
             resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/asset/highcharts-3d.js',
             	'../js/controllers/dashboardController.js'             	
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
            templateUrl: "views/runtime/main.html"
        })
        .state("runtime.dashboard", {
            url:"/animation",
            templateUrl: "views/runtime/dashboard.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
        
             	'../js/directives/boiler_module.js',
		             ]);
		    }]
		  }
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
            templateUrl: "views/runtime/alarm.html",
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
            templateUrl: "views/alarm.html",
            resolve: { 
    		 loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
             return $ocLazyLoad.load([
             	'../js/controllers/alarmController.js',            	
		             ]);
		    }]
		  }
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
					name:"燃油",
				}
			},
			alarmLevel:1,
			
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
					Id:3,
					name:"燃气",
				}
			},
			alarmLevel:2,
			
		},
		{
			num:3,
			Uid:3,
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
			isBurning:1,
			Fuel:{
				Type:{
					Id:3,
					name:"燃气",
				}
			},
			alarmLevel:2,
			
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
					Id:3,
					name:"燃气",
				}
			},
			alarmLevel:2,
			
		},
		{
			num:5,
			Uid:5,
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
			alarmLevel:2,
			
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
			alarmLevel:2,
			
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
			isBurning:1,
			Fuel:{
				Type:{
					Id:3,
					name:"燃气",
				}
			},
			alarmLevel:2,
			
		},
		
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
	return{
		datasource:[	
			{
				num:1,
				boiler:"广州伯乐锅炉锅炉#1 ",
				Enterprise:"",
				monitor:"热效率",
				priority:1,
				StartText:"10/18 09:49",
				DueText:"7天9时49分",
				state:"新告警",
				alarmMode:"current"
			},
			{
				num:2,
				boiler:"河南远大锅炉有限公司锅炉#3 ",
				Enterprise:"",
				monitor:"热效率",
				priority:2,
				StartText:"10/20 02:41",
				DueText:"7天14时17分",
				state:"新告警",
				alarmMode:"current"
			},
			{
				num:3,
				boiler:"680093 ",
				Enterprise:"赛诺菲制药有限公司",
				monitor:"test",
				priority:1,
				StartText:"10/17 16:55",
				DueText:"3天2时0分",
				state:"新告警",
				alarmMode:"current"
			},
			{
				num:4,
				boiler:"680093 ",
				Enterprise:"",
				monitor:"蒸汽压力",
				priority:0,
				StartText:"10/23 13:13",
				DueText:"3天15时21分",
				state:"历史告警",
				alarmMode:"history"
			}
		]
	}
	
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
			Enterprise:"2",
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
			Enterprise:"",
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
			Enterprise:"江苏威孚",
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





$(document).ready(function(){
  $(".full_screen").click(function(){
    $('.full').toggleClass("portlet-fullscreen");
  });
});









