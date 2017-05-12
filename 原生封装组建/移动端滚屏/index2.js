;(function(root){
	'use strict';
	function touch(opts){
		this.section = opts.section;
		this.arrow = opts.dom;
		this.direc = opts.direc || 'vertical';
		this.fn = opts.fn || null;
		this.arrow && this.bindEvent();
		this.section && this.init();

	}

	touch.prototype.init=function(){

		this.width = (window.innerWidth > 640)? 640:window.innerWidth;
		this.height = window.innerHeight;
		this.boundary = this.height/4;
		this.index = 0;

		this.arrow.style.cssText = 'position:relative';
		if(this.direc != 'horiz')
			for(var i=0,l=this.section.length;i<l;i++){
				this.section[i].style.cssText='position:absolute;';
				this.section[i].style.webkitTransform = "translate3d(0,"+i*this.height+"px,0)";
			}
		else{
			for(var i=0,l=this.section.length;i<l;i++){
				this.section[i].style.cssText='position:absolute;';
				this.section[i].style.webkitTransform = "translate3d("+i*this.width+"px,0,0)";
			}
		}

	};

	touch.prototype.bindEvent=function(){

		var _this = this;
		var startx=0,starty=0,startTime=0,endTime=0,offset=0,offsety = 0;

		function start(e){

			startx = e.touches[0].pageX;
			starty = e.touches[0].pageY;
			startTime = new Date()*1;

		}

		function move(e){

			_this.offsetx = e.touches[0].pageX - startx;
			_this.offsety = e.touches[0].pageY - starty;
			var i = _this.index -1,
				m = i +3;
			if(_this.direc != 'horiz'){
				for(;i<m;i++){
					_this.section[i] && (_this.section[i].style.webkitTransform = 'translate3d(0,'+ ((i - _this.index)*_this.height + _this.offsety) +'px,0)');
					_this.section[i] && (_this.section[i].style.webkitTransition = 'none');
				}
			}else{
				for(;i<m;i++){
					_this.section[i] && (_this.section[i].style.webkitTransform = 'translate3d('+ ((i - _this.index)*_this.width + _this.offsetx) +'px,0,0)');
					_this.section[i] && (_this.section[i].style.webkitTransition = 'none');
				}
			}
			e.preventDefault();
			e.stopPropagation();

		}

		function end(){

			endTime = new Date()*1;

			function handle(value){
				if(endTime - startTime > 800){

					if(value > _this.boundary){
						_this.go('-1');
					}else if(value < -_this.boundary){
						_this.go('+1');
					}else{
						_this.go('0');
					}
				}else{

					if(value>50){

						_this.go('-1');
					}else if(value <-50){
						_this.go('+1');
					}else{
						_this.go('0');
					}
					_this.offsetx = 0;
					_this.offsety = 0;
				}
			}

			(_this.direc != 'horiz')?handle(_this.offsety):handle(_this.offsetx);


		}

		this.arrow.addEventListener('touchstart',start,false);
		this.arrow.addEventListener('touchmove',move,false);
		this.arrow.addEventListener('touchend',end,false);
	};


	touch.prototype.go=function(n){

		var index = this.index+n*1,
			len = this.section.length,
			_this = this;

		if(index>len-1){
			index = len-1;
		}else if(index <=0){
			index = 0
		}

		function callBack(){
			_this.fn(index,_this.section[index],_this.section,_this.canvas);
			this.removeEventListener('webkitTransitionEnd',callBack,false);
		}

		this.section[index].style.webkitTransition = '-webkit-transform .4s ease-out';
		this.section[index-1] && (this.section[index-1].style.webkitTransition = '-webkit-transform .4s ease-out');
		this.section[index+1] && (this.section[index+1].style.webkitTransition = '-webkit-transform .4s ease-out');
		this.section[index].style.webkitTransform = 'translate3d(0,0,0)';

		if(this.direc != 'horiz'){
			this.section[index-1] && (this.section[index-1].style.webkitTransform = 'translate3d(0,'+-this.height+'px,0)');
			this.section[index+1] && (this.section[index+1].style.webkitTransform = 'translate3d(0,'+this.height +'px,0)');
		}else{
			this.section[index-1] && (this.section[index-1].style.webkitTransform = 'translate3d('+-this.width+'px,0,0)');
			this.section[index+1] && (this.section[index+1].style.webkitTransform = 'translate3d('+this.width +'px,0,0)');
		}

		this.index = index;
		this.section[index].addEventListener('webkitTransitionEnd',callBack,false);
	};

	root.touch = function(p){
		new touch(p);
	};

})(window);
