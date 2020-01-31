/**
 * 
 */

$(function(){
	detail();
});

function detail(){
//	$.ajaxSettings.async = false;
	var str=window.location.href;
	 var num=str.split("=")[1];
	$getJSON($URL_INDEX_NEWS+"/API.php?id="+num,function(data){
		data=eval('('+data+')');
		var msg_detail='';
		msg_detail+='<div class="detail-t">';
		msg_detail+='<p class="tag">'+(data.admin==''?'蓝桥杯大赛组委会':data.admin)+'</p>';
		msg_detail+='<p class="p2">'+data.title+'</p>';
		msg_detail+='<p class="p3">'+data.update_time+'</p>';
		msg_detail+='</div>';
		msg_detail+='<div class="content">';
		msg_detail+='<div class="news-text">'+data.content+'</div>';
		msg_detail+='</div>';
		$("#detail").html(msg_detail);
	});
}
