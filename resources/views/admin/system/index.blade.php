@include("admin.layout.header")
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页
	<span class="c-gray en">&gt;</span>
	系统管理
	<span class="c-gray en">&gt;</span>
	基本设置
	<a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a>
</nav>
<div class="page-container">
	<form class="form form-horizontal" id="form-system-update" action="/admin/system/{{ $system->id }}" method="POST">
		<div id="tab-system" class="HuiTab">
			<div class="tabBar cl">
				<span>网站设置</span>
				<span>公司设置</span>
			</div>
{{-- 网站设置 --}}
			<div class="tabCon">
				<div class="row cl">
					<label class="form-label col-md-1 col-xs-3 col-sm-2">
						<span class="c-red">*</span>网站名称：</label>
					<div class="formControls col-md-11 col-xs-9 col-sm-10">
						<input type="text" name="site_name" id="website-title" placeholder="控制在25个字、50个字节以内" value="{{ $system->site_name }}" class="input-text">
					</div>
				</div>
                <div class="row cl">
                    <label class="form-label col-md-1 col-xs-3 col-sm-2">
                        <span class="c-red">*</span>网站地址：</label>
                    <div class="formControls col-md-11 col-xs-9 col-sm-10">
                        <input type="text" name="site_name" id="website-title" placeholder="控制在25个字、50个字节以内" value="{{ $system->site_url }}" class="input-text">
                    </div>
                </div>
				<div class="row cl">
					<label class="form-label col-md-1 col-xs-3 col-sm-2">关键词：</label>
					<div class="formControls col-md-11 col-xs-9 col-sm-10">
						<input type="text" name="site_keywords" id="website-Keywords" placeholder="5个左右,8汉字以内,用英文,隔开" value="{{ $system->site_keywords }}" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-md-1 col-xs-3 col-sm-2">描述：</label>
					<div class="formControls col-md-11 col-xs-9 col-sm-10">
						<input type="text" name="site_description" id="website-description" placeholder="空制在80个汉字，160个字符以内" value="{{ $system->site_description }}" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-md-1 col-xs-3 col-sm-2">
						<span class="c-red">*</span>网站logo：
                    </label>
					<div class="formControls col-md-11 col-xs-9 col-sm-10" id="uploader-demo">
                        <img src="{{ $system->avatar }}" width="300" alt="logo" class="mb-10">
                        <div id="fileList" class="uploader-list">
                            <input type="hidden" name="avatar" value="{{ $system->avatar }}" />
                        </div>
                        <div id="filePicker">修改LOGO</div>
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-md-1 col-xs-3 col-sm-2">
						<span class="c-red">*</span>底部版权信息：
                    </label>
					<div class="formControls col-md-11 col-xs-9 col-sm-10">
						<input type="text" name="site_copy" id="website-copyright" placeholder="&copy; 2016 H-ui.net" value="{{ $system->site_copy }}" class="input-text">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-md-1 col-xs-3 col-sm-2">备案号：</label>
					<div class="formControls col-md-11 col-xs-9 col-sm-10">
						<input type="text" name="site_record" id="website-icp" placeholder="京ICP备00000000号" value="{{ $system->site_record }}" class="input-text">
					</div>
				</div>
			</div>
{{-- 公司设置 --}}
			<div class="tabCon">
				<div class="row cl">
					<label class="form-label col-md-1 col-xs-3 col-sm-2">公司名称：</label>
					<div class="formControls col-md-11 col-xs-9 col-sm-10">
                        <input type="text" name="company_name" class="input-text" value="{{ $system->company_name }}">
					</div>
				</div>
				<div class="row cl">
					<label class="form-label col-md-1 col-xs-3 col-sm-2">公司地址：</label>
					<div class="formControls col-md-11 col-xs-9 col-sm-10">
						<input type="text" name="company_address" class="input-text" value="{{ $system->company_address }}" >
					</div>
				</div>

                <div class="row cl">
                    <label class="form-label col-md-1 col-xs-3 col-sm-2">公司传真：</label>
                    <div class="formControls col-md-11 col-xs-9 col-sm-10">
                        <input type="text" name="company_fax" class="input-text" value="{{ $system->company_fax }}" >
                    </div>
                </div>
                <div class="row cl">
                    <label class="form-label col-md-1 col-xs-3 col-sm-2">公司电话：</label>
                    <div class="formControls col-md-11 col-xs-9 col-sm-10">
                        <input type="text" name="company_phone" class="input-text" value="{{ $system->company_phone }}" >
                    </div>
                </div>
                <div class="row cl">
                    <label class="form-label col-md-1 col-xs-3 col-sm-2">公司邮箱：</label>
                    <div class="formControls col-md-11 col-xs-9 col-sm-10">
                        <input type="text" name="company_email" class="input-text" value="{{ $system->company_email }}" >
                    </div>
                </div>
                <div class="row cl">
                    <label class="form-label col-md-1 col-xs-3 col-sm-2">商务联系：</label>
                    <div class="formControls col-md-11 col-xs-9 col-sm-10">
                        <input type="text" name="company_contact" class="input-text" value="{{ $system->company_contact }}" >
                    </div>
                </div>
                <div class="row cl">
                    <label class="form-label col-md-1 col-xs-3 col-sm-2">技术支持：</label>
                    <div class="formControls col-md-11 col-xs-9 col-sm-10">
                        <input type="text" name="company_skill" class="input-text" value="{{ $system->company_skill }}" >
                    </div>
                </div>
			</div>
		</div>
        {{ csrf_field() }}
		<div class="row cl">
			<div class="col-md-11 col-xs-9 col-sm-8 col-md-offset-1 col-xs-offset-3 col-sm-offset-2">
                @if(Auth::guard('admin')->user()->role_id == '1')
                    <button class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 修改</button>
                    <button class="btn btn-dark radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
                @endif
			</div>
		</div>
	</form>
</div>
@include("admin.layout.footer")
<script type="text/javascript">
$(function(){
	$('.skin-minimal input').iCheck({
		checkboxClass: 'icheckbox-blue',
		radioClass: 'iradio-blue',
		increaseArea: '20%'
	});
	$("#tab-system").Huitab({
		index:0
	});

	// 修改
    $("#form-system-update").validate({
        rules:{
            site_name:{
                required:true,
                minlength:4,
                maxlength:16
            },
            site_url:{
                required:true,
            }
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
                            // parent.window.location = parent.window.location;
                            location.reload();
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
