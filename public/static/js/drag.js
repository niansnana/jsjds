function DragImg(el, option) {
	var _this = this
	var defaultOpt = {
		getLeft: function() {}
	}
	this.opts = $.extend(defaultOpt, option)
	_this.$_this = $(el)
	_this.$dragWrap = _this.$_this.closest('.drag-wrap')
	_this.$imgSmall = _this.$dragWrap.find('.drag-img-small')
	_this.$dragInner = _this.$dragWrap.find('.drag-inner')
	_this.$moveCont = _this.$_this.parent()
	_this.wrapWidth = _this.$dragWrap.width()
	_this.dragWidth = _this.$_this.width()
	_this.smllImgWidth = _this.$imgSmall.width()
	_this.left = 0
	_this.start = 0;
	_this.isMouseDown = false;
	_this.isStop = false;
}
DragImg.prototype = {
	constructor: DragImg,
	init: function() {
		var _this = this
		_this.$_this.on('mousedown', function(e) {
			if(_this.isStop) {
				return false
			}
			_this.start = e.pageX
			_this.isMouseDown = true
		})
		$(document).on('mousemove', function(e) {
			if(_this.isStop) {
				return false
			}
			if(_this.isMouseDown) {

				var movex = e.pageX - _this.start
				movex = movex < 0 ? 0 : movex
				var moveSmallImg = movex
				movex = movex > (_this.wrapWidth - _this.dragWidth) ? _this.wrapWidth - _this.dragWidth : movex
				moveSmallImg = moveSmallImg > (_this.wrapWidth - _this.smllImgWidth) ? _this.wrapWidth - _this.smllImgWidth : moveSmallImg
				_this.left = moveSmallImg

				_this.$imgSmall.css('left', moveSmallImg)
				_this.$_this.css('left', movex)
				_this.$dragInner.css('width', movex + 'px')
			}
		})
		$(document).on('mouseup', function(e) {
			if(_this.isMouseDown) {
				_this.isStop = true
				_this.opts.getLeft(_this.left)
			}
			_this.isMouseDown = false
		})
	},
	toLeft: function() {
		var _this = this
		_this.$_this.animate({
			left: 0
		})
		_this.$imgSmall.animate({
			left: 0
		})
		_this.$dragInner.animate({
			'width': 0
		}, function() {
			_this.isStop = false
		})
		this.$dragWrap.removeClass(this.$dragWrap.attr('data-class'))
	},
	setState: function(classNames) {
		this.$dragWrap.addClass(classNames).attr('data-class', classNames)
	},
	reset: function() {
		this.toLeft()
	}

}

