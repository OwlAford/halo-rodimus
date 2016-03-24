import Device from './device'
import FastClick from './fastclick'
import Swiper from './Swiper'
import ScrollLoad from './scrollLoad'
import Scroller from './scroller'
import DatePicker from './datetimepicker'
import PopPicker from './poppicker'

/* 省市地数据可通过json直接赋值给VUX，不推荐 */

// import Province from './province.json'
// import City from './city.json'
// import County from './county.json'

import NProgress from 'nprogress'

// 初始化fastclick
FastClick.attach(document.body);

// 引入 ECharts 主模块
import Echarts from 'echarts/lib/echarts';

// 引入柱状图、折线图、饼图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
//import 'echarts/lib/component/title';


(function(){

    var plugins = {

        device: Device,

        swiper: function(options){
             return new Swiper(options)
        },

        scrollLoad: function(options){
             return new ScrollLoad(options)
        },

        echarts: Echarts,

        scroller: function(elem, options){
            return new Scroller(elem, options)
        },

        datePicker: function(options){
            return new DatePicker(options)
        },

        popPicker: function(options){
            return new PopPicker(options)
        },

        // province: Province,

        // city: City,

        // county: County,

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