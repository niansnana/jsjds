<script type="text/javascript">
    /**
     * 由于Api地址各环境不同,故写些配置文件,更改时方便配置.
     */
    window.$STATIC_URL = "http://static.lanqiao.cn";
    window.$DOWN_URL = "http://down.lanqiao.cn";
    // 蓝桥帐户域名
    window.$URL_ACCOUNT = "http://dasai.lanqiao.cn";
    // 蓝桥杯大赛域名
    window.$URL_LANQIAOBEIDASAI = "http://dasai.lanqiao.cn";
    // 蓝桥第三方接口处理域名
    window.$URL_THIRDINTERFACE = "http://dasai.lanqiao.cn";
    // 蓝桥订单域名
    window.$URL_ORDER = "http://dasai.lanqiao.cn";
    window.$WXR_URL = "http://main.lanqiao.cn";
    // 图片获得 （URL后追加ID）
    window.$URL_DOWNLOAD_IMAGE = "http://dasai.lanqiao.cn" + "/api/action/oss/getImageStream/";
    // 首页接口域名
    window.$URL_INDEX_NEWS = "http://10.251.196.135";
    window.$MNS_LANQIAO_URL = "http://mns.lanqiao.cn";
</script>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="renderer" content="webkit">
    <meta name="baidu-site-verification" content="pmPdczRdjp">
    <meta name="keywords" content="计算机设计大赛——全国大学生TMT行业赛事">
    <meta name="description" content="中国计算机设计大赛安徽省赛">
    <title>计算机设计大赛</title>
    <!--
        首页开始
    -->
    <link rel="shortcut icon" href="{{'/static/articleImg/logo.ico'}}" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="{{'/static/css/basic.css'}}"/>
    <link rel="stylesheet" type="text/css" href="{{'/static/css/index201708.css'}}"/>
    <link rel="stylesheet" type="text/css" href="{{'/static/css/login_sub.css'}}"/>
    <script src="{{'/static/js/jquery-1.9.1.min.js'}}"></script>
    <script src="{{'/static/js/dasai_index_config.js?v=5.5'}}"></script>
    <script src="{{'/static/js/public.js'}}"></script>
    <!--
        首页结束
    -->

    <!--
        本届大赛开始
    -->
    <link rel="stylesheet" type="text/css" href="{{'/static/css/basic.css?v=5.5'}}"/>
    <link rel="stylesheet" type="text/css" href="{{'/static/css/new-style.css'}}"/>
    <link rel="stylesheet" type="text/css" href="{{'/static/css/show.css?v=5.5'}}"/>
    <link rel="stylesheet" type="text/css" href="{{'/static/css/login_sub.css?v=6.4'}}"/>
    <script src="{{'/static/js/public.js?v=5.5'}}"></script>
    <script src="{{'/static/js/angular.min.js'}}"></script>
    <script src="{{'/static/js/angular-route.min.js'}}"></script>
    <script src="{{'/static/js/dasai_index_config.js?v=5.5'}}"></script>
    <script src="{{'/static/js/url_config.js?v=5.5'}}"></script>
    <script src="{{'/static/js/lanqiao_common.js?v=5.5'}}"></script>
    <script src="{{'/static/js/jquery.md5.js?v=5.5'}}"></script>
    <script src="{{'/staticjs/common/app.js?v=5.5'}}"></script>
    <script src="{{'/static/js/form_util.js?v=5.5'}}"></script>
    <script src="{{'/static/js/form.js?v=5.5'}}"></script>
    <script src="{{'/static/js/lq_util.js?v=5.5'}}"></script>
    <script src="{{'/static/js/dialog.js?v=5.5'}}"></script>
    <script src="{{'/static/js/h5.time.js?v=5.5'}}"></script>
    <script src="{{'/static/js/index.js?v=5.61'}}"></script>
    <!--
        本届大赛开始
    -->
    <!--
        文章列表开始
    -->
    <link rel="stylesheet" type="text/css" href="{{'/static/css/news.css'}}"/>
    <script src="{{'/static/js/dasai_index_config.js'}}"></script>
    <script src="{{'/static/js/url_config.js'}}"></script>
    <script src="{{'/static/js/lanqiao_common.js'}}"></script>
    <script src="{{'/static/js/app.js'}}"></script>
    <script src="{{'/static/js/form_util.js'}}"></script>
    <script src="{{'/static/js/form.js'}}"></script>
    <script src="{{'/static/js/index.js'}}"></script>
    <script src="{{'/static/js/dialog.js'}}"></script>
    <script src="{{'/static/js/acci-pagination.js'}}"></script>
    <script src="{{'/static/js/notes.js'}}"></script>
    <script src="{{'/static/js/news_detail.js'}}"></script>
    <!--
        文章列表结束
    -->

    <!--
        联系我们开始
    -->
{{--    <link rel="stylesheet" type="text/css" href="{{'static/css/login.css'}}" />--}} {{-- 就因为这个，样式冲突--}}
    <link rel="stylesheet" type="text/css" href="{{'/static/css/show.css'}}"/>
    <link rel="stylesheet" type="text/css" href="{{'/static/css/contact201709.css'}}"/>
    <!--
        联系我们结束
    -->
    <!--
        兼容IE8
    -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <!--
        动画效果
    -->
    <link rel="stylesheet" href="{{'/static/css/animate.css'}}">
    <script src="{{'/static/js/jquery.pack.js'}}"></script>
