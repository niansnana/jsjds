$(function(){
	//控制单选按钮样式
	$("input[type='radio']").on("click", function() {
//		$(this).parent().addClass("active").siblings().removeClass("active");	
//		$(this).parent().find("input[type='radio']").removeAttr('checked');		
//		$(this).parent().find("input[type='radio']").prop('checked', 'checked');		
		
			$(this).parent().addClass("checked");
			var $name=$(this).attr("name");
			if($name){ //同一name在同一form下单选框互斥 modified by Chunsun Qin.
				$(this).parents("form").find(":radio[name='"+$name+"']").not($(this)).parent().removeClass("checked");
			}
			$(this).parent().addClass("active");
			if($name){ //同一name在同一form下单选框互斥 modified by Chunsun Qin.
				$(this).parents("form").find(":radio[name='"+$name+"']").not($(this)).parent().removeClass("active");
			}
	})
	//checbox
	$("input[type='checkbox']").click(function() {
		var size = $("input[type='checkbox']").not("#checkAll").length;
		var checkSize = $("input[type='checkbox']:checked").not("#checkAll").length;			
		if (size == checkSize) {			
			$("#checkAll").parent().addClass("active");			
		} else {
			$("#checkAll").parent().removeClass("active");
		}
		
		if($(this).attr("id") === "checkAll"){
			checkAll();
		}else{
			$(this).parent().toggleClass("active");	
		}	
		
	});
	
	//点亮进度，添加样式
	setTimeout('addDClass()',1000);
	
	
	
	
	
});
function addDClass(){
	if($(".apply-step .down").length){		
		$(".apply-step .down:last").addClass("next");
	}
}
function resetCheckBox(selector){
	$(selector).find("input[type='checkbox']").each(function(){
		if($(this).is("[click-binded]")){
			return;
		}
		$(this).attr("click-binded","true");

		$(this).on('click', function() {
			$(this).parent().toggleClass("active");
			$(this).parent().toggleClass("checked");
		});
	});
}

function showDialog($obj){
	$($obj).fadeIn();
}
function closeDialog($obj,notClear){
	$($obj).fadeOut();
	if($($obj).find("form").length>0&&!notClear){ //关闭时清空.
		$($obj).find("form")[0].reset();
		$($obj).find("form").find(".msg,.err,.msg-box").html("");
		$($obj).find("form").find("input,select").removeAttr("style");
	}
}

//function closeDialogAccountBind($obj,notClear){
//	$($obj).fadeOut();
//	if($($obj).find("form").length>0&&!notClear){ //关闭时清空.
//		$($obj).find("form")[0].reset();
//		$($obj).find("form").find(".msg,.err,.msg-box").html("");
//		$($obj).find("form").find(".icon").remove();
//		$($obj).find("form").find("input").val("");
//		//$($obj).find("form").find("input,select").removeAttr("style");
//		$($obj).find("form").find("input").css("border-color","#c8d2d7");
//	}
//}

//修改页面用
function closeDialogAccountBind($obj,notClear){
	$($obj).fadeOut();
	if($($obj).find("form").length>0&&!notClear){ //关闭时清空.
		$($obj).find("form")[0].reset();
		$($obj).find("form").find(".msg,.err,.msg-box").html("");

		//$($obj).find("form").find("input,select").removeAttr("style");
		$($obj).find("form").find(".icon").remove();
		$($obj).find("form").find("input").val("");
		$($obj).find("form").find("input").css("border-color","#c8d2d7");

	}
}
//追加页面用
function closeDialogNotNull($obj){
	$($obj).fadeOut();
	$($obj).find("form").find("input[type='text']").val("");

	$($obj).find("form").find("input[type='radio']").attr("checked",false);
	$($obj).find("form").find("input[type='radio']").removeClass("active");
	$($obj).find("form").find(".msg,.err").text("");
	$($obj).find("form").find("input:text:visible").removeAttr("style");
	//$($obj).find("form").find("select").removeAttr("style");
	$($obj).find("form").find("span").remove();
}
//修改页面用
function closeDialogNotNullUpdate($obj){
	$($obj).fadeOut();
	//$($obj).find("form").find("input[type='text']").val("");

	//$($obj).find("form").find("input[type='radio']").attr("checked",false);
	//$($obj).find("form").find("input[type='radio']").removeClass("active");
	$($obj).find("form").find(".msg,.err").text("");
	$($obj).find("form").find("input:text:visible").removeAttr("style");
	$($obj).find("form").find("span").remove();
}


function checkAll(){
	idSelected = $("#checkAll").is(":checked");
	if(idSelected){
		$(".checkbox").addClass("active");
		$(":checkbox").prop("checked", "checked");
	}else{
		$(".checkbox").removeClass("active");
		$(":checkbox").removeAttr("checked");
	}
}

