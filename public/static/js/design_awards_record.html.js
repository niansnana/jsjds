/**
 * Created by JZ on 2017/5/26.
 */
var periodId;
periodId=getUrlParamByKey("p");
var matchFlowId;
matchFlowId=getUrlParamByKey("f");


lanqiaoApp.controller("designAwardsRecordListCtrl",['$scope', '$http','$timeout',function($scope, $http,$timeout){
    if(!periodId){
        periodId=Dict.PeriodSetting[5];
    }
    $scope.searchData=new Object();
    $scope.pageLength="";
    $scope.search="";
    $scope.pageNo="";
    $scope.searchData.periodIds=[]
    $scope.searchData.matchFlowIds=[]
    $scope.lanqiaobeiPeriodList=[];
   
    //赛届以及奖项选择
    //赛届获得
    $http.post($URL_LANQIAOBEIDASAI + "/api/certificateApplyRecord/allPeriods"
        ,{}
    ).success(function (res) {
            if (res.resultCode === 0) {
                $scope.lanqiaobeiPeriodList = res.resultData;
                $scope.maxPeriodId=res.resultData.length;
                for(var i in res.resultData){
                    if(res.resultData[i].periodId==$scope.maxPeriodId){
                        res.resultData[i].classShow='active';
                    } else {
                        res.resultData[i].classShow='';
                    }

                }

                console.log(res);
            }
        });
    $scope.showDetailAdwards=function(obj){
        $http.post($URL_LANQIAOBEIDASAI+"/api/forward/designAwardsRecord/findDesginAwardRecordDetailList",FormUtil.Json2UrlParam(obj)).success(function(res){
            if(res.resultCode===0){
                //console.table(res.resultData.list);
                $scope.designAwardsDetails=res.resultData.list;
                var html ="";
                if(null!=$scope.designAwardsDetails&&$scope.designAwardsDetails.length>0){
                    html+="<table><thead><tr><td>作品类别</td><td>作品名称</td>";
                    if($scope.designAwardsDetails[0].matchFlowId===6){
                        html+="<td>选拔赛奖项</td><td>是否进入决赛</td>";
                    }
                    if($scope.designAwardsDetails[0].matchFlowId===7){
                        html+="<td>总决赛奖项</td>";
                    }
                    html+="</tr></thead><tbody>";
                    var htmlNoAward="";
                	var htmlYesAward="";
                    for(var obj in $scope.designAwardsDetails){
                    	
                    	if($scope.designAwardsDetails[obj].awardsGrade==null){
                    		htmlNoAward+="<tr ><td>"+$scope.designAwardsDetails[obj].opusSubType+"</td><td>"+$scope.designAwardsDetails[obj].opusName+"</td>";
                            if($scope.designAwardsDetails[obj].matchFlowId===6){
                            	htmlNoAward+="<td>"+($scope.designAwardsDetails[obj].awardsGrade==null?'未获奖':$scope.designAwardsDetails[obj].awardsGrade)+"</td>";
                                if($scope.designAwardsDetails[obj].isEntityFinals==1){
                                	htmlNoAward+="<td>是</td>";
                                }
                                if($scope.designAwardsDetails[obj].isEntityFinals==2){
                                	htmlNoAward+="<td>否</td>";
                                }
                                if(!$scope.designAwardsDetails[obj].isEntityFinals){
                                	htmlNoAward+="<td>-</td>";
                                }
                            }
                            if($scope.designAwardsDetails[obj].matchFlowId===7){
                            	htmlNoAward+="<td >"+($scope.designAwardsDetails[obj].awardsGrade==null?'未获奖':$scope.designAwardsDetails[obj].awardsGrade)+"</td>";
                            }
                            htmlNoAward+="</tr>";
                    	}else{
                    		htmlYesAward+="<tr ><td>"+$scope.designAwardsDetails[obj].opusSubType+"</td><td>"+$scope.designAwardsDetails[obj].opusName+"</td>";
                            if($scope.designAwardsDetails[obj].matchFlowId===6){
                            	htmlYesAward+="<td>"+($scope.designAwardsDetails[obj].awardsGrade==null?'未获奖':$scope.designAwardsDetails[obj].awardsGrade)+"</td>";
                                if($scope.designAwardsDetails[obj].isEntityFinals==1){
                                	htmlYesAward+="<td>是</td>";
                                }
                                if($scope.designAwardsDetails[obj].isEntityFinals==2){
                                	htmlYesAward+="<td>否</td>";
                                }
                                if(!$scope.designAwardsDetails[obj].isEntityFinals){
                                	htmlYesAward+="<td>-</td>";
                                }
                            }
                            if($scope.designAwardsDetails[obj].matchFlowId===7){
                            	htmlYesAward+="<td >"+($scope.designAwardsDetails[obj].awardsGrade==null?'未获奖':$scope.designAwardsDetails[obj].awardsGrade)+"</td>";
                            }
                            htmlYesAward+="</tr>";
                    	}
                    }
                    html+=htmlYesAward+htmlNoAward;
                    html+="</tbody></table>";
                }
                $("#awards_details_data").html(html);
                $('.awards_details').fadeIn(200);
            }
        }).error(function(res){
            console.log(res);
            showAlert(0,"查询失败");
        })
        $('.awards_details').fadeIn(200);
    }

    $scope.searchList=function(pno) {

        if(!pno){
            pno=1;
        }else {
        }
        $scope.searchData.periodIds[0]=getUrlParamByKey("p");
        $scope.searchData.matchFlowIds[0]=getUrlParamByKey("f");
        $scope.searchData.page={pageNo:pno};
        $scope.mname= Dict.Period[$scope.searchData.periodIds[0]]+"蓝桥杯设计赛"+Dict.Flow[$scope.searchData.matchFlowIds[0]]
   	 
        $http.post($URL_LANQIAOBEIDASAI+"/api/forward/designAwardsRecord/findDesginAwardRecordList",FormUtil.Json2UrlParam( $scope.searchData)).success(function(res) {
            if (res.resultCode === 0) {
                console.log(res);
                //console.log($scope.otherProperties.count);
                $scope.designAwardsRecordList=res.resultData.list;
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

    //$scope.personalApplyNames={};
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


    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };
    //pdf文件导出
    $scope.designAwardsRecordListExportPDF=function(){
        if( $scope.totalRecords>0){
            var url=$URL_LANQIAOBEIDASAI+"/api/forward/designAwardsRecord/designAwardsRecordsPdfExport"//跳转路径
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
    $("img.more").click(function(){
        /*if($("#period").height()<20){
            return;
        }*/
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
        $("#di4").addClass("act");
        $("#leftbar_awardsrecord ul").show();
    },100);
    $("#alldesignAwardsView").on("click",".sel-block a",function(){
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
