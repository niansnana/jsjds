@include("admin.layout.header")
<article class="page-container">
    <form action="/admin/person" method="POST" class="form form-horizontal" id="form-admin-role-add">
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2"><span class="c-red">*</span>我的头像：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <img src="{{ Auth::guard('admin')->user()->avatar }}" width="100" alt="avatar" style="border-radius: 50%;">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">ID：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <input type="text" class="input-text" value="{{ Auth::guard('admin')->user()->username }}" id="roleName" name="role_name">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-md-1 col-xs-3 col-sm-2">友情提示：</label>
            <div class="formControls col-md-11 col-xs-9 col-sm-10">
                <p>希望，世界和平。</p>
            </div>
        </div>
        {{ csrf_field() }}
    </form>
</article>
@include("admin.layout.footer")
<script></script>
</body>
</html>
