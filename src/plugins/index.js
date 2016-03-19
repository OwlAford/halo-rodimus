import Device from './device'
import FastClick from './fastclick'
import Swiper from './Swiper'
import Scroller from './scroller'
import DatePicker from './datetimepicker'
import PopPicker from './poppicker'
import Province from './province.json'
import City from './city.json'
//import County from './county.json'
import NProgress from 'nprogress'

// 初始化fastclick
FastClick.attach(document.body);

// 引入 ECharts 主模块
import Echarts from 'echarts/lib/echarts';

// 引入柱状图
import 'echarts/lib/chart/bar';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
//import 'echarts/lib/component/title';


(function(){

    var plugins = {

        device: Device,

        swiper: function(opt){
             return new Swiper(opt)
        },

        echarts: Echarts,

        scroller: function(elem, options){
            return new Scroller(elem, options)
        },

        datePicker: function(options){
            var opt = {
                yearRow: '{value}年',
                monthRow: '{value}月',
                dayRow: '{value}日',
                hourRow: '{value}点',
                minuteRow: '{value}分'
            };
            for(var key in options){
                opt[key] = options[key];
            }
            return new DatePicker(opt)
        },

        popPicker: function(options){
            return new PopPicker(options)
        },

        province: Province,

        city: City,

        //county: County,

        progress: NProgress.configure({ 
            showSpinner: false,
            //speed: 300,
            //minimum: 0.1,
            trickleRate: 0.06, 
            trickleSpeed: 800
        })
        
    }

    window.VUX = window.VUX || {};

    //应用插件到VUX
    Object.keys(plugins).forEach(function(k) {
        window.VUX[k] = plugins[k];
    });

 })()   