
var mainApp = angular.module("boiler",["ui.router" , "ui.bootstrap", "customFilter"]);

mainApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/tab/productview");

     $stateProvider
        .state("tab", {
            url: "/tab",
            templateUrl: "views/tab.html"
        })
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "views/monitor/dashboard.html"
        })
        .state("tab.productview", {
            url:"/productview",
            templateUrl: "views/monitor/productview.html"
        })
        .state("tab.productlist", {
            url:"/productlist",
            templateUrl: "views/monitor/productlist.html"
        })
        .state("boilerflash", {
            url:"/boilerflash",
            templateUrl: "views/monitor/boilerflash.html"
        })
        .state("boilerflash.animation", {
            url:"/animation",
            templateUrl: "views/monitor/animation.html"
        })
        .state("boilerflash.runtimedata", {
            url:"/runtimedata",
            templateUrl: "views/monitor/runtimedata.html"
        })
        .state("boilerflash.historydata", {
            url:"/historydata",
            templateUrl: "views/monitor/historydata.html"
        })
        .state("boilerflash.alarm", {
            url:"/alarm",
            templateUrl: "views/monitor/alarm.html"
        })
        .state("boilerflash.maintain", {
            url:"/maintain",
            templateUrl: "views/monitor/maintain.html"
        })
        .state("alarm-info", {
            url: "/alarm-info",
            templateUrl: "views/alarm-info.html"
        })
        .state("advisory", {
            url: "/advisory",
            templateUrl: "views/advisory.html",
            resolve:{
            	
            }
        })
        .state("maintain-info", {
            url: "/maintain-info",
            templateUrl: "views/maintain-info.html"
        })
        
});

 mainApp.service("productData",function(){
	return[
		{
			num:1,
			name:"锅炉1",
			company:"东莞天鹿锅炉有限公司",
			registrationCode:688888,
			model:688888,
			state:1,
			fuel:"燃气",
			evaporation:2
		},
		{
			num:2,
			name:"锅炉2",
			company:"锅炉制造厂",
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
			name:"锅炉4",
			company:"锅炉制造厂测试5",
			registrationCode:666666,
			model:680064,
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
		}
	]
})
 













