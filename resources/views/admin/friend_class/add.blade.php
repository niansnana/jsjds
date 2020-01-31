@include("admin.layout.header")
<article class="page-container">
    <form class="form form-horizontal" id="form-admin-add" action="/admin/friend/class/add" method="POST">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>分类名称：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="" placeholder="请输入分类名称" id="auth_name" name="class_name">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>是否启用：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input name="class_type" type="radio" value="2" id="class_type-1" checked>
                    <label for="class_type-1">是</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="class_type-2" value="1" name="class_type">
                    <label for="class_type-2">否</label>
                </div>
            </div>
        </div>
        {{csrf_field()}}
        <div class="row cl">
            <div class="col-md-11 col-xs-9 col-sm-8 col-md-offset-1 col-xs-offset-3 col-sm-offset-2">
                <input class="btn btn-primary radius" type="submit" value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
            </div>
        </div>
    </form>
</article>
@include("admin.layout.footer")
<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript">
    $(function(){
        // jquery 控制“控制器”和“方法” 动态显示和隐藏
        $('.skin-minimal input').iCheck({
            checkboxClass: 'icheckbox-blue',
            radioClass: 'iradio-blue',
            increaseArea: '20%'
        });

        $("#form-admin-add").validate({
            rules:{
                class_name:{
                    required:true,
                    minlength:4,
                    maxlength:16
                },
                class_type:{
                    required:true,
                },
            },
            onkeyup:false,
            focusCleanup:true,
            success:"valid",
            submitHandler:function(form){
                $(form).ajaxSubmit({
                    type: 'post',
                    url: "" ,
                    success: function(data){
                        if(data == '1'){
                            layer.msg('添加成功!',{icon:1,time:1000},function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.window.location = parent.window.location;
                                parent.layer.close(index);
                            });
                        }else{
                            layer.msg('添加失败!',{icon:2,time:1000});
                        }
                    },
                    error: function(XmlHttpRequest, textis_nav, errorThrown){
                        layer.msg('请求错误！',{icon:2,time:1000});
                    }
                });
            }
        });


    });
</script>
</body>
</html>
