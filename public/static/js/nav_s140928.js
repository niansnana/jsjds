
function startNav(){
	
	
	//页面加载
	var $window = $(window),
		$doc = $(document),
		$body = $("body"),
	   
		afterheadHeight = $("#logowraper").height()+$("#navwraper_g140925").height()+30,
		speed = 250;
	//判断对象
	//$container.animate({"top":headHeight},speed*1.5);

	
	// 导航效果 调用（外层框架，菜单外框架，列表标签，指针标签，速度，列表跟进指针样式名）
	navScroll(fnEach($("#navwraper_g140925")),fnEach($("#nav_yhdl_s140928")),fnEach($("#navmenu")),"dd","dt",speed,"curr_g140925");  
	//srchEff(fnEach($("#srchText")),176,140,speed);

	function fnEach(Dom){
		if(Dom.length !=0 ){
			return Dom;
		} else {
			return $(null);
		};
	};
	
	
	
	//导航
	function navScroll(navwrap,Dom,Menu,list,curr,speed,defClass){
		var $list = Dom.find(list),
			listLen = $list.length,
			$menuList = Menu.find("dl"),
			menuLen = $menuList.length;
			i=0,arrListInfo = [],
			bool = true,
			currIdx = 0;
		for(i = 0;i<listLen; i++){
			var othis = $list.eq(i),
			    sPath = othis.find("a").attr("href"),
				sText = othis.text(),
				nPosX = othis.position().left,z;
			arrListInfo.push([sText,nPosX,sPath]);
			if(othis.hasClass(defClass)&&bool){
				Dom.append("<dt style=\"display:none;left:"+nPosX+"px;\"><a href=\""+ sPath +"\"><span>"+ sText +"</span><em></em></a></dt>")
				   .find(curr)
				   .fadeIn(200);
				bool = false;
				currIdx = i;
			};
			for(z=0;z<menuLen;z++){
				var omenu = $menuList.eq(z);
				if(Number(omenu.attr("name")) == i){
					omenu.css("left",nPosX)
					     .find("dd:last a").css("background","none");
				};
			};
		};
		setTimeout(function(){
			$list.bind("mouseover",function(){
				var index = $(this).index();
				fnAnimate(Dom,arrListInfo,index,$menuList,true);
				return false;
			});
			navwrap.bind("mouseleave",function(){
				$menuList.fadeOut(speed);
				fnAnimate(Dom,arrListInfo,currIdx,$menuList,false);
				return false;
			});
		},speed);
		function fnMenuShow(d,y){
			if(y != -1){
				d.eq(y).fadeIn(speed).siblings().fadeOut(speed);
			};
			return false;
		};
		function fnAnimate(d,a,x,m,b){
			d.find(curr)
			   .stop()
			   .animate({
				"left": a[x][1]
				},speed,function(){
					$(this).find("a")
						   .attr("href",a[x][2])
						   .find("span")
						   .text(a[x][0])
						   //.fadeIn(100);
					if(b){
						m.fadeOut(speed);
						fnMenuShow(m,x-1);
					};
				})
				.find("span")
				.hide();
			return false;
		};
		return false;
	};
};
