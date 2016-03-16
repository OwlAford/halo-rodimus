var Utils = {}

// 页面layout高度换算为像素
Utils.matrixing = function(n){
	return n*VUX.rootSize
}

// 获取body高度
Utils.getBodyHeight = function(){
	var h,f;
	VUX.headerShowState ? h = VUX.headerHeight : h = 0;
	VUX.footerShowState ? f = VUX.footerHeight : f = 0;
	return VUX.clientHeight - h - f
}

// 判断是否为数组
Utils.isArray = function(v) {
	return Utils.toString(v) === '[object Array]';
};

// 判断是否为空
Utils.isEmpty = function(v, allowBlank) {
	return v === null || v === undefined
		|| String(v).toUpperCase() === 'NULL'
		|| ((Utils.isArray(v) && !v.length))
		|| (!allowBlank ? v === '' : false);
};

// 判断是否为数字
Utils.isNum = function(s){
    if (s!=null && s!=""){
        return !isNaN(s);
    }
    return false;
}

export default Utils