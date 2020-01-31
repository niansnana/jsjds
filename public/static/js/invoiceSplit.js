/**
 * Created by Acci on 2017/7/18.
 */

lanqiaoApp.filter('to_trusted', ['$sce', function ($sce) {
　　return function (text) {
    　　return $sce.trustAsHtml(text);
　　};
}]);
InvoiceSplit={
    isFirst:false //初始化仅执行一次
   
};
InvoiceSplit.init=function($scope){
	//$scope.unitPrice=300;//必须单价(测试)
    //订单总额
    $scope.orderTotalAmount;
    $scope.setOldInvoice=function(){
        if($scope.invoice&&!$scope.invoice.invoiceId){ //默认内容
            $.ajax({url:$URL_ORDER+"/api/order/invoice/last_info",
                type:"POST",
                data:{accountId:currentUser.accountId},
                success:function(res){
                    if(res.succeed){
                        AcciRef.copyExistsProperty(res.data,$scope.invoice);
                        $scope.$apply();
                        showDialog($("#invoiceDialog"));
                    }
                }
            });
        }else if($scope.invoice&&$scope.invoice.invoiceId){ //默认内容
        	 $.ajax({url:$URL_LANQIAOBEIDASAI + "/api/dic/team/flow/getObjectByOrderId", 
        		 data:{orderId:$scope.invoice.orderId,orderType:$scope.orderType}, 
        		 type:"POST",
        		 success:function(res1){
        	 
        		 if (res1.resultCode === 0) {                     
                     window.itemCosts[res1.otherProperties.orderId]=res1.resultData?res1.resultData.itemCost:null;
                     $scope.unitPrice=window.itemCosts[$scope.invoice.orderId];
                     
                     $.ajax({url:$URL_ORDER+"/api/order/invoice/byorder",
                         type:"POST",
                         data:{orderId:$scope.invoice.orderId},
                         success:function(res){
                             if(res.succeed){
                            	 
                                 AcciRef.copyExistsProperty(res.data[0],$scope.invoice);
                                 var invoiceSplitsStr=$scope.invoice.invoiceAmountStr;
                                 var invoiceSplitsArr=invoiceSplitsStr.split(",");
                                 var invoiceSplits=[];
                                 for(var i in invoiceSplitsArr){
                                 	invoiceSplits.push({
                                 		value:invoiceSplitsArr[i]
                                 		,desc:"(单价 <font color=#33ba9b >"+$scope.unitPrice+"</font> 数量  <font color=#33ba9b >"+parseInt(invoiceSplitsArr[i]/$scope.unitPrice)+"</font>)"
                                 	});
                                 }
                                 
                                 if(invoiceSplits.length>1){
                                 	$scope.invoiceSplits=invoiceSplits;
                                 	$scope.refreshSplitAdd();
                                 	$("#invoiceSpliter").show();                                 	
                                 }
                                 $scope.$apply();
                                 delete $scope.invoice.lastModifiedTime;
                                 delete $scope.invoice.createTime;
                                 delete $scope.invoice.orderPayTime;
                                 delete $scope.invoice.invoiceAmountStr;
                                 delete $scope.invoice.orderPayTimeStr;
                                 delete $scope.invoice.createTimeStr;
                                 delete $scope.invoice.taxFlag;
                                 delete $scope.invoice.taxRate;
                                 delete $scope.invoice.goodsCode;
                                 delete $scope.invoice.selfCode;
                                 
                                 showDialog($("#invoiceDialog"));
                             }
                         }
                     });
                 }
        	 }});
                 
              
            
        }
    }
    $scope.createInvoice=function(){
        if(InvoiceSplit.isFirst) return;
        InvoiceSplit.isFirst=true;  //初始化仅执行一次
        $scope.lanqiaoInvoice={};
        $scope.invoice=$scope.lanqiaoInvoice;
        $scope.setOldInvoice();
    };
    $scope.setOldInvoice();
    //要拆分发票
    $scope.splitInvoice=function(){
        if($scope.invoiceSplits) return;        
        $scope.invoiceSplits=[{value:$scope.orderTotalAmount}];//拆分数组
        $scope.refreshSplitAdd();
        $scope.isInvoiceSplit=1;
        $("#invoiceSpliter").show();
    }
    //不拆分了
    $scope.unsplit=function(){
    	 if(!$scope.invoiceSplits) return;
    	 $scope.invoiceSplits=null;
    	 $scope.isInvoiceSplit=0;
    	 $("#invoiceSpliter").hide();
    }
    //改变发票拆分项
    $scope.changeSplitBlock=function(isAdd,index){
        var valueSum=$scope.splitBlockAllValue();
        if(isAdd){ //增加
        	var reg = /^\d+(?=\.{0,1}\d{0,2}$|$)/  ;            
        	for(var i in $scope.invoiceSplits){
                if(!reg.test($scope.invoiceSplits[i].value)){
                	showAlert(0,"输入金额不正确");
                	return;
                }
                if($scope.invoiceSplits[i].value<1){
                    showAlert(0,"输入金额应大于1");
                    return false;
                }
            }
            var surplus=$scope.orderTotalAmount-valueSum;
            if(surplus<=0){
                showAlert(0,"已经达到最大金额");
                return;
            }
            if($scope.invoiceSplits.length>=10){
                showAlert(0,"最多只能拆分10张");
                return;
            }
            if(!$scope.isUnit()){
            	return;
            }
            var preSpl=$scope.invoiceSplits[$scope.invoiceSplits.length-1].value; //前一条数据
            preSpl=preSpl<surplus?preSpl:surplus;
            $scope.invoiceSplits.push({value:preSpl});
        }else{//减少
            $scope.invoiceSplits.splice(index,1);
        }
        $scope.refreshSplitAdd();
    }
    //发票拆分项总额
    $scope.splitBlockAllValue=function(){
        var valueSum = 0;
        for(var i in $scope.invoiceSplits){
            valueSum+=parseFloat($scope.invoiceSplits[i].value)||0;
        }
        return valueSum;
    }
    //是否是单价的整数倍
    $scope.isUnit=function(notShowMsg){
    	if(!$scope.unitPrice){ //如果没有单价强制定义 则直接返回
    		return true;
    	}
    	var flag=true;
    	for(var i in $scope.invoiceSplits){
            var value=parseFloat($scope.invoiceSplits[i].value)||0;
            if(value!=0){
            	if(value%$scope.unitPrice!=0){
            		flag=false;
            		if(!notShowMsg)
            			showAlert(0,"金额应为单价的整数倍");
            	}else{
            		$scope.invoiceSplits[i].desc="(单价 <font color=#33ba9b >"+$scope.unitPrice+"</font> 数量  <font color=#33ba9b >"+parseInt(value/$scope.unitPrice)+"</font>)";
            	}
            }
        }
    	return flag;
    }
    //检查拆分总值是否溢出.
    $scope.checkSplitValueOverFlow=function(val){
        var reg = /^\d+(?=\.{0,1}\d{0,2}$|$)/  ;
        if(!reg.test(val)) {
            showAlert(0,"输入金额不正确");
            return false;
        }
        if(val<1){
            showAlert(0,"输入金额应大于1");
            return false;
        }
        var valueSum=$scope.splitBlockAllValue();
        $scope.refreshSplitAdd(valueSum,true);
        if($scope.unitPrice){//如果有单价限制
        	if(!$scope.isUnit(true)){
        		return;
        	}
        }
        if(valueSum > $scope.orderTotalAmount){
            showAlert(0,"拆分发票总额大于订单总额");
            return true;
        }else{
            return false;
        }
    }
    //重置加号是否显示
    $scope.refreshSplitAdd=function(valueSum,notShowMsg){
        if(!valueSum){
            valueSum=$scope.splitBlockAllValue();
        }
        if(valueSum >= $scope.orderTotalAmount){
            $scope.splitAddBtnFlag=false;
        }else{
            $scope.splitAddBtnFlag=true;
        }
        if($scope.invoiceSplits.length==1){
        	$scope.canUnsplit=true;
        }else{
        	$scope.canUnsplit=false;
        }
        $scope.isUnit(notShowMsg);
    }
}