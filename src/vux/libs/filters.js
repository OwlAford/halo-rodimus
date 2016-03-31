var customFilters = {
	strToJson: function(str){ 
		return JSON.parse(str);
	},

	formatNumber: function(val){
		val += '';
		return val.replace(/[^\d]/g,'')*1
	} 
}

export default customFilters