// 圆环插件

function circle(elem, options){
	// 获取元素
	(typeof elem == 'string') ? 
	this.container = document.querySelector(elem) : 
	this.container = elem;

	var opts = {
		initial: 0, // 初始值
		edge: this.container.offsetWidth,  // 容器为正方形的边长
		circleWidth: 6, // 圆环宽度
		transition: true, // 是否开启动画
		during: 600,	// 动画过渡时间
		bgColor: '#F4F4F4', // 圆环背景色
		circleColor: '#43AEFA' // 圆环填充色
	}

	for(var key in options){
	    opts[key] = options[key];
	}

	this.opts = opts;
	this.create();
}

circle.prototype = {
	create: function(){
		var me = this;
		var cnt = me.container;
		var edge = me.opts.edge;
		var circleWidth = me.opts.circleWidth;
		var cx = edge*0.5;
		var r = (edge - circleWidth)*0.5;
		var l = this.circumference = 2*r*3.14159;

		var ANIMATE = '';
		me.opts.transition ? ANIMATE = 'transition:stroke-dashoffset '+ me.opts.during +'ms linear;' : null;

		var  template = '<svg width="'+ edge +'" height="'+ edge +'"> \
							<circle cx="'+ cx +'" cy="'+ cx +'" r="'+ r  +'" fill="#FFF" stroke="'+ me.opts.circleColor +'" stroke-width="'+ (circleWidth-1) +'"></circle> \
							<circle class="sec-circle" style="stroke-dashoffset:0; stroke-dasharray:'+ l +'; '+ ANIMATE +' stroke-dashoffset: '+ -l*me.opts.initial +'" cx="'+ cx +'" cy="'+ cx +'" r="'+ r  +'" fill="transparent" stroke="'+ me.opts.bgColor +'" stroke-width="'+ circleWidth +'" transform="rotate(-90 '+ cx +' '+ cx +')"></circle> \
						</svg>';

		cnt.innerHTML = template;

		this.circle = cnt.getElementsByClassName('sec-circle')[0];
	},

	set: function(num){
		this.circle.style.strokeDashoffset = -num*this.circumference
	}
}

export default circle;