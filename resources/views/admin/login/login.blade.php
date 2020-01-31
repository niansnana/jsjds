<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>login</title>
    <link rel="stylesheet" href="/admin/static/css/styles.css">
    <link rel="stylesheet" type="text/css" href="/admin/static/css/component.css" />
    <link rel="stylesheet" href="https://at.alicdn.com/t/font_1616659_oxhr2s3f44c.css">
</head>
<body>
<div class="container demo-1">
    <div class="content">
        <div id="large-header" class="large-header">
            <canvas id="demo-canvas"></canvas>
            <div class="logo_box">
                <h3>计算机设计大赛后台</h3>
                <form action="/admin/check" method="POST">
                    <div class='login'>
                        <div class='items'>
                        {{-- 用户名 --}}
                            <div class='item username'>
                                <div class='icon'>
                                    <i class="iconfont icon-xingmingyonghumingnicheng"></i>
                                </div>
                                <input type="text" name="username" placeholder='用户名' maxlength="16" autocomplete="off" />
                            </div>
                            {{-- 密 码 --}}
                            <div class='item password'>
                                <div class='icon'>
                                    <i class="iconfont icon-mima"></i>
                                </div>
                                <input type="password" name="password" placeholder='密码' maxlength="16" autocomplete="off">
                            </div>
                            {{-- 验证码 --}}
                            <div class='item captcha'>
                                <div class='icon'>
                                    <i class="iconfont icon-mima3"></i>
                                </div>
                                <div>
                                    <input type="text" name="captcha" placeholder='验证码' maxlength="5" autocomplete="off">
                                    <img src="{{ captcha_src() }}" alt="captcha" id="img">
                                </div>
                            </div>
                            {{-- 记住我 --}}
                            <div class="item remeber" style="font-size: 10px;padding: 10px 35px;">
                                <input type="checkbox" name="is_remember">记住我
                            </div>
                            {{ csrf_field() }}
                            {{-- 提交 --}}
                            <div class="item submit">
                                <button>登录</button>
                                <a href="#" class="forgot">忘记密码</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="/admin/static/js/TweenLite.min.js"></script>
<script src="/admin/static/js/EasePack.min.js"></script>
<script src="/admin/static/js/demo-1.js"></script>
<script src="/admin/lib/jquery/1.9.1/jquery.min.js"></script>
<script src="/admin/lib/layer/2.4/layer.js"></script>
<script>
    $(function () {
       // 随机验证码
       $('#img').click(function () {
           var src = $('#img').attr('src');
           $('#img').attr('src',src+'&_='+Math.random());
       });

       // layer错误提示
        @if(count($errors) > 0)
            var str = '';
            @foreach($errors->all() as $error)
                str += "{{ $error }}<br>";
                layer.alert(str);
            @endforeach
        @endif

    });
</script>
</body>
</html>
