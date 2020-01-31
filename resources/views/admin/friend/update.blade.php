@include("admin.layout.header")
<div class="page-container">
    <form class="form form-horizontal" id="form-friend-update" action="/admin/friend/update/{{ $friend->id }}" method="POST">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>标题：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" placeholder="请输入友情标题" name="title" value="{{ $friend->title }}">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">描述：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" placeholder="请输入描述" name="description" value="{{ $friend->description }}">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>分类栏目：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
				<span class="select-box">
                    <select name="class_id" class="select">
                        @foreach($data as $val)
                            <option value="{{ $val->id }}" @if($friend->class_id == $val->id) selected @endif>{{ $val->class_name }}</option>
                        @endforeach
                    </select>
				</span>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">图片来源：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" placeholder="请输入超链接地址" name="url" value="{{ $friend->url }}">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">封面图片：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10" id="uploader-demo">
                <div id="fileList" class="uploader-list">
                    <input type="hidden" name="avatar" value="{{ $friend->avatar }}" />
                    <img src="{{ $friend->avatar }}" alt="" width="80">
                </div>
                <div id="filePicker">选择图片</div>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red"></span>状&emsp;态：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input name="status" type="radio" value="2" id="status-1" @if($friend->status == '2') checked @endif>
                    <label for="status-1">正常</label>
                </div>
                <div class="radio-box">
                    <input type="radio" id="status-2" value="1" name="status" @if($friend->status == '1') checked @endif>
                    <label for="status-2">禁用</label>
                </div>
            </div>
        </div>
        {{ csrf_field() }}
        <div class="row cl">
            <div class="col-md-11 col-xs-9 col-sm-8 col-md-offset-1 col-xs-offset-3 col-sm-offset-2">
                <button class="btn btn-primary radius" type="submit">立即提交</button>
                <button onClick="layer_close();" class="btn btn-default radius" type="button">&nbsp;&nbsp;取消&nbsp;&nbsp;</button>
            </div>
        </div>
    </form>
</div>
@include("admin.layout.footer")
<script type="text/javascript">
    $(function () {
        // 复选框按钮美化
        $('.skin-minimal input').iCheck({
            checkboxClass: 'icheckbox-blue',
            radioClass: 'iradio-blue',
            increaseArea: '20%'
        });


        $("#form-friend-update").validate({
            rules:{
                title:{
                    required:true,
                    minlength:2,
                    maxlength:16
                },
                class_id:{
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
