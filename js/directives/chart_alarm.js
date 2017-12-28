mainApp.directive("chartAlarm",function(){
	  	return {		
   		restrict:"E",
   		templateUrl:"directives/chart_alarm.html",
   		replace: true,
   		link:function(scope, element, attrs){
   			initChartAlarm(scope.alarm);
   		}
	}			
   });

var initChartAlarm = function(alarm){
	if (!alarm) {
        console.warn("Boiler Alarm Data IS NULL!");
        return;
    }
    if (typeof(AmCharts) === 'undefined' || $('#chart_alarm').size() === 0) {
        console.warn("There IS NO #chart_alarm");
        return;
    }
    
    var chartData = [];
    var pName = alarm['Parameter__Name'];
    var unit = alarm['Parameter__Unit'];
    var scale = alarm['Parameter__Scale'];
    var fix = alarm['Parameter__Fix'];
    var normalValue = alarm['TriggerRule__Normal'];
    var warningValue = alarm['TriggerRule__Warning'];

    for (var i = 0; i < alarm.runtime.length; i++) {
        var rtm = alarm.runtime[i];
        var value = (rtm.Value * scale).toFixed(fix);

        var d = {
            num: i,
            date: new Date(rtm.CreatedDate),
            value: value
        };
        chartData.push(d);
    }
	
    var lowColor = warningValue > normalValue ? "#0d8ecf" : "#f0868e";
    var highColor = warningValue > normalValue ? "#f0868e" : "#0d8ecf";
    
    
    var chart = AmCharts.makeChart("chart_alarm", {
        type: "serial",
        theme: "light",
        fontSize: 11,
        color: "#6c7b88",
        language: "zh",
        marginTop: 8,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        dataProvider: chartData,
      
        valueAxes: [{
            id: "a1",
          
            gridAlpha: 0.04,
            axisAlpha: 0.2,
            unit: unit,
        }],
        graphs: [{
            id:"g1",
            valueField: "value",
            balloonText: pName + ":[[value]]" + unit,//"[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
         
            lineColor: highColor,
            negativeLineColor: lowColor,
            lineThickness: 1,
            negativeBase: warningValue,
            fillAlphas: 0.3,
            lineAlpha: 0.6,
            type: "smoothedLine"
        }],

        chartCursor: {
            cursorAlpha: 0,
            categoryBalloonDateFormat: "JJ:NN",
            categoryBalloonColor: "#e26a6a",
            categoryBalloonAlpha: 0.8,

            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            valueLineAlpha: 0.3,
            bulletsEnabled: true,
            bulletSize: 8,
            fullWidth:true
        },
        dataDateFormat: "YYYY-MM-DD JJ:NN:SS",
        categoryField: "date",
        categoryAxis: {
            minPeriod: "mm",
            parseDates: true,
            equalSpacing: true,
            axisAlpha: 0.2,
            gridAlpha: 0.04,         
        }
    });
    
    
           
//			var chart = AmCharts.makeChart("chartdiv", {
//				"type": "serial",
//				"theme": "light",
//				"fontSize": 11,
//      		"color": "#6c7b88",
//				"marginRight": 0,
//				"marginLeft": 0,
////				"autoMarginOffset": 20,
////				"mouseWheelZoomEnabled": true,
////				"dataDateFormat": "YYYY-MM-DD",
//				"dataProvider": chartData,
//				"valueAxes": [{
//					"id": "a1",
////					"axisAlpha": 0,
////					"position": "left",
////					"ignoreAxisWidth": true
//					"gridAlpha": 0.04,
//		            "axisAlpha": 0.2,
//		            "unit": unit,
//				}],
////				"balloon": {
////					"borderThickness": 1,
////					"shadowAlpha": 0
////				},
//				"graphs": [{
//					"id": "g1",
////					"balloon": {
////						"drop": true,
////						"adjustBorderColor": false,
////						"color": "#ffffff"
////					},
//					"lineColor": highColor,
////					"bullet": "round",
////					"bulletBorderAlpha": 1,
////					"bulletColor": "#FFFFFF",
////					"bulletSize": 5,
////					"hideBulletsCount": 50,
//					"negativeLineColor": lowColor,
//					"lineThickness": 1,
////					"title": "red line",
////					"useLineColorForBulletBorder": true,
//					"valueField": "value",
//					"balloonText": pName + ":[[value]]" + unit,
//					"negativeBase": warningValue,
//		            "fillAlphas": 0.3,
//		            "lineAlpha": 0.6,
//		            "type": "smoothedLine"
//				}],
//
//				"chartCursor": {
//					"pan": true,
//					"valueLineEnabled": true,
//					"valueLineBalloonEnabled": true,
//					"cursorAlpha": 1,
//					"cursorColor": "#258cbb",
//					"limitToGraph": "g1",
//					"valueLineAlpha": 0.2,
//					"valueZoomable": true
//				},
//
//				"categoryField": "date",
//				"categoryAxis": {
//					"parseDates": true,
//					"dashLength": 1,
//					"minorGridEnabled": true
//				},
//				"export": {
//					"enabled": true
//				}
//				
//			
//			});
		
}


