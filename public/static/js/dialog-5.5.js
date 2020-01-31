;(function($, window, undefined) {
    
    var Dialog = function(options) {
    	this.settings = $.extend({}, Dialog.defaults, options);
    	this.init();
    }
	
    Dialog.prototype = {
    	
    	//初始化	
    	init : function() {
            this.createHtml();
        },
        //创建dom
    	createHtml : function(){
    	 	var $ok = (this.settings.okText.length > 0) ? '<button id="ok">'+this.settings.okText+'</button>' : '';
    	 	var $cancel = (this.settings.cancelText.length > 0) ? '<button id="cancel">'+this.settings.cancelText+'</button>' : '';
    	 	
    	 	var confirmHtml = '<div class="dialog">'+
							'<div class="content" style="width:'+this.settings.dialogWidth+'px;margin-left:'+(-this.settings.dialogWidth/2)+'px">'+
								'<img src="'+$STATIC_URL+'/dasai/images/icon/icon-close.png" class="close"/>'+
								'<p class="title">'+this.settings.title+'</p>'+
								'<div class="main">'+this.settings.content+'</div>'+
								'<div class="btns">'+ $ok + $cancel +'</div>'+
							'</div>'+
						'</div>';
						
			this.dialog = $(confirmHtml).appendTo("body");
           
           var _this = this;
			// 设置ok按钮
           this.dialog.find("#ok").click(function(){
           		_this.ok();
           });
            // 设置cancel按钮
           this.dialog.find("#cancel").click(function(){
           		_this.cancel();
           });
             // 设置关闭差号
            this.dialog.find("img.close").click(function(){
            	_this.close();
            });
    	},
    	//点击确定按钮
    	ok : function() {
    		this.close();
    		var okCallback = this.settings.ok();
    		if (typeof (callback) == 'function') {
                okCallback;
            }
    		/*var okCallback = this.settings.ok();
            if (okCallback == undefined || okCallback) {
                this.close();
            }*/
        },
        //点击取消按钮
        cancel : function() {
        	this.close();
        	if(this.settings.cancel){
        		var cancelCallback = this.settings.cancel();
	        	if (typeof (cancelCallback) == 'function') {
	                cancelCallback;
	            }
        	}
        	
        	/*var cancelCallback = this.settings.cancel();
            if (cancelCallback == undefined || cancelCallback) {
                this.close();
            }*/
        },
    	//关闭确认框
        close: function () {
            this.dialog.remove();
            if (this.settings.close) {
                var closeCallback = this.settings.close();
                if (typeof (closeCallback) == 'function') {
                    closeCallback;
                }
            }
        }
    }
     //默认配置
    Dialog.defaults = {
    	dialogWidth:0,//弹出框的宽度
        content: '确认框内容',
        title: '确认框内容标题',
        /*ok: function(){},// 确定按钮回调函数
        cancel: function(){},//  // 取消按钮回调函数*/
       ok:null,
       cancel:null,
       	okText: '',// 确定按钮文字
        cancelText: '',// 取消按钮文字
    }
    var yehDialog = function(options) {
        return new Dialog(options);
    }
  	window.yehDialog = $.yehDialog = yehDialog;
  	
   
})(window.jQuery || window.Zepto, window);
