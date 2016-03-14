import './device'
import './jquery.finger'
import Swiper from './Swiper'
import Scroller from './scroller'
import DatePicker from './datetimepicker'

// 引入 ECharts 主模块
import Echarts from 'echarts/lib/echarts';

// 引入柱状图
import 'echarts/lib/chart/bar';

// 引入提示框和标题组件
//import 'echarts/lib/component/tooltip';
//import 'echarts/lib/component/title';


(function(){

    var plugins = {

        swiper: function(opt){
            return new Swiper(opt)
        },

        echarts: Echarts,

        scroller: function(elem, options){
            return new Scroller(elem, options)
        },

        datePicker: function(options){
            return new DatePicker(options)
        }
        
    }

    window.VUX = window.VUX || {};

    //应用插件到VUX
    Object.keys(plugins).forEach(function(k) {
        window.VUX[k] = plugins[k];
    });

 })()   