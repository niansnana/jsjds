//creating custom directive
lanqiaoApp.directive('address-directive', function () {
    return {
        require: 'ngModel',
        link: function (scope, currentEl, attrs, ctrl) {
            var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
            compareEl = angular.element(comparefield);
            
            var msg_box = $('select[ng-model="selectedProvince"]').next().size()>0 ? $('select[ng-model="selectedProvince"]').next():$('<div class="msg-box"></div>');
        	if(!$('select[ng-model="selectedProvince" ]').next().size()>0){
        		msg_box.appendTo($('select[ng-model="selectedProvince" ]').parent());
        	}
        	if($scope.selectedProvince===undefined){
        		msg_box.html('<span class="icon"></span><span class="msg" style="color:rgb(255, 86, 0)">'+$('select[ng-model="selectedProvince"]').attr("data-rule").split(":")[1]+'</span>');
        		
        		$('select[ng-model="selectedProvince"]').css("border-color","#ff5600");
        		
        		return false;
        	}else{
        		msg_box.html('<span class="icon ok"></span>');
        		$('select[ng-model="selectedProvince"]').css("border-color","#c8d2d7");
        		return true;
        	}
            //current field key up
            currentEl.on('keyup', function () {
                if (compareEl.val() != "") {
                    var isMatch = currentEl.val() === compareEl.val();
                    ctrl.$setValidity('compare', isMatch);
                    scope.$digest();
                }
            });

            //Element to compare field key up
            compareEl.on('keyup', function () {
                if (currentEl.val() != "") {
                    var isMatch = currentEl.val() === compareEl.val();
                    ctrl.$setValidity('compare', isMatch);
                    scope.$digest();
                }
            });
        }
    }
});

