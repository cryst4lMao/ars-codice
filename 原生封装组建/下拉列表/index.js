;(function(root){
	
	var UlBox = [];   // 定义一个堆栈，压入所有的UL。
	function hideUl(){    //对着整个文档单击或右击时的处理函数。
		for(var i=0;i<UlBox.length;i++){   //循环所有的UL，来进行关闭
			UlBox[i].style.display="none";
			UlBox[i].flag = true;
		}
	}
	
	document.onclick=hideUl;
	document.oncontextmenu=hideUl;
	
	function simSelect(param){
		
		this.oBox = param.dom || null;
		this.data = (param.data)?param.data:[];
		this.fn = param.fn || null;
		this.name = param.name || '';
		this.config = [];
		this.oBox && this.init();
		this.oBox && this.core();
		
	}
	
	simSelect.prototype.init=function(){
		
		var a = [];
		
		this.ul = document.createElement('ul');
		this.cnt = document.createElement('em');
		this.mark = document.createElement('span');
		this.inp = document.createElement('input');
		this.inp.type="hidden";
		this.inp.name = this.name;
		
		this.oBox.innerHTML="";
		
		
		a.push('<li>请选择</li>');
		
		if(this.data && this.data.length){
			for(var i in this.data){
				for(var j in this.data[i]){
					this.config.push(j);
				}
				break;
			}
			
			
			for(var i = 0,l = (this.data && this.data.length)?this.data.length : 0;i<l;i++){
				a.push('<li value="'+ this.data[i][this.config[1]] +'">'+ this.data[i][this.config[0]] + '</li>');
			}
			
		}
		
		this.ul.innerHTML = a.join('');
		this.ul.style.display = 'none';
		this.cnt.innerHTML = "请选择";
		this.mark.innerHTML = '▼'
		
		
		this.oBox.appendChild(this.cnt);
		this.oBox.appendChild(this.mark);
		this.oBox.appendChild(this.inp);
		this.oBox.appendChild(this.ul);
		
		UlBox.push(this.ul);
		this.oLi = this.ul.getElementsByTagName('li');
		
	};
	
	
	simSelect.prototype.core=function(){
		
		var _this = this;
		
		this.ul.flag = true;
		function hide(__this){    //单击下拉列表选项时候的处理函数。
			_this.ul.style.display="none";
			_this.cnt.innerHTML = __this.innerHTML;
			_this.inp.value = __this.getAttribute(_this.config[1]) ||  null;
			_this.ul.flag=true;
			_this.fn &&  _this.fn(_this.inp.value,__this,_this.oLi,_this.ul,_this.oBox);
		}
		
		function hideAndShow(){    //单击内容框或者三角形按钮时候的处理函数。
			
			return function(event){
				var event = event || window.event;
				if(_this.ul.flag){
					_this.ul.style.display="block";
					_this.ul.flag=false;
				}else{
					_this.ul.style.display="none";
					_this.ul.flag=true;
				}
				
				for(var i=0;i<UlBox.length;i++){
					if(_this.ul != UlBox[i]){
						UlBox[i].style.display="none";
						UlBox[i].flag = true;
					}
				}
				
				if(document.addEventListener){
					event.stopPropagation();
					event.preventDefault();
				}else{
					event.cancelBubble = true;
					event.returnValue = false;
				}
			}
			
		}
		
		for(var i=0;i<this.oLi.length;i++){
			
			this.oLi[i].index = i;
			this.oLi[i].onclick=function(){
				hide(this);
			};
			this.oLi[i].onmouseover=function(){
				this.className = 'hover';
			};
			this.oLi[i].onmouseout=function(){
				this.className = '';
			};
			this.oLi[i].oncontextmenu=function(event){
				var event = event || window.event,
					oTarget = event.srcElement ? event.srcElement : event.target;
				hide(this);
				return false;
			};
			
		}
		this.cnt.onclick=hideAndShow();
		this.mark.onclick=hideAndShow();
	};
	
	root.simSelect=function(p){
		new simSelect(p);
	};
	
})(window)