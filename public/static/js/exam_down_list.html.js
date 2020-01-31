
lanqiaoApp.controller('collegerecorderCtrl', ['$scope', '$http',function ($scope, $http) {
	 $scope.period=1;
	$scope.init=function(){
//		$scope.getPeriodSelect();
		$scope.searchList();
	}
	$scope.searchList=function(){
		$http.post($URL_LANQIAOBEIDASAI+"/api/examinationDownload/down_li").success(function (res) {
			 $scope.period=10;
		    if(res.resultCode===0){
		    	if(res.resultData.length>0){
		    		$scope.recordList=res.resultData;
		    		$("#nodata").hide();
		    		$(".hasdata").show();
		    	}
		        console.log($scope.recordList);
		    }else{
	    		$("#nodata").show();
	    		$(".hasdata").hide();
	    	}
		})
	};
	$scope.admissionCardDown=function(p,f,c,isdown){
		console.log(p)
		console.log(f)
//		if(isdown){
			location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/examinfodown/admission_scan.html?p="+p+"&f="+f+"&c="+c;
//		}else{
//			$.yehDialog({
//                dialogWidth:280,
//                title:"信息",
//                content:'<p>考前一周开启准考证下载~</p>',
//                cancelText:"确定",
//                Cancel: function() {
//                    $( this ).dialog( "close" );
//                }
//            });
//		}
		
	}
	$scope.workCardDown=function(p,f,c,isdown){
		console.log(p)
		console.log(f)
//		if(isdown){
			location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/examinfodown/work_card_scan.html?p="+p+"&f="+f+"&c="+c;
//		}else{
//			$.yehDialog({
//                dialogWidth:280,
//                title:"信息",
//                content:'<p>考前一周开启准考证下载~</p>',
//                cancelText:"确定",
//                Cancel: function() {
//                    $( this ).dialog( "close" );
//                }
//            });
//		}
		
	}
	$scope.getPeriodSelect=function(){
		$http.post($URL_LANQIAOBEIDASAI+"/api/college/award/period_select_li",{dict_type:'certificate_show_start'})
			.success(function(res){
				$scope.periodList =res.resultData;
				$scope.period=res.otherProperties.periodIdMax
			})
	}
	$scope.init();
}])