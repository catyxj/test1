mainApp.controller("historyController", function($scope,$http, $location,Excel) {

//	$scope.data = [{
//			num: 1,
//			time: "2017-09-27 14:52:59",
//			steamTemp: 41.1,
//			exhaustGasTemp: 33.4
//		},
//		{
//			num: 2,
//			time: "2017-09-27 14:55:59",
//			steamTemp: 43.7,
//			exhaustGasTemp: 33.4
//		},
//		{
//			num: 3,
//			time: "2017-09-27 15:02:59",
//			steamTemp: 41.1,
//			exhaustGasTemp: 33.4
//		},
//		{
//			num: 4,
//			time: "2017-09-27 15:02:59",
//			steamTemp: 41.1,
//			exhaustGasTemp: 33.4
//		}, {
//			num: 5,
//			time: "2017-09-27 15:02:59",
//			steamTemp: 41.1,
//			exhaustGasTemp: 33.4
//		}
//	];

	bHistory = this;
	bHistory.isDone = false;
	bHistory.isEmpty = false;
	$scope.exportToExcel = function(tableId) { //ex: '#my-table'
		$scope.exportHref = Excel.tableToExcel(tableId, 'sheet name');
		$timeout(function() {
			location.href = $scope.exportHref;
		}, 100); // trigger download
	};

	bHistory.excelExport = function() {
		var excelData = [];
		var excelName = $rootScope.boiler.Name;
		var start = moment(bHistory.startDate).format('YYYY.MM.DD');
		var end = moment(bHistory.endDate).format('YYYY.MM.DD');
		excelName += " (" + start + " ~ " + end + ")";
		var xdp = {
			0: "采样时间"
		};
		for(var p = 0; p < bHistory.parameters.length; p++) {
			var param = bHistory.parameters[p];
			xdp[param.Id] = param.Name + " " + param.Unit;
		}
		excelData.push(xdp);

		for(var i = 0; i < bHistory.datasource.length; i++) {
			var d = bHistory.datasource[i];
			var xd = {
				0: moment(d.date).format('YYYY-MM-DD HH:mm')
			};

			for(var j = 0; j < Object.keys(d).length; j++) {
				var k = Object.keys(d)[j];
				if(parseInt(k) > 1000) {
					xd[k] = d[k].value;
				}
			}

			excelData.push(xd);
		}

		var res = alasql('SELECT * INTO XLSX("' + excelName + '.xlsx", {headers:true}) FROM ?', [excelData]);
		console.log(res);
	};
	
	$scope.pageSize = 10;
	
	bHistory.refreshDataTables = function() {
		
		var p = $location.search();
		bHistory.pids = [1001, 1002, 1003, 1005, 1006, 1015, 1014, 1016, 1021, 1202,
			1201
		];
		$http.get('boiler_runtime_history.json').then(function(res) {

			bHistory.datasource = [];
			bHistory.parameters = res.data.parameter;
						
			for(var i = 0; i < res.data.history.length; i++){
				var rtm = res.data.history[i];
                var d = {};
                d.num = i;
                d.id = i;
                d.date = rtm.date;                                	
                	for(var j = 0; j < res.data.parameter.length; j++){
						var ap = res.data.parameter[j];
						var key = ap.Id.toString();
		                var keyP = 'P' + ap.Id;
		                var keyA = 'A' + ap.Id;
//		                var value = ;
		                 d[key] = {
	                            value: '-',
	                            alarm: -1
	                        };
	                        for(var n = 0; n < rtm.data.length; n++){
	                        	if (key == rtm.data[n].pid) {
	                            d[key].value = rtm.data[n].val;
	                        }
	                        d[key].alarm = rtm.data[n].alm;
	                        }
	                       
					
                	
                }
				
				bHistory.datasource.push(d);
			}
			console.log(bHistory.datasource);									
			$scope.totalItems = bHistory.datasource.length;
		});
	};



	bHistory.setDataRange = function(range) {
		var startDate = new Date();
		var endDate = new Date();
//		Ladda.create(document.getElementById('history_range_today')).stop();
//		Ladda.create(document.getElementById('history_range_week')).stop();
//		Ladda.create(document.getElementById('history_range_month')).stop();
//		Ladda.create(document.getElementById('history_range_' + range)).start();
//		switch(range) {
//			case 'today':
//				startDate.setHours(0);
//				startDate.setMinutes(0);
//				break;
//
//			case 'week':
//				startDate.setDate(startDate.getDate() - 7);
//				startDate.setHours(0);
//				startDate.setMinutes(0);
//				break;
//
//			case 'month':
//				startDate.setDate(1);
//				startDate.setHours(0);
//				startDate.setMinutes(0);
//				break;
//
//			default:
//				break;
//		}

		// grab today and inject into field 
		bHistory.startDate = startDate;
		bHistory.endDate = endDate;

		bHistory.dataRange = range;

		bHistory.refreshDataTables();
	};

	bHistory.dateChanged = function() {
		
		if(bHistory.startDate < bHistory.endDate) {
			bHistory.refreshDataTables();
		} else {
			bHistory.datasource = [];
		}
	};
	


	$scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };


	$scope.format = "yyyy-MM-dd";
	$scope.altInputFormats = ['yyyy/M!/d!'];
	$scope.popup1 = {
		opened: false
	};
	$scope.popup2 = {
		opened: false
	};

	// open min-cal
	$scope.startopen = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.popup1.opened = true;
	};
	$scope.endopen = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.popup2.opened = true;
	};

	$scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };


})




 mainApp.factory('Excel',function($window){
        var uri = 'data:application/vnd.ms-excel;charset=utf-8;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format = function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId, worksheetName){
                var table = $(tableId),
                    ctx = {
                        worksheet: worksheetName,
                        table: table.html()
                    },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    })