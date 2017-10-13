mainApp
.directive("datatableAdvisory",function(advisoryData){
	return {		
   		restrict:"E",
   		templateUrl:"views/datatable/datatable_advisory.html",
   		replace: true
		
 	}
})
.directive("datatableAlarm",function(advisoryData){
	return {		
   		restrict:"E",
   		templateUrl:"views/datatable/datatable_alarm.html",
   		replace: true
		
 	}
})
.directive("datatableMaintain",function(advisoryData){
	return {		
   		restrict:"E",
   		templateUrl:"views/datatable/datatable_maintain.html",
   		replace: true
		
 	}
})