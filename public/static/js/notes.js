
var pageNo=1;
function test(id){

	window.location.href="/pages/dasai/news_detail.html?id="+id;
	
}
// 焦点新闻默认第一条
var countPage=0;
function force_news(){
	var force_msg='';
	
	$getJSON($URL_INDEX_NEWS+"/API.php?m=list&id="+num,function(data){
		data=eval('('+data+')');
		countPage=data.total%10==0?data.total/10:parseInt(data.total/10)+1;
		news(1)
	});
}
//判断是新闻还是通知,默认是新闻
var num=20;
$(function(){
	var str=window.location.href;
	 num=str.split("=")[1];
	 console.log(num);
	if(pageNo==1){
		force_news();
	}
})
var temp=0;
function news(pageNo){
	var news_msg='';
	$getJSON($URL_INDEX_NEWS+"/API.php?m=list&id="+num+"&p="+pageNo+"&s=10",function(data){
		data=eval('('+data+')');
		var k=0;
		for(var i=0;i<data.new_list.length;i++){
			if(pageNo==1&&i==0){
				$(".top-line").css("height","50px");
				news_msg+='<div class="news-focus noimg">';
				news_msg+='<div class="clearfix news-t">';
				news_msg+='<a class="fl" href="javascript:test('+data.new_list[0].id+')" >'+data.new_list[0].title+'</a>';
				
				news_msg+='<p <p class="fr tag">'+(data.new_list[0].admin==''?'蓝桥杯大赛组委会':data.new_list[0].admin)+'</p>';
				news_msg+='</div>';
				news_msg+='<div class="news-text">'+data.new_list[0].content+'</div>';
				news_msg+='<div class="clearfix news-info">';
				news_msg+='<p class="fl">'+data.new_list[0].up_time+'</p>';
				news_msg+='<a href="javascript:test('+data.new_list[0].id+')"  class="fr">阅读全文</a>';
				news_msg+='</div>';
				$("#force").html(news_msg);
				news_msg='';
				if(temp==1){
					$("#line_id").addClass("border_bottom")
					$(".border_bottom").css("margin-top","70px");
					$(".border_bottom").css("border-top","#e6e6e6 solid 1px");
					console.error($(".border_bottom").css("border-top"));
				}else{
					$(".border_top").css("border-top","30px");
				}
				temp=1;
				continue;
			}else if(page!=1&&i==0){
				$("#force").html("");
				$(".top-line").css("height","0px");
				$(".news_list").removeClass(".news_list");
				$("#news_id").addClass("margin_top");
				$("#news_id").addClass("border_top");
				if(temp==1){
					$(".border_top").css("border-top","30px");
				}else{
					$(".border_top").css("border-top","#e6e6e6 solid 1px;");
				}
				$(".margin_top").css("margin-top","0px");
			}

			news_msg+='<div class="block noimg">';
			news_msg+='<div class="clearfix news-t">';
			news_msg+='<a href="javascript:test('+data.new_list[i].id+')">'+data.new_list[i].title+'</a>';
			news_msg+='<p class="fr tag">'+(data.new_list[i].admin==''?'蓝桥杯大赛组委会':data.new_list[i].admin)+'</p>';
			news_msg+='</div>';
			news_msg+='<div class="news-text">'+data.new_list[i].content+'</div>';
			news_msg+='<div class="clearfix news-info">';
			news_msg+='<p class="fl">'+data.new_list[i].up_time+'</p>';
			news_msg+='<a href="javascript:test('+data.new_list[i].id+')" class="fr">阅读全文</a>';
			news_msg+='</div>';
			news_msg+='</div>';
			

		}
		$("#news").html(news_msg);
		acciPage("#page",news,countPage,pageNo);
	
	});
}



