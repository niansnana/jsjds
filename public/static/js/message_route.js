
lanqiaoControllers.controller('MessageListCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $scope.act1="act";
        $scope.messageStatus=0;
        $scope.toggle = function(type) {
            //$(".nav-tab-a.clearfix li").removeClass("act");
            this.act1=type==0?"act":"";
            this.act2=type==1?"act":"";
            $scope.searchList(1,type);
        }

//        $http.post(
//            $URL_ACCOUNT + "/api/message/unreadcount"
//        ).success(function (res) {
//            console.log(res);
//            if (res.resultCode === 0) {
//                $scope.unreadcount = res.resultData;
//            }
//        });
        $scope.pageNo="";
        $scope.pageLength="";
        //$scope.pages=[];
        //$scope.search="";
        //查找数据
        $scope.searchList=function(pn){
            //getLoadLayer($(".listBlock"));

            pn=pn||1;

            $http.post(
                "/api/message/showmessagelist"
                ,{pageNo:pn,pageLength:$scope.pageLength,messageStatus:$scope.messageStatus}
                //,FormUtil.formSerializeObj($("#messageform"),true) //{pageNo:$scope.pageNo,rows:$scope.rows,search:$scope.search}
            ).success(function(res){

                if(res.resultCode===0){

                    $scope.li=res.resultData.accountMessageList;
                    //$listScope.$apply();
                    if(!res.resultData.accountMessageList||res.resultData.accountMessageList.length==0){
                        $(".listBlock").hide();
                        $("#noneblock").show();
                    }else{
                        $(".listBlock").show();
                        $("#noneblock").hide();
                    }
                    //
                    $scope.unreadCount = res.resultData.unreadCount;
                    $scope.allCount = res.resultData.allCount;
                    
                    //
                    $scope.page=res.resultData.page;
                    $scope.pageCount=$scope.page.pageCount;
                    $scope.pageLength=$scope.page.length;
                    $scope.pageNo=$scope.page.pageNo;
                    acciPage(".pagination", $scope.searchList,$scope.pageCount,$scope.pageNo);
                   
                }


                    //removeLoadLayer($(".listBlock"));
            });

        }
        $scope.changeStatusSearch=function(mStatus){
        	$scope.messageStatus=mStatus;
        	$scope.searchList();
        }
        //更新数据
        $scope.updateMessage=function(obj){
            if(obj.messageStatus==1){
                $http.post(
                    "/api/message/updatemessage"
                    ,{messageId:obj.messageId,messageStatus:2}
                ).success(function(res){
                    $http.post(
                        $URL_ACCOUNT + "/api/message/unreadcount"
                    ).success(function (res) {
                        if (res.resultCode === 0) {
                            $scope.unreadcount = res.resultData;
                        }
                        console.log(res);
                    });
                    $scope.searchList();
                    console.log(res);
                    //$scope.searchUnreadList();
                });

                //$scope.searchList();
            }

        }
        //查找数据并将页数置为1
        //$scope.searchListNew=function(){
        //    $scope.pageCount="";
        //    $scope.pageNo="";//置空为了让pagination监听到
        //    $scope.searchAllList();
        //}
        //查找数据并将页数置为1
        //$scope.searchListNew=function(){
        //    $scope.pageCount="";
        //    $scope.pageNo="";//置空为了让pagination监听到
        //    $scope.searchUnreadList();
        //}
        $scope.searchList();
        //$scope.searchUnreadList();
//        $scope.$watch("page", function(newVal){
//            console.log("newVal:"+newVal);
//            $scope.seach();
//        });

        $scope.delMsg=function(){
        	var sli=getSelectedcbox();
        	console.log("sli",sli);
        	if(!sli||sli.length==0){
        		showAlert(0,"您还没有选择消息");
        		return;
        	}
        	$.yehDialog({
                dialogWidth:445,
                title:"信息",
                content:'<p>是否删除已经选择到的消息?</p>',
                okText:"确定",
                cancelText:"取消",              
                ok:function(){
                	$http.post(
                            "/api/message/delemsg"
                            ,{messageIds:sli}
                        ).success(function(res){
                           
                            $scope.searchList();
                            
                        });
                },
                cancel: function() {
                    $( this ).dialog( "close" );
                }
            });
        	
        }
        
        $scope.readAll=function(){
        	$http.post(
                    "/api/message/readAll"                    
                ).success(function(res){
                	$scope.messageStatus=0;
                    $scope.searchList();                 
                });        	
        }
        
    }
                                  
]);

$(function(){
	//checbox
	
	$("#mbxc").on("click","input[type='checkbox']",function() {
		
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
			$(this).parents(".newsBox").toggleClass("sel_newsBox");
		}	
		
	});
});
function checkAll(){
	idSelected = $("#checkAll").is(":checked");
	if(idSelected){
		$(".checkbox").addClass("active");
		$(":checkbox").prop("checked", "checked");
		$(".newsBox").addClass("sel_newsBox");
	}else{
		$(".checkbox").removeClass("active");
		$(":checkbox").removeAttr("checked");
		$(".newsBox").removeClass("sel_newsBox");
	}
}
function getSelectedcbox(){
	var smsgIds="";
	$(":checkbox[name='messageId']:checked").each(function(){
		smsgIds+=$(this).val()+",";
	});
	
	if(smsgIds.substring(smsgIds.length-1)==","){
		smsgIds=smsgIds.substring(0,smsgIds.length-1);
	}
	return smsgIds;
}
                                                   
