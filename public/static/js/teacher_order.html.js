var status;
status=getUrlParamByKey("status");
if(!status||status=="null"){
    status="";
}
$(function(){
    if(status==""){
        $("#toptab li[data-val='0']").addClass("act");
    }else if(status==1){
        $("#toptab li[data-val='1']").addClass("act");
    }else{
        $("#toptab li[data-val='2']").addClass("act");
    }
})
var userTimer=setInterval(function(){
    if(window.currentUser){
        clearInterval(userTimer);
        if(window.currentUser.identityId!=2){
            location="/pages/dasai/index.html";
        }
    }
},100);


lanqiaoApp.controller('orderListCtrl', ['$scope', '$http',function ($scope, $http) {
    $scope.searchList=function(pno) {
        if(!pno){
            pno=1;
        }
        $scope.pageNo=pno;
        $http.post($URL_ORDER + "/api/order/my/list",{pageNo:$scope.pageNo,orderStatus:status}).success(function (res) {
            console.log(res);
            if (res.resultCode === 0) {

                $scope.orderList = res.resultData;
                for(var i in $scope.orderList){
                    //订单状态
                    showOrderStatus($scope,$scope.orderList[i].orderStatus,"orderList."+i+".orderStatus");
                    $scope.orderList[i].lastModifiedTimeStr=showTimeStr($scope.orderList[i].lastModifiedTime);
                    $scope.orderList[i].createTimeStr=showTimeStr($scope.orderList[i].createTime);
                    window.itemCosts={};
                    if( $scope.orderList[i].orderStatus==1 || $scope.orderList[i].orderStatus==3 || $scope.orderList[i].orderStatus==4) {
                        $http.post($URL_LANQIAOBEIDASAI + "/api/dic/team/flow/getObjectByOrderId", {orderId: $scope.orderList[i].orderId,orderType: $scope.orderList[i].orderType}).success(function (res1) {
                            if (res1.resultCode === 0) {
                                console.log(res1);
                                window.itemCosts[res1.otherProperties.orderId]=res1.resultData?res1.resultData.itemCost:null;
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
                            	}
                                
                                /* if(res1.resultData&&res1.resultData.itemPayEndDate) {
                                    $scope.orderList[i].canPay = new Date(res1.resultData.itemPayEndDate.replace(/-/g, '/')).getTime() > new Date().getTime();
                                }else{
                                    $scope.orderList[i].canPay = true;
                                }*/

                            }
                        });
                   }
                }
                $scope.page = res.otherProperties.page;
                $scope.pageNo = $scope.page.pageNo;
                setTimeout( function(){
                	acciPage(".pagination", $scope.searchList,$scope.page.pageCount,$scope.pageNo);	
                },200)
                
            }
        });
        window.scrollTo(0,0);
    }
    
    $scope.searchList();
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
            	 $http.post($URL_LANQIAOBEIDASAI + "/api/matchApply/my/delCollegeOrTeamOrder",{orderId:orderId}).success(function(res){
                     if(res.resultCode===0) {
                         $scope.searchList();
                         $scope.init();
                         showAlert(1,"取消成功!");
                     }
                });
            }
        });
    }

    $scope.toInvoice=function(order){
        var cacheKey="invoiceEditing_"+order.orderId;
        getCache(cacheKey,function(res){
            if(res.data&&res.data!=currentUser.accountId){
                showAlert(0,"其它用户正在对该凭证进行操作，请稍后~");
                return ;
            }else{
                setCache(cacheKey,currentUser.accountId+"",300);
                //$scope.findInvoiceItemCost(order.orderId,order.orderType);
                if(!$scope.invoiceInited){
                    initFormRule("#invoiceForm");
                }
                
                
                $scope.invoiceInited=true;

                $scope.invoice={};
                $scope.invoice.itemCost= order.orderTotalAmount;
                $scope.orderType=order.orderType;
                $scope.invoiceSplits=null;
                $("#invoiceSpliter").hide();
                var invoiceCfg=invoiceConfigsByOrderType[order.orderType];
                if(invoiceCfg) {
                    $scope.invoice.invoiceConfigId = invoiceCfg.id;
                    $scope.invoice.invoiceConfig = invoiceCfg.config;
                }
                try {
                    $scope.$apply();
                }catch(e){
                    console.log(e);
                }
                $scope.invoice.orderId=order.orderId;
                $scope.invoice.invoiceId=order.invoiceId;
                if(order.orderType==4){ //证书为考试管理费
                    $scope.invoice.invoiceConfigId = 5;
                    $scope.invoice.invoiceConfig = "考试管理费";
                }else {
                    $scope.invoice.invoiceConfigId = 1;
                    $scope.invoice.invoiceConfig = "报名费";
                }
                $scope.invoice.invoiceConfigDataVersion=1;
                $scope.invoice.invoiceType=2;//电子发票
                $scope.orderTotalAmount=order.orderTotalAmount; //发票拆分必须条件


                InvoiceSplit.init($scope); //发票拆分组件
                //showDialog($("#invoiceDialog"));
            }
        })


    }
    
    $scope.addInvoice=function(){
        
        if(!$scope.invoice||!$scope.invoice.invoiceTitle||!$scope.invoice.orderId){
            showAlert(0,"信息不完整");
            return;
        }
        var isVali=true;
        $("#invoiceSpliter .splinp").each(function(index,ele){
            if(!Validate.moneyps($(ele))){
                isVali=false;
            }
        });
        if(!isVali){
            showAlert(0,"发票拆分金额填写不正确");
            return false;
        }
        if($scope.isInvoiceSplit) {
            var valueSum = $scope.splitBlockAllValue();
            if (valueSum > $scope.orderTotalAmount) {
                showAlert(0, "发票拆分总金额过大(订单金额: " + $scope.orderTotalAmount + " , 发票拆分总金额: " + valueSum + ")", 5000);
                return false;
            }
            if (Math.abs(valueSum - $scope.orderTotalAmount) > 0.001) {
                showAlert(0, "发票拆分总金额不足(订单金额: " + $scope.orderTotalAmount + " , 发票拆分总金额: " + valueSum + ")", 5000);
                return false;
            }
        }
        if(!valiForm($("#invoiceForm"))){
            return;
        }
        if(!$scope.isUnit()){
        	return;
        }
        var totalAmountSplits=[];//获取拆分发票
        for(var i in $scope.invoiceSplits){
            totalAmountSplits[i]= $scope.invoiceSplits[i].value;
        }
        if(totalAmountSplits.length>0) {
            $scope.invoice.totalAmountSplits = totalAmountSplits;
        }
        $scope.invoice.price=$scope.unitPrice;
        $scope.invoice.isSplit=$scope.isInvoiceSplit||0;//是否拆分
        var saveurl=$URL_ORDER+"/api/order/invoice/add";
        if($scope.invoice.invoiceId){
        	saveurl=$URL_ORDER+"/api/order/invoice/save";
        }
        $http.post(saveurl, $scope.invoice).success(function(res){
            if(res.resultCode===0||res.code===0){
                showAlert(1,"保存成功");
                location.reload();
            }else{
                console.log(res);
            }
        });
    }
}]);

$(function(){
    //付款地址
    $("#payform").attr("action","/pages/dasai/pay_b2b_channel.html");
//    $("#orderblank").attr("class",$scope.data.orderture);
//    $("#orderList").attr("class",$scope.data.orderfalse);
    
});
