@include("admin.layout.header")
<article class="page-container">
    <form action="" method="post" class="form form-horizontal" id="form-admin-role-add">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">权限：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <dl class="permission-list">
                    <dd>
                        @foreach($top as $val)
                            <dl class="cl permission-list2">
                                <dt>
                                    <label class="">
                                        <input type="checkbox" value="{{$val -> id}}" name="auth_id[]" @if(in_array($val -> id,explode(',',$ids))) checked="checked" @endif>
                                        <b>{{$val -> auth_name}}</b>
                                    </label>
                                </dt>
                                <dd>
                                    @foreach($cat as $v)
                                        @if($v -> pid == $val -> id)
                                            <label class="">
                                                <input type="checkbox" value="{{$v -> id}}" name="auth_id[]" @if(in_array($v -> id,explode(',',$ids))) checked="checked" @endif> {{$v -> auth_name}}
                                            </label>
                                        @endif
                                    @endforeach
                                </dd>
                            </dl>
                        @endforeach
                    </dd>
                </dl>
            </div>
        </div>
        {{ csrf_field() }}
        <div class="row cl">
            <div class="col-md-11 col-xs-9 col-sm-8 col-md-offset-1 col-xs-offset-3 col-sm-offset-2">
                <button type="submit" class="btn btn-success radius" id="admin-role-save" ><i class="icon-ok"></i> 提交</button>
            </div>
        </div>
    </form>
</article>
@include("admin.layout.footer")
<script type="text/javascript">
    $(function() {
        $(".permission-list dt input:checkbox").click(function() {
            $(this).closest("dl").find("dd input:checkbox").prop("checked", $(this).prop("checked"));
        });
        $(".permission-list2 dd input:checkbox").click(function() {
            var l = $(this).parent().parent().find("input:checked").length;
            var l2 = $(this).parents(".permission-list").find(".permission-list2 dd").find("input:checked").length;
            if ($(this).prop("checked")) {
                $(this).closest("dl").find("dt input:checkbox").prop("checked", true);
                // $(this).parents(".permission-list").find("dt").first().find("input:checkbox").prop("checked",true);
            } else {
                if (l == 0) {
                    $(this).closest("dl").find("dt input:checkbox").prop("checked", false);
                }
                if (l2 == 0) {
                    $(this).parents(".permission-list").find("dt").first().find("input:checkbox").prop("checked", false);
                }
            }
        });

        $("#form-admin-role-add").validate({
            rules: {

            },
            onkeyup: false,
            focusCleanup: true,
            success: "valid",
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type: 'post',
                    url: "",//自己提交给自己可以不写url
                    success: function(data) {
                        //判断添加结果
                        if(data == '1'){
                            layer.msg('添加成功!', { icon: 1, time: 1000 },function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.window.location = parent.window.location;
                                parent.layer.close(index);
                            });
                        }else{
                            layer.msg('添加失败!', { icon: 2, time: 1000 });
                        }
                    },
                    error: function(XmlHttpRequest, textStatus, errorThrown) {
                        layer.msg('请求失败！', { icon: 2, time: 1000 });
                    }
                });
            }
        });
    });
</script>
</body>

</html>
