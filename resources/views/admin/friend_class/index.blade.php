@include("admin.layout.header")
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 分类管理 <span class="c-gray en">&gt;</span> 分类管理 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
	<div class="cl pd-5 bg-1 bk-gray mb-10">
        <span class="l">
            <a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
            <a href="javascript:;" onclick="admin_permission_add('添加分类','/admin/friend/class/add','','400')" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe600;</i> 添加分类</a>
        </span>
        <span class="r">共有数据：<strong>54</strong> 条</span>
    </div>
    <table class="table table-border table-bordered table-bg">
        <thead>
        <tr>
            <th scope="col" colspan="5">分类节点</th>
        </tr>
        <tr class="text-c">
            <th width="50"><input type="checkbox" name="" value=""></th>
            <th width="50">ID</th>
            <th>标题</th>
            <th width="100">是否启用</th>
            <th width="50">操作</th>
        </tr>
        </thead>
        <tbody>
        @foreach($data as $val)
            <tr class="text-c">
                <td><input type="checkbox" value="{{ $val->id }}" name=""></td>
                <td>{{ $val->id }}</td>
                <td>{{ $val->class_name }}</td>
                <td>@if($val->class_type == '2')是 @else 否 @endif</td>
                <td>
                    <a title="编辑" href="javascript:;" onclick="admin_permission_edit('分类编辑','/admin/friend/class/update/{{ $val->id }}','','400')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a>
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
/*管理员-分类-添加*/
function admin_permission_add(title,url,w,h){
	layer_show(title,url,w,h);
}
/*管理员-分类-编辑*/
function admin_permission_edit(title,url,w,h){
	layer_show(title,url,w,h);
}
/*管理员-分类-删除*/
function admin_permission_del(obj,id){
    layer.confirm('确认要删除吗？',function(index){
        $.ajax({
            type: 'POST',
            url: '/admin/friend/class/delete?id='+id,
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