</head>
<body>
{{-- 导航栏 --}}
<div class="navigation">
    <a href="/"><img src="{{ $avatar }}" style="margin-top: 10px;" alt=""></a>
    <ul class="menu">
        @foreach($menus as $menu)
        <li class="link">
            <a href="{{ $menu->link_url }}">{{ $menu->class_name }}</a>
        </li>
        @endforeach
    </ul>
</div>
<a href="weixinregister.html"><span id="weixin_login_a_to"></span></a>
<!-- 微课banner开始 -->
<style>
    .weike-banner {
        margin: 0 auto 30px;
        width: 1130px;
        display: none;
    }
    .weike-banner-img {
        display: inline-block;
        width: 1130px;
        height: 80px;
        background: url({{'static/image/alink_20181225.png'}}) no-repeat
    }
    .weike-banner-time {
        font-family: Arial;
        font-weight: bold;
        font-size: 52px;
        color: #fff;
        display: inline-block;
        position: relative;
        top: 10px;
    }
    .slider ul {
        margin: 0;
        padding: 0;
    }

    .slider {
        width: 1130px;
        height: 80px;
        position: relative;
    }

    .slider .bd {
        margin: 0 auto;
        position: relative;
        z-index: 0;
        overflow: hidden;
    }

    .slider .bd ul {
        width: 100% !important;
    }

    .slider .bd li {
        width: 100% !important;
        height: 80px;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
    }

    .slider .bd li a {
        display: block;
        height: 80px;
    }

    .slider .hd {
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: right;
        width: 100%;
    }

    .slider .hd ul {
        text-align: center;
    }

    .slider .hd ul li {
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 5px;
        overflow: hidden;
        line-height: 9999px;
        margin-right: 15px;
        background: #fff;
        opacity: .5;
        filter: alpha(opacity=50);
        cursor: pointer;
    }

    .slider .hd ul li:last-child {
        margin-right: 0;
    }

    .slider .hd ul li.on {
        opacity: 1;
        filter: alpha(opacity=100)
    }

    .lq-news .news-detail{
        width: 1200px;
        margin: 0 auto;
    }
    .lq-news .news-detail .content{
        width: 100%;
        margin-bottom: 2%;
    }
    .lq-news .news-detail .content .news-text span img{
        margin: 10px 0px;
        text-align: center;
    }
    .lq-news .news-detail .content .news-text img[src$=".jpg"],
    .lq-news .news-detail .content .news-text img[src$=".png"]{
        margin: 1% 20%;
    }
    .lq-news .news-detail .content .news-text span img[src$=".jpg"],
    .lq-news .news-detail .content .news-text span img[src$=".png"]{
        margin: 1% 25%;
    }
    .lq-news .news-detail .content p{
        line-height:30px;
        text-indent: 2em;
    }
</style>
<div class="slider weike-banner">
    <div class="bd">
        <ul>
            <li>
                <a href="index2.html" style="background:url({{'/static/image/alink_20190221.png'}}) no-repeat"></a>
            </li>
        </ul>
    </div>
    <div class="hd">
        <ul></ul>
    </div>
</div>
<script src="{{'/static/js/jquery.SuperSlide.2.1.1.js'}}"></script>
<!-- 微课banner结束 -->
