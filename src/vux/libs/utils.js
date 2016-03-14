var Utils = {}

//关于页面layout高度换算
Utils.matrixing = function(n){
	return n*VUX.rootSize
}

//获取body高度
Utils.getBodyHeight = function(){
	var h,f;
	VUX.headerShowState ? h = VUX.headerHeight : h = 0;
	VUX.footerShowState ? f = VUX.footerHeight : f = 0;
	return VUX.clientHeight - h - f
}

Utils.isArray = function(v) {
	return Utils.toString(v) === '[object Array]';
};

Utils.isEmpty = function(v, allowBlank) {
	return v === null || v === undefined
		|| String(v).toUpperCase() === 'NULL'
		|| ((Utils.isArray(v) && !v.length))
		|| (!allowBlank ? v === '' : false);
};

export default Utils