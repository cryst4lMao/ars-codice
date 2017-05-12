;(function (e) {
	'use strict';
	function addClass(obj, cls){
		var obj_class = obj.className;//获取 class 内容.
		var blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
		var added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
		obj.className = added;//替换原来的 class.
	}

	function removeClass(obj, cls){
		var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
		obj_class = obj_class.replace(/(\s+)/gi, ' ');//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
		var removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
		removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
		obj.className = removed;//替换原来的 class.
	}

	function Slider(opts) {
		this.dom = opts.dom;
		this.init();
		this.render();
		this.bindDom();
	}
//	Slider.prototype.removeClass = function(cls){
//		console.log(cls);
//		let obj_class = ' '+this.className+' ';
//		obj_class = obj_class.replace(/(\s+)/gi, ' ');
//		let removed = obj_class.replace(' '+cls+' ', ' ');
//		removed = removed.replace(/(^\s+)|(\s+$)/g, ' ');
//		this.className = removed;
//	};
	Slider.prototype.init = function () {
		this.scaleW = window.innerWidth;
		this.ids = 1;
	};
	Slider.prototype.render = function () {

	};
	Slider.prototype.bindDom = function () {
		let self = this;
		let outer = self.dom;
		let scale = self.scaleW;

		let startHander = function (e) {
			self.startX = e.touches[0].pageX;
			self.startTime = new Date() * 1;


			//清零
			self.offsetX = 0;
		};
		let moveHander = function (e) {
			e.preventDefault();
			self.offsetX = e.targetTouches[0].pageX - self.startX;
		};
		let endHander = function (e) {
			e.preventDefault();
			let boundary = scale / 6;

			self.endTime = new Date() * 1;

			if(self.endTime - self.startTime > 100){
				if(self.offsetX >= boundary){
					self.go('-1');
					console.log("-1");
				}else if(self.offsetX < 0 && self.offsetX < -boundary){
					self.go('+1');
					console.log("+1");
				}else{
//					self.go('0');
					console.log("0");
				}
			}
		};
		outer.addEventListener('touchstart', startHander, false);
		outer.addEventListener('touchmove', moveHander, false);
		outer.addEventListener('touchend', endHander, false);
	};
	Slider.prototype.go = function (n) {

		let idx = document.getElementById("action-person").getAttribute('class').substr(-1, 1);
		let tempId;
		let liLength = document.getElementsByTagName('li').length;
		idx = idx * 1;
		if(typeof(n) === 'number'){
			tempId = idx;
		}else if(typeof(n) === 'string'){
			tempId = idx + n * 1;
		}
		console.log('tempId:'+tempId);

		if(tempId >=1 && tempId < 6){
			//顶部nav
			for(let i=0; i<liLength; i++){
				let tdom = document.getElementsByTagName('li')[i];
				removeClass(tdom, 'on');
				let data = document.getElementsByTagName('li')[i].getAttribute('data-index').substr(-1);
				data = data * 1;
				if(data === tempId){
					let ddom = document.getElementsByTagName('li')[i];
					addClass(ddom, 'on');
				}

			}
			//主题动画切换
			document.getElementById("earth").setAttribute('class', 'earth-q');
			document.getElementById("action-person").setAttribute('class', '');
			document.getElementById("action-smile").setAttribute('class', '');

			let timestamp = setTimeout(function () {
				document.getElementById("earth").setAttribute('class', 'earth1');
				document.getElementById("action-person").setAttribute('class', 'action-person'+tempId);
				document.getElementById("action-smile").setAttribute('class', 'action-smile'+tempId);
				document.getElementById("bg").setAttribute('class','bg'+tempId);
				clearInterval(timestamp);
			}, 450);
		}
	};
	
	e.slider = function (p) {
		new Slider(p);
	}
})(window);