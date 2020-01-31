@include("admin.layout.header")
<article class="page-container">
    <form action="/admin/role/{{ $role->id }}/update" method="POST" class="form form-horizontal" id="form-admin-role-update">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>角色名称：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $role->role_name }}" placeholder="请认真填写角色名称" id="roleName" name="role_name">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">友情提示：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <p>具体权限分配已移至操作栏，谢谢！</p>
                <p>希望，世界和平。</p>
            </div>
        </div>
        {{ csrf_field() }}
        <div class="row cl">
            <div class="col-md-11 col-xs-9 col-sm-8 col-md-offset-1 col-xs-offset-3 col-sm-offset-2">
                <button type="submit" class="btn btn-success radius" id="admin-role-save"><i class="icon-ok"></i> 提交</button>
            </div>
        </div>
    </form>
</article>
@include("admin.layout.footer")
<script type="text/javascript">
    $(function(){
        $("#form-admin-role-update").validate({
            rules:{
                role_name:{
                    required:true,
                    maxlength:16
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
                        // 判断添加成功
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
                        layer.msg('请求错误！',{icon:2,time:1000}); // 请求失败
                    }
                });
            }
        });
    });
</script>
</body>
</html>
