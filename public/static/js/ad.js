var tnow = new Date();
var bd2 = new Date("2019-03-24");
var mil = (bd2- tnow) / 1000 / 60 / 60 / 24;
if(mil <0) mil = 0;
var Stext = Math.ceil(mil);
console.log("cc:" + Math.ceil(mil));
document.write('<div  id="div2" style="position:relative;padding-top:20px;display:block">');
document.write('<a href="http://weike.lanqiao.cn"><img src="http://weike.lanqiao.cn/static/dasai-ad/png02.png"></a>');
document.write('</div>');
document.write('<div id="div1" style="position:relative;padding-top:20px;display:none">');
document.write('<a href="http://dasai.lanqiao.cn/pages/dasai/tell_ours.html#aaaa" ><img src="http://weike.lanqiao.cn/static/dasai-ad/ad.png"></a>');
document.write('<span style="color:#303030;font-size:31px;font-weight:bold;position: absolute;left:365px;top:37px;display:inline-block;width:80px;text-align:center;">'+Stext+'</span>');
document.write('</div>');


var divid= "div1";




setInterval(function (){
		
		var tempid = (divid =="div1") ? "div2" : "div1";
		$("#" + tempid).css("display","block");
		$("#" + divid).css("display","none");
		
		divid = tempid;
		
	},2000);
	