// create angular controller
lanqiaoApp.controller('addressCtrl', function ($scope,$http) {
	 //省市地址信息列表
	$scope.citys;
    $scope.getSelect =
    	$http.post($URL_THIRDINTERFACE+'/api/action/areas/findAreas').success(function (res) {
    		$scope.regionData = res.resultData;
    		$scope.citys = [];
    		//$scope.countys = [];
    		$scope.regionText = {};
		$scope.$watch('selectedProvince',function(newValue,oldValue){
			console.log(newValue+","+oldValue);
			if($('select[ng-model="selectedProvince"]').val()!=''){
				$('select[ng-model="selectedProvince"]').css("border-color","#c8d2d7");
			}
			if(newValue != oldValue){
				var i = 0;len = $scope.regionData.length;
				if(!newValue){ //判断选择的是否选择省份，如果没有则重置市区
					$scope.selectedCity='';
					$scope.citys = [];
					$scope.selectedCity = ""
					//$scope.countys = [];
					return;
				}
				$scope.selectedProvince=newValue;
				$("#citiesProvinceCode").val($scope.selectedProvince);
				
				for(i;i < len;i ++){
					if($scope.regionData[i].citiesProvinceCode == $scope.selectedProvince){
						$("select[ng-model='selectedProvince']").val(i);
						//citiesProvinceCode
						$http.post($URL_THIRDINTERFACE+'/api/action/areas/findAreas',{citiesProvinceCode:$scope.selectedProvince}).success(function (res) {
   							$scope.citys = res.resultData;
   							var msg_box = $('select[ng-model="selectedCity"]').next().size()>0 ? $('select[ng-model="selectedCity"]').next():$('<div class="msg-box"></div>');
   							if(!$('select[ng-model="selectedCity" ]').next().size()>0){
   								msg_box.appendTo($('select[ng-model="selectedCity" ]').parent());
   							}
   							if($scope.selectedCity===undefined){
//   								msg_box.html('<span class="icon"></span><span class="msg">'+$('select[ng-model="selectedCity"]').attr("data-rule").split(":")[1]+'</span>');
   								
//   								$('select[ng-model="selectedCity"]').css("border-color","#ff5600");
   								
   								return false;
   							}else{
   								console.log($scope.citys);
   								return true;
   							}
						});
//						console.log("citys"+$scope.citys);
//						$scope.citys = $scope.regionData[i].children;
//						$scope.regionText.selectedProvinceText = $scope.regionData[i].citieProvinceName;
					}
				}
			}
		});
		$scope.$watch('selectedCity',function(newValue,oldValue){
			console.log("citys"+$scope.citys);
			if(newValue != oldValue){
				if(!newValue){ //作用同上
					//$scope.countys = [];
					return;
				}
				$scope.selectedCity=newValue;
				console.log("$scope.selectedCity"+$scope.selectedCity+"newValue"+newValue);
				$("#citiesCityCode").val(newValue);
				var msg_box = $('select[ng-model="selectedCity"]').next().size()>0 ? $('select[ng-model="selectedCity"]').next():$('<div class="msg-box"></div>');
				if(!$('select[ng-model="selectedCity" ]').next().size()>0){
					msg_box.appendTo($('select[ng-model="selectedCity" ]').parent());
				}
				if($scope.selectedCity===undefined){
					msg_box.html('<span class="icon"></span><span class="msg" style="color:rgb(255, 86, 0)">'+$('select[ng-model="selectedCity"]').attr("data-rule").split(":")[1]+'</span>');
					
					$('select[ng-model="selectedCity"]').css("border-color","#ff5600");
					
					return false;
				}else{
					msg_box.html('<span class="icon ok"></span>');
					$('select[ng-model="selectedCity"]').css("border-color","#c8d2d7");
					$('select[ng-model="selectedProvince"]').css("border-color","#c8d2d7");
					return true;
				}
//				$("#citiesCityCode").closest(".dropdown").next().html('<span class="icon ok"></span>');
				var i = 0;len = $scope.citys.length;
				for(i;i < len; i ++){
					if($scope.citys[i].citiesCityCode == $scope.selectedCity){
						$("select[ng-model='selectedCity']").val(i);
						//citiesCityCode
						//$http.post($URL_THIRDINTERFACE+'/api/action/areas/findAreas',{citiesCityCode:$scope.citys[i].citiesCityCode}).success(function (res) {
							//$scope.countys = res.resultData;
						//});
						$scope.regionText.selectedCityText = $scope.citys[i].text;
						
//						if(!valiForm($("#saveAddressForm"))){
//				            return;
//				        }
					}
				}
			}
		});
	});
    
    $scope.restForm=function(){
    	$("#addressId").val("");
    	$("#dataVersion").val("");
    	$("#addressRealname").val("");
    	$('#addressRealname').css("border-color","#c8d2d7");
    	$("#addressRealname").next().remove();
    	$("#addressPhone").val("");
    	$('#addressPhone').css("border-color","#c8d2d7");
    	$("#addressPhone").next().remove();
    	$("#addressPostcode").val("");
    	$('#addressPostcode').css("border-color","#c8d2d7");
    	$("#addressPostcode").next().remove();
    	$("#addressDetail").val("");
    	$('#addressDetail').css("border-color","#c8d2d7");
    	$("#addressDetail").next().remove();
    	$("#addressDefault").val("");
    	$("#createTime").val("");
    	$('select[ng-model="selectedProvince"]').css("border-color","#c8d2d7");
    	$('select[ng-model="selectedCity"]').next().remove();
    	$('select[ng-model="selectedCity"]').css("border-color","#c8d2d7");
    	$scope.selectedProvince = "";
		$scope.selectedCity = "";
    }
  //查找数据Addresslist
    $scope.searchList =function(){
	    	$http.post("/api/action/address/addresslist").success(function (res) {
	    	console.log(res);
	    	if(res.resultCode==0){
	    		$scope.li=res.resultData;
	    		console.log($scope.li);
	    		$scope.restForm();
	    		$(this).closest("form").fadeOut();
	    	} else{
	    	}
	    });
    };
    $scope.searchList();
    // function to submit the form after all validation has occurred			
    $scope.saveAddressSubmit = function () {

        // Set the 'submitted' flag to true
        if(!valiForm($("#saveAddressForm"))){
        	var msg_box = $('select[ng-model="selectedCity"]').next().size()>0 ? $('select[ng-model="selectedCity"]').next():$('<div class="msg-box"></div>');
				if(!$('select[ng-model="selectedCity" ]').next().size()>0){
					msg_box.appendTo($('select[ng-model="selectedCity" ]').parent());
				}
				if($scope.selectedProvince===undefined||$scope.selectedCity===undefined||$scope.selectedProvince==''||$scope.selectedCity==''||$('select[ng-model="selectedCity"]').val()==''){
					msg_box.html('<span class="icon"></span><span class="msg" style="color:rgb(255, 86, 0)">'+$('select[ng-model="selectedCity"]').attr("data-rule").split(":")[1]+'</span>');
					
					$('select[ng-model="selectedProvince"]').css("border-color","#ff5600");
					$('select[ng-model="selectedCity"]').css("border-color","#ff5600");
					
					return false;
				}else{
					msg_box.html('<span class="icon ok"></span>');
					$('select[ng-model="selectedCity"]').css("border-color","#c8d2d7");
					$('select[ng-model="selectedProvince"]').css("border-color","#c8d2d7");
					return true;
				}
            return;
        }
        $('.btn-green b-radius4').attr('disabled',true);
        var addressId=$("#addressId").val();
        if(addressId===""){
        	$http.post(
        			"/api/action/address/add"
        			,FormUtil.formSerializeObj($("#saveAddressForm"),true) //{}
        	).success(function(res){
        		$scope.searchList();
        		location.reload();
        		console.log(res);
        	});
        }else{
        	$http.post(
        			"/api/action/address/update"
        			,FormUtil.formSerializeObj($("#saveAddressForm"),true) //{}
        	).success(function(res){
        		console.log(res);
        		$scope.searchList();
        		location.reload();
        	});
        }
    };
    //显示修改地址信息
    $scope.showUpdateOrderAddress =function(obj){
    	console.log(obj);
    	$("#addressId").val(obj.addressId);
    	$("#dataVersion").val(obj.dataVersion);
    	//addressRealname
    	$("#addressRealname").val(obj.addressRealname);
    	var msg_box = $('#addressRealname').next().size()>0 ? $('#addressRealname').next():$('<div class="msg-box"></div>');
    	if(!$('#addressRealname').next().size()>0){
    		msg_box.appendTo($('#addressRealname').parent());
    	}
    	msg_box.html('<span class="icon ok"></span>');
    	$('#addressRealname').css("border-color","#c8d2d7");
    	$("#addressRealname").html('<span class="icon ok"></span>');
    	//addressPhone
    	$("#addressPhone").val(obj.addressPhone);
    	var msg_box = $('#addressPhone').next().size()>0 ? $('#addressPhone').next():$('<div class="msg-box"></div>');
    	if(!$('#addressPhone').next().size()>0){
    		msg_box.appendTo($('#addressPhone').parent());
    	}
    	msg_box.html('<span class="icon ok"></span>');
    	$('#addressPhone').css("border-color","#c8d2d7");
    	$("#addressPhone").html('<span class="icon ok"></span>');
    	//addressPostcode
    	$("#addressPostcode").val(obj.addressPostcode);
    	var msg_box = $('#addressPostcode').next().size()>0 ? $('#addressPostcode').next():$('<div class="msg-box"></div>');
    	if(!$('#addressPostcode').next().size()>0){
    		msg_box.appendTo($('#addressPostcode').parent());
    	}
    	msg_box.html('<span class="icon ok"></span>');
    	$('#addressPostcode').css("border-color","#c8d2d7");
    	$("#addressPostcode").html('<span class="icon ok"></span>');
    	//addressDetail
    	$("#addressDetail").val(obj.addressDetail);
    	var msg_box = $('#addressDetail').next().size()>0 ? $('#addressDetail').next():$('<div class="msg-box"></div>');
    	if(!$('#addressDetail').next().size()>0){
    		msg_box.appendTo($('#addressDetail').parent());
    	}
    	//addressDefault
    	$("#addressDefault").val(obj.addressDefault);
    	$("#dataVersions").val(obj.dataVersion);
    	$("#createTime").val(obj.createTime);
    	$("#citiesProvinceCode").val(obj.citiesProvinceCode);
    	$scope.selectedProvince=obj.citiesProvinceCode;
    	$scope.selectedCity = obj.citiesCityCode;
//    	var provinceCodeIndex ;
//    	for(var index in $scope.regionData){
//    		if($scope.regionData[index].citiesProvinceCode==obj.citiesProvinceCode){
//    			provinceCodeIndex=index;
//    		}
//    	}
//    	$("select[ng-model='selectedProvince']").val(provinceCodeIndex);
//    	$http.post('/api/action/areas/findAreas',{citiesProvinceCode:obj.citiesProvinceCode}).success(function (res) {
//				$scope.citys = res.resultData;
//				var citysCodeIndex ;
//				var i = 0;len = $scope.citys.length;
//				for(i;i < len; i ++){
//					if($scope.citys[i].citiesCityCode == obj.citiesCityCode){
//						$scope.regionText.selectedCityText = $scope.citys[i].text;
////				        }
//					}
//				}
//		    	
//		})
    	$('.address-dialog').fadeIn(200);
    };
  //显示修改地址信息
    $scope.showUpdateAddress =function(obj){
    	console.log(obj);
    	$("#addressId").val(obj.addressId);
    	$("#dataVersion").val(obj.dataVersion);
    	//addressRealname
    	$("#addressRealname").val(obj.addressRealname);
    	var msg_box = $('#addressRealname').next().size()>0 ? $('#addressRealname').next():$('<div class="msg-box"></div>');
    	if(!$('#addressRealname').next().size()>0){
			msg_box.appendTo($('#addressRealname').parent());
		}
		msg_box.html('<span class="icon ok"></span>');
		$('#addressRealname').css("border-color","#c8d2d7");
    	$("#addressRealname").html('<span class="icon ok"></span>');
    	//addressPhone
    	$("#addressPhone").val(obj.addressPhone);
    	var msg_box = $('#addressPhone').next().size()>0 ? $('#addressPhone').next():$('<div class="msg-box"></div>');
    	if(!$('#addressPhone').next().size()>0){
			msg_box.appendTo($('#addressPhone').parent());
		}
		msg_box.html('<span class="icon ok"></span>');
		$('#addressPhone').css("border-color","#c8d2d7");
    	$("#addressPhone").html('<span class="icon ok"></span>');
    	//addressPostcode
    	$("#addressPostcode").val(obj.addressPostcode);
    	var msg_box = $('#addressPostcode').next().size()>0 ? $('#addressPostcode').next():$('<div class="msg-box"></div>');
    	if(!$('#addressPostcode').next().size()>0){
			msg_box.appendTo($('#addressPostcode').parent());
		}
		msg_box.html('<span class="icon ok"></span>');
		$('#addressPostcode').css("border-color","#c8d2d7");
    	$("#addressPostcode").html('<span class="icon ok"></span>');
    	//addressDetail
    	$("#addressDetail").val(obj.addressDetail);
    	var msg_box = $('#addressDetail').next().size()>0 ? $('#addressDetail').next():$('<div class="msg-box"></div>');
    	if(!$('#addressDetail').next().size()>0){
			msg_box.appendTo($('#addressDetail').parent());
		}
		msg_box.html('<span class="icon ok"></span>');
		$('#addressDetail').css("border-color","#c8d2d7");
    	$("#addressDetail").html('<span class="icon ok"></span>');
    	//addressDefault
    	$("#addressDefault").val(obj.addressDefault);
    	$("#createTime").val(obj.createTime);
    	$scope.selectedProvince = obj.citiesProvinceCode
		$scope.selectedCity = obj.citiesCityCode
    };
    $scope.deleteAddress=function(obj){
		//$("#delAddress").fadeIn();
    	$.yehDialog({
            dialogWidth:445,
            title:"信息",
            content:'<p class="mt15 center" style="padding:0 20px;">您将要删除地址为['+obj.addressDetail1+']的数据,是否继续?</p>',
            okText:"确定",
            cancelText:"取消",
            ok:function(){
		        $http.post(
		        		"/api/action/address/delete/addressid"
		            ,{addressId:obj.addressId} //addressId
		        ).success(function(res){
		            $scope.searchList();
		            location.reload();
		            console.log(res);
		        });
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
    	});
    }
});



Validate.handlePass=function(flag,ele,msg){
	if($(ele).is("select")){
		return;
	}
	var msg_box = ele.next().size()>0 ? ele.next():$('<div class="msg-box" style="color:rgb(255, 86, 0)"></div>');
	if(!ele.next().size()>0){
		msg_box.appendTo(ele.parent());
	}
	if(flag){
		msg_box.html('<span class="icon ok"></span>');
		ele.css("border-color","#c8d2d7");
		return true;
	}else{
		msg_box.html('<span class="icon"></span><span class="msg" style="color:rgb(255, 86, 0)">'+msg+'</span>');

		ele.css("border-color","#ff5600");

		return false;
	}
}
