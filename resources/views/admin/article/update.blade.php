@include("admin.layout.header")
<article class="page-container">
    <form class="form form-horizontal" action="/admin/article/update/{{ $article->id }}" method="POST" id="form-article-update">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>文章标题：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $article->title }}" placeholder="请输入文章标题" id="articletitle" name="title">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">文章作者：</label>
            <div class="formControls col-md-2 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $article->author }}" placeholder="请输入文章作者" id="articletitle2" name="author">
            </div>
        </div>
        {{-- 测试开始 --}}
        <div class="row cl">
            {{-- 左边部分 --}}
            <div class="col-md-4">
                <label class="form-label col-md-3"><span class="c-red">*</span>分类栏目：</label>
                <div class="formControls col-md-9">
                <span class="select-box">
                    <select name="class_id" class="select">
                        @foreach($data as $val)
                            <option value="{{ $val->id }}" @if($article->class_id == $val->id) selected @endif>{{ $val->class_name }}</option>
                        @endforeach
                    </select>
				</span>
                </div>
            </div>
            {{-- 右边部分 --}}
            <div class="col-md-4">
                <label class="form-label col-md-3"><span class="c-red">*</span>文章类型：</label>
                <div class="formControls col-md-9">
                    <span class="select-box">
                        <select name="class_type" class="select">
                            <option value="0" @if($article->class_type == '0') selected @endif>普通文章</option>
                            <option value="1" @if($article->class_type == '1') selected @endif>热门文章</option>
                            <option value="2" @if($article->class_type == '2') selected @endif>外链文章</option>
                        </select>
                    </span>
                </div>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">排序值：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $article->sort }}" placeholder="请输入排序值" id="articlesort" name="sort">
            </div>
        </div>
        <div class="row cl">
            <div class="col-md-4">
                <label class="form-label col-md-3">缩略图：</label>
                <div class="formControls col-md-9">
                    <div class="uploader-list" id="fileList">
                        <div id="fileList" class="uploader-list">
                            <img src="{{ $article->avatar }}" width="100" alt="">
                            <input type="hidden" name="avatar" value="{{ $article->avatar }}" />
                        </div>
                        <div id="filePicker">修改图片</div>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <label class="form-label col-md-3">其他文件</label>
                <div id="uploader" class="wu-example formControls col-md-9">
                    <div id="thelist" class="uploader-list">
                        <input type="hidden" name="file_url" value="{{ $article->file_url }}" />
                    </div>
                    <div class="btns">
                        <div id="picker">选择文件</div>
                        <button id="ctlBtn" class="btn btn-default">开始上传</button>
                    </div>
                </div>
            </div>



        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">外链地址：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" placeholder="请输入地址" name="link" value="{{ $article->link }}">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">关键词：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $article->keywords }}" placeholder="请输入关键词" name="keywords">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">文章摘要：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ $article->description }}" placeholder="请输入描述" name="description">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">文章内容：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <textarea name="content" id="editor">{!! $article->content !!}</textarea>
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">是否启用：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10 skin-minimal">
                <div class="radio-box">
                    <input type="radio" name="status" id="status-1" title="启用" value="2" @if($article->status == '2') checked @endif />
                    <label for="status-1">启用</label>
                </div>
                <div class="radio-box">
                    <input type="radio" name="status" id="status-2" title="禁用" value="1" @if($article->status == '1') checked @endif />
                    <label for="status-2">禁用</label>
                </div>
            </div>
        </div>
        {{ csrf_field() }}
        <div class="row cl">
            <div class="col-md-11 col-xs-9 col-sm-8 col-md-offset-1 col-xs-offset-3 col-sm-offset-2">
                @if(Auth::guard('admin')->user()->role_id == '1')
                    <button class="btn btn-success radius" type="submit">修改文章</button>
                @else
                    <button onClick="article_save_submit();" class="btn btn-primary radius" type="submit"><i class="Hui-iconfont">&#xe632;</i> 保存并提交审核</button>
                @endif
                <button onClick="article_save();" class="btn btn-secondary radius" type="button"><i class="Hui-iconfont">&#xe632;</i> 保存草稿</button>
            </div>
        </div>
    </form>
</article>

@include("admin.layout.footer")
<script src="{{'/static/lib/ckeditor/ckeditor.js'}}" type="text/javascript"></script>
<script src="{{'/static/lib/ckeditor/config.js'}}" type="text/javascript"></script>
<script>
    CKEDITOR.replace('editor',{
        filebrowserBrowseUrl: '{{url('uploads/images/')}}',
        filebrowserUploadUrl: '{{url('/admin/article/image')}}?_token={{csrf_token()}}'
    });
</script>
<script type="text/javascript">
    $(function(){
        $('.skin-minimal input').iCheck({
            checkboxClass: 'icheckbox-blue',
            radioClass: 'iradio-blue',
            increaseArea: '20%'
        });
        //表单验证
        $("#form-article-update").validate({
            rules:{
                title:{
                    required:true,
                    minlength:4,
                },
                author:{
                    required:true,
                    minlength:2,
                },
            },
            onkeyup:false,
            focusCleanup:true,
            success:"valid",
            submitHandler:function(form){
                $(form).ajaxSubmit({
                    type: 'post',
                    url: "",
                    success: function(data){
                        // 判断添加成功
                        if(data == '1'){
                            layer.msg('修改成功!',{icon:1,time:1000},function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                // window.location.href='/admin/article';
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
