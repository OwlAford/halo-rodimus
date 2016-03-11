var customFilters = {
	formatDate: function(t){
		if(!t){
			t = (new Date()).getTime();
		}
		var time = new Date(t*1);
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		m<9 ? (m = '0' + m) : null;
		var d = time.getDate();
		d<9 ? (d = '0' + d) : null;
		var h = time.getHours();
		h<9 ? (h = '0' + h) : null;
		var n = time.getMinutes();
		n<9 ? (n = '0' + n) : null;
		var str = y +'-'+ m +'-'+ d +' '+ h +':'+ n;
		return str;
	},
	formatMonth: function(m){
		var str = m.substring(0,4) +'年'+ m.substring(4) +'月';
		return str;
	}
}

export default customFilters