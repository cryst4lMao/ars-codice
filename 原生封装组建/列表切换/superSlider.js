/**
 * Created by Mao on 17/4/21.
 */
;(function (e) {
	'use strict';
	
	function ListItem(opts) {
		this.wrap = opts.dom;
		this.list = opts.list;
		//构造三部曲
		this.init();
		this.renderDom();
		this.bindDom();
	}
	ListItem.prototype.init = function () {
		//滚动一屏距离
//		this.scaleW = window.innerWidth;
		//当前屏索引
		this.idx = 0;
	};
	ListItem.prototype.renderDom = function () {
		let wrap = this.wrap;
		let list = this.list;
		let len = list.length;
//		let scale = this.scaleW;
		//方向键
		this.arrowL = document.createElement('a');
		this.arrowL.setAttribute('href','javascript:void(0);');
		this.arrowL.setAttribute('class','arrow arrow-left');
		
		wrap.appendChild(this.arrowL);
		
		this.arrowR = document.createElement('a');
		this.arrowR.setAttribute('href','javascript:void(0);');
		this.arrowR.setAttribute('class','arrow arrow-right');
		
		wrap.appendChild(this.arrowR);
		
		//切换内容
		this.outer = document.createElement('ul');
		
		this.outer.setAttribute('class','scroll-content');
		for(let i=0; i<len; i++){
			let li = document.createElement('li');
			li.style.webkitTransform = 'translate3d('+450*i+'px, 0, 0)';
			//			li.cssText = '-webkit-transform: translated('+450*i+'px, 0, 0)';
			let data = this.list[i];
			console.log(data);
			li.setAttribute('class', 'scroll-list');
			
			
			if(data){
				li.innerHTML = '<p>'+data['con']+'</p>';
			}
			this.outer.appendChild(li);
		}
		wrap.appendChild(this.outer);
		
		//轮播点
		this.botPot = document.createElement('ul');
		this.botPot.setAttribute('class', 'pointBox');
		for(let j=0; j<len; j++){
			let li = document.createElement('li');
			li.setAttribute('class', 'pot');
			
			this.botPot.appendChild(li);
			if(j === 0){
				li.setAttribute('class', 'pot on');
			}
		}
		
		wrap.appendChild(this.botPot);
		
	};
	ListItem.prototype.bindDom = function () {
		let self = this;
		let outer = self.outer;
		let arrowL = self.arrowL;
		let arrowR = self.arrowR;
		let len = self.list.length;
		let lis = document.getElementsByClassName('scroll-list');
		let idx = self.idx;
		let spots = document.getElementsByClassName('pot');
		let spotsLength = spots.length;
		
		idx = idx * 1;

//		let startHander = function (e) {
//			//
//
//		};
//		let  moveHander = function () {
//
//		};
//		let endHander = function () {
//
//		};
		
		
		
		let clickLHander = function () {
			idx -= 1;
			if(idx > len-1){
				idx = len-1;
				
				
			}else if(idx < 0){
				idx = 0;
				
			}
			lis[idx] && (lis[idx].style.webkitTransition = '-webkit-transform .4s ease-out');
			lis[idx-1] && (lis[idx-1].style.webkitTransition = '-webkit-transform .4s ease-out');
			lis[idx+1] && (lis[idx+1].style.webkitTransition = '-webkit-transform .4s ease-out');
			
			lis[idx] && (lis[idx].style.webkitTransform = 'translate3d(0, 0, 0)');
			lis[idx-1] && (lis[idx-1].style.webkitTransform = 'translate3d(-'+450+'px, 0, 0)');
			lis[idx+1] && (lis[idx+1].style.webkitTransform = 'translate3d(+'+450+'px, 0, 0)');
			
			
			for(let j=0; j<spotsLength; j++){
				let tempClass = spots[j].getAttribute('class');
				tempClass = tempClass.replace('pot on','pot');
				spots[j].setAttribute('class',tempClass);
				
			}
			spots[idx] && (spots[idx].setAttribute('class','pot on'));
			
		};
		let clickRHander = function () {
			idx += 1;
			if(idx > len-1){
				idx = len-1;
				
				
			}else if(idx < 0){
				idx = 0;
				
			}
			lis[idx] && (lis[idx].style.webkitTransition = '-webkit-transform .4s ease-out');
			lis[idx-1] && (lis[idx-1].style.webkitTransition = '-webkit-transform .4s ease-out');
			lis[idx+1] && (lis[idx+1].style.webkitTransition = '-webkit-transform .4s ease-out');
			
			lis[idx] && (lis[idx].style.webkitTransform = 'translate3d(0, 0, 0)');
			lis[idx-1] && (lis[idx-1].style.webkitTransform = 'translate3d(-'+450+'px, 0, 0)');
			lis[idx+1] && (lis[idx+1].style.webkitTransform = 'translate3d(+'+450+'px, 0, 0)');
			
			
			for(let j=0; j<spotsLength; j++){
				let tempClass = spots[j].getAttribute('class');
				tempClass = tempClass.replace('pot on','pot');
				spots[j].setAttribute('class',tempClass);
				
			}
			spots[idx] && (spots[idx].setAttribute('class','pot on'));
		};
		
		
		arrowL.addEventListener('click', clickLHander, false);
		arrowR.addEventListener('click', clickRHander,false);
		
	};
	
	e.slider = function (p) {
		new ListItem(p);
	};
})(window);