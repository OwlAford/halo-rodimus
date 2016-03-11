import App from './units/app.vue'
import routerMap from './routers'
import filter from './kit/filters'
import Storage from './kit/storage'
import Utils from './kit/utils'

//定义全局变量空间VUX
window.VUX = window.VUX || {};

//设备信息保存至VUX
VUX.device = device;

//实例化全局存储器
VUX.storage = new Storage();

//全局使用Utils
VUX.utils = Utils;

//全局使用swiper轮播图插件
VUX.swiper = window.swiper;

//初始化页面的相对根尺寸并设置初始化参数
(function(doc, win){
	var docEl = doc.documentElement;
	function getRootSize(){
		var rootSize = 100 * (docEl.clientWidth / 640);
		rootSize > 58.59375 ? rootSize = 58.59375 : null;
		//设置页面高度和根字体大小
		VUX.clientHeight = docEl.clientHeight;
		VUX.rootSize = rootSize;
		//设置头部底部显示状态
		VUX.headerShowState = true;
		VUX.footerShowState = true;
		//设置头部底部换算后像素高度
		VUX.headerHeight = VUX.utils.matrixing(0.8);
		VUX.footerHeight = VUX.utils.matrixing(0.9);
	}
	function recalc(){
		docEl.style.fontSize = VUX.rootSize + 'px';
	}
	getRootSize();
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	if(!doc.addEventListener) return;
	doc.addEventListener('DOMContentLoaded', recalc, false);
	win.addEventListener(resizeEvt, function(){
		getRootSize();
		recalc();
	}, false);
	
})(document, window);


//自定义过滤器
Object.keys(filter).forEach(function(k) {
  Vue.filter(k, filter[k]);
});

//启动路由
Vue.use(Router);
var router = new Router();
routerMap(router);
router.beforeEach(function () {
	//页面跳转时初始化状态
	window.scrollTo(0, 0);
	VUX.showHeader(true);
	VUX.showFooter(true);
	VUX.clearToast();
});
router.redirect({
  '*': '/home'
});
//全局保存实例化路由
VUX.router = router;
router.start(App, '#app');


