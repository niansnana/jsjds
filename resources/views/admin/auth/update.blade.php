@include("admin.layout.header")
<article class="page-container">
    <form class="form form-horizontal" id="form-auth-update" action="/admin/auth/update/{{ $id->id }}" method="POST">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>权限名称：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $id->auth_name }}" placeholder="" id="auth_name" name="auth_name">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>父级权限：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <span class="select-box" style="width:150px;">
                    <select class="select" name="pid" size="1">
                        <option value="0">作为顶级权限</option>
                        @foreach($parents as $parent)
                            <option value="{{ $parent->id }}" @if($id->pid == $parent->id) selected @endif>{{ $parent->auth_name }}</option>
                        @endforeach
                    </select>
			    </span>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">控制器名：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $id->controller }}" placeholder="" id="controller" name="controller">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">方法名：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $id->action }}" name="action" id="action">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>作为导航：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input name="is_nav" type="radio" value="1" id="is_nav-1">
                    <label for="is_nav-1">是</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="is_nav-2" value="2" name="is_nav" checked>
                    <label for="is_nav-2">否</label>
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
        @if($id->pid == '0')
            $('#controller,#action').parents('.row').hide();
        @endif
        $('select').change(function () {
            var _val = $(this).val();
            if(_val > 0){
                $('#controller,#action').parents('.row').show(500);
            }else{
                $('#controller,#action').val('');
                $('#controller,#action').parents('.row').hide(500);
            }
        });
        $('.skin-minimal input').iCheck({
            checkboxClass: 'icheckbox-blue',
            radioClass: 'iradio-blue',
            increaseArea: '20%'
        });

        // Ajax 动态后台提交
        $("#form-auth-update").validate({
            rules:{

            },
            onkeyup:false,
            focusCleanup:true,
            success:"valid",
            submitHandler:function(form){
                $(form).ajaxSubmit({
                    type: 'post',
                    url: "",
                    success: function(data){
                        if(data == '1'){
                            layer.msg('修改成功!',{icon:1,time:1000},function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.window.location = parent.window.location;
                                parent.layer.close(index);
                            });
                        }else{
                            layer.msg("修改失败",{
                                icon:2,
                                time:1000
                            });
                        }
                    },
                    error: function(XmlHttpRequest, textStatus, errorThrown){
                        layer.msg('请求失败!',{icon:1,time:1000});
                    }
                });
            }
        });

    });
</script>
</body>
</html>
