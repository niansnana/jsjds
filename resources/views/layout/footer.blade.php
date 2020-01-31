<div class="footer">
    <div class="bg1">
        <div class="clearfix wrap">
            <div class="item item1">
                <img src="">
                <div><a href="#">关于我们</a></div>
                <div><a href="#">用户协议</a></div>
            </div>
            <div class="item item2">
                <p class="p1">支持单位</p>
                <p class="p2">主办单位：</p>
                <p class="p2">{{ $site_name }}</p>
                <p class="p2">技术支持：{{ $company_skill }}</p>
                <p class="p2">公司名称：{{ $company_name }}</p>
            </div>
            <div class="item item3">
                <p class="p1">联系我们</p>
                <p class="p2">地址：{{ $company_address }} </p>
                <p class="p2">电话：{{ $company_phone }}</p>
                <p class="p2">Email：{{ $company_email }}</p>
                <p class="p2">商务合作：{{ $company_contact }}</p>
            </div>
            <div class="item item4">
                <img width="140" src="{{'/static/images/qr.png'}}">
                <p>扫一扫关注大赛公众号</p>
            </div>
        </div>
    </div>
    <div class="bg2">
        <div class="clearfix wrap">
            <p class="p1">{{ $site_record }}</p>
            <p class="p2">京公网安备&ensp;11010802020352号</p>
        </div>
    </div>
</div>
<script src="{{'static/js/z_baidu_statistics.js'}}" language="JavaScript"></script>
<div class="silder">
    <a href="curren_item.html" class="match">查看<br>本届<br>赛事</a>
    <a href="javascript:void(0)" class="return"></a>
</div>
<!-- 新增推广 -->
<script src="{{'static/js/public-5.5.js'}}"></script>
<script src="{{'static/js/dialog-5.5.js'}}"></script>
<script src="{{'static/js/lanqiao_common-5.5.js'}}"></script>
<script src="{{'static/js/jquery.SuperSlide.2.1.1.js'}}"></script>
<script type="text/javascript">
    //if(location.href.indexOf("test")<0) {
    //	location="/pages/dasai/updating.html";
    //}

    $(function () {
        $("#bannerSilder").slide({
            mainCell: ".bd ul",
            effect: 'left',
            autoPlay: true,
            trigger: 'click',
            easing: 'linear',
            delayTime: 500,
            mouseOverStop: true,
            pnLoop: true
        });

        var $videoIframe = $("#videoIframe"),
            videoIndex = 0,
            videoSrc = [
                'https://v.qq.com/iframe/player.html?vid=g05322wc8j7&tiny=0&auto=0',
                'https://v.qq.com/iframe/player.html?vid=j0338qcb42l&tiny=0&auto=0',
                'https://v.qq.com/iframe/player.html?vid=k0500spp1kh&tiny=0&auto=0'
            ];
        $("#videoSilder .hd li").click(function () {
            if ($(this).hasClass("on")) {
                return false
            }
            $(this).addClass('on').siblings().removeClass('on');

            videoIndex = $(this).index()
            $videoIframe.attr("src", videoSrc[videoIndex])
        });

        $("#videoSilder a").click(function () {
            var cacheIndex = videoIndex

            if ($(this).hasClass('prev') && videoIndex != 0) {
                videoIndex--
            }

            if ($(this).hasClass('next') && videoIndex != videoSrc.length - 1) {
                videoIndex++
            }
            if (cacheIndex != videoIndex) {
                $("#videoSilder .hd li").eq(videoIndex).addClass('on').siblings().removeClass('on');
                $videoIframe.attr("src", videoSrc[videoIndex])
            }
        })


        $("#highlightSilder").slide({
            mainCell: ".bd ul",
            effect: 'fade',
            autoPlay: false,
            trigger: 'click',
            easing: 'linear',
            delayTime: 500,
            mouseOverStop: true,
            pnLoop: true
        });


        $('.tabs li').click(function () {
            if ($(this).hasClass('act')) {
                return
            }
            $(this).addClass('act').siblings().removeClass('act');
            var $content = $(this).closest('.tabs').next('.tabs-content'),
                index = $(this).index();
            var tohref = $(this).attr("href");
            $content.find('.tab-box').hide();
            $content.find('.tab-box').eq(index).show();
            $(this).siblings("#tabs_more").attr("href", tohref);

        })

        var $return = $('.silder .return');
        var throttle = function (fn, delay, atleast) {
            var timer = null;
            var previous = null;
            return function () {
                var now = +new Date();
                if (!previous) previous = now;
                if (now - previous > atleast) {
                    fn();
                    // 重置上一次开始时间为本次结束时间
                    previous = now;
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        fn();
                    }, delay);
                }
            }
        }
        window.onscroll = throttle(function () {
            var winHeight = window.innerHeight || $(window).height()
            if ($(window).scrollTop() > winHeight) {
                $return.fadeIn('fast').css("display", "block");
            } else {
                $return.fadeOut('fast')
            }
        }, 100, 200)
        $return.click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        })

        //推广广告关闭
        $(".tuiguang span").click(function () {
            $(".tuiguang").hide();
        })

    })

    //直播
    function toZBCourse(cid) {
        if (!window.currentUser) {
            showAlert(0, "请先登录，再看直播哦~", 5000);
            $("#btnShowLoginDialog").trigger("click");
            return;
        }

        if ($("#zbahref").attr("href").indexOf("http://") >= 0) {
            return;
        }
        $.ajax({
            url: "/api/action/htzb/courseAccessUrl",
            type: "POST",
            data: {
                course_id: cid
            },
            success: function (res) {
                if (res.succeed) {
                    $("#zbahref").attr("href", res.data);
                    $("#zbahref").attr("target", "_blank");
                    tourlNewWin(res.data);
                } else {
                    showAlert("0", "直播地址获取失败!")
                }
            }
        });
    }
