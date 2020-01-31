@include("admin.layout.header")
<nav class="breadcrumb">
    <i class="Hui-iconfont">&#xe67f;</i> 首页
    <span class="c-gray en">&gt;</span> 管理员管理
    <span class="c-gray en">&gt;</span> 管理员列表
    <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" >
        <i class="Hui-iconfont">&#xe68f;</i>
    </a>
</nav>
<div class="page-container">
	<div class="cl pd-5 bg-1 bk-gray" style="margin-bottom: 10px;">
        <span class="l">
            <a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
            <a href="javascript:;" onclick="admin_add('添加管理员','/admin/admin/add','800','550')" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe600;</i> 添加管理员</a>
        </span>
{{--        <span class="r">共有数据：<strong>100</strong> 条</span> </div>--}}
        <span class="r">导入+</span>
        <span class="r">导出—</span>
    </div>
	<table class="table table-border table-bordered table-bg">
		<thead>
			<tr>
				<th scope="col" colspan="11">管理员列表</th>
			</tr>
			<tr class="text-c">
				<th width="25"><input type="checkbox" name="" value=""></th>
				<th width="40">ID</th>
				<th width="100">用户名</th>
				<th width="200">密码</th>
				<th width="90">头像</th>
				<th width="50">性别</th>
				<th width="100">手机</th>
				<th width="150">邮箱</th>
				<th width="100">角色</th>
				<th width="100">状态</th>
				<th width="100">操作</th>
			</tr>
		</thead>
		<tbody>
        @foreach($data as $val)
			<tr class="text-c">
				<td><input type="checkbox" value="{{ $val->id }}" name=""></td>
				<td>{{ $val->id }}</td>
				<td>{{ $val->username }}</td>
				<td>{{ $val->password }}</td>
				<td><img src="{{ $val->avatar }}" width="50" alt="avatar"></td>
				<td>@if($val->gender == '1') 男 @elseif($val->gender == '2') 女 @else 保密 @endif</td>
				<td>@if($val->mobile == '') null @else {{ $val->mobile }} @endif</td>
				<td>@if($val->email == '') null @else {{ $val->email }} @endif</td>
				<td>{{ $val->role->role_name }}</td>
				<td class="td-status">
                    @if($val->status == '2')
                        <span class="label label-success radius">已启用</span>
                    @else
                        <span class="label radius">已停用</span>
                    @endif
                </td>
				<td class="td-manage">
                {{-- 停用该功能 --}}
                    @if($val->status == 2)
                    <a style="text-decoration:none" onClick="admin_stop(this,'{{ $val->id }}')" href="javascript:;" title="停用">
                        <i class="Hui-iconfont">&#xe631;</i>
                    </a>
                    @else
                {{-- 启用该功能 --}}
                        <a style="text-decoration:none" onClick="admin_start(this,'{{ $val->id }}')" href="javascript:;" title="启用">
                            <i class="Hui-iconfont">&#xe615;</i>
                        </a>
                    @endif
                    <a title="编辑" href="javascript:;" onclick="admin_edit('管理员编辑','/admin/admin/{{ $val->id }}/update','920','600')" class="ml-5" style="text-decoration:none">
                        <i class="Hui-iconfont">&#xe6df;</i>
                    </a>
                    <a title="删除" href="javascript:;" onclick="admin_del(this,'{{ $val->id }}')" class="ml-5" style="text-decoration:none">
                        <i class="Hui-iconfont">&#xe6e2;</i>
                    </a>
                </td>
			</tr>
        @endforeach
		</tbody>
	</table>
</div>
@include("admin.layout.footer")
<script type="text/javascript">
    // dataTables 翻页插件，有槽点，但足矣
    $(function () {
       $('table').dataTable({
           // 禁用第一列排序
           "aoColumnDefs": [{"bSortable": false,"aTargets": [0]}],
           // 默认在初始化的时候按照第一列进行排序（从0开始的）
           "aaSorting":[[1,"desc"]],
           // 禁用搜索框
           // "searching":false
           "aLengthMenu": [[8, 10, 25, -1], [5, 10, 25, "所有"]],//设置每页显示数据条数的下拉选项
           'iDisplayLength': 8, //每页初始显示5条记录
       });
    });
/*管理员-增加*/
function admin_add(title,url,w,h){
	layer_show(title,url,w,h);
}
/*管理员-删除*/
function admin_del(obj,id){
	layer.confirm('确认要删除吗？',function(index){
		$.ajax({
			type: 'POST',
			url: '/admin/admin/delete?id='+id,
			dataType: 'json',
            data:{
                '_token':'{{ csrf_token() }}',
            },
			success: function(data){
				if(data == '1'){
                    $(obj).parents("tr").remove();
                    layer.msg('删除成功!',{icon:1,time:1000},function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        // parent.window.location = parent.window.location;
                        // window.location.href = '/admin/admin';
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
/*管理员-编辑*/
function admin_edit(title,url,w,h){
    layer_show(title,url,w,h);
}
/*管理员-停用*/
function admin_stop(obj,id){
	layer.confirm('确认要停用吗？',function(index){
	    $.ajax({
            type: 'POST',
            url: '/admin/admin/end?id='+id,
            dataType: 'json',
            data:{
                '_token':'{{ csrf_token() }}',
            },
            success: function(data){
                if(data == '1'){
                    layer.msg('已停用!',{icon: 5,time:1000},function(){
                        $(obj).parents("tr").find(".td-manage").prepend('<a onClick="admin_start(this,id)" href="javascript:;" title="启用" style="text-decoration:none;"><i class="Hui-iconfont">&#xe615;</i></a>');
                        $(obj).parents("tr").find(".td-status").html('<span class="label radius">已停用</span>');
                        $(obj).remove();
                    });
                }else{
                    layer.msg('停用失败！',{icon:2,time:1000});
                }
            },
            error:function(data){
                layer.msg('请求错误！');
            },
        });
	});
}

/*管理员-启用*/
function admin_start(obj,id){
	layer.confirm('确认要启用吗？',function(index){
        $.ajax({
            type: 'POST',
            url: '/admin/admin/start?id='+id,
            dataType: 'json',
            data:{
                '_token':'{{ csrf_token() }}',
            },
            success: function(data){
                if(data == '1'){
                    layer.msg('已启用!',{icon: 6,time:1000},function(){
                        $(obj).parents("tr").find(".td-manage").prepend('<a onClick="admin_stop(this,id)" href="javascript:;" title="停用" style="text-decoration:none"><i class="Hui-iconfont">&#xe631;</i></a>');
                        $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
                        $(obj).remove();
                    });
                }else{
                    layer.msg('启用失败！',{icon:2,time:1000});
                }
            },
            error:function(data){
                layer.msg('请求错误！');
            },
        });
	});
}
</script>
</body>
</html>
