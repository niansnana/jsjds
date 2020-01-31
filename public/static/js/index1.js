
! function (window, $) {

  var award = function () {
			
  }
	 
	//选手轮播
	award.swiper1 = new Swiper('.swiper1',{
		autoplay: false,
		speed: 1000,
		autoplayDisableOnInteraction: false,
		loop: true,
		centeredSlides: true,
		slidesPerView: 2,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		onInit: function(swiper) {
			//swiper.slides[2].className = "swiper-slide swiper-slide-active";
		},
		onSlideChangeStart: function(swiper){
			console.log(swiper.realIndex)
			$( '.company-list .tab-content .player li' ).eq(swiper.realIndex).addClass('on').siblings().removeClass('on');
		}
	});
	//指导教师轮播
	award.swiper2 = new Swiper('.swiper2',{
		autoplay: false,
		speed: 1000,
		autoplayDisableOnInteraction: false,
		loop: true,
		centeredSlides: true,
		slidesPerView: 2,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
		onInit: function(swiper) {
			//swiper.slides[2].className = "swiper-slide swiper-slide-active";
		},
		onSlideChangeStart: function(swiper){
			$( '.company-list .tab-content .teacher li' ).eq(swiper.realIndex).addClass('on').siblings().removeClass('on');
		}
	});
	
	// 就业之星轮播
	award.swiper3 = new Swiper('.swiper3', {
		slidesPerView: 6,
		slidesPerColumn: 2,
		spaceBetween: 0,
		grabCursor: true,
		slidesPerColumnFill : 'row',
		loop: false,
		loopFillGroupWithBlank: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		prevButton: '.button-prev',
		nextButton: '.button-next'
	});
	
	// 大赛奖项轮播
	award.comSwriper = new Swiper('.swiper-awards', {
		autoplay: false,
		effect : 'fade',
		fade: {
			crossFade: true,
		},
		slidesPerView: 1,
		spaceBetween: 30,
		loop: false,
		prevButton: '.comswiper-button-prev',
		nextButton: '.comswiper-button-next'
	});
	
	// 青蓝峰会轮播
	award.swiper4 = new Swiper('.swiper4', {
		autoplay: false,
		// slidesPerView: 1,
		loop: false,
		prevButton: '.metting-button-prev',
		nextButton: '.metting-button-next'
	});
	
	
  //初始化
  award.init = function () {
    this.bindEvent();
		$('.tab-title li').eq(0).trigger("click");
  }
	
  //事件绑定
  award.bindEvent = function () {
		
    $('.tab-title li').on('click', award.typeTabEvt)
		
    $('.tab-content .player li').on('click', award.playerTabContEvt)
    $('.tab-content .teacher li').on('click', award.teacherTabContEvt)
		
  }
  
  award.typeTabEvt = function () {
    var index = $(this).index();
		$(this).addClass('act').siblings().removeClass('act');
		console.log("tab:"+index)
		$('.tab-content .award-list').eq(index).show().siblings().hide();
		$('.banner .swiper-container').eq(index).show().siblings().hide();
	}
	
	award.playerTabContEvt = function (){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		console.log("player:"+index)
		award.swiper1.slideTo(index+2);
	}
	
	award.teacherTabContEvt = function (){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		console.log("teacher:"+index)
		award.swiper2.slideTo(index+2);
	}
	
  award.init();

}(window, jQuery)