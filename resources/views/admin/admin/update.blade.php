@include("admin.layout.header")
<article class="page-container">
    <form class="form form-horizontal" id="form-admin-update" action="/admin/admin/{{ $admin->id }}/update" method="POST">
        <div class="row cl">
            <label class="form-label col-xs-2 col-sm-2"><span class="c-red">*</span>用户名：</label>
            <div class="formControls col-xs-10 col-sm-10">
                <input type="text" class="input-text" value="{{ $admin->username }}" placeholder="" id="adminName" name="username">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>密&emsp;码：</label>
            <div class="formControls col-xs-8 col-sm-10">
                <input type="password" class="input-text" autocomplete="off" value="{{ $admin->password }}" placeholder="密码" id="password" name="password">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>性&emsp;别：</label>
            <div class="formControls col-xs-8 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input name="gender" type="radio" value="1" id="gender-1" @if($admin->gender == 1) checked @endif>
                    <label for="gender-1">男</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="gender-2" value="2" name="gender" @if($admin->gender == 2) checked @endif>
                    <label for="gender-2">女</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="gender-3" value="3" name="gender" @if($admin->gender == 3) checked @endif>
                    <label for="gender-3">保密</label>
                </div>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-xs-4 col-sm-2">头&emsp;像：</label>
            <div class="formControls col-xs-8 col-sm-10" id="uploader-demo">
                <div id="fileList" class="uploader-list">
                    <img src="{{ $admin->avatar }}" alt="" width="80">
                    <input type="hidden" name="avatar" value="{{ $admin->avatar }}" />
                </div>
                <div id="filePicker">选择图片</div>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-xs-4 col-sm-2">手&emsp;机：</label>
            <div class="formControls col-xs-8 col-sm-10">
                <input type="text" class="input-text" value="{{ $admin->mobile }}" placeholder="" id="mobile" name="mobile">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-xs-4 col-sm-2">邮&emsp;箱：</label>
            <div class="formControls col-xs-8 col-sm-10">
                <input type="text" class="input-text" name="email" id="email" value="{{ $admin->email }}">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-xs-4 col-sm-2"><span class="c-red">*</span>角&emsp;色：</label>
            <div class="formControls col-xs-8 col-sm-10">
                <span class="select-box" style="width:150px;">
			<select class="select" name="role_id" size="1">
                @foreach($data as $val)
				    <option value="{{ $val->id }}" @if($admin->role_id == $val->id) selected @endif>{{ $val->role_name }}</option>
                @endforeach
			</select>
			</span> </div>
        </div>
        <div class="row cl">
            <label class="form-label col-xs-4 col-sm-2"><span class="c-red"></span>状&emsp;态：</label>
            <div class="formControls col-xs-8 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input name="status" type="radio" value="2" id="status-1" @if($admin->status == 2) checked @endif>
                    <label for="status-1">正常</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="status-2" value="1" name="status" @if($admin->status == 1) checked @endif>
                    <label for="status-2">禁用</label>
                </div>
            </div>
        </div>
        {{ csrf_field() }}
        <div style="width: 800px;" class="row cl">
            <div class="col-sm-offset-2">
                <input class="btn btn-primary radius" type="submit" value="&nbsp;&nbsp;提交&nbsp;&nbsp;" style="margin-right: 50px;">
                <input class="btn btn-danger radius" type="reset" value="&nbsp;&nbsp;重置&nbsp;&nbsp;">
            </div>
        </div>
    </form>
</article>

<!--_footer 作为公共模版分离出去-->
@include("admin.layout.footer")

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="/admin/lib/jquery.validation/1.14.0/jquery.validate.js"></script>
<script type="text/javascript" src="/admin/lib/jquery.validation/1.14.0/validate-methods.js"></script>
<script type="text/javascript" src="/admin/lib/jquery.validation/1.14.0/messages_zh.js"></script>
<script type="text/javascript">
    $(function(){
        $('.skin-minimal input').iCheck({
            checkboxClass: 'icheckbox-blue',
            radioClass: 'iradio-blue',
            increaseArea: '20%'
        });

        $("#form-admin-update").validate({
            rules:{
                username:{
                    required:true,
                    minlength:4,
                    maxlength:16
                },
                password:{
                    required:true,
                },
                gender:{
                    required:true,
                },
                email:{
                    email:true,
                },
                adminRole:{
                    required:true,
                },
            },
            onkeyup:false,
            focusCleanup:true,
            success:"valid",
            submitHandler:function(form){
                $(form).ajaxSubmit({
                    type: 'post',
                    url: "/admin/admin/{{$admin->id}}/update",
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
