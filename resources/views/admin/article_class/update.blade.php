@include("admin.layout.header")
<article class="page-container">
    <form class="form form-horizontal" id="form-class-update" action="/admin/article/class/update/{{ $id->id }}" method="POST">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>分类名称：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $id->class_name }}" placeholder="请输入分类名称" id="auth_name" name="class_name">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">外链地址：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $id->link_url }}" placeholder="请输入地址" name="link_url">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">分类类型：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $id->class_type }}" placeholder="" name="class_type">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>作为导航：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input name="show_in_nav" type="radio" value="1" id="show_in_nav-1" @if($id->show_in_nav == '1') checked @endif>
                    <label for="show_in_nav-1">是</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="show_in_nav-2" value="0" name="show_in_nav" @if($id->show_in_nav == '0') checked @endif>
                    <label for="show_in_nav-2">否</label>
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
<script type="text/javascript">
    $(function(){
        $('.skin-minimal input').iCheck({
            checkboxClass: 'icheckbox-blue',
            radioClass: 'iradio-blue',
            increaseArea: '20%'
        });

        // Ajax 动态后台提交
        $("#form-class-update").validate({
            rules:{
                class_name:{
                    required:true,
                    minlength:4,
                    maxlength:16
                },
                show_in_nav:{
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
                            layer.msg('修改成功!',{icon:1,time:1000},function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.window.location = parent.window.location;
                                parent.layer.close(index);
                            });
                        }else{
                            layer.msg('修改失败!',{icon:2,time:1000});
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
