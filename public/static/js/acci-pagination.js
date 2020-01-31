/*
 * 分页控件
 * Chunsun Qin.
 * Copyright (c) 2015, yuanxin
 *
 * All rights reserved.
 */
window.acciPage = function (selector, pageChangeCall,pageC,pageNo) {
    if (!selector) {
        selector = ".pagination";
    }
    if($(selector).find("ul").length>0){
        $(selector).find("ul").html("");
    }else {
        $(selector).html("");
        $("<ul></ul>").appendTo($(selector));
    }
    //分页控件
    $(selector).each(function () {
        var pageCount =pageC?pageC: $(this).attr("pageCount");
        var pageNum =pageNo?pageNo:($(this).attr("pageNum")||$(this).attr("pageNo"));
        if (!pageCount || !pageNum) {
            return;
        }
        var pageli = new Array();
        if (pageCount <= 5) {
            for (var i = 1; i <= pageCount; i++) {
                if (i != pageNum) {
                    pageli.push({no: i});
                } else {
                    pageli.push({no: i, disable: true});
                }
            }
        } else {
            if (1 != pageNum) {
                pageli.push({no: 1});
            } else {
                pageli.push({no: 1, disable: true});
            }
            for (var i = 2; i < pageCount; i++) {
                if (!(Math.abs(i - pageNum) <= 2 || (pageNum <= 4 && i < 6) || (pageNum >= pageCount - 3 && i > pageCount - 5))) {
                    continue;
                }
                if (i != pageNum) {
                    pageli.push({no: i});
                } else {
                    pageli.push({no: i, disable: true});
                }
            }
            if (pageCount != pageNum) {
                pageli.push({no: pageCount});
            } else {
                pageli.push({no: pageCount, disable: true});
            }
        }

        //只有一页的时候将不再显示(若将需求变更,可将此行删除).
        if(pageli.length<=1){
            $(selector).parents(".list-page-other").hide();
            $(selector).parents(".list-page").hide();
            return;
        }
        $(selector).parents(".list-page-other").show();
        $(selector).parents(".list-page").show();
        //--------


        var pageli2 = new Array();
        for (var i = 0; i < pageli.length; i++) {
            pageli2.push(pageli[i]);
            if (i < pageli.length - 1 && pageli[i + 1].no > pageli[i].no + 1) {
                pageli2.push({no: "…", disable: true, nonum: true});
            }
        }

        $(selector + " ul").html("");

        if (pageNum == 1) {
            //如果正好是第一页时
            $('<li><a href="javascript:void(0);">&lt;</a></li>').appendTo($(selector+" ul"));
        } else {
            $('<li><a href="javascript:void(0);" pageNum="' + (pageNum - 1) + '">&lt;</a></li>').appendTo($(selector + " ul"));
        }

        for (var i = 0; i < pageli2.length; i++) {
            var page = pageli2[i];
            if (page.nonum) {
                $('<li class="nonum"><a href="javascript:void(0);">' + page.no + '</a></li>').appendTo($(selector + " ul"));
                continue;
            }
            if (page.disable) {
                $('<li class="active"><a href="javascript:void(0);" class="current">' + page.no + '</a></li>').appendTo($(selector + " ul"));
            } else {
                $('<li><a href="javascript:void(0);" pageNum="' + page.no + '">' + page.no + '</a></li>').appendTo($(selector + " ul"));
            }
        }
        if (pageNum == pageCount) {
            //如果正好是最后一页时
            $('<li><a href="javascript:void(0);">&gt;</a></li>').appendTo($(selector+" ul"));
        } else {
            $('<li><a href="javascript:void(0);" pageNum="' + (parseInt(pageNum) + 1) + '">&gt;</a></li>').appendTo($(selector + " ul"));
        }
        //$("<span>共"+pageCount+"页</span>").appendTo($(selector + " ul"));
        $(selector).show();
        $(this).find("a").click(function () {
            var pno = $(this).attr("pageNum");
            if (!pno)return;
            try {
                //window.acciPage(selector,pageChangeCall,pageCount,pno);
                pageChangeCall(pno);
            } catch (e) {

            }
        });
    });

};
/**
 * 算一下分页.
 * @param dataLenth 数据总条数
 * @param pageSize 每页显示条数
 * @param pageNo 当前第几页
 */
window.acciPageIndex=function(dataLenth,pageSize,pageNo){
    if(!pageNo||pageNo<=0){
        pageNo=1;
    }
    if(!pageSize||pageSize<=0){
        pageSize=1;
    }
    var res={};
    res.start=(pageNo-1)*pageSize;
    res.end=pageNo*pageSize;//不含
    if(res.end>dataLenth){
        res.end=dataLenth;
    }
    res.pageCount=Math.ceil(dataLenth/pageSize);
    res.length=dataLenth;
    res.pageNo=pageNo;
    res.pageSize=pageSize;
    return res;
}
