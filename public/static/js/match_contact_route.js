lanqiaoApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/pages/dasai/matchcontact/list.html',
            controller: 'ContactListCtrl'
        }).when('/:pageNo', {
            templateUrl: '/pages/dasai/matchcontact/list.html',
            controller: 'ContactListCtrl'
        })
    }]);

lanqiaoControllers.controller('ContactListCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

      
        $scope.pageNo="";
        $scope.pageLength="";
        $scope.search="";
        //查找数据
        $scope.searchList=function(){ 
            $http.post(
                "/api/contact/showcontactlist"
             ,FormUtil.formSerializeObj($("#contactform"),true) //{pageNo:$scope.pageNo,rows:$scope.rows,search:$scope.search}
            ).success(function(res){
                console.log(res);
                if(res.resultCode===0){
                    $scope.li=res.resultData.lanqiaobeiContactsList;
                    $scope.page=res.resultData.page;
                    $scope.pageCount=$scope.page.pageCount;
                    $scope.pageNo=$scope.page.pageNo;
                    $scope.pageLength=$scope.page.length;
                    
                }
            });
        }
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
//        $scope.$watch("page", function(newVal){
//            console.log("newVal:"+newVal);
//            $scope.seach();
//        });
        $scope.deleteContact=function(id){
            var delInfo=null;
            for(var i in $scope.li){
                if($scope.li[i].contactId==id){
                   delInfo= $scope.li[i];
                    break;
                }
            }
            if(delInfo==null) return ;
            
            $.yehDialog({
                dialogWidth:445,
                title:"信息",
                content:'<p>您将要删除名称为['+delInfo.contactName+']的教师,是否继续?</p>',
                okText:"确定",
                cancelText:"取消",
                delId:id,
                ok:function(){
                    $http.post(
                        "/api/contact/deletecontact"
                        ,{contactId:delInfo.contactId} //contactId
                    ).success(function(res){
                        $scope.searchListNew();
                        console.log(res);
                    });
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            });
        };
        $scope.showUpdateDialog=function(info){

            //var $showScope=$(".main.teaDetail.clearfix").scope().contact=info;
            $http.post(
                "/api/contact/showcontactdetail"
                ,{contactId:info.contactId} //{}
            ).success(function(res){
                console.log(res);
                if(res.resultCode===0){
                    $(".clearfix.updateTeacherscope").scope().contact=res.resultData;
                    showDialog('.updateTeacher');
                    $(".updateTeacher").css("height",$(document).height()+"px");//弹框遮罩层高度
                    //$scope.contact.contactName=$scope.contact.contactName;
                    //$scope.$apply();
                }
            });

        }
        $scope.showDetailDialog=function(info){
            showDialog('.showInfo');
            $http.post(
                    "/api/contact/showcontactdetail"
                    ,{contactId:info.contactId} //{}
                ).success(function(res){
                    console.log(res);
                    if(res.resultCode===0){
                        $(".main.teaDetail.clearfix.showInfoscpoe").scope().contact=res.resultData;

                        if ($(".main.teaDetail.clearfix.showInfoscpoe").scope().contact.contactSex==1){
                            $(".main.teaDetail.clearfix.showInfoscpoe").scope().contact.contactSexName=="男";
                        } else if ($(".main.teaDetail.clearfix.showInfoscpoe").scope().contact.contactSex==2) {
                            $(".main.teaDetail.clearfix.showInfoscpoe").scope().contact.contactSexName=="女";
                        }

                        //$scope.contact.contactName=$scope.contact.contactName;
                        //$scope.$apply();
                    }
                });

        };
        $scope.showAddDialog=function() {
            $scope.contact={};

            //$("#addContactForm input").val("");
            showDialog('.addTeacher');
            $(".addTeacher").css("height",$(document).height()+"px");//弹框遮罩层高度
        };

        $scope.addTeacherSubmit =function(){
            var flg=false;
            if(!valiContactForm($("#addContactForm"))){
                 flg = true;
            }
            if($("#addContactForm input[type='radio']:checked").length==0){
                var msg_box = $("#sexErr").next().size()>0 ? $("#sexErr").next():$('<div class="msg-box"></div>');
                if(!$("#sexErr").next().size()>0){
                    msg_box.appendTo($("#sexErr").parent());
                }
                msg_box.html('<span class="icon">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span><span class="msg">请选择性别</span>');
                $(".msg").attr("style","color:#ff5600");
                flg = true;
            }
            if(flg){
                return;
            }

            $http.post(
                "/api/contact/savecontact"
                ,FormUtil.formSerializeObj($("#addContactForm"),true) //{}
            ).success(function(res){
                if(res.resultCode===0){
                    $scope.searchListNew();
                    closeDialogNotNull('.addTeacher');
                }else if (res.resultCode===300018){
                    showAlert(0,"身份证号码重复");
                    return;
                }

                console.log(res);
            });
        };

        $scope.updateTeacherSubmit =function(){

            var flg=false;
            if($("#updateContactForm input[type='radio']:checked").length==0){
                var msg_box = $("#sexErrUpdate").next().size()>0 ? $("#sexErrUpdate").next():$('<div class="msg-box"></div>');
                if(!$("#sexErrUpdate").next().size()>0){
                    msg_box.appendTo($("#sexErrUpdate").parent());
                }
                msg_box.html('<span class="icon">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span><span class="msg">请选择性别</span>');
                $(".msg").attr("style","color:#ff5600");
                flg=true;
            }

            if(!valiContactForm($("#updateContactForm"))){
                flg=true;

            }
            if(flg){
                return;
            }
            $http.post(
                "/api/contact/savecontact"
                ,FormUtil.formSerializeObj($("#updateContactForm"),true) //{}
            ).success(function(res){
            	if(res.resultCode===0){
                    $scope.searchListNew();
                    closeDialogNotNullUpdate('.updateTeacher');
                }else if (res.resultCode===300018){
                    showAlert(0,"身份证号码重复");
                    return;
                }
            	

                console.log(res);
            });
        };

        $scope.editInfo=function(){
            $http.post("url",$scope.obj).success(function(res){

        });
        }

        //验证码提交
        //$("#addContactName").blur('input',function () {
        //        if (!$("#addContactName").val()) {
        //            return $("#addNameErr").text("请输入教师姓名");
        //        } else {
        //            return $("#addNameErr").text("");
        //        }
        //
        //    }
        //);

        var valiContactForm = function (ele) {
            var noPass = 0;

            ele.find("input[data-rule]").each(function () {
                var rule = $(this).data("rule").split(",");
                for (var i = 0; i < rule.length; i++) {
                    var arr = rule[i].split(":");
                    method = arr[0],
                        msg = arr[1];
                    if (method == 'equals_to' && !$(this).val()) { //如果没值,则按默认提示报错.
                        msg = $(this).attr("placeholder");
                    }
                    var isPass = handlePass(Validate[method]($(this)), $(this), msg);
                    if (!isPass) {
                        noPass++;
                    }
                }
            });

            if (noPass > 0) {
                return false;
            }
            return true;
        }
        $("#addContactForm input[type='radio']").blur(function(){
            var msg_box = $("#sexErr").next().size()>0 ? $("#sexErr").next():$('<div class="msg-box"></div>');
            if(!$("#sexErr").next().size()>0){
                msg_box.appendTo($("#sexErr").parent());
            }
            if($("#addContactForm input[type='radio']:checked").length==0){

                msg_box.html('<span class="icon">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span><span class="msg">请选择性别</span>');
                $(".msg").attr("style","color:#ff5600");
            } else {
                msg_box.html('<span class="icon ok"></span>');
                msg_box.css("border-color","#c8d2d7");

            }

        });
        $("#updateContactForm input[type='radio']").blur(function(){
            var msg_box = $("#sexErrUpdate").next().size()>0 ? $("#sexErrUpdate").next():$('<div class="msg-box"></div>');
            if(!$("#sexErrUpdate").next().size()>0){
                msg_box.appendTo($("#sexErrUpdate").parent());
            }
            if($("#updateContactForm input[type='radio']:checked").length==0){

                msg_box.html('<span class="icon">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span><span class="msg">请选择性别</span>');
                $(".msg").attr("style","color:#ff5600");
            } else {
                msg_box.html('<span class="icon ok"></span>');
                msg_box.css("border-color","#c8d2d7");

            }

        });
        $("form input[data-rule]").blur(function(){

            var rule = $(this).data("rule").split(":");
            method = rule[0],
                msg = rule[1],
                _this = $(this);
            if($(this).hasClass('laydate-icon')){
                return false;
            }else{
                if(method=='equals_to'&&!$(this).val()){ //如果没值,则按默认提示报错.
                    msg = $(this).attr("placeholder");
                }
                handlePass(Validate[method]($(this)),$(this),msg)
            }

        });
        handlePass=function(flag,ele,msg){
            var msg_box = ele.next().size()>0 ? ele.next():$('<div class="msg-box"></div>');
            if(!ele.next().size()>0){
                msg_box.appendTo(ele.parent());
            }
            if(flag){
                msg_box.html('<span class="icon ok"></span>');
                ele.css("border-color","#c8d2d7");
                return true;
            }else{
                msg_box.html('<span class="icon">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span><span class="msg">'+msg+'</span>');

                ele.css("border-color","#ff5600");
                $(".msg").attr("style","color:#ff5600");
                return false;
            }
        }
        //验证邮箱是否正确
        function check_email(email) {

            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

            if (!reg.test(email)) {

                return false;

            } else {

                return true;
            }
        }
        //验证电话号
        function checkMobile(str) {
            var
                re = /^1\d{10}$/
            if (re.test(str)) {
                return true;
            } else {
                return false;
            }
        }
    }
                                  
]);
                                                        
