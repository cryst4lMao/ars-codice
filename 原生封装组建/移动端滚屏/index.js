;(function (data) {
	'use strict';
	function touch(ops){
		this.section = ops.section;
		this.direc = ops.direction || 'vertical';
		this.fn = ops.fn || null;
		this.section && this.init();
		this.pages = ops.pages;
	}

	touch.prototype.init = function () {
		this.width = (window.innerWidth > 750) ? 750 : window.innerWidth;
		this.height = window.innerHeight;
		this.boundary = this.height / this.pages;

		if(this.direc != 'horiz'){
			for(var i=0, l=this.section.length; i<l; i++){
				this.section[i].style.position = "absolute";
				this.section[i].style.transform = "translate3d(0,"+i*this.height+"px,0)";
			}
		}else{
			for(var i=0, l=this.section.length; i<l; i++){
				this.section[i].style.position = "absolute";
				this.section[i].style.transform = "translate3d("+i*this.width+"px,0,0)";
			}
		}
	}

	touch.prototype.go = function (n) {
		let index = this.index + n*1;
		const len = this.section.length;
		let _this = this;

		if(index>len-1){
			index = len-1;
		}else if(index <= 0){
			index = 0;
		}
		function callBack() {
			_this.fn(index, _this.section[index], _this.section);
			this.section[index].style.transition = "move .4s ease-out";
			this.section[index-1] && (this.section[index-1].style.transition = "move .4s ease-out");
			this.section[index+1] && (this.section[index+1].style.transition = "move .4s ease-out");
			this.section[index].style.transform = "translate3d(0, 0, 0)";
		}
		if(this.direc != 'horiz'){
			this.section[index-1] && (this.section[index-1].style.webkitTransform = 'translate3d(0,'+-this.height+'px,0)');
			this.section[index+1] && (this.section[index+1].style.webkitTransform = 'translate3d(0,'+this.height +'px,0)');
		}else{
			this.section[index-1] && (this.section[index-1].style.webkitTransform = 'translate3d('+-this.width+'px,0,0)');
			this.section[index+1] && (this.section[index+1].style.webkitTransform = 'translate3d('+this.width +'px,0,0)');
		}
		this.index = index;
		this.section[index].addEventListener('webkitTransitionEnd',callBack,false);
		
		data.touch = function () {

		}
	}
})(window);
