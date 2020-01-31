@include("admin.layout.header")
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 管理员管理 <span class="c-gray en">&gt;</span> 角色管理 <a class="btn btn-success radius r" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="page-container">
    <div class="cl pd-5 bg-1 mb-10 bk-gray">
        <span class="l">
            <a href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a>
            <a class="btn btn-primary radius" href="javascript:;" onclick="admin_role_add('添加角色','/admin/role/add','','400')"><i class="Hui-iconfont">&#xe600;</i> 添加角色</a>
        </span>
        <span class="r">共有数据：<strong>54</strong> 条</span>
    </div>
    <table class="table table-border table-bordered table-hover table-bg">
        <thead>
        <tr>
            <th scope="col" colspan="6">角色管理</th>
        </tr>
        <tr class="text-c">
            <th width="25"><input type="checkbox" value="" name=""></th>
            <th width="40">ID</th>
            <th width="100">角色名</th>
            <th width="150">权限ID集合</th>
            <th width="150">权限ac集合</th>
            <th width="70">操作</th>
        </tr>
        </thead>
        {{ csrf_field() }}
        <tbody>
        @foreach($data as  $val)
            <tr class="text-c">
                <td><input type="checkbox" value="{{ $val->id }}" name=""></td>
                <td>{{ $val->id }}</td>
                <td>{{ $val->role_name }}</td>
                <td>{{ $val->auth_ids }}</td>
                <td>{{ $val->auth_ac }}</td>
                <td class="f-14">
                    <a title="分配权限" href="javascript:;" onclick="admin_role_assign('分配权限','/admin/role/assign','{{ $val->id }}','','400')" style="text-decoration:none"><i class="Hui-iconfont">&#xe603;</i></a>
                    <a title="编辑" href="javascript:;" onclick="admin_role_edit('角色编辑','/admin/role/{{ $val->id }}/update','','400')" style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a>
                    <a title="删除" href="javascript:;" onclick="admin_role_del(this,'{{ $val->id }}')" class="ml-5" style="text-decoration:none"><i class="Hui-iconfont">&#xe6e2;</i></a>
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
@include("admin.layout.footer")
<script type="text/javascript">
    $(function () {
        $('table').dataTable({
            // 禁用第一列排序
            "aoColumnDefs": [{"bSortable": false,"aTargets": [0]}],
            // 默认在初始化的时候按照第一列进行排序（从0开始的）
            "aaSorting":[[1,"asc"]],
            // 禁用搜索框
            // "searching":false
            "aLengthMenu": [[8, 10, 25, -1], [5, 10, 25, "所有"]],//设置每页显示数据条数的下拉选项
            'iDisplayLength': 8, //每页初始显示5条记录
        });
    });
    /*管理员-角色-添加*/
    function admin_role_add(title,url,w,h){
        layer_show(title,url,w,h);
    }

    /*管理员-角色-分配权限*/
    function admin_role_assign(title,url,id,w,h){
        layer_show(title,url + '?id=' + id,w,h);
    }

    /*管理员-角色-编辑*/
    function admin_role_edit(title,url,w,h){
        layer_show(title,url,w,h);
    }
    /*管理员-角色-删除*/
    function admin_role_del(obj,id){
        layer.confirm('确认要删除吗？',function(index){
            $.ajax({
                type: 'POST',
                url: '/admin/role/delete?id='+id,
                dataType: 'json',
                data:{
                  '_token': '{{ csrf_token() }}',
                },
                success: function(data){
                    if(data == '1'){
                        layer.msg('已删除!',{icon:1,time:1000},function () {
                            $(obj).parents("tr").remove();
                            // parent.window.location = parent.window.location;
                            location.reload();
                        });
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
