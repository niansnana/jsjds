@extends('layout.main')
@section('content')
    {{--  内容展示  --}}
    <div class="lq-news lq-notice" style="min-height: 559px;">
        <div class="top-line"></div>
        <div class=" news-detail" id="detail">
            <div class="detail-t animated bounceIn">
                <p class="tag">{{ $article->keywords }}</p>
                <p class="p2">{{ $article->title }}</p>
                <p class="p3">发布人：{{ $article->author }}  &emsp;发布时间：{{ $article->created_at }} | 浏览次数：{{ $article->views }}</p>
            </div>
            <div class="content animated bounceInDown">
                <div class="news-text">
                    {!! $article->content !!}
                </div>
            </div>
        </div>
    </div>
@endsection
