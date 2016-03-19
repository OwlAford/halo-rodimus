//获取设备信息(Android、ios)
export default (function(win){
	var device = {};
	var ua = navigator.userAgent;
	var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	var docEl = win.document.documentElement;

	(ipad || ipod || iphone) ? device.ios = true : device.ios = false;
	android ? device.android = true : device.android = false;

	if(device.ios){
		device.os = 'ios'
	}else if(android){
		device.os = 'android'
	}else{
		device.os = 'web'
	}
 	
 	// 判断是否为微信
    (ua.toLowerCase()).match(/MicroMessenger/i) == "micromessenger" ? 
    device.weixin = true : 
    device.weixin = false;

    // 为页面添加对应的设备标识样式
	docEl.className = device.os;
	if(device.weixin) docEl.classList.add('weixin');

	return device
	
})(window)
	
