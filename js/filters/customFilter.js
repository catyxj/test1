angular.module("customFilter",[])
 .filter("unique",function(){
 	return function(data,propertyName){
 		if(angular.isArray(data) && angular.isString(propertyName)){
 			var results = [];
 			var keys = {};
 			for(var i = 0; i < data.length; i++){
 				var val = data[i][propertyName];
 				if(angular.isUndefined(keys[val])){
 					keys[val] = true;
 					results.push(val);
 				}
 			}
 			return results;
 		}else{
 			return data;
 		}
 	}
 })
 .filter("range",function(){
 	return function(data,page,size){		
 		if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)){
 			var start_index = (page-1)*size;
 			var end_index = page*size;
 			if(data.length < start_index){
 				return [];
 			}else{
 				return data.slice(start_index,end_index);				
 			}
 		}else{
 			return data;
 		}
 	}
 })
 .filter("pageCount",function(){
 	return function(data,size){
 		if(angular.isArray(data)){
 			var result = [];
 			for(var i = 0; i < Math.ceil(data.length/size); i++){
 				result.push(i);
 			}
 			return result;
 		}else{
 			return data;
 		}
 	}
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