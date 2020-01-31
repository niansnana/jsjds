lanqiaoApp.controller('collegerecorderCtrl', ['$scope', '$http',function ($scope, $http) {
	 $scope.period=new Object();
	$scope.init=function(){
		$scope.getPeriodSelect();
		$scope.searchList();
	}
	$scope.searchList=function(){
		$http.post($URL_LANQIAOBEIDASAI+"/api/certificateApplyRecord/certificate_li",{periodId: $scope.period}).success(function (res) {
		    if(res.resultCode===0){
		    	if(res.resultData.length>0){
		    		$scope.recordList=res.resultData;
		    		$("#nodata").hide();
		    		$("#hasdata").show();
		    	}else{
		    		$("#nodata").show();
		    		$("#hasdata").hide();
		    	}
		        
		        console.log($scope.recordList);
		    }
		})
	};
	$scope.getPeriodSelect=function(){
		$http.post($URL_LANQIAOBEIDASAI+"/api/college/award/period_select_li",{dict_type:'certificate_show_start'})
			.success(function(res){
				$scope.periodList =res.resultData;
				$scope.period=res.otherProperties.periodIdMax
			})
	}
	$scope.init();
}])