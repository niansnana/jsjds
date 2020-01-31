

 lanqiaoApp.controller('recordPersonListCtrl', ['$scope', '$http','$timeout',function ($scope, $http, $timeout, $routeParams) {
	$scope.pageLength=10;
    $scope.search="";
    $scope.pageNo="";
    $scope.mname="";
    $scope.searchData=new Object();
    $scope.lanqiaobeiPeriodList=[];
    $scope.searchData.periodIds=[]
    $scope.searchData.matchFlowIds=[]
    $scope.searchData.matchCategoryIds=[]
    $scope.getRecordList=function(pno){
        if(!pno){
            pno=1;
        }else { }
        $scope.searchData.page={pageNo:pno};
        $scope.searchData.periodIds[0]=getUrlParamByKey("p");
        $scope.searchData.matchFlowIds[0]=getUrlParamByKey("f");
        $scope.searchData.matchCategoryIds[0]=getUrlParamByKey("c");
        $scope.mname= Dict.Period[$scope.searchData.periodIds[0]]+"蓝桥杯"+Dict.Category[$scope.searchData.matchCategoryIds[0]]+Dict.Flow[$scope.searchData.matchFlowIds[0]]
	   $http.post($URL_LANQIAOBEIDASAI + "/api/record/personal/li"
	   	 , FormUtil.Json2UrlParam( $scope.searchData
	   	)).success(function (res) {
	        if (res.resultCode === 0) {
	            $scope.personlist = res.resultData;
                $scope.page=res.otherProperties.page;
                $scope.count=$scope.page.totalRecords;
                $scope.totalRecords=$scope.page.totalRecords;
                $scope.pageCount=$scope.page.pageCount;
                $scope.pageNo=$scope.page.pageNo;
                $scope.pageLength=$scope.page.length;
                $timeout(function(){
                    acciPage(".pagination", $scope.getRecordList,$scope.pageCount,$scope.pageNo); //分页
                },200);
	        }
            // console.log($(".pagination").html())
	        console.log(res);
	    });
    }


     $scope.personalAwardsRecordListExportPDF=function(){
            if( $scope.totalRecords>0){
                var url=$URL_LANQIAOBEIDASAI+"/api/record/personalAwardsRecordsPdfExport"
                console.log(url);
                $.fileDownload(url,{
                    httpMethod:"POST",
                    data:FormUtil.Json2UrlParam($scope.searchData),
                    successCallback:function(url){},
                    failCallback:function(html,url){
                        console.log(html);
                        console.log("导出失败，未知的异常。");
                    }
                })
            }else{
                showAlert(0,"暂无数据");
            }
        }
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
    $scope.getRecordList();
 }]);


var leftbar_dasai_show_timer;

$(function(){
	 $("img.more").click(function(){
        var isShow = parseInt($(this).data("isshow"));
        if(isShow == 0){
            $(this).prev().css("height","auto");
            $(this).data("isshow","1");
        }else{
            $(this).prev().css("height","52px");
            $(this).data("isshow","0");
        }
    });

	 leftbar_dasai_show_timer=setInterval(function(){
        if($("#leftbar_awardsrecord:visible").length==0){
            return;
        }
        clearInterval(leftbar_dasai_show_timer);
        $("#di1").addClass("act");
        $("#leftbar_awardsrecord ul").show();
    },100);


	 $("#recordlistView").on("click",".sel-block a",function(){

        var name=$(this).attr("name");
        var selectedIds="";
        var $p= $(this).parents(".sel-block:first");
        if($(this).is("[all]")){//如果是点的全部

            $p.find("a").removeClass("active");
            $(this).addClass("active");
        }else {
        	//改为单选,新增此段
        	$p.find("a").removeClass("active");
        	$(this).addClass("active");
        	selectedIds=[];
            selectedIds.push($(this).attr("data-val"));
        	
            /**  改为单选,此段禁用
            if( $(this).is(".active")) {
                $(this).removeClass("active");
            }else{
                $(this).addClass("active");
            }
            //如果是全选
            if($p.find("a.active").not("[all]").length==$p.find("a").not("[all]").length){
                if ($p.find("a").not("[all]").length==1) {
                    selectedIds=[];
                    $.each($p.find("a.active").not("[all]"),function(i,ele){

                        selectedIds.push($(ele).attr("data-val"));
                    });
                }else{
                    $p.find("a[all]").addClass("active");
                }
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
            */
        }

        var $scope=$("#stulistdiv").scope();
        if(!$scope){
            console.error("$scope not found when setting searchData");
            return;
        }

        // alert(name);
        var i='flag'
        $scope.searchData[name]=selectedIds;
         $scope.searchData[i]=0;
        if ($scope.searchData['periodIds']=='') {
            $scope.searchData[i]=2;
        }else if ($scope.searchData['periodIds']!=''){
            $scope.searchData[i]=1;
        }else{

        }
        $scope.getRecordList();
    });


	$("body").on("click","input[type='checkbox']",function() {
        var size = $("input[type='checkbox']").not("#checkAll").length;
        var checkSize = $("input[type='checkbox']:checked").not("#checkAll").length;
        if (size == checkSize) {
            $("#checkAll").parent().addClass("active");
        } else {
            $("#checkAll").parent().removeClass("active");
        }

        if($(this).attr("id") === "checkAll"){
            checkAll();
        }else{
            $(this).parent().toggleClass("active");
        }

    });

});



