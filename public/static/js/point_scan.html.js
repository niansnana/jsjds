var matchCategoryId=getUrlParamByKey("c");
var matchFlowId=getUrlParamByKey("f");
var periodId=getUrlParamByKey("p");
lanqiaoApp.controller('pointInfoCtrl', ['$scope', '$http','$timeout',function ($scope, $http, $timeout, $routeParams) {

    $scope.searchData={periodId:periodId,tmatchCategoryId:matchCategoryId,tmatchFlowId:matchFlowId,orderStatus:0};
    $scope.searchList=function(pno){
        $scope.searchData.page=pno;
        $http.post($URL_LANQIAOBEIDASAI + "/api/examinationDownload/point/scan"
            , $scope.searchData
        ).success(function (res) {
                console.log(res);
                $scope.count=0;
                if (res.resultCode === 0) {
                    $scope.pointInfoList = res.resultData.list;
                    $scope.page=res.resultData.page;
                    //符合条件的人数
                    $scope.count=res.resultData.total;
                    $scope.totalRecords=$scope.page.totalRecords;
                    $scope.pageCount=$scope.page.pageCount;
                    $scope.pageNo=$scope.page.pageNo;
                    $scope.pageLength=$scope.page.length;
                    $timeout(function(){
                        acciPage("#pointInfoPage", $scope.searchList,$scope.pageCount,$scope.pageNo); //分页
                    },200);
                    //可显示
                    $timeout(function(){
                        $(".pointInfo .empty").addClass("hide");
                        $(".pointInfo .noempty").removeClass("hide");
                    },500);
                    window.scrollTo(0,0);
                } 
               
                else if (res.resultCode === 600005) {
//                    //不可显示
                    $timeout(function(){
                        $(".pointInfo .empty").removeClass("hide");
                        $scope.message="暂未开启考生赛点信息查询，等耐心等待。";
                        $(".pointInfo .noempty").addClass("hide");
                    },600);
               } 
            });
        }

    //下载全部考生赛点信息
    $scope.exportStudentsMatchPointInfor=function(){
        if ($("#exportStudentsMatchPointInfor").hasClass("disabled")) {
            return false;
        }
        var url=$URL_LANQIAOBEIDASAI + "/api/examinationDownload/point/down";
        $.fileDownload(url,{
            httpMethod:"POST",
            data:$scope.searchData,
            successCallback: function (url) {
                //$("#exportExcelModal").modal("hide");
            },
            failCallback: function (html, url) {
                showAlert(0,"暂未开启考生赛点信息查询，等耐心等待。");
                //$("#exportExcelModal").modal("hide");
            }
        });


    }

    $scope.onenter=function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.searchListNew();
        }
    };
    $scope.searchListNew=function(){
        $scope.searchList();
    }
    $scope.searchList();
}])
