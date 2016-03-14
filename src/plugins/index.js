import './device'
import './jquery.finger'
import Swiper from './Swiper'

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

        echarts: Echarts
        
    }

    window.VUX = window.VUX || {};

    //应用插件到VUX
    Object.keys(plugins).forEach(function(k) {
        window.VUX[k] = plugins[k];
    });

 })()   