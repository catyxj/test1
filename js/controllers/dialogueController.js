
mainApp.controller("dialogueController",function($scope, $rootScope, $uibModal,advisoryData){
//	dialogue = this;	
	$scope.advisory = advisoryData;
	$scope.pageSize = 10;
	$scope.totalItems = $scope.advisory.length;
	
						
		
        $scope.openNew = function() {  
        		var newdata = {};
                var modalInstance = $uibModal.open({
                    templateUrl : 'advisory.html',//script标签中定义的id
                    controller : 'advisoryCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数                        	                	                       			
                             return newdata;//用于传递数据
                        }
                    }
                });
                
                 modalInstance.opened.then(function() {// 模态窗口打开之后执行的函数
                     console.log('modal is opened');
                 });
                 modalInstance.result.then(function(result) {
                    var replyTime = new Date();
                    $scope.advisory.push({
                     	title:result.title,
						time:replyTime,
						content:[{contentText:result.content, time:replyTime, user:"system"}],
						orgName:"系统",
						username:"system",
						state:"新咨询"});                    
                 }, function(reason) {
                    console.log(reason);                                 
                 });
                
            }
	
			$scope.openModal = function(data) {  
        		
                var modalInstance = $uibModal.open({
                    templateUrl : 'directives/modal/dialogue_comment.html',//script标签中定义的id
                    controller : 'dialogueCtrl',//modal对应的Controller
                    size: 'lg', //大小配置 
                    resolve : {
                        data : function() {//data作为modal的controller传入的参数                         	
                             return data;//用于传递数据
                        }
                    }
                });
                
                 modalInstance.opened.then(function() {// 模态窗口打开之后执行的函数
                     console.log();
                 });
                 modalInstance.result.then(function(result) {
                 	var replyTime = new Date();
                 	data.content.push({contentText:result.newcontent, time:replyTime, user:"system"}) ; 
                 	data.state="已回复";
                 }, function(reason) {
                    console.log(reason);                                 
                 });
                
            }
	
	
	

	
	
	
	
	
	$scope.removeData = function(id){
		for(var i = 0; i < $scope.advisory.length; i++){
			if($scope.advisory[i].num == id){				
				var r = confirm("确认删除 "+ $scope.advisory[i].title +"？")
				if(r==true){
					$scope.advisory.splice(i,1);
				}
				else{
					break;
				}
			}
		}
	}
	
	
	
})

mainApp.controller('dialogueCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data = data;
		  $scope.data.newcontent = null;
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close($scope.data);
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
    

mainApp.controller('advisoryCtrl', function($scope,$rootScope, $uibModalInstance, data) {
          $scope.data= data;
		  
          //在这里处理要进行的操作
          $scope.ok = function() {
              $uibModalInstance.close($scope.data);
          };
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
          }
    });
