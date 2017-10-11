
mainApp.controller("component",function(){
	var findIndex = function(id){
		var index =-1;
		angular.forEach($scope.cart,function(item,key) {
			if(item.id === id){
				index=key;
				return;
			}
		});
		return index;
	}

	$scope.add = function(id){
		var index = findIndex(id);
		if(index !== -1){
			++$scope.cart[index].quantity;
		}
	}

	$scope.reduce = function(id){
		var index = findIndex(id);
		if(index !== -1){
			var item = $scope.cart[index];
			if(item.quantity>1){
				--item.quantity;
			}else{
				var returnKey = confirm("确认删除该项?");
				if(returnKey){
					$scope.remove(id);
				}
			}


		}
	}


	$scope.remove = function(id){
		var index = findIndex(id);
		if (index !== -1) {
			$scope.cart.splice(index,1);
		}
	}
})