</script>
<script type="text/javascript">
    $(function () {
        //var h = $(".topNav").offset().top;
        var h = $(".applyInfo .content").offset().top + 130;
        $(window).scroll(function () {
            if ($(window).scrollTop() > h) {
                $(".topNav").addClass("fixNav");
                // $(".applyInfo .content").css("margin-top","94px");
            } else {
                $(".topNav").removeClass("fixNav");
                $(".applyInfo .content").css("margin-top", "40px");
            }

        });

        $(".totalList a").click(function () {
            var aid = $(this).data("aid");
            $(".totalList li").removeClass("act");
            $(this).parent().addClass("act");
            $(".applyInfo .content").hide();
            $(".tab-" + aid).show();
        });
        //返回顶部
        $(".applyBtn").click(function () {
            $('body,html').animate({scrollTop: 500}, 120);
        })
        //返回顶部
        $(".return-top").click(function () {
            $('body,html').animate({scrollTop: 0}, 120);
        })
        //推广广告关闭
        $(".tuiguang span").click(function () {
            $(".tuiguang").hide();
        })
    })

    function toUrlClick() {
        window.autoClickA = getUrlParamByKey("to");
        if (autoClickA) {
            setTimeout(function () {
                $("#" + autoClickA).trigger("click");
            }, 500);
        }
    }

    //if(location.href.indexOf("test")<0) {
    //	location="/pages/dasai/updating.html";
    //}
</script>
<script type="text/javascript">
    //上下滚动事件
    (function ($) {
        var guide = $(".sideFixed");
        var guideLi = $(".sideFixed .t");
        var index = 0;
        var page0End = false;
        var page1End = false;
        var page2End = false;
        var page3End = false;

        //屏幕滚动
        var goToFun = function () {
            console.log(index);
            var top = index >= guideLi.size() - 1 ? 0 : $(".column" + index).offset().top;
            $("html,body").stop().animate({scrollTop: top}, 600, "swing", function () {
                scrollFunc();
            });
        }

        guideLi.each(function (i) {
            $(this).click(function () {
                index = guideLi.index($(this));
                goToFun();
            })
        });

        /* 滚轮事件 */
        var scrollFunc = function (e) {
            e = e || window.event;
            //区块一
            if ($(document).scrollTop() >= $(".column0").offset().top - 100 && !page0End) {
                $("#area0-1").removeClass('bounceOutDown').css("visibility", "visible").addClass("bounceInDown");
                setTimeout(function () {
                    $('#area0-2').removeClass('bounceOutDown').css("visibility", "visible").addClass("bounceInDown");
                }, 200);
                page0End = true;
            }
            //区块二
            if ($(document).scrollTop() >= $(".column1").offset().top - 700 && !page1End) {
                $("#area1-1").removeClass('zoomOut').css("visibility", "visible").addClass("zoomIn");
                page1End = true;
            }
            //区块三
            if ($(document).scrollTop() >= $(".column2").offset().top - 700 && !page2End) {
                $("#area2-1").removeClass('flipOutX').css("visibility", "visible").addClass("flipInX");
                page2End = true;
            }
            //区块四
            if ($(document).scrollTop() >= $(".column3").offset().top - 700 && !page3End) {
                $("#area3-1").removeClass('slideOutLeft').css("visibility", "visible").addClass("slideInLeft");
                $("#area3-2").removeClass('slideOutRight').css("visibility", "visible").addClass("slideInRight");
                page3End = true;
            }
        }
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        window.onmousewheel = document.onmousewheel = scrollFunc;
        scrollFunc();

    })(jQuery);
</script>
</body>
</html>
