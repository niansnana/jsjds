@include("admin.layout.header")
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 图片管理 <span class="c-gray en">&gt;</span> 图片列表 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
	<div class="cl pd-5 bg-1 bk-gray">
        <span class="l">
            <a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
            <a class="btn btn-primary radius" onclick="picture_add('添加图片','/admin/friend/add','','450')" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 添加图片</a>
        </span>
        <span class="r">共有数据：<strong>54</strong> 条</span>
    </div>
	<div class="mt-20">
		<table class="table table-border table-bordered table-bg table-hover table-sort">
			<thead>
				<tr class="text-c">
					<th width="40"><input name="" type="checkbox" value=""></th>
					<th width="80">ID</th>
					<th width="100">标题</th>
					<th width="100">封面</th>
					<th width="150">图片描述</th>
					<th width="100">分类</th>
					<th width="60">发布状态</th>
					<th width="150">更新时间</th>
					<th width="100">操作</th>
				</tr>
			</thead>
			<tbody>
            @foreach($data as $val)
				<tr class="text-c">
					<td><input name="" type="checkbox" value="{{ $val->id }}"></td>
					<td>{{ $val->id }}</td>
					<td>{{ $val->title }}</td>
					<td><img width="80" class="picture-thumb" src="{{ $val->avatar }}"></td>
					<td class="text-l">{{ $val->description }}</td>
					<td class="text-c">{{ $val->friend_class->class_name }}</td>
					<td class="td-status">
                        @if($val->status == '2')
                            <span class="label label-success radius">已发布</span>
                        @else
                            <span class="label label-danger radius">已取消</span>
                        @endif
                    </td>
					<td>{{ $val->created_at }}</td>
					<td class="td-manage">
                        <a style="text-decoration:none" class="ml-5" onClick="picture_edit('友情编辑','/admin/friend/update/{{ $val->id }}','','500')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
                        <a style="text-decoration:none" class="ml-5" onClick="picture_del(this,'{{ $val->id }}')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
                    </td>
				</tr>
            @endforeach
			</tbody>
		</table>
	</div>
</div>
@include("admin.layout.footer")
<script type="text/javascript">
$('.table-sort').dataTable({
	"aaSorting": [[ 1, "desc" ]],//默认第几个排序
	"bStateSave": true,//状态保存
    // "searching":false
    "aLengthMenu": [8, 10, 25, "所有"],
    'iDisplayLength': 8,
});

/*图片-添加*/
function picture_add(title,url,w,h){
	layer_show(title,url,w,h);
}

/*图片-编辑*/
function picture_edit(title,url,w,h){
	layer_show(title,url,w,h);
}

/*图片-删除*/
function picture_del(obj,id){
	layer.confirm('确认要删除吗？',function(index){
		$.ajax({
			type: 'POST',
			url: '/admin/friend/delete?id='+id,
			dataType: 'json',
            data:{
			    '_token':'{{ csrf_token() }}',
            },
			success: function(data){
			    if(data == '1'){
                    layer.msg('删除成功!',{icon:1,time:1000},function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        location.reload();
                        parent.layer.close(index);
                    });
                }else{
			        layer.msg('删除失败',{icon:2,time:1000});
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
