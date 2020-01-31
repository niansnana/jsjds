@extends('layout.main')
@section('content')
    <div class="index">
        <!--
            焦点幻灯片
        -->
        <div class="sec-box banner flexsilde" id="bannerSilder">
            {{--焦点幻灯片的虚点--}}
            <div class="hd">
                <ul>
                @foreach($slides as $slide)
                    <li></li>
                @endforeach
                </ul>
            </div>
            {{--焦点幻灯片的图片资源--}}
            <div class="bd">
                <ul>
                @foreach($slides as $slide)
                    <li><a class="activity-temp" title="{{ $slide->title }}" href="/article/show/{{ $slide->id }}" style="background-image: url('{{ $slide->avatar }}');"></a></li>
                @endforeach
                </ul>
            </div>
            <a class="prev" href="javascript:void(0)"></a>
            <a class="next" href="javascript:void(0)"></a>
        </div>
        <!--
            热点文章
        -->
        <div class="sec-box news column column0">
            <div class="clearfix">
                <div id="area0-1" class="fl animated bounceInDown">
                    <div>
                        <h2>h2 title</h2>
                        <div>content</div>
                        <a href="./news_show.php?attrid=5&id=6">关于我们</a>
                    </div>
                </div>

                <div id="area0-2" class="fr animated bounceInDown">
                    <ul class="tabs clearfix">
                        <li class="act" href="/article/news"><a href="javascript:void(0);">新闻动态</a></li>
                        <li href="/article/notice"><a href="javascript:void(0);">通知公告</a></li>
                        <a id="tabs_more" href="/article/news">MORE&gt;&gt;</a>
                    </ul>
                    <div class="tabs-content">
                        <!-- 大赛新闻 -->
                        <div class="tab-box tab2">
                            <ul>
                            @foreach($anews as $anew)
                                <li>
                                    <a href="/article/show/{{ $anew->id }}">
                                        <h3 title="title">{{ Str::limit($anew->title,50) }}</h3>
                                        <p>{{ $anew->created_at->toFormattedDateString() }}</p>
                                    </a>
                                </li>
                            @endforeach
                            </ul>
                        </div>
                        <!-- 大赛通知 -->
                        <div class="tab-box tab1">
                            <ul>
                            @foreach($anotices as $anotice)
                                <li>
                                    <a href="/article/show/{{ $anotice->id }}">
                                        <h3 title="title">{{ Str::limit($anotice->title,50) }}</h3>
                                        <p>{{ $anotice->created_at->toFormattedDateString() }}</p>
                                    </a>
                                </li>
                            @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--
            banner ad
        -->
        <div class="sec-box gallery column column1">
            <table id="area1-1" class="animated bounceOut">
                <tr>
                    <td>
                        <div>
                            <div class="photo" style="background-image: url({{'/static/image/1.jpg'}});">
                                政府、企业、协会联手构筑人才培养选拔平台
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="photo" style="background-image: url({{'/static/image/2.jpg'}});">以赛促学，竞赛内容基于所学专业知识
                        </div>
                    </td>
                    <td>
                        <div class="photo" style="background-image: url({{'/static/image/3.jpg'}});">
                            以个人或团体为单位，现场比拼，公正公平
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="photo" style="background-image: url({{'/static/image/4.jpg'}});">
                            设置多重激励，涵盖赛事奖励、创业基金等
                        </div>
                    </td>
                    <td>
                        <div class="photo" style="background-image: url({{'/static/image/5.jpg'}});">优先获得知名院校保研资格</div>
                    </td>
                    <td>
                        <div class="photo" style="background-image: url({{'/static/image/6.jpg'}});">知名企业提供实习、工作绿色通道
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <!--
            大赛服务及奖励
        -->
        <div class="sec-box service column column2">
            <h1>大赛服务及奖励</h1>
            <h2>公平 · 权威 · 盛大</h2>
            <div id="area2-1" class="clearfix animated flipOutX">
                <div class="item">
                    <div class="circle" style="background-image: url({{'static/image/1.png'}});"></div>
                    <p>指导老师贴身辅导</p>
                </div>
            </div>
        </div>
        <!--
            历届大赛参数人数
        -->
        <div class="sec-box number">
            <div class="bg">
                <div class="clearfix">
                    <div class="item item1">
                        <p>合作院校</p>
                        <h3>1200+</h3>
                    </div>
                    <div class="item item2">
                        <p>累计参赛人数</p>
                        <h3>200000+</h3>
                    </div>
                    <div class="item">
                        <p>参与省份</p>
                        <h3>31</h3>
                    </div>
                </div>
            </div>
            <h1>历届大赛参赛人数</h1>
            <h2>规模不断扩大的专业赛事</h2>
            <div class="chart-panel panel panel-default" style="width: 90%;margin: 0 auto;">
                <div class="panel-body" id="chart" style="height: 376px;">
                </div>
            </div>
            <script src="{{'/static/js/layui.js'}}" type="text/javascript" charset="utf-8"></script>
            <script src="{{'/admin/lib/echarts/3.4.0/echarts.common.min.js'}}"></script>
            <script type="text/javascript">
                layui.use(['layer', 'jquery'], function () {
                    var layer = layui.layer;
                    var $ = layui.jquery;
                    //图表
                    var myChart;
                    require.config({
                        paths: {
                            echarts: './adminOne/static/admin/lib/echarts'
                        }
                    });
                    require(
                        [
                            'echarts',
                            'echarts/chart/bar',
                            'echarts/chart/line',
                            'echarts/chart/map'
                        ],
                        function (ec) {
                            //--- 折柱 ---
                            myChart = ec.init(document.getElementById('chart'));
                            myChart.setOption(
                                {
                                    title: {
                                        text: "数据统计",
                                        textStyle: {
                                            color: "rgb(85, 85, 85)",
                                            fontSize: 18,
                                            fontStyle: "normal",
                                            fontWeight: "normal"
                                        }
                                    },
                                    tooltip: {
                                        trigger: "axis"
                                    },
                                    legend: {
                                        data: ["合作院校", "参与人数", "参与省份"],
                                        selectedMode: false,
                                    },
                                    toolbox: {
                                        show: true,
                                        feature: {
                                            dataView: {
                                                show: false,
                                                readOnly: true
                                            },
                                            magicType: {
                                                show: false,
                                                type: ["line", "bar", "stack", "tiled"]
                                            },
                                            restore: {
                                                show: true
                                            },
                                            saveAsImage: {
                                                show: true
                                            },
                                            mark: {
                                                show: false
                                            }
                                        }
                                    },
                                    calculable: false,
                                    xAxis: [
                                        {
                                            type: "category",
                                            boundaryGap: false,
                                            data: ["一月", "二月", "五月", "八月", "九月", "十月", "十二月"]
                                        }
                                    ],
                                    yAxis: [
                                        {
                                            type: "value"
                                        }
                                    ],
                                    grid: {
                                        x2: 30,
                                        x: 50
                                    },
                                    series: [
                                        {
                                            name: "合作院校",
                                            type: "line",
                                            smooth: true,
                                            itemStyle: {
                                                normal: {
                                                    areaStyle: {
                                                        type: "default"
                                                    }
                                                }
                                            },
                                            data: [10, 12, 21, 54, 260, 830, 710]
                                        },
                                        {
                                            name: "参与人数",
                                            type: "line",
                                            smooth: true,
                                            itemStyle: {
                                                normal: {
                                                    areaStyle: {
                                                        type: "default"
                                                    }
                                                }
                                            },
                                            data: [30, 182, 434, 791, 390, 30, 10]
                                        },
                                        {
                                            name: "参与省份",
                                            type: "line",
                                            smooth: true,
                                            itemStyle: {
                                                normal: {
                                                    areaStyle: {
                                                        type: "default"
                                                    },
                                                    color: "rgb(110, 211, 199)"
                                                }
                                            },
                                            data: [1320, 1132, 601, 234, 120, 90, 20]
                                        }
                                    ]
                                }
                            );
                        }
                    );
                    $(window).resize(function () {
                        myChart.resize();
                    })
                });
            </script>
            <div class="years">
                <span>2010</span><span>2011</span><span>2012</span><span>2013</span><span>2014</span><span>2015</span><span>2016</span><span>2017</span>
            </div>
        </div>
        <!--
            大赛视频回顾
        -->
        <div class="sec-box video">
            <h1>历届回顾</h1>
            <div class="flexsilde" id="videoSilder">
                <div class="hd">
                    <ul class="clearfix">
                        <li style="background-image: url({{'static/image/img1.jpg'}});" class="on">
                            <div class="mask">2017第八届蓝桥杯大赛 <br>颁奖典礼</div>
                        </li>
                    </ul>
                </div>
                <div class="bd">
                    <iframe id="videoIframe" frameborder="0" src="javascript:;" allowfullscreen=""></iframe>
                </div>
                <a class="prev" href="javascript:void(0)"></a>
                <a class="next" href="javascript:void(0)"></a>
            </div>
        </div>
        <!--
            精彩记录
        -->
        <div class="sec-box highlight">
            <h1>精彩记录</h1>
            <div class="flexsilde" id="highlightSilder">
                {{--精彩记录图片的虚点--}}
                <div class="hd">
                    <ul class="clearfix">
                        <li></li>
                    </ul>
                </div>
                <div class="bd">
                    <ul>
                        <li>
                            <div style="background-image: url({{'static/image/news7.jpg'}});" class="img1"></div>
                        </li>
                        <li>
                            <div style="background-image: url({{'static/image/news7.jpg'}});" class="img1"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--
            就业绿色通道
        -->
        <div class="sec-box ents">
            <h1>就业绿色通道</h1>
            <div class="clearfix">
                @foreach($jobs as $job)
                <div style="background-image: url({{ $job->avatar }})"></div>
                @endforeach
            </div>
        </div>
        <!--
            保研院校 / 参与院校
        -->
        <div class="sec-box school">
            <h1>保研院校</h1>
            <table>
                <tr>
                @foreach($schools as $school)
                    <td>
                        <img src="{{ $school->avatar }}">
                        <p class="name">{{ $school->title }}</p>
                        <p>{{ $school->description }}</p>
                    </td>
                @endforeach
                </tr>
            </table>
        </div>
        <!--
            支持机构
        -->
        <div class="sec-box support">
            <h1>支持机构</h1>
            <div class="clearfix">
            @foreach($supports as $support)
                <div style="background-image: url('{{ $support->avatar }}')"></div>
            @endforeach
            </div>
        </div>
        <!--
            友情链接
        -->
        <div class="sec-box friends">
            <h1>友情链接</h1>
            <div>
            @foreach($friends as $friend)
                <a href="{{ $friend->url }}">{{ $friend->title }}</a>
            @endforeach
            </div>
        </div>
    </div>
@endsection

