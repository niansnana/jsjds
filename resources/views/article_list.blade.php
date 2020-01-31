@extends('layout.main')
@section('content')
    {{--  内容列表  --}}
    <div class="lq-news">
        <div class="top-line" style="height: 50px;"></div>
        <div class="wrap1130" id="news_list">

            <div id="force">
                <div class="news-focus">
                    <img src="http://static.lanqiao.cn/dasai/images/news.jpg">
                    <div class="clearfix news-t">
                        <a class="fl" href="javascript:test(1781)">2019青蓝菁英招聘会全国高校巡回在京圆满收官</a>
                        <p class="fr tag">蓝桥杯大赛组委会</p>
                    </div>
                    <div class="news-text">
                        2019年11月20日,首届青蓝菁英招聘会全国高校巡回在北京邮电大学隆重举行。青蓝菁英招聘会全国高校巡回作为《青蓝菁英计划》的首个落地活动，旨在为当代大学生提供更多的实习和就业机会，帮助其实现从校园到职场的转变，并以定向邀约的形式为企业选拔人才，为参会企业提供更有效的人才输送渠道。《青蓝菁英计划》是基于蓝桥杯大赛历届参
                    </div>
                    <div class="clearfix news-info">
                        <p class="fl">2019-12-06</p>
                        <a href="javascript:test(1781)" class="fr">阅读全文</a>
                    </div>
                </div>
                <div id="line_id"></div>
            </div>

            <div class="news-list" id="news_id">
            @foreach($data as $val)
                <div id="news" style="padding: 0px 40px 0px 15px;">
                    <div class="block pl200" style="background: #fff;">
                        <img src="http://static.lanqiao.cn/dasai/images/news.jpg">
                        <div class="clearfix news-t">
                            <a href="/article/show/{{ $val->id }}">{{ $val->title }}</a>
                            <p class="fr tag">keywords</p>
                        </div>
                        <div class="news-text">
                            {!! Str::limit($val->content,200) !!}
                            content
                        </div>
                        <div class="clearfix news-info">
                            <p class="fl">
                                {{ $val->created_at->toFormattedDateString() }}
                            </p>
                            <a href="/article/show/{{ $val->id }}" class="fr">阅读全文</a>
                        </div>
                    </div>
                </div>
                @endforeach
                {{-- 分页 --}}
                <div class="news-pager clearfix" id="page">
                    {{ $data->links() }}
                </div>
            </div>
        </div>
    </div>
@endsection
