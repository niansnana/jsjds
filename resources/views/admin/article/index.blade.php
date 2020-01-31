@include("admin.layout.header")
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 资讯管理 <span class="c-gray en">&gt;</span> 资讯列表 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
	<div class="cl pd-5 bg-1 bk-gray mb-20">
        <span class="l">
            <a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
            <a class="btn btn-primary radius" data-title="添加文章" data-href="/admin/article/add" onclick="Hui_admin_tab(this)" href="javascript:;"><i class="Hui-iconfont">&#xe600;</i> 添加文章</a>
        </span>
        <span class="r">共有数据：<strong>54</strong> 条</span>
    </div>
	<div class="mt-20">
		<table class="table table-border table-bordered table-bg table-hover table-sort table-responsive">
			<thead>
				<tr class="text-c">
					<th width="25"><input type="checkbox" name="" value=""></th>
					<th width="50">ID</th>
					<th width="200">标题</th>
					<th width="50">作者</th>
					<th width="80">关键字</th>
					<th width="100">标题图片</th>
					<th width="75">其他文件</th>
                    <th width="100">文章摘要</th>
                    <th>文章内容</th>
                    <th>外链地址</th>
                    <th>文章类别</th>
                    <th>文章类型</th>
                    <th>文章排序</th>
                    <th>浏览量</th>
					<th width="60">发布状态</th>
					<th width="120">操作</th>
				</tr>
			</thead>
			<tbody>
            @foreach($data as $val)
				<tr class="text-c">
					<td><input type="checkbox" value="{{ $val->id }}" name=""></td>
					<td>{{ $val->id }}</td>
                    <td>{{ $val->title }}</td>
					<td>{{ $val->author }}</td>
					<td>{{ $val->keywords }}</td>
					<td><img src="{{ $val->avatar }}" width="80" alt="img"></td>
					<td>{{ $val->file_url }}</td>
					<td>{{ $val->description }}</td>
                    <td class="text-c"><u style="cursor:pointer;" class="text-primary" onClick="article_more('文章详情','/admin/article/content/{{ $val->id }}','','400')" title="查看详情">文章内容</u></td>
					<td>{{ $val->link }}</td>
					<td>{{ $val->article_class->class_name }}</td>
					<td>
                        @if($val->class_type == '0')
                            普通文章
                        @elseif($val->class_type == '1')
                            热门文章
                        @else
                            外链文章
                        @endif
                    </td>
					<td>{{ $val->sort }}</td>
					<td>{{ $val->views }}</td>
					<td class="td-status">
                        @if($val->status == '2')
                        <span class="label label-success radius">已发布</span>
                        @else
                        <span class="label label-danger radius">审核中</span>
                        @endif
                    </td>
					<td class="f-14 td-manage">
                        @if($val->status == '2')
                            <a style="text-decoration:none" onClick="article_stop(this,'{{ $val->id }}')" href="javascript:;" title="取消发布"><i class="Hui-iconfont">&#xe6de;</i></a>
                        @else
                            <a style="text-decoration:none" onClick="article_shenhe(this,'{{ $val->id }}')" href="javascript:;" title="审核">审核</a>
                        @endif
                        <a style="text-decoration:none" class="ml-5" onClick="article_edit('文章编辑','/admin/article/update/{{ $val->id }}')" href="javascript:;" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
                        <a style="text-decoration:none" class="ml-5" onClick="article_del(this,'{{ $val->id }}')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a>
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
	// "bStateSave": true,//状态保存
	"pading":false,
	"aoColumnDefs": [
	  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
	  {"orderable":false,"aTargets":[0,8]}// 不参与排序的列
	],
    "aLengthMenu":  [6, 10, 25, "所有"],//设置每页显示数据条数的下拉选项
    'iDisplayLength': 6, //每页初始显示5条记录
});

/*文章-添加*/
function article_add(title,url,w,h){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/* 文章-详情 */
function article_more(title,url,w,h) {
    layer_show(title,url);
}
/*文章-编辑*/
function article_edit(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*文章-删除*/
function article_del(obj,id){
    layer.confirm('确认要删除吗？',function(index){
        $.ajax({
            type: 'POST',
            url: '/admin/article/delete?id='+id,
            dataType: 'json',
            data:{
                '_token':'{{ csrf_token() }}',
            },
            success: function(data){
                if(data == '1'){
                    $(obj).parents("tr").remove();
                    layer.msg('删除成功!',{icon:1,time:1000},function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                        location.reload();
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

/*文章-审核*/
function article_shenhe(obj,id){
	layer.confirm('审核文章？', {
		btn: ['通过','不通过','取消'],
		shade: false,
		closeBtn: 0
	},
	function(){
		$(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_start(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
		$(obj).remove();
		layer.msg('已发布', {icon:6,time:1000});
	},
	function(){
		$(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_shenqing(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-danger radius">未通过</span>');
		$(obj).remove();
    	layer.msg('未通过', {icon:5,time:1000});
	});
}
/*文章-下架*/
function article_stop(obj,id){
	layer.confirm('确认要下架吗？',function(index){
		$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="article_start(this,id)" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
		$(obj).remove();
		layer.msg('已下架!',{icon: 5,time:1000});
	});
}

/*文章-发布*/
function article_start(obj,id){
	layer.confirm('确认要发布吗？',function(index){
		$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="article_stop(this,id)" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
		$(obj).remove();
		layer.msg('已发布!',{icon: 6,time:1000});
	});
}
/*文章-申请上线*/
function article_shenqing(obj,id){
	$(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">待审核</span>');
	$(obj).parents("tr").find(".td-manage").html("");
	layer.msg('已提交申请，耐心等待审核!', {icon: 1,time:2000});
}
</script>
</body>
</html>
