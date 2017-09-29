
var mainApp = angular.module("boiler",["ui.router" , "ui.bootstrap"]);

mainApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/tab/productview");

     $stateProvider
        .state("tab", {
            url: "/tab",
            templateUrl: "tab.html"
        })
        .state("tab.productview", {
            url:"/productview",
            templateUrl: "productview.html"
        })
        .state("tab.productlist", {
            url:"/productlist",
            templateUrl: "productlist.html"
        })
        .state("boilerflash", {
            url:"/boilerflash",
            templateUrl: "boilerflash.html"
        })
        .state("boilerflash.animation", {
            url:"/animation",
            templateUrl: "animation.html"
        })
        .state("boilerflash.runtimedata", {
            url:"/runtimedata",
            templateUrl: "runtimedata.html"
        })
        .state("boilerflash.historydata", {
            url:"/historydata",
            templateUrl: "historydata.html"
        })
        .state("boilerflash.alarm", {
            url:"/alarm",
            templateUrl: "alarm.html"
        })
        .state("boilerflash.maintain", {
            url:"/maintain",
            templateUrl: "maintain.html"
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
 mainApp.controller("productController",function($scope,productData){
	$scope.productData = productData;
	$scope.orderType = "num";
	$scope.order = "";
	$scope.changeOrder = function(type){
		$scope.orderType = type;
		if($scope.order === ""){
			$scope.order ="-";
		}else{
			$scope.order ="";
		}
	};
	
	//初始化页面
	$scope.refreshPage = function(data){
		$scope.count = data.length;		
		$scope.pages = Math.ceil($scope.count / $scope.itemsPerPage);//总页数
		$scope.showPages = $scope.pages > 5 ? 5: $scope.pages;
		$scope.pageList =[];
		$scope.currentPage = 1;
		
		//表格数据
		$scope.setData = function(){
			$scope.productDataList = data.slice($scope.itemsPerPage*($scope.currentPage - 1),($scope.itemsPerPage*$scope.currentPage));
		};
		$scope.productDataList = data.slice(0,$scope.itemsPerPage);
		
		//分页数组
		for(var i = 0; i < $scope.showPages; i++){
			$scope.pageList.push(i+1);
		};
		
		
		
		//选择页码
		$scope.selectPage = function(page){
			if(page < 1 || page > $scope.pages) return;
			if(page > 2){
				var newpageList = [];
				for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
				newpageList.push(i + 1);
				}
				$scope.pageList = newpageList;
			}
			
			$scope.currentPage = page;
			$scope.setData();
			$scope.isActivePage(page);
			console.log(page);
		}
	}
	
		
		
	
	
	$scope.p_size = function(n,data){
		$scope.itemsPerPage = n;	//每页显示数量
		$scope.refreshPage(data);		
	};
	
	
//	$scope.p_size(5);
	
	
	
	
	//选中样式
	$scope.isActivePage = function(page){
		return $scope.currentPage == page;
	};


	$scope.p_index = function(){
		$scope.selectPage(1);
	};
	$scope.Previous = function(){
		$scope.selectPage($scope.currentPage - 1);
	};
	
	$scope.Next = function () {
		$scope.selectPage($scope.currentPage + 1);
	};
	
	$scope.p_last = function(){
		$scope.selectPage($scope.pages);
	};
	
	$scope.modelSelect = [
	    {site : "型号不限", url : ""},
	    {site : "M2", url : 680055},
	    {site : "M3", url : 655555},
	    {site : "M4", url : 680064},
	    {site : "M5", url : 688888}
	];
	$scope.fuelSelect = [
	    {site : "锅炉燃料不限", url : ""},
	    {site : "燃气", url : "燃气"},
	    {site : "燃煤", url : "燃煤"},
	    {site : "燃油", url : "燃油"}
	    
	];
	
	$scope.selectedSite = $scope.modelSelect[0].url;
	
	
	
	$scope.isActiveTag = function(name){
		return $state.current.name == name;
	};
	
	
	
	

})



mainApp.controller("DatepickerDemoCtrl", ["$scope", function($scope){
  
 // grab today and inject into field
 
//  $scope.startTime = new Date();
//  $scope.endTime = new Date();
  	$scope.format = "yyyy-MM-dd";
  

  // open min-cal
  $scope.startopen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.startopened = true;
  };
  $scope.endopen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.endopened = true;
  };
  
  

}]);









mainApp.controller('modalController', function($scope, $rootScope, $modal) {
        var data = [];
        $scope.openModal = function() {
                var modalInstance = $modal.open({
                    templateUrl : 'modal.html',//script标签中定义的id
                    controller : 'modalCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数
                             return data;//用于传递数据
                        }
                    }
                })
            }
    })
     //模态框对应的Controller
     mainApp.controller('modalCtrl', function($scope, $modalInstance, data) {
          $scope.data= data;

          //在这里处理要进行的操作
          $scope.ok = function() {
              $modalInstance.close();
          };
          $scope.cancel = function() {
              $modalInstance.dismiss('cancel');
          }
    });


 mainApp.controller("viewCtrl",function($scope,productData){
	$scope.p_size(4,productData);
	
	
	
})

 mainApp.controller("productList",function($scope,productData){
	$scope.p_size(6,productData);
})


mainApp.controller("runtimedataController",function($scope,productDate){
	
})

mainApp.controller("historyController",function($scope){
	$scope.data = [
		{
			num:1,
			time:"2017-09-27 14:52:59",
			steamTemp:41.1,
			exhaustGasTemp:33.4
		},
		{
			num:2,
			time:"2017-09-27 14:55:59",
			steamTemp:43.7,
			exhaustGasTemp:33.4
		},
		{
			num:3,
			time:"2017-09-27 15:02:59",
			steamTemp:41.1,
			exhaustGasTemp:33.4
		},
		{
			num:4,
			time:"2017-09-27 15:02:59",
			steamTemp:41.1,
			exhaustGasTemp:33.4
		},{
			num:5,
			time:"2017-09-27 15:02:59",
			steamTemp:41.1,
			exhaustGasTemp:33.4
		}
	];
	$scope.p_size(6,$scope.data);
})





mainApp.controller("alarmController",function($scope){
	$scope.alarm = [];
	$scope.p_size(6,$scope.alarm);
})

mainApp.controller("maintainController",function($scope){
	$scope.maintain = [];
	$scope.p_size(6,$scope.maintain);
})


// mainApp.filter('unique', function () {
//return function (collection, keyname) {
//  var output = [],
//    keys = [];
//  angular.forEach(collection, function (item) {
//    var key = item[keyname];
//    if (keys.indexOf(key) === -1) {
//      keys.push(key);
//      output.push(item);
//    }
//  });
//  return output;
//};
//});







