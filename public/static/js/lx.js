// JavaScript Document

function dologin() { var uname = e("username").value; var pwd = e("password").value;
	$.post("/lanqiao.LanqiaoLogin.dt", {username:uname,password:pwd,type:'s'}, function(obj){ if (""+obj["ret"]!="1") alert("登录失败"); else location.reload(); }, "JSON");
}
function dologinc() { var uname = e("username").value; var pwd = e("password").value;
	$.post("/lanqiao.LanqiaoLogin.dt", {username:uname,password:pwd,type:'c'}, function(obj){ if (""+obj["ret"]!="1") alert("登录失败"); else location.reload(); }, "JSON");
}
function pwdkey(e){ 
//e = e || window.event; if(e && e.keyCode==13)dologin();
}

function dologout() {
	$.post("/user.Logout.dt", {}, function(obj) {
		location.reload();
	}, "JSON");
}
function getPageStr(curPage, pageCnt, urlPre)
{
	var pageStr = "";
	function addPage(page)
	{
		if (page==curPage)
			pageStr += ' <a href="' + urlPre + 'page=' + page + '">&gt;' + page + '&lt;</a>';
		else
			pageStr += ' <a href="' + urlPre + 'page=' + page + '">[' + page + ']</a>';
	}
	addPage(1);
	if (curPage-3-1>1)
		pageStr += " ...";
	for (var i = curPage-3; i <=curPage+3; ++i)
	{
		if (i>1 && i<pageCnt)
			addPage(i);
	}
	if (curPage+3+1<pageCnt)
		pageStr += " ...";
	if (pageCnt>1)
		addPage(pageCnt);
	return pageStr;
}

function setPaging(tar, curPage, pageCnt, onPageChange)
{
	var pageStr = "";
	function addPage(page, display)
	{
		if (typeof(display)!='string')
			display = page;
		if (page==curPage)
			pageStr += '<li><a class="disabled current" page="' + page + '"><b>' + display + '</b></a></li>';
		else
			pageStr += '<li><a href="###" page="' + page + '">' + display + '</a></li>';
	}
	if (curPage>1)
	{
		addPage(1, "第一页");
		addPage(curPage-1, "上一页");
	}
	for (var i = curPage-3; i <=curPage+3; ++i)
	{
		if (i>=1 && i<pageCnt)
			addPage(i);
	}
	if (curPage+3+2==pageCnt)
		addPage(curPage+3+1);
	else if (curPage+3+2<pageCnt)
		pageStr += "<li><a>...</a></li>";
	if (pageCnt>1)
		addPage(pageCnt);
	if (curPage < pageCnt)
		addPage(curPage+1, "下一页");
	tar.html(pageStr).find("a").click(function() {
		onPageChange(parseInt($(this).attr("page")));
	});
}

function newBtn(_txt, _parent, _className)
{
	var ret;
	try {
		ret = document.createElement("input");
		ret.type="button";
		if (_parent) _parent.appendChild(ret);
		if (_className) ret.className = _className;
		if (_txt) ret.value = _txt;
	} catch (err) {}
	return ret;
}


function _getLocalStorage()
{
	if (typeof localStorage == "object")
		return localStorage;
	if (typeof globalStorage == "object")
		return globalStorage[location.host];
	return _CookieStore;
}

function _getSessionStorage()
{
	if (typeof sessionStorage == "object")
		return sessionStorage;
	return _CookieSessionStore;
}


function _storageSetData(key, value)
{
	_getLocalStorage().setItem(key, value);
};
setData = _storageSetData;
function _storageGetData(key)
{
	return _getLocalStorage().getItem(key);
};
getData = _storageGetData;
function _storageSetSessionData(key, value)
{
	_getSessionStorage().setItem(""+key, ""+value);
};
setSessionData = _storageSetSessionData;
function _storageGetSessionData(key)
{
	return _getSessionStorage().getItem(key);
};
getSessionData = _storageGetSessionData;


function _getUrlParam(name)
{
	var urlR=location.href;
	var urlL = urlR.toLowerCase();
	var ret = "";
	var p = urlL.lastIndexOf(name.toLowerCase() + "=");
	if (p>=0)
	{
		var _va = urlR.substring(p+name.length+1);
		var _p1 = _va.indexOf("?");
		if (_p1>=0) _va = _va.substring(0, _p1);
		_p1 = _va.indexOf("&");
		if (_p1>=0) _va = _va.substring(0, _p1);
		_p1 = _va.indexOf("#");
		if (_p1>=0) _va = _va.substring(0, _p1);
		ret = decodeURI(_va);
	}
	return ret;
}
function _getUrlIntParam(name)
{
	return parseInt(_getUrlParam(name));
}
getUrlIntParam = _getUrlIntParam;
getUrlParam = _getUrlParam;

function _downloadByHandle(handle)
{
	$("#dframe").attr("src", "/web.RequireTempFile.do?handle=" + handle);
}
downloadByHandle = _downloadByHandle;

