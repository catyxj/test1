mainApp.controller("TerminalController", function($scope, $rootScope, $uibModal, $http) {
	terminal = this;
	terminal.isDone = false;
	terminal.msgData = {};

	$scope.terminal = {};

	$http.get("terminal_list.json").then(function(res) {
		var datasource = res.data;
		var num = 0;
		angular.forEach(datasource, function(d, key) {
			d.num = ++num;
			d.code = d.TerminalCode.toString();
			if(d.code.length < 6) {
				for(var l = d.code.length; l < 6; l++) {
					d.code = "0" + d.code;
				}
			}
			d.simNum = d.SimNumber.length > 0 ? d.SimNumber : " - ";
			d.ip = d.LocalIp.length > 0 ? d.LocalIp : " - ";
			d.online = d.IsOnline ? "在线" : "离线";

			//                  if (currentData && currentData.Uid === d.Uid) {
			//                      currentData = d;
			//                  }
		});

		$scope.terminal.datasource = datasource;
		$scope.totalItems = $scope.terminal.datasource.length;
	});

	$scope.pageSize = 10;

	terminal.items = ['item1', 'item2', 'item3'];

	terminal.animationsEnabled = true;

	terminal.new = function() {
		currentData = null;
		editing = true;
		terminal.open();
	};

	terminal.setting = function(data) {
		currentData = data;
		editing = true;
		terminal.open();
	};

	terminal.view = function(data) {
		currentData = data;
		editing = false;
		terminal.open();

	};
	terminal.channel = function(data) {
		currentData = data;
		editing = true;
		
		var modalInstance = $uibModal.open({
			templateUrl: 'directives/modal/terminal_channel.html',
			controller: 'terminalChannelCtrl',
			controllerAs: '$modal',
			size: "lg",			
			resolve: {
				currentData:function(){
					return currentData;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			terminal.selected = selectedItem;
		}, function() {

		});
	}

	terminal.open = function(parentSelector) {
		var parentElem = parentSelector ?
			angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
			
		var modalInstance = $uibModal.open({
			animation: terminal.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'directives/modal/terminal_config.html',
			controller: 'ModalTerminalCtrl',
			controllerAs: '$modal',
			size: "lg",
			appendTo: parentElem,
			windowClass: 'zindex',
			resolve: {

			}
		});

		modalInstance.result.then(function(selectedItem) {
			terminal.selected = selectedItem;
		}, function() {

		});
	};

	terminal.toggleAnimation = function() {
		terminal.animationsEnabled = !terminal.animationsEnabled;
	};

	//		var newdata = {};
	//      $scope.openAddModal = function() {       	
	//              var modalInstance = $uibModal.open({
	//                  templateUrl : 'views/modal/modal-terminal.html',
	//                  controller : 'terminalCtrl',//modal对应的Controller
	//                  size: '', //大小配置 
	//                  resolve : {
	//                      data : function() {//data作为modal的controller传入的参数	
	//                           return newdata;//用于传递数据
	//                      }
	//                  }
	//              })
	//         };
	//         
	//       $scope.openSetModal = function(data) {       	
	//              var modalInstance = $uibModal.open({
	//                  templateUrl : 'views/modal/modal-set-terminal.html',
	//                  controller : 'terminalCtrl',//modal对应的Controller
	//                  size: '', //大小配置 
	//                  resolve : {
	//                      data : function() {//data作为modal的controller传入的参数	
	//                           return data;//用于传递数据
	//                      }
	//                  }
	//              })
	//          };   
	//		
	$scope.removeData = function(id) {
		for(var i = 0; i < $scope.terminal.length; i++) {
			if($scope.terminal[i].num == id) {
				$scope.terminal.splice(i, 1);
				break;
			}
		}
	}

})

var terminal;
var currentData;
var editing;

mainApp.controller('terminalChannelCtrl', function($scope,$rootScope, $uibModalInstance,$http, currentData) {
		var $modal = this;
          	$modal.currentData = currentData;
          	$modal.code = $modal.currentData.code;
          	$modal.editing = editing;
		  	$modal.editingCode = true;		
		    $modal.category = 10;		
		    $modal.priorities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                              
        $http.get("channel_config_matrix.json/").then(function(res){
			$modal.chanMatrix = res.data;
        	$modal.dataMatrix = clone($modal.chanMatrix);
        	for (var i = 0; i < $modal.chanMatrix.length; i++) {
            for (var j = 0; j < $modal.chanMatrix[i].length; j++) {
                if (!$modal.chanMatrix[i][j]) {
                    $modal.chanMatrix[i][j] = {
                        Name: "默认(未配置)"
                    }
                }

                if (!$modal.dataMatrix[i][j] || $modal.dataMatrix[i][j].IsDefault) {
                    $modal.dataMatrix[i][j] = null;
                }
            }
        }
		});
          
        $modal.categoryChanged = function (category) {
        $modal.category = category;
    };

    $scope.setChannelConfStat = function () {

    };

    function clone(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null === obj || "object" !== typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    $modal.analogParameters = [{Id: 0, Name: '默认配置'}];
    $modal.switchParameters = [{Id: 0, Name: '默认配置'}];
    $modal.calculateParameters = [{Id: 0, Name: '默认配置'}];

    for (var i = 0; i < $rootScope.parameters.length; i++) {
        var param = $rootScope.parameters[i];
        switch (param.Category.Id) {
            case 10:
                $modal.analogParameters.push(param);
                break;
            case 11:
                $modal.switchParameters.push(param);
                break;
            case 12:
                $modal.calculateParameters.push(param);
                break;
        }
    }
    
    
    $modal.parameters = [
        $modal.analogParameters,
        $modal.analogParameters,
        $modal.switchParameters,
        $modal.calculateParameters
    ];
	console.log($modal.parameters);	 
	 
		 
		 
		 
		 
		 
		 
		 
	$modal.matrixChanged = function (outerIndex, innerIndex) {
        console.info("Data Matrix:", $modal.dataMatrix, "\n", outerIndex, ":", innerIndex);
        if ($modal.dataMatrix[outerIndex][innerIndex].Parameter.Id === 0) {
            $modal.dataMatrix[outerIndex][innerIndex].Parameter = null;
            $modal.dataMatrix[outerIndex][innerIndex].Status = -1;
        } else if (!$modal.dataMatrix[outerIndex][innerIndex].Status || $modal.dataMatrix[outerIndex][innerIndex].Status === -1) {
            $modal.dataMatrix[outerIndex][innerIndex].Status = 0;
        }
    };

    $scope.matrixReset = function () {
        for (var i = 0; i < $modal.dataMatrix.length; i++) {
            for (var j = 0; j < $modal.dataMatrix[i].length; j++) {
                $modal.dataMatrix[i][j] = null;
            }
        }
    };

    $modal.initCurrent = function () {
        if (currentData) {
            $modal.editingCode = false;

            $modal.title = "编辑参数";

            $modal.name = currentData.Name;
            $modal.code = currentData.code;
            $modal.boilers = currentData.Boilers;

            $modal.description = currentData.Description;
        }
    };

    $modal.initCurrent();

    $scope.setStatus = function(outerIndex, innerIndex, status, sn) {
        console.warn("$scope.setStatus", outerIndex, innerIndex, status, sn);
        $modal.dataMatrix[outerIndex][innerIndex].Status = status;
        if (status === 1) {
            $modal.dataMatrix[outerIndex][innerIndex].SequenceNumber = sn;
        } else {
            $modal.dataMatrix[outerIndex][innerIndex].SequenceNumber = -1;
        }
    };	 
			 
		 
          //在这里处理要进行的操作
          $scope.ok = function() {
//            $uibModalInstance.close();
				console.warn("$modal channel update!");
		        if (!$modal.code.length || $modal.code.length !== 6) {
		            console.error("$modal.code error:", $modal.code);
		            return;
		        }
		        Ladda.create(document.getElementById('boiler_ok')).start();
		
		        var configUpload = [];
		        for (var i = 0; i < $modal.dataMatrix.length; i++) {
		            for (var j = 0; j < $modal.dataMatrix[i].length; j++) {
		                if ($modal.dataMatrix[i][j] !== $modal.chanMatrix[i][j]) {
		                    if ((!$modal.dataMatrix[i][j] /*|| !$modal.dataMatrix[i][j].Parameter*/) && ($modal.chanMatrix[i][j] && $modal.chanMatrix[i][j].IsDefault === true)) {
		                        console.warn('!!NULL data:', $modal.dataMatrix[i][j], $modal.chanMatrix[i][j]);
		                        continue;
		                    }
		                    var chanParamId = $modal.chanMatrix[i][j] && $modal.chanMatrix[i][j].Parameter ? $modal.chanMatrix[i][j].Parameter.Id : 0;
		                    var dataParamId = $modal.dataMatrix[i][j] && $modal.dataMatrix[i][j].Parameter ? $modal.dataMatrix[i][j].Parameter.Id : 0;
		                    var chanStatus = $modal.chanMatrix[i][j] ? $modal.chanMatrix[i][j].Status : 0 ;
		                    var dataStatus = $modal.dataMatrix[i][j] ? $modal.dataMatrix[i][j].Status : 0 ;
		                    var dataSeqNo = $modal.dataMatrix[i][j] && dataStatus === 1 ? $modal.dataMatrix[i][j].SequenceNumber : -1 ;
		                    if (dataParamId !== chanParamId || dataStatus !== chanStatus) {
		                        var chan = j + 1;
		                        var num = i + 1;
		                        if (j >= 2) {
		                            chan = 3;
		                            num = i + (j - 2) * 16 + 1;
		                        }
		                        configUpload.push({
		                            terminal_code: $modal.code,
		                            parameter_id: dataParamId,
		                            channel_type: chan,
		                            channel_number: num,
		
		                            status: dataStatus,
		                            sequence_number: dataSeqNo
		                        });
		                    }
		                }
		            }
		        }
		
		        console.warn("$modal channel update!", configUpload);
		
		        $http.post("/channel_config_update/", configUpload)
		            .then(function (res) {
		                swal({
		                    title: "通道配置更新成功",
		                    type: "success"
		                }).then(function () {
		                    $uibModalInstance.close('success');
		                    currentData = null;
		                });
		            }, function (err) {
		                swal({
		                    title: "通道配置更新失败",
		                    text: err.data,
		                    type: "error"
		                });
		            });
		        Ladda.create(document.getElementById('boiler_ok')).stop();
          };
          
          $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
              currentData = null;
          }
    });

mainApp.controller('ModalTerminalCtrl', function($uibModalInstance, $uibModal, $http, $log) {
	var $modal = this;
	$modal.currentData = currentData;
	$modal.editing = editing;
	$modal.editingCode = true;

	$modal.initCurrent = function() {
		if(currentData) {
			$modal.editingCode = false;

			$modal.title = "编辑参数";

			$modal.name = currentData.Name;
			$modal.code = currentData.code;
			$modal.boilers = currentData.Boilers;
			$modal.simNum = currentData.SimNumber;
			$modal.ip = currentData.LocalIp;
			$modal.upload = currentData.UploadFlag;
			$modal.uploadPeriod = currentData.UploadPeriod;

			$modal.description = currentData.Description;
			$modal.sets = [];

			if(currentData.Boilers) {
				for(var i = 0; i < 8; i++) {
					if(i < currentData.Boilers.length) {
						var boiler = currentData.Boilers[i];
						boiler.num = boiler.TerminalSetId;
						boiler.hasDev = true;
						$modal.sets.push(boiler);
					} else {
						$modal.sets.push({
							num: i + 1,
							Name: "未配置",
							hasDev: false
						});
					}
				}
			}
			$modal.deviceCount = currentData.Boilers.length;
		}
	};

	$modal.initCurrent();

	$modal.sendConfMessage = function() {
		var data = {
			uid: currentData.Uid,
			code: $modal.code,
			upload_flag: $modal.upload,
			upload_period: $modal.uploadPeriod
		};

		$http.post("/terminal_config/", data)
			.then(function(res) {
				console.warn("Send Terminal Config Message Done:", res);
				swal({
					title: "信息已发送",
					text: res.data,
					type: "success"
				});
			}, function(err) {
				swal({
					title: "信息发送失败",
					text: err.data,
					type: "error"
				});
			});
	};

	$modal.bindSet = function(set) {
		if(set.hasDev) {
			swal({
				title: "解除终端#" + currentData.code + "\n与该设备的绑定?",
				text: "解除绑定后，将无法收到来自 " + set.Name + " 的运行时数据。",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#d33',
				cancelButtonColor: '#3085d6',
				confirmButtonText: '解绑',
				cancelButtonText: '取消'
			}).then(function() {
				$http.post("/boiler_unbind/", {
					boiler_id: set.Uid,
					terminal_id: currentData.Uid,
				}).then(function(res) {
					swal({
						title: "绑定已解除",
						text: "该终端已不再维护 " + set.Name + "相关数据，如需重新接入，请通过终端绑定流程进行再次绑定。",
						type: "success"
					});
					terminal.refreshDataTables($modal.initCurrent);
				}, function(err) {
					swal({
						title: "解除绑定失败",
						text: err.data,
						type: "error"
					});
				});
			});
		} else {
			$modal.openBind();
		}
	};

	$modal.ok = function() {
		if(!$modal.code.length || $modal.code.length !== 6) {
			return;
		}
		Ladda.create(document.getElementById('boiler_ok')).start();
		var ter = {
			uid: "",
			code: "",
			name: $modal.name,
			sim_number: $modal.simNum,
			ip: $modal.ip,
			upload_flag: $modal.upload,
			upload_period: $modal.uploadPeriod,

			description: $modal.description
		};

		if(currentData) {
			ter.uid = currentData.Uid;
		}

		if($modal.editingCode) {
			ter.code = $modal.code;
		}

		$http.post("/terminal_update/", ter)
			.then(function(res) {
				swal({
					title: "终端配置更新成功",
					type: "success"
				}).then(function() {
					$uibModalInstance.close('success');
					currentData = null;
					terminal.refreshDataTables();
				});
			}, function(err) {
				swal({
					title: "终端配置更新失败",
					text: err.data,
					type: "error"
				});
			});
		Ladda.create(document.getElementById('boiler_ok')).stop();
	};

	$modal.resetCode = function() {
		$modal.editingCode = true;
	};

	$modal.reboot = function() {
		var uid = null;
		if(currentData) {
			uid = currentData.Uid;
		}

		if(!uid || uid.length <= 0) {
			swal({
				title: "重启失败",
				text: "未知终端，无法重启",
				type: "error"
			});
			return;
		}

		swal({
			title: '确认重启该终端?',
			//text: "You won't be able to revert this!",
			type: 'question',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: '确定',
			cancelButtonText: '取消'
		}).then(function() {
			$http.post("/terminal_reset/", {
				uid: uid,
			}).then(function(res) {
				swal({
					title: "终端已重启",
					type: "success"
				});
			}, function(err) {
				swal({
					title: "终端重启失败",
					text: err.data,
					type: "error"
				});
			});
		});
	};

	$modal.delete = function() {
		if(!currentData.Boilers || currentData.Boilers.length === 0) {
			swal({
				title: "确认删除该终端？",
				text: "注意：删除后将无法恢复，无法接收来自此终端的所有设备信息。",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#d33",
				cancelButtonText: "取消",
				confirmButtonText: "删除",
				closeOnConfirm: false
			}).then(function() {
				$http.post("/terminal_delete/", {
					uid: currentData.Uid
				}).then(function(res) {
					swal({
						title: "终端删除成功",
						type: "success"
					}).then(function() {
						terminal.refreshDataTables();
					});
				}, function(err) {
					swal({
						title: "删除终端失败",
						text: err.data,
						type: "error"
					});
				});
			});
		} else {
			swal({
				title: "无法删除该终端",
				text: "尚有" + currentData.Boilers.length + "台锅炉设备与该终端绑定，如需删除该终端，请先解绑其所有设备。",
				type: "error"
			});
		}

	};

	$modal.cancel = function() {
		$uibModalInstance.dismiss('cancel');

		currentData = null;
	};

	$modal.openBind = function(size, parentSelector) {
		var parentElem = parentSelector ?
			angular.element($document[0].querySelector('.modal-body ' + parentSelector)) : undefined;
		var modalInstance = $uibModal.open({
			animation: terminal.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'directives/modal/terminal_bind.html',
			controller: 'ModalTerminalBindCtrl',
			controllerAs: '$modalBind',
			size: size,
			appendTo: parentElem,
			windowClass: 'zindex_sub',
			resolve: {
				$modal: function() {
					return $modal;
				}
			}
		});

		modalInstance.result.then(function(selectedItem) {
			terminal.selected = selectedItem;
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};
});

// Please note that the close and dismiss bindings are from $uibModalInstance.

mainApp.controller('ModalTerminalBindCtrl', function($uibModalInstance, $rootScope, $http, $filter, $modal) {
	var $modalBind = this;
	$modalBind.code = currentData.code;
	$modalBind.name = currentData.Name;
	$modalBind.boilerId = "";

	$modalBind.getBoilers = function() {
		var boilers = $filter('filter')($rootScope.boilers, function(item) {
			return !item.Terminal;
		});
		if(boilers.length === 0) {
			boilers.push({
				Uid: "",
				Name: "没有未绑定的锅炉"
			});
		} else {
			boilers.unshift({
				Uid: "",
				Name: "请选择"
			});
		}
		$modalBind.boilers = boilers;
	};

	$modalBind.getBoilers();

	$rootScope.$watch('boilers', function() {
		$modalBind.getBoilers();
	});

	$modalBind.ok = function() {
		console.info("ready to bind boiler!");
		$http.post("/boiler_bind/", {
			boiler_id: $modalBind.boilerId,
			terminal_id: currentData.Uid
		}).then(function(res) {
			console.info("Update termianlBind Resp:", res);
			terminal.refreshDataTables($modal.initCurrent);
			swal({
				title: "绑定设备成功",
				type: "success"
			}).then(function() {
				$uibModalInstance.close('success');
			});
		}, function(err) {
			swal({
				title: "绑定设备失败",
				text: err.data,
				type: "error"
			});
		});
	};

	$modalBind.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});