function tourl(url){
	location.href=url;
}
function tourlNewWin(url){
	//location.href=url;
	if(!url) return;
	var winf=$("<form action='"+url+"' target='_blank'></form>");
	var searchBlockIndex=url.indexOf("?");
	if(searchBlockIndex>0){
		var end=url.length;
		var j=url.indexOf("#");
		if(j>searchBlockIndex){
			end=j;
		}
		var searchBlock=url.substring(searchBlockIndex+1,end);
		var searchli=searchBlock.split("&");
		for(var ii in searchli){
			var kk=searchli[ii].split("=");
			if(kk.length==2){
				var p=$("<input type='hidden' name='"+kk[0]+"' value='"+kk[1]+"'>");
				p.appendTo(winf);
			}
		}
	}	
	
	winf.appendTo($("body"));
	winf.submit();
}

var Validate = ({
	address:function(ele){
		var val = ele.val();
		return val===''?false:true;
	},
	number : function(ele){
		var val = ele.val();
		return /^\d+$/.test(val);
	},
	//字母或数字
	word_number: function(ele){
		var val = ele.val();
		return /^[A-Za-z0-9]+$/.test(val);
	},
	//正金额(可以为0,不能为负数)
	moneyps: function(ele){
		var val = ele.val();
		return /^\d+(?=\.{0,1}\d{0,2}$|$)/.test(val);
	},
	postal:function(ele){
		var val = ele.val();
		return  /^[0-9]{6}$/.test(val);
	},
	require:function(ele){
		var val = ele.val();
		return !/^\s*$/g.test(val);
	},
	email:function(ele){
		var val = ele.val();
		return /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/.test(val)
	},
	phone:function(ele){
		var val = ele.val();
		//return /^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/.test(val);
		return /^1[0-9]{10}$/.test(val);
	},
	phoneOrMobile:function(ele){
		var val = ele.val();
		return /^13[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/.test(val) || /^(0\d{2,3}?)?\d{7,8}$/.test(val);
	},
	telephone:function(ele){
		var val = ele.val();
		return /^(0\d{2,3}?)?(-)?\d{7,8}$/.test(val);
	},
	length:function(ele){
		var val = ele.val();
		return val.replace(/[^\x00-\xff]/g, '__').length;
	},
	eduno:function(ele){  //学号  长度不能大于15
		var val = ele.val();
		if(!val){
			return false;
		}
		if(val.length>19){
			return false;
		}
		return true;
	},
	zh_verify:function(ele){
		var val = ele.val();
		var min = ele.data("param").split(",")[0];
		var max = ele.data("param").split(",")[1];
		if( /^[\u4e00-\u9fa5]+$/.test(val) ){
			var length = val.length
			return val.length>=min && val.length<=max
		}
		return false;
	},
	range:function(ele){//字母或汉字开头,min-max位组成
		var val = ele.val();
		var min = ele.data("param").split(",")[0];
		var max = ele.data("param").split(",")[1];
		return val.length>=min && val.length<=max
	},
	password:function(ele){//数字＋字母,min-max位组成
		var val = ele.val();
		var min = ele.data("param").split(",")[0];
		var max = ele.data("param").split(",")[1];
		if( /^[A-Za-z0-9]+$/.test(val) ){
			var length = val.length
			return val.length>=min && val.length<=max
		}
		return false;
	},
	maxNum:function(ele){ //小于max的数字
		var val = ele.val();
		var max = ele.data("param").split(",")[0];
		if( /^[0-9]+$/.test(val) ){
			return val>max;
		}
		return false;
	},
	max_length:function(ele){ //最大长度
		var val = ele.val();
		var max = ele.attr("max_len");
		if(val.trim().length==0){
			return false;
		}
		if(val.length<max){
			return true;
		}

		return false;
	},
	c_cert:function(ele){
		var val = ele.val();
		var cert=$("#cert");
		if($("#cert").length==0){
			cert=$("#cert2")
		}
		if(cert.length==0){
			cert=$("#unpasscert")
		}
		var baseReg = cert.find("option:selected").text();
		var idLen = $.trim(val).length;
		if(baseReg == '身份证'){
			if(idLen == 15){
				return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(val)
			}else if(idLen == 18){
				//return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(val);
				return identityCardNo(val);
			}else{
				return false;
			}
		}else{
			return idLen>0?true:false;
		}
	},
	c_cert_contact:function(ele){
		var val = ele.val();
		//var cert=$("#cert");
		//if($("#cert").length==0){
		//	cert=$("#cert2")
		//}
		//var baseReg = cert.find("option:selected").text();
		var idLen = $.trim(val).length;
		//if(baseReg == '身份证'){
			if(idLen == 15){
				return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(val)
			}else if(idLen == 18){
				return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(val);
			}else{
				return false;
			}
		//}else{
		//	return idLen>0?true:false;
		//}
	},
	handlePass:function(flag,ele,msg){
		var msg_box = ele.next().size()>0 ? ele.next():$('<div class="msg-box" ></div>');
		if(!ele.next().size()>0){
			msg_box.appendTo(ele.parent());
		}
		if(flag){
			msg_box.html('<span class="icon ok"></span>');
			ele.css("border-color","#c8d2d7");
			return true;
		}else{
			msg_box.html('<span class="icon"></span><span class="msg" style="color:rgb(255, 86, 0)">'+msg+'</span>');

			ele.css("border-color","#ff5600");

			return false;
		}
	}
});



