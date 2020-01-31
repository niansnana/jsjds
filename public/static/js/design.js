$(function(){
	
	$(window).scroll(function(event){
		var height = $(document).height();
		var width = $(document).width()
		$('#shade').css({'height':height,'width':width})
	});
	
	// 平面金奖
	$("#panel-gold").on('click',function(){
		handlePrame($("#panel1"),'open')
	})
	// 平面银奖
	$("#panel-sliver").on('click',function(){
		handlePrame($("#panel2"),'open')
	})
	// 平面铜奖
	$("#panel-bronze").on('click',function(){
		handlePrame($("#panel3"),'open')
	})
	
	
	// 动画金奖
	$("#ani-btn1").on('click',function(){
		handlePrame($("#ani1"),'open','.header,.brief')
	})
	// 动画银奖
	$("#ani-btn2").on('click',function(){
		handlePrame($("#ani2"),'open','.header,.brief')
	})
	// 动画铜奖
	$("#ani-btn3").on('click',function(){
		handlePrame($("#ani3"),'open','.header,.brief')
	})

	
	// 视频金奖
	$("#video-btn1").on('click',function(){
		handlePrame($("#video1"),'open','.video-wrap')
	})
	// 视频银奖
	$("#video-btn2").on('click',function(){
		handlePrame($("#video2"),'open','.video-wrap')
	})
	// 视频铜奖
	$("#video-btn3").on('click',function(){
		handlePrame($("#video3"),'open','.video-wrap')
	})
	
	
	// 关闭按钮
	$(".close-btn").on('click',function(){
		handlePrame($(this).parents(".section").find(".banner"),'close')
	})
	$(".close-btn").on('click',function(){
		handlePrame($(this).parents(".section").find(".intro"),'close')
	})
	
	
})

	function handlePrame(el,msg,notShow){
		if (msg=="open") {
		
			$("#shade").show();
			el.show();
			$("body").css({"overflow-y":"hidden","overflow-x":"hidden"});
			if(notShow){
				$(el).find(notShow).hide();
				$(el).parents(".section").attr("notShow",notShow);
			}
				
		} else if(msg=="close"){
			
			$("#shade").hide();
			el.hide();
			$("body").css({"overflow-y":"scroll","overflow-x":"scroll"});
			var ns=$(el).parents(".section").attr("notShow");
			if(ns){
				$(el).find(ns).show();
				$(el).removeAttr("notShow");
			}
			
		}
		
	}
	