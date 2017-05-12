(function(root){
	'use strict';
	function share(params){

		this.params = params;
		this.dom = params.dom;
		this.type = params.type || ['weibo','qqweibo','qq','qqzone','wx','rr','bdtb','db','qqpy','kx'];
		this.config = {
			'weibo':['新浪微博','http://service.weibo.com/share/share.php?'],
			'qqweibo':['腾讯微博','http://share.v.t.qq.com/index.php?c=share&a=index'],
			'qq':['QQ好友','http://connect.qq.com/widget/shareqq/index.html?'],
			'qqzone':['QQ空间','http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'],
			'wx':['微信分享',''],
			'rr':['人人分享','http://widget.renren.com/dialog/share?'],
			'bdtb':['百度贴吧','http://tieba.baidu.com/f/commit/share/openShareApi?'],
			'db':['豆瓣','http://shuo.douban.com/!service/share?'],
			'qqpy':['朋友网','http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&'],
			'kx':['开心网','http://www.kaixin001.com/login/open_login.php?']
		};
		(this.type && this.type.length)?this.custom() : this.defa();
	}

	share.prototype.custom=function(){
		var str = '';
		for(var i=0,l=this.type.length;i<l;i++){
			str+='<a href="javascript:;" class="custom_share_'+this.type[i]+'" shareType="'+ this.type[i] +'">'+ this.config[this.type[i]][0] +'</a>';
		}
		this.dom.innerHTML = str;
		this.bind();
	};

	share.prototype.defa=function(){
		var str = '';
		for(var i=0,l=this.type.length;i<l;i++){
			str+='<a href="javascript:;" class="defautl_share_'+ this.type[i] +'" shareType="'+ this.type[i] +'">'+this.config[this.type[i]][0]+'</a>';
		}
		this.dom.innerHTML = str;
		this.bind();
	};

	share.prototype.bind=function(){
		var _this = this;
		this.dom.onclick=function(ev){
			var e = ev || window.event,
				oTarget = e.target || e.srcElement;
			(oTarget.nodeName === 'A' && _this.core(oTarget));
		}
		this.dom = null;
	}

	share.prototype.core=function(o){

		var _this = this,
			type = o.getAttribute('sharetype') || 'weibo',
			ercode = '',
			result = this.config[type][1],
			urls   = encodeURIComponent((_this.params[type] && _this.params[type].url) ? _this.params[type].url : _this.params.url),
			title  = encodeURIComponent((_this.params[type] && _this.params[type].title) ? _this.params[type].title : (_this.params.title)?_this.params.title:''),
			images = encodeURIComponent((_this.params[type] && _this.params[type].images) ? _this.params[type].images :( _this.params.images)? _this.params.images:''),
			desc   = encodeURIComponent((_this.params[type] && _this.params[type].desc) ? _this.params[type].desc : (_this.params.desc)?_this.params.desc:''),
			summary = encodeURIComponent((_this.params[type] && _this.params[type].summary) ? _this.params[type].summary : (_this.params.summary)?_this.params.summary:''),
			site   = encodeURIComponent((_this.params[type] && _this.params[type].site) ? _this.params[type].site : '');

		function wx(){
			var e = document.getElementById('share_qrcode_box') || false,
				img = new Image(),
				_w = 0,
				_h = 0,
				oDiv = null;

			img.onload=function(){
				_w = this.width;
				_h = this.height;
				if(_this.params.target == 'blank'){
					if(!e){
						oDiv = document.createElement('div');
						oDiv.className = 'share_qrcode';
						oDiv.id = 'share_qrcode_box';
						oDiv.innerHTML = '<img src="'+ _this.params.qrcode +'" /><span href="javascript:;" class="share_close">&#10005;</span>';
						oDiv.style.cssText = 'padding:10px;position:fixed;_position:absolute;left:50%;top:50%;margin-left:'+-(_w+20)/2+'px;margin-top:'+-(_h+20)/2+'px;';
						document.body.appendChild(oDiv);
						oDiv.children[1].style.cssText = "position:absolute;cursor:pointer;";
						oDiv.children[1].onclick=function(){
							var e = document.getElementById('share_qrcode_box');
							document.body.removeChild(e);
						}
					}else{
						_this.dom.cssText = 'position:relative';
						_this.dom.appendChild(img);
					}

				}

			}

			img.src=_this.params.qrcode;
		}

		if(type!='wx'){
			switch(type){
				case 'weibo':result+= 'title=' + title+'&url=' + urls + '&pic='+ images;break;
				case 'qqweibo':result+= '&title=' +title+'&url=' + urls + '&pic='+ images;break;
				case 'qq':result+= 'url=' + urls+'&title=' + title +'&desc='+ desc + '&summary='+summary+'&pics='+ images +'&site='+ site;break;
				case 'qqzone':result+= 'url=' + urls+'&title=' + title + '&desc='+ desc+'&summary='+summary +'&pic='+ images + '&site='+ site; break;
				case 'rr':result+= 'resourceUrl=' +urls+'&title=' + title + '&description='+ desc +'&pic='+ images;break;
				case 'bdtb':result+= 'title=' + title+'&url=' + urls +'&pic='+ images+'&desc='+ desc ;break;
				case 'db':result+= 'image=' + images+'&href=' + urls +'&name='+ title+'&text='+ desc ;break;
				case 'qqpy':result+= 'pics=' + images+'&url=' + urls +'&title='+ title+'&desc='+ desc +'&summary='+summary;break;
				case 'kx':result+= '&url=' + urls +'&rtitle='+ title; break;
			}
			window.open(result);
		}else{
			wx();
		}
	};
	root.share = function(params){
		new share(params);
	};
})(window);

