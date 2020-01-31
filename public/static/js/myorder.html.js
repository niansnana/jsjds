lanqiaoApp.controller('orderListCtrl', ['$scope', '$http',function ($scope, $http) {
	$scope.init=function(){
		 $http.post(
           $URL_LANQIAOBEIDASAI+"/api/action/timeaxis/personalProvinceApply").success(function(res){
           		$scope.data = res.resultData;
           		console.log($scope.data);
             $http.post('/api/action/account/current/user').success(function (res) {
                 if(res.resultCode===0){
                     $scope.accountLoginDTO=res.resultData;
                     if($scope.accountLoginDTO!=null||$scope.accountLoginDTO!=undefined){
                    	 // $scope.accountLoginDTO.identityId===2&&($scope.accountLoginDTO.accountMobile==null||$scope.accountLoginDTO.accountMobile=='null')
                         if($scope.accountLoginDTO.identityId===1){
                             $("#tipInfo").text('您可以报名参加'+$scope.data.lqmfp[0].periodTitle);
                             $("#tipBtn").text('前往报名');
                             $("#tipBtn").attr('href','/pages/dasai/index.html');
                         }else{
                             $("#tipInfo").text('您可以前往大赛管理对已报名的学生进行筛选报名');
                             $("#tipBtn").text('前往管理');
                             $("#tipBtn").attr('href','/pages/dasai/college_allstu.html');
                         }
                     }
                 }
             })
             $scope.searchList();

		});
	 }
    window.iniScope=$scope;
    window.iniTimer=setInterval(function () {
        if(window.currentUser){
            clearInterval(window.iniTimer);
            window.iniScope.init();
        }
    },100);
    $scope.searchList=function() {
        $scope.pageNo="";
        $http.post($URL_ORDER + "/api/order/my/list").success(function (res) {
            if (res.resultCode === 0) {
                $scope.orderList = res.resultData;
                if($scope.orderList.length>0){
                    for(var i in $scope.orderList){
                        //订单状态
                        showOrderStatus($scope,$scope.orderList[i].orderStatus,"orderList."+i+".orderStatus");
                        $scope.orderList[i].lastModifiedTimeStr=showTimeStr($scope.orderList[i].lastModifiedTime);
                        $scope.orderList[i].createTimeStr=showTimeStr($scope.orderList[i].createTime);
                        if( $scope.orderList[i].orderStatus==1) {
                            $http.post($URL_LANQIAOBEIDASAI + "/api/dic/team/flow/getObjectByOrderId", {orderId: $scope.orderList[i].orderId,orderType:$scope.orderList[i].orderType}).success(function (res1) {
                                if (res1.resultCode === 0) {
                                	console.log(res);
                                	var orderId=res1.otherProperties.orderId;
                                	var payControl=res1.otherProperties.payControl;
                                	var orderObj=null;
                                	for(var k in $scope.orderList){
                                		if($scope.orderList[k].orderId==orderId){
                                			orderObj=$scope.orderList[k];
                                			break;
                                		}
                                	}
                                	if(orderObj){
                                		orderObj.canPay = payControl;
                                		
//	                                    if(res1.resultData&&res1.resultData.itemPayEndDate) {
//	                                    	orderObj.canPay = new Date(res1.resultData.itemPayEndDate.replace(/-/g, '/')).getTime() > new Date().getTime();
//	                                    }else{
//	                                    	orderObj.canPay = true;
//	                                    }
                                	}
                                 
                                }
                            });
                        }
                    }
                    setTimeout(function(){
                        $("#orderListtrue").fadeOut();
                        $("#orderList").fadeIn();
                    },200);

                }else{
                    setTimeout(function(){
                        $("#orderListtrue").fadeIn(200);
                        $("#orderList").fadeOut(200);
                    },200);

                }
                $scope.page = res.otherProperties.page;
                $scope.pageNo = $scope.page.pageNo;
            }
        });
        $scope.payEndTimes=[];

    }


    $scope.toPay=function(order){
        console.log(order);
        var $payScope=$("#payform").scope();
        $payScope.order=order;
        try {
            $payScope.$apply();
        }catch(e){
            console.log(e);
        }
        $("#payform").submit();
    }

    $scope.delOrder=function(orderId){
        //取消订单
        $.yehDialog({
            dialogWidth:445,
            title:"取消订单",
            content:'<p class="center h5">是否取消订单？</p>',
            okText: '是',// 确定按钮文字
            cancelText: '否',// 取消按钮文字
            ok:function(){
               // $http.post($URL_ORDER + "/api/order/my/del",{orderId:orderId}).success(function(res){
            	 $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/my/del",{orderId:orderId}).success(function(res){
                     if(res.resultCode===0){
                         $scope.searchList();
                         $scope.init();
                     }else{
                         showAlert(0,res.resultMsg);
                     }

                });
            }
        });
    }
    $scope.toInvoice=function(order){
        $scope.invoice={};
        $scope.invoice.itemCost=order.orderTotalAmount;
        $scope.invoice.orderId=order.orderId;
        $scope.invoice.invoiceConfigId=1;
        $scope.invoice.invoiceConfig="报名费";
        $scope.invoice.invoiceConfigDataVersion=1;
        showDialog($("#invoiceDialog"));
    }
    $scope.addInvoice=function(){
        if(!$scope.invoice.invoiceTitle){
            Validate.handlePass(false,$("#invoiceTitle"),"请填写发票抬头");
            return;
        }else{
            Validate.handlePass(true,$("#invoiceTitle"));
        }
        if(!$scope.invoice||!$scope.invoice.invoiceTitle||!$scope.invoice.orderId){
            showAlert(0,"信息不完整");
            return;
        }
        $http.post($URL_ORDER+"/api/order/invoice/add",$scope.invoice).success(function(res){
            if(res.resultCode===0){
                showAlert(1,"添加成功");
                location.reload();
            }else{
                console.log(res);
            }
        });
    }
}]);

$(function(){
    //付款地址
    $("#payform").attr("action",$URL_THIRDINTERFACE+"/api/action/alipay/directPay");
//    $("#orderblank").attr("class",$scope.data.orderture);
//    $("#orderList").attr("class",$scope.data.orderfalse);
    
});
var userTimer=setInterval(function(){
    if(window.currentUser){
        clearInterval(userTimer);
        if(window.currentUser.identityId==2){
            location="/pages/dasai/order/teacher_order.html";
        }else if(window.currentUser.identityId!=1){
            location="/pages/dasai/index.html";
        }
    }
},100);