function e(v) { return document.getElementById(v); }

(function ($) {
		$.getUrlParam = function (name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return decodeURI(r[2]);
				var r = window.location.hash.substr(1).match(reg);
				if (r != null) return decodeURI(r[2]); return null;
		}
})(jQuery);



function initRemoveButton(btns, onRemove, numTicks)
{
	if (btns.size()>1)
	{
		btns.each(function() {
			initRemoveButton($(this), onRemove, numTicks);
		});
		return ;
	}
	var timeInterval = null;
	var timePast = 0;
	
	if (typeof(numTicks)!="number")
		numTicks = 25;
	
	btns.wrap("<div class='removeable-btn nohelp'></div>");
	
	var tarPar = btns.parent();
	
	tarPar.css("display", "inline-block").css("position", "relative").append('<div class="progress" style="display:none; position:absolute; width:100%; "><div class="progress-bar progress-bar-danger" role="progressbar" style="width: 0%"><span>0%</span></div></div>');

	btns.append("<span class='help'><br /><small>按住" + 
		(numTicks / 10) + 
		"秒</small></span>");

	function showPercent()
	{
		var percent = timePast * 100 / numTicks;
		if (percent >= 100)
			percent = 100;
		tarPar.find(".progress-bar").css("width", percent+"%").find('span').html(percent.toFixed(1)+"%");
	}
	function removeTicks()
	{
		++timePast;
		showPercent();
	}
	function startRemove()
	{
		timePast = 0;
		showPercent();
		if (timeInterval)
		{
			clearInterval(timeInterval);
			timeInterval = null;
		}
		tarPar.find(".progress").show();
		timeInterval = setInterval(removeTicks, 100);
	}
	function clearRemove()
	{
		timePast = 0;
		tarPar.find(".progress").hide();
		if (timeInterval)
		{
			clearInterval(timeInterval);
			timeInterval = null;
			tarPar.removeClass("nohelp");
		}
		showPercent();
	}
	function endRemove()
	{
		if (timePast >= numTicks)
		{
			if (typeof(onRemove)=="function")
				onRemove.apply(btns);
		}
		clearRemove();
	}
	function interruptRemove()
	{
		clearRemove();
	}
	btns.mousedown(startRemove).mouseup(endRemove).mouseleave(interruptRemove).mouseenter(interruptRemove);
}

function onPageReady() {
	$("#xloginbtn").click(function() {
		//var lqurl = "http://dasai.lanqiao.org//pages/login/login.jsp?backurl=" + escape("http://lx.lanqiao.org/lqloginfinished.page?redir=" + encodeURI(escape(location.pathname)));
		//var lqurl = "http://dasai.lanqiao.cn/account/login_other.html?backurl=" + escape("http://lx.lanqiao.cn/lqloginfinished.page?redir=" + encodeURI(escape(location.pathname)));
		var lqurl = "http://dasai.lanqiao.cn/pages/account/login_other.html?backurl=" + escape("http://lx.lanqiao.cn/lqloginfinished.page?redir=" + encodeURI(escape(location.pathname)));
		location = lqurl;
	});
	$(".login_close_g140916").click(function(){
		      $(".login_text_g140916").hide();	
	       });
	var cpn = location.pathname;
	if (cpn=="/super/vieworder.page")
		cpn = "/super/vieworders.page";
	if (cpn=="/super/incapproveorg.page")
		cpn = "/super/cols.page";
	if (cpn=="/detail.page")
		cpn = "/status.page";
	if (cpn=="/")
		cpn = "/index.page";
	if (cpn=="/incapprove.page")
		cpn = "/vieworders.page";
	if (cpn=="/refcode.page")
		cpn = "/problemsets.page";
	if (cpn=="/problemset.page")
		cpn = "/problemsets.page";
	if (cpn=="/problem.page")
		cpn = "/problemsets.page";
	if (cpn=="/submit.page")
		cpn = "/problemsets.page";
	if (cpn=="/usersun.page")
		cpn = "/users.page";
	if (cpn=="/history.page")
		cpn = "/users.page";
	$("#nav_yhdl_s140928 dd").each(function() {
		if (cpn==$(this).find("a").first().attr("href"))
		{
			$(this).addClass("curr_g140925");
		}
	});
	startNav();
	onStart();
	setMails();
}

function setMails(tar) {
	if (tar) {
		tar = tar.find(".wd-mail");
	} else {
		tar = $(".wd-mail");
	}
	tar.each(function() {
		var cont = $(this).html() || "";
		if (cont == "") cont = $(this).attr('pre') + '@' + $(this).attr('suc');
		if ($(this).parents("a").length>0)
			$(this).html(cont);
		else
			$(this).html('<a href="mai' + 'lto:' + $(this).attr('pre') + '@' + $(this).attr('suc') + '">' + cont + '</a>');
	});
}
