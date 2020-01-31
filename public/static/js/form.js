$(function(){

	initFormRule();
	
});

var initFormRule=function(formSelector){
	if(!formSelector){
		formSelector="form";
	}
	formSelector=formSelector+" ";
	$(formSelector + "input[data-rule]").blur(function(){
		var rule = $(this).data("rule").split(":");
		method = rule[0],
			msg = rule[1],
			_this = $(this);
		if($(this).hasClass('laydate-icon')){
			return false;
		}else{
			if(method=='equals_to'&&!$(this).val()){ //如果没值,则按默认提示报错.
				msg = $(this).attr("placeholder");
			}
			Validate.handlePass(Validate[method]($(this)),$(this),msg)
		}
	});
	$(formSelector + "textarea[data-rule]").blur(function(){
		var rule = $(this).data("rule").split(":");
		method = rule[0],
			msg = rule[1];
		Validate.handlePass(Validate[method]($(this)),$(this),msg)
	});
	$(formSelector + "input[data-file]").change( function(){
		var filepath=$(this).val();
		var ext=filepath.substring(filepath.lastIndexOf("."),filepath.length).toUpperCase();
		var img_view = $(this).siblings("img");
		/*格式校验*/
		if( ext!=".PNG" && ext!=".JPG"){
			$(this).closest(".file").parent().find(".msg-box").html('<span class="icon"></span><span class="msg">图片限于png,jpg格式</span>');
			$(this).data("pass","no");
			img_view.attr("src","#");
			if($(this).attr("data-alert")){
				showAlert(0,"图片限于png,jpg格式");
			}
			return false;
		}else{
			var file_size = this.files[0].size;
			/*文件大小校验*/
			if(file_size>2*1024*1024){
				$(this).closest(".file").parent().find(".msg-box").html('<span class="icon"></span><span class="msg">上传的文件大小不能超过2M</span>');
				$(this).data("pass","no");
				img_view.attr("src","#");
				return false;
			}else{
				$(this).closest(".file").parent().find(".msg-box").html('');
				$(this).data("pass","yes");
				var reader = new FileReader();
				reader.onload = function(e) {
					img_view.attr("src",e.target.result);
				}
				reader.readAsDataURL(this.files[0]);
				imgToUploadFile(img_view,$(img_view).siblings("input[data-imgurl]"));

			}
		}
	});

	$(formSelector + "select").change(function(){
		$("select[data-rule]").each(function(){
			var method = $(this).data("rule").split(":")[0];
			var isPass = Validate[method]($(this));
			if(!isPass){
				$(this).closest(".dropdown").next().html('<span class="icon"></span><span class="msg">请选择地址</span>');
			}else{
				$(this).closest(".dropdown").next().html('<span class="icon ok"></span>');
			}
		});
	})
};

function subForm(ele){
	ele.submit(function(){
		var noPass = 0;
		ele.find("input[data-rule]").each(function(){
			var rule = $(this).data("rule").split(":");
				method = rule[0],
				msg = rule[1];
			var isPass = Validate.handlePass(Validate[method]($(this)),$(this),msg);
			if(!isPass){
				noPass++;
			}
		});
		ele.find("textarea[data-rule]").each(function(){
			var rule = $(this).data("rule").split(":");
				method = rule[0],
				msg = rule[1];
			var isPass = Validate.handlePass(Validate[method]($(this)),$(this),msg);
			if(!isPass){
				noPass++;
			}
		});
		
		ele.find("input[type=file]").each(function(){
			var msg = $(this).data("msg") ? $(this).data("msg") : '请上传图片';
			if($(this).data("pass") == "no"){
				$(this).closest(".file").parent().find(".msg-box").html('<span class="icon"></span><span class="msg">'+msg+'</span>');
				noPass++;
			}
		});
		
		ele.find("select[data-rule]").each(function(){
			var method = $(this).data("rule").split(":")[0];
			console.log(method)
			var isPass = Validate[method]($(this));
			if(!isPass){
				noPass++;
				$(this).closest(".dropdown").next().html('<span class="icon"></span><span class="msg">请选择地址</span>');
			}else{
				$(this).closest(".dropdown").next().html('<span class="icon ok"></span>');
			}
		});
		
		ele.find("label[data-pass]").each(function(){
			var h = $(this).closest(".file").parent().html();
				console.log(h)
			var msg = $(this).data("msg") ? $(this).data("msg") : '请上传图片';
			if($(this).data("pass") == "no"){
				var h = $(this).closest(".file").parent().html();
				console.log(h)
				$(this).closest(".file").parent().find(".msg-box").html('<span class="icon"></span><span class="msg">'+msg+'</span>');
				noPass++;
			}
		});
		
		if(noPass>0){
			return false;
		}
	});
}
