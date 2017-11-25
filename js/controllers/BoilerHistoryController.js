mainApp.controller("BoilerHistoryController", function($scope, $http, $location, Excel) {

	bHistory = this;
	bHistory.isDone = false;
	bHistory.isEmpty = false;
	
	$scope.$on('$viewContentLoaded', function() {
            App.initAjax();
            // set sidebar closed and body solid layout mode
            $rootScope.settings.layout.pageContentWhite = true;
            $rootScope.settings.layout.pageBodySolid = true;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
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
		$http.get('boiler_runtime_history.json', {
			params: {  
		        "startDate": bHistory.startDate,
                "endDate": bHistory.endDate  
		    } 
//              uid: p['boiler'],
//              runtimeQueue: bHistory.pids,
                
            }).then(function(res) {
			bHistory.datasource = [];
			bHistory.parameters = res.data.parameter;
			bHistory.pids = [];
			
			Ladda.create(document.getElementById('history_range_today')).stop();
            Ladda.create(document.getElementById('history_range_week')).stop();
            Ladda.create(document.getElementById('history_range_month')).stop();
//          if (!res.data.Runtimes || res.data.Runtimes.length === 0) {
//                  bHistory.isDone = true;
//                  bHistory.isEmpty = true;
//                  return;
//              }
			
			
			
			var pData = res.data.history[0].data;
			for(var m = 0; m < pData.length; m++) {
				var pid = {};
				pid.pID = pData[m].pid;
				for(var n = 0; n < bHistory.parameters.length; n++) {
					if(bHistory.parameters[n].Id == pid.pID) {
						pid.Name = bHistory.parameters[n].Name;
						pid.Unit = bHistory.parameters[n].Unit;
					}
				}
				bHistory.pids.push(pid);
			};
//			console.log(bHistory.pids);

			for(var i = 0; i < res.data.history.length; i++) {
				var rtm = res.data.history[i];
				var d = {};
				d.num = i;
				d.id = i;
				d.date = rtm.date;
				for(var j = 0; j < rtm.data.length; j++) {
					var ap = rtm.data[j];
					var key = ap.pid.toString();
					d[key] = {
						value: '-',
						alarm: -1
					};
					d[key].value = ap.val;
					d[key].alarm = ap.alm;
				}
				bHistory.datasource.push(d);
			}
//			console.log(bHistory.datasource);
			$scope.totalItems = bHistory.datasource.length;

			//表格样式
			var scrollLeftTarget = angular.element(document.getElementById("cd-table"));
			var scrollLeftBtn = angular.element(document.getElementsByClassName("cd-scroll-right"));
			if(bHistory.pids.length >= 9) {
				scrollLeftTarget.addClass("table_responsive").removeClass("table-end");
				scrollLeftBtn.css("display", "block");
			} else {
				scrollLeftTarget.removeClass("table_responsive").addClass("table-end");
				scrollLeftBtn.css("display", "none");
			};

		});
	};

	bHistory.setDataRange = function(range) {
		var startDate = new Date();
		var endDate = new Date();
		Ladda.create(document.getElementById('history_range_today')).stop();
		Ladda.create(document.getElementById('history_range_week')).stop();
		Ladda.create(document.getElementById('history_range_month')).stop();
		Ladda.create(document.getElementById('history_range_' + range)).start();
		switch(range) {
			case 'today':
				startDate.setHours(0);
				startDate.setMinutes(0);
				break;

			case 'week':
				startDate.setDate(startDate.getDate() - 7);
				startDate.setHours(0);
				startDate.setMinutes(0);
				break;

			case 'month':
				startDate.setDate(1);
				startDate.setHours(0);
				startDate.setMinutes(0);
				break;

			default:
				break;
		}

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

	 	$scope.hstep = 1;
        $scope.mstep = 30;

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };

        $scope.changed = function () {
            $log.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

	

	

	
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
//		$event.preventDefault();
//		$event.stopPropagation();
		$scope.popup1.opened = true;
	};
	$scope.endopen = function($event) {
//		$event.preventDefault();
//		$event.stopPropagation();
		$scope.popup2.opened = true;
	};

	$scope.setDate = function(year, month, day) {
		$scope.dt = new Date(year, month, day);
	};
	
		
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

	function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
	
	
	
	
	

	//表格横向滚动事件
	var scLeft = angular.element(document.getElementsByClassName("cd-table-container")),
		cdTable = angular.element(document.querySelector('#cd-table')),
		cdTableWrapper = angular.element(document.querySelector('.cd-table-wrapper'));
	var scLeftArrow = angular.element(document.getElementsByClassName("cd-scroll-right"));
	scLeft.on("scroll", function() {
		//remove color gradient when table has scrolled to the end
		var total_table_width = parseInt(cdTableWrapper.css('width').replace('px', '')),
			table_viewport = parseInt(cdTable.css('width').replace('px', ''));

		if(scLeft.scrollLeft() >= total_table_width - table_viewport) {
			cdTable.addClass('table-end');
			scLeftArrow.css("display", "none");
		} else {
			cdTable.removeClass('table-end');
			scLeftArrow.css("display", "block");
		}
	});

	//scroll the table (scroll value equal to column width) when clicking on the .cd-scroll-right arrow		
	scLeftArrow.on('click', function() {
		var column_width = scLeft.find('td').eq(2).css('width').replace('px', ''),
			new_left_scroll = parseInt(scLeft.scrollLeft()) + parseInt(column_width);
		scLeft.animate({
			scrollLeft: new_left_scroll
		}, 200);
	});

})

mainApp.factory('Excel', function($window) {
	var uri = 'data:application/vnd.ms-excel;charset=utf-8;base64,',
		template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
		base64 = function(s) {
			return $window.btoa(unescape(encodeURIComponent(s)));
		},
		format = function(s, c) {
			return s.replace(/{(\w+)}/g, function(m, p) {
				return c[p];
			})
		};
	return {
		tableToExcel: function(tableId, worksheetName) {
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