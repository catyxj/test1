mainApp
.directive("datatableDialogue",function(advisoryData){
	return {		
   		restrict:"E",
   		templateUrl:"views/datatable/datatable_dialogue.html",
   		replace: true
		
 	}
})
.directive("datatableAlarm",function(alarmData){
	return {		
   		restrict:"E",
   		templateUrl:"directives/datatable_alarm.html",
   		replace: true
		
 	}
})
.directive("datatableMaintain",function(maintainData){
	return {		
   		restrict:"E",
   		templateUrl:"directives/datatable_maintain.html",
   		replace: true
		
 	}
})
.directive("datatableOrganization",function(organizationData){
	return {		
   		restrict:"E",
   		templateUrl:"views/datatable/datatable_organization.html",
   		replace: true
		
 	}
})
.directive("datatableBoiler",function(organizationData){
	return {		
   		restrict:"E",
   		templateUrl:"views/datatable/datatable_boiler.html",
   		replace: true
		
 	}
})
.directive("datatableTerminal",function(organizationData){
	return {		
   		restrict:"E",
   		templateUrl:"views/datatable/datatable_terminal.html",
   		replace: true
		
 	}
})
.directive("datatableConfigAlarm",function(organizationData){
	return {		
   		restrict:"E",
   		templateUrl:"views/datatable/datatable_conf_alarm.html",
   		replace: true
		
 	}
})
.directive("datatableHistory",function(organizationData){
	return {		
   		restrict:"E",
   		templateUrl:"directives/datatable_history.html",
   		replace: true
		
 	}
})
//.directive("chartAlarm",function(){
//	return {		
// 		restrict:"E",
// 		templateUrl:"directives/chart_alarm.html",
// 		replace: true
//		
// 	}
//})