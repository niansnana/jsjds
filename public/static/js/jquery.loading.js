/*
 * 显示遮档层
 */
function getLoadLayer(obj) {
	var wrap = obj;
	$(
			"<div class=\"jquery-loading-css-datagrid-mask\" style=\"z-index:100000000000000\"></div>")
			.css({
				display : "block",
				width : wrap.width(),
				height : wrap.height()
			}).appendTo(wrap);
	$(
			"<div id=\"loadingDivId\" class=\"jquery-loading-css-datagrid-mask-msg\" style=\"z-index:100000000000000\"></div>")
			.appendTo(wrap).css({
				display : "block"
			});
}

/*
 * 移除遮档层
 */
function removeLoadLayer(obj) {
	var _rll = obj;
	_rll.children("div.jquery-loading-css-datagrid-mask-msg").remove();
	_rll.children("div.jquery-loading-css-datagrid-mask").remove();
}