mainApp.controller("BoilerMaintainController",function($scope, $uibModal,maintainData){
	$scope.maintainInfo = maintainData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.maintainInfo.length;
//	$scope.selectedPageSize($scope.maintainInfo,6);	
	
	
	
	var data = [];
	
	$scope.openModal = function(data) {
                var modalInstance = $uibModal.open({
                    templateUrl : 'directives/modal/boiler_maintain_detail.html',//script标签中定义的id
                    controller : 'modalCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数                      		
                             return data;//用于传递数据
                        }
                    }
                })
          };
    $scope.addOpenModal = function() {   	
                var modalInstance = $uibModal.open({
                    templateUrl : 'directives/modal/boiler_maintain_detail.html',//script标签中定义的id
                    controller : 'modalCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数   
                        	var newData = {};
                        	newData={
                        		maintainDetail:{
									burner:[0,0,0,0,0,0,0],
									importGrate:[0,0,0,0,0,0,0],
								},
                        	};
                             return newData;//用于传递数据
                        }
                    }
                });
                modalInstance.opened.then(function() {// 模态窗口打开之后执行的函数
                     console.log('modal is opened');
                 });
                 modalInstance.result.then(function(result) {
                    
                                      
                 }, function(reason) {
                    console.log(reason);                                 
                 });
                
                
                
          };
    
    
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.maintainInfo.length; i++){
			if($scope.maintainInfo[i].num == id){
				$scope.maintainInfo.splice(i,1);
				$scope.totalItems = $scope.maintainInfo.length;
//				break;
			}
		}
	}	
	
})




//模态框对应的Controller
mainApp.controller('modalCtrl', function($scope, $uibModalInstance, data) {
          	$scope.data= data;
			$scope.data.detailindex=1;
			$scope.data.setIndex=function(n){
				$scope.data.detailindex=n;
			}
			//日期选择
			$scope.dat = new Date();
	        $scope.format = "yyyy/MM/dd";
	        $scope.altInputFormats = ['yyyy/M!/d!'];
	 
	        $scope.popup2 = {
	            opened: false
	        };
	        $scope.open2 = function () {
	            $scope.popup2.opened = true;
	        };
		
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close();
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    
//mainApp.controller('addModalCtrl', function($scope, $uibModalInstance, data) {
//        $scope.data= data;
//        
//        
//      
//        $scope.ok = function() {
//            $uibModalInstance.close();
//        };
//        $scope.cancel = function() {
//            $uibModalInstance.dismiss('cancel');
//        }
//  });