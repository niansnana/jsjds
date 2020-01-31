@include("admin.layout.header")
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 文章管理 <span class="c-gray en">&gt;</span> 文章管理 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
    <div class="cl pd-5 bg-1 bk-gray mb-10">
        <span class="l">
            <a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
        </span>
        <span class="r">共有数据：<strong>54</strong> 条</span>
    </div>
    <table class="table table-border table-bordered table-bg">
        <thead>
        <tr>
            <th scope="col" colspan="8">文章节点</th>
        </tr>
        <tr class="text-c">
            <th width="25"><input type="checkbox" name="" value=""></th>
            <th width="40">ID</th>
            <th width="200">标题</th>
            <th width="150">作者</th>
            <th width="150">外链地址</th>
            <th width="150">文章分类</th>
            <th width="100">操作</th>
        </tr>
        </thead>
        <tbody>
        @foreach($data as $val)
            <tr class="text-c">
                <td><input type="checkbox" value="{{ $val->id }}" name=""></td>
                <td>{{ $val->id }}</td>
                <td>{{ $val->title }}</td>
                <td>{{ $val->author }}</td>
                <td>{{ $val->link }}</td>
                <td>{{ $val->article_class->class_name }}</td>
                <td>
                    <a title="恢复" href="javascript:;" onclick="admin_permission_restore(this,'{{ $val->id }}')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe68e;</i></a>
                    <a title="删除" href="javascript:;" onclick="admin_permission_del(this,'{{ $val->id }}')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
@include("admin.layout.footer")
<script type="text/javascript">
    // 分页功能
    $(function () {
        $('table').dataTable({
            'aoColumnDefs': [{"bSortable":false,"aTargets":[0]}],
            "aaSorting":[[1,"asc"]],
        });
    });

    /*管理员-文章-恢复*/
    function admin_permission_restore(obj,id){
        layer.confirm('确认恢复该文章吗？',function (index) {
            $.ajax({
                type:'POST',
                url:'/admin/article/recycle/restore?id='+id,
                dataType: 'json',
                data:{
                    '_token':'{{ csrf_token() }}',
                },
                success:function (data) {
                    if(data == '1'){
                        layer.msg('恢复成功',{icon:1,time:1000},function () {
                           $(obj).parents('tr').remove();
                           location.reload();
                        });
                    }else{
                        layer.msg('恢复失败！',{icon:2,time:1000});
                    }
                },
                error:function (data) {
                    layer.msg('请求错误！');
                }
            });
        });
    }
    /*管理员-文章-删除*/
    function admin_permission_del(obj,id){
        layer.confirm('确认要删除吗？',function(index){
            $.ajax({
                type: 'POST',
                url: '/admin/article/recycle/delete?id='+id,
                dataType: 'json',
                data:{
                    '_token':'{{ csrf_token() }}',
                },
                success: function(data){
                    if(data == '1'){
                        $(obj).parents("tr").remove();
                        layer.msg('删除成功!',{icon:1,time:1000},function () {
                            var index = parent.layer.getFrameIndex(window.name);
                            location.reload();
                            parent.layer.close(index);
                        });
                    }else{
                        layer.msg('删除失败!',{icon:2,time:1000});
                    }
                },
                error:function(data) {
                    console.log(data.msg);
                },
            });
        });
    }
</script>
</body>
</html>
