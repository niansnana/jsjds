@if(count($errors) > 0)
    <div class="layui-form-item layui-form-danger">
        @foreach($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </div>
@endif
