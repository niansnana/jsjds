$( function(){
		init()
		
	})
	function init() {
		$( document ).scroll(function(){
			var height=$(document).scrollTop()
			if(height<370){
				$( '#left-nav' ).css('background','rgba(24, 8, 67, 0)')
			}else{
				$( '#left-nav' ).css('background','rgba(24, 8, 67, 0.73)')
			}
	
		})
		//上下滚动
        $("#container").children().show();
        var t = skrollr.init({
            constants: {}
        });
        skrollr.menu.init(t, { 
            animate: !0,
            easing: "sqrt",
            change: function(t, e) {
            	
            }
        })
        //轮播图
        var swiper = new Swiper('.swiper-container', {
	        pagination: {
		        el: '.swiper-pagination',
		        type: 'fraction',
		      },
		      navigation: {
		        nextEl: '.swiper-button-next1',
		        prevEl: '.swiper-button-prev1',
		    }
	    });
         //轮播图
        var swipers = new Swiper('.swiper-container1', {
	        pagination: {
		        el: '.swiper-pagination',
		        type: 'fraction',
		      },
		      navigation: {
		        nextEl: '.swiper-button-next2',
		        prevEl: '.swiper-button-prev2',
		      }
	    });
	    var swiper = new Swiper('.swiper-container3', {
	      direction: 'vertical',
	      slidesPerView: 'auto',
	      freeMode: true,
	      scrollbar: {
	        el: '.swiper-scrollbar',
	      },
	      mousewheel: true,
	    });

	    //tab切换
	    $( '#move .tabNav li' ).on('click',function(){
	    	
	    	var index=$(this).index();
	    	$( this ).parents('.tabNav').removeClass('nav1 nav2 nav3').addClass('nav'+(index+1))
	    	$('#move .tab_box>div').eq(index).fadeIn(300).siblings().fadeOut(300);
	    })
	    
	    //tab切换
	    $( '#talkers .tabNav li' ).on('click',function(){
	    	
	    	var index=$(this).index();
	    	$( this ).parents('.tabNav').removeClass('nav1 nav2 nav3').addClass('nav'+(index+1))
	    	$('#talkers .tab_box>div').eq(index).show(0).siblings().hide(0);
	    })
	    
	    
	    
	    
	    //title 切换
        $( '.title .icon' ).on('click',function(e){
        	stopPropagation(e);
        	$(this).toggleClass('active');
        	$( this ).parents('.title').find('.popbox').fadeToggle(300);
        })
        //title 隐藏
        $('.popbox').bind('click',function(e){
                stopPropagation(e);
            });
        $(document).on('click',function(){
        	$( '.title .icon' ).removeClass('active')
            $('.popbox').fadeOut(300);
        });
    
		$( '#move .tabNav ul li' ).eq(0).click();
		$( '#talkers .tabNav ul li' ).eq(0).click();
		//小的tab切换
		
		$( '.bottom .left ul li' ).on('click',function(){
			var index=$(this).index();
	    	$( this ).addClass('active').siblings().removeClass('active');
	    	
	    	$(this).parents('.bottom').find('.right').find('div').eq(index).fadeIn(300).siblings().fadeOut(300)
		})
		
		$('.item_one .swiper-slide ul li .right .more-icon').click(function (){
			
			if($(this).prop('className').indexOf('more-on') == -1){
				$(this).addClass('more-on');
				$(this).parent().next().fadeIn();
				$('.item_one .swiper-wrapper').css('z-index','11');
			}else{
				$(this).removeClass('more-on');
				$('.item_one .swiper-button-next1').show();
				$(this).parent().next().fadeOut();
			}
		})		
		
		$('.swiper-slide ul li .info-wrap').mouseleave(function (){
			$(this).fadeOut();
			$(this).prev().find('.more-icon').removeClass('more-on');
			$('.item_one .swiper-wrapper').css('z-index','1');
		})
		
	}
	
	
	function stopPropagation(e) {
        if (e.stopPropagation) 
            e.stopPropagation();
        else 
            e.cancelBubble = true;
    }