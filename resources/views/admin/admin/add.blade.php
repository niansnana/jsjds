@include("admin.layout.header")
<article class="page-container">
    <form class="form form-horizontal" id="form-admin-add" action="/admin/admin/add" method="POST">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>用户名：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="" placeholder="请输入用户名" id="adminName" name="username">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>密&emsp;码：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="password" class="input-text" autocomplete="off" value="" placeholder="请输入密码" id="password" name="password">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>性&emsp;别：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input name="gender" type="radio" value="1" id="gender-1">
                    <label for="gender-1">男</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="gender-2" value="2" name="gender">
                    <label for="gender-2">女</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="gender-3" value="3" name="gender" checked>
                    <label for="gender-3">保密</label>
                </div>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">头&emsp;像：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10" id="uploader-demo">
                <div id="fileList" class="uploader-list">
                    <input type="hidden" name="avatar" value="/storage/avatar.png" />
                </div>
                <div id="filePicker">选择图片</div>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">手&emsp;机：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="" placeholder="请输入手机号" id="mobile" name="mobile">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">邮&emsp;箱：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" name="email" id="email" placeholder="请输入邮箱" >
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>角&emsp;色：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <span class="select-box" style="width:150px;">
			<select class="select" name="role_id" size="1">
                @foreach($data as $val)
                    <option value="{{ $val->id }}">{{ $val->role_name }}</option>
                @endforeach
			</select>
			</span> </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red"></span>状&emsp;态：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input name="status" type="radio" value="2" id="status-1" checked>
                    <label for="status-1">正常</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="status-2" value="1" name="status">
                    <label for="status-2">禁用</label>
                </div>
            </div>
        </div>
        {{ csrf_field() }}
        <div class="row cl">
            <div class="col-md-11 col-xs-9 col-sm-8 col-md-offset-1 col-xs-offset-3 col-sm-offset-2">
                <input class="btn btn-primary radius" type="submit" value="&nbsp;&nbsp;提交&nbsp;&nbsp;" style="margin-right: 50px;">
                <input class="btn btn-danger radius" type="reset" value="&nbsp;&nbsp;重置&nbsp;&nbsp;">
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

        $("#form-admin-add").validate({
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
                    email: true,
                }
            },
            onkeyup:false,
            focusCleanup:true,
            success:"valid",
            submitHandler:function(form){
                $(form).ajaxSubmit({
                    type: 'post',
                    url: "" ,   // 因为用的是post，自己提交给自己，可以不用写地址了
                    success: function(data){
                        // 判断添加成功
                        if(data == '1'){
                            layer.msg('添加成功!',{icon:1,time:1000},function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.window.location = parent.window.location;    // 局部刷新，自己刷新自己
                                parent.layer.close(index);
                            });
                        }else{
                            layer.msg('添加失败!',{icon:2,time:1000});
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
