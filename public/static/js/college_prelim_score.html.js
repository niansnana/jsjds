
lanqiaoApp.controller('prelimListAppCtrl', ['$scope', '$http',function ($scope, $http) {
	$scope.period=getUrlParamByKey("p");;

	$scope.searchList=function(){
		$http.post($URL_LANQIAOBEIDASAI+"/api/prelim/match/list",{periodId:$scope.period}).success(function (res) {
		    if(res.resultCode===0){
		    	if(res.resultData.length>0){
		    		$scope.recordList=res.resultData;
		    	}else{
		    	}
		        console.log($scope.recordList);
		    }
		})
	};
	$scope.searchList();
	$scope.checkScore=function(prelimMatchId){
		console.log(prelimMatchId)
		location.href = $URL_LANQIAOBEIDASAI+"/pages/dasai/college_awards_recorder/college_prelim_score_list.html?pmid="+prelimMatchId;
	}
}])




















