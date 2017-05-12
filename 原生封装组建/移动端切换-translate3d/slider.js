;(function(e){
	'use strict';
	function Slider(opts){
		this.wrap = opts.dom;
		this.list = opts.list;
		//构造三部曲
		this.init();
		this.renderDom();
		this.bindDom();
	}
	//用prototype对象,节省内存,子类方法从原型链上继承
	Slider.prototype.init = function(){
		//窗口长宽比，用语图片缩放
		// this.radio = window.innerHeight / window.innerWidth;
		//图片滚动距离
		this.scaleW = window.innerWidth;
		//当前图片索引
		this.idx = 0;
		
	};

	Slider.prototype.renderDom = function(){
		let wrap = this.wrap;
		let data = this.list;
		let len = this.list.length;
		let scale = this.scaleW;

		this.outer = document.createElement('ul');

		for (let i = 0; i < len; i++) {
			let li = document.createElement('li');
			let item = data[i];
			//解决快速触发出现水平滑动条bug
			li.style.width = window.innerWidth +'px';
			li.style.webkitTransform = 'translate3d('+ i*scale +'px, 0, 0)';

			if (item) {
	
				li.innerHTML = '<img width="'+window.innerWidth+'" src="'+item["img"]+'"/>';
		
			};

			this.outer.appendChild(li);	
		}
		this.outer.style.cssText = 'width:' + scale + 'px';
		wrap.style.height = window.innerHeight + 'px';
		wrap.appendChild(this.outer);	
	};

	Slider.prototype.bindDom = function(){
		let _self = this;
		let scale = _self.scaleW;
		let outer = _self.outer;
		let len = _self.list.length;

		let startHander = function(e){
			_self.startX = e.touches[0].pageX;
	

			//清零
			_self.offsetX = 0;

			

			_self.startTime = new Date() * 1;
		};

		let moveHander = function(e){

			e.preventDefault();
			
			_self.offsetX = e.targetTouches[0].pageX - _self.startX;

			console.log(_self.offsetX);

			let lis = outer.getElementsByTagName('li');

			let p = _self.idx - 1;

			let n = _self.idx + 1;
			
			for(p; p <= n; p++){
				lis[p] && (lis[p].style.webkitTransition = 'none');
				lis[p] && (lis[p].style.webkitTransform = 'translate3d(' + ((p-_self.idx)*scale+_self.offsetX) + 'px, 0, 0)');
			}
		};

		let endHander = function(e){
			e.preventDefault();
			let boundary = scale / 6;
			let endTime = new Date() * 1;
			let lis = outer.getElementsByTagName('li');


			if((endTime - _self.startTime) > 100){
				if(_self.offsetX >= boundary){
					//进入前一页
					_self.go('-1');
				}else if (_self.offsetX < 0 && _self.offsetX < -boundary){
					//进入下一页
					_self.go('+1');
				}else{
					//留在本页
					_self.go('0');
				}
			}else{
				//快操作 优化
				if(_self.offsetX > 50){
					_self.go('-1');
				}else if(_self.offsetX < -50){
					_self.go('+1');
				}else{
					_self.go('0');
				}

			}
		};


		outer.addEventListener('touchstart', startHander, false);
		outer.addEventListener('touchmove', moveHander, false);
		outer.addEventListener('touchend', endHander, false);
		
	};
		
	Slider.prototype.go = function(n){
		let idx = this.idx;
		let cidx;
		let lis = document.getElementsByTagName('li');
		let len = lis.length;
		let scale = this.scaleW;


		if(typeof n  === 'number'){
			cidx = idx;
		}else if(typeof n === 'string'){
			cidx = idx + n * 1;
		}



		// 当索引右超出
		if(cidx > len - 1){
			cidx = len - 1;
		}else if(cidx < 0){
			cidx = 0;
		}

		this.idx = cidx;

		lis[cidx].style.webkitTransition = '-webkit-transform .3s ease-out';
		lis[cidx-1] && (lis[cidx-1].style.webkitTransition = '-webkit-transform .3s ease-out');
		lis[cidx+1] && (lis[cidx+1].style.webkitTransition = '-webkit-transform .3s ease-out');

		lis[cidx].style.webkitTransform = 'translate3d(0, 0, 0)';
		lis[cidx-1] && (lis[cidx-1].style.webkitTransform = 'translate3d(-'+scale+'px, 0, 0)');
		lis[cidx+1] && (lis[cidx+1].style.webkitTransform = 'translate3d(+'+scale+'px, 0, 0)');
	};
	//实例化,暴露对外唯一对外接口
	e.slider = function(p){
		new Slider(p);
	};
})(window);