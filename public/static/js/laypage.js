/**
 * 
 */
var pageinit={};

 pageinit.init=function(){
 	layui.use('laypage', function(){
		  var laypage = layui.laypage;
		  //执行一个laypage实例
		  laypage.render({
		    elem: pageinit.option.elem //注意，这里的 test1 是 ID，不用加 # 号
		    ,count: pageinit.option.count //数据总数，从服务端得到
		    ,limit:20
		    ,layout: [ 'prev', 'page', 'next', 'count']
			,jump: function(obj, first){
			    //obj包含了当前分页的所有参数，比如：
			    //首次不执行
			    if(!first){
			     pageinit.option.callback(obj.curr);
			    }
			}
		  });
		});
 }
 