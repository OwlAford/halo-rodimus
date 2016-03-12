import './device'
import './jquery.finger'
import Swiper from './Swiper'

(function(){

    var plugins = {

        swiper: function(opt){
            return new Swiper(opt)
        }
        
    }

    window.VUX = window.VUX || {};

    //应用插件到VUX
    Object.keys(plugins).forEach(function(k) {
        window.VUX[k] = plugins[k];
    });

 })()   