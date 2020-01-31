lanqiaoApp.controller("teamAwardsRecordListCtrl",['$scope', '$http','$timeout',function($scope, $http,$timeout){
	$scope.pageLength="";
	$scope.search="";
	$scope.pageNo="";
	 $scope.mname='';
	$scope.searchData=[]
	$scope.searchData.periodIds=[]
    $scope.searchData.matchFlowIds=[]
    $scope.searchData.matchCategoryIds=[]
	$scope.lanqiaobeiPeriodList=[];
	$scope.searchList=function(pno) {
	        if(!pno){
	        	pno=1;
	        }else {
	        }
	        $scope.searchData.page={pageNo:pno};
	        $scope.searchData.periodIds[0]=getUrlParamByKey("p");
	        $scope.searchData.matchFlowIds[0]=getUrlParamByKey("f");
	        $scope.searchData.matchCategoryIds[0]=getUrlParamByKey("c");
	        $scope.mname= Dict.Period[$scope.searchData.periodIds[0]]+Dict.Category[$scope.searchData.matchCategoryIds[0]]+Dict.Flow[$scope.searchData.matchFlowIds[0]];
	        $http.post($URL_LANQIAOBEIDASAI+"/api/forward/teamAwardsRecord/findAll",FormUtil.Json2UrlParam( $scope.searchData)).success(function(res) {
	            if (res.resultCode === 0) {
	    			console.log(res);
	    			//console.log($scope.otherProperties.count);
	    			$scope.teamAwardsRecordList=res.resultData.list;
	                $scope.page=res.otherProperties.page;
	                $scope.count=$scope.page.totalRecords;
	                $scope.totalRecords=$scope.page.totalRecords;
	                $scope.pageCount=$scope.page.pageCount;
	                $scope.pageNo=$scope.page.pageNo;
	                $scope.pageLength=$scope.page.length;
	                $timeout(function(){
	                    acciPage(".pagination", $scope.searchList,$scope.pageCount,$scope.pageNo); //分页
	                },200);
	            }
	               
	        });
	    };
	    
	    $scope.pageNo="";
	    $scope.pageLength="";
	    $scope.search="";
		 //查找数据并将页数置为1
	    $scope.searchListNew=function(){
	        $scope.pageCount="";
	        $scope.pageNo="";//置空为了让pagination监听到
	        $scope.searchList();
	    }
	    $scope.onenter=function(e){
	        var keycode = window.event?e.keyCode:e.which;
	        if(keycode==13){
	            $scope.searchListNew();
	        }
	    };
	    $scope.searchList();
	    //pdf文件导出
	    $scope.teamAwardsRecordListExportPDF=function(){
	    	if( $scope.totalRecords>0){
	    		var url=$URL_LANQIAOBEIDASAI+"/api/forward/teamAwardsRecord/TeamAwardsRecordsPdfExport"//跳转路径
	    		console.log(url);
	    		$.fileDownload(url,{
	    			httpMethod:"POST",
	    			data:FormUtil.Json2UrlParam($scope.searchData),
	    			successCallback:function(url){},
	    			failCallback:function(html,url){
	    				console.log(html);
	    				alert("导出失败，未知的异常。");
	    			}
	    		})
	    	}else{
	    		showAlert(0,"暂无数据");
	    	}
	    }
}])
var leftbar_dasai_show_timer;
$(function(){
    $("#allteamAwardsView").on("click",".sel-block a",function(){
        var name=$(this).attr("name");
        var selectedIds="";
        var $p= $(this).parents(".sel-block:first");
        if($(this).is("[all]")){//如果是点的全部
            $p.find("a").removeClass("active");
            $(this).addClass("active");
        }else {
            if( $(this).is(".active")) {
                $(this).removeClass("active");
            }else{
                $(this).addClass("active");
            }
            //如果是全选
            if($p.find("a.active").not("[all]").length==$p.find("a").not("[all]").length){
                $p.find("a[all]").addClass("active");
            }else{
                $p.find("a[all]").removeClass("active");
                selectedIds=[];
                $.each($p.find("a.active").not("[all]"),function(i,ele){
                    selectedIds.push($(ele).attr("data-val"));
                });
            }
            //如果全部清空了,也当作是全选吧
            if($p.find("a.active").not("[all]").length==0){
                $p.find("a[all]").addClass("active");
            }
        }

        var $scope=$("#teanAwardslistdiv").scope();
        if(!$scope){
            console.error("$scope not found when setting searchData");
            return;
        }
        if(!$scope.searchData){
        	$scope.searchData={};
        }
        $scope.searchData[name]=selectedIds;
        $scope.searchList();
    });
})
