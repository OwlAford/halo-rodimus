<template>
  <article class="progress">
    <div class="weather" v-show="weather">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th>星期</th>
          <th>风向</th>
          <th>风力</th>
          <th>高温</th>
          <th>天气</th>
          <th>低温</th>
        </tr>
        <tr v-for="itm in weather.forecast">
          <td>{{itm.date | formatStr}}</td>
          <td>{{itm.fengxiang}}</td>
          <td>{{itm.fengli}}</td>
          <td>{{itm.high | formatStr}}</td>
          <td>{{itm.type}}</td>
          <td>{{itm.low | formatStr}}</td>
        </tr>
        <tr>
        <td colspan="6">温馨提示：{{weather.ganmao}}</td>
        </tr>
      </table>
    </div>
    <div class="vux-flexbox">
      <button class="vux-flexbox-item vux-btn" @click="startload">点击开始加载</button>
      <button class="vux-flexbox-item vux-btn red" @click="closeload">点击结束加载</button>
    </div>
  </article>
</template>
<style scoped>
.progress{padding:0.2rem 0.2rem 0.4rem; background-color:#fff;}
.weather{margin:0.2rem 0 0.4rem; font-size:0.24rem;}
.weather th{background-color:#f2f2f2;}
.weather th,.weather td{padding:0.16rem 0.2rem;}
.weather tr:nth-child(odd) td{background-color:#f9f9f9;}
.weather tr:nth-child(even) td{background-color:#f6f6f6;}
</style>
<script>

//自定义过滤器
function formatStr(m){
  var str = m.substring(3);
  return str;
}

Vue.filter('formatStr', formatStr)

export default {
  name: 'progress',

  data () {
    return {
      weather: null
    }
  },

  ready () {
    var view = this;

    // 初始化头部
    VUX.setHeader({
      title: 'progress 加载组件'
    })

    // 以获取天气为例
    VUX.progress.start();
    // ajax获取天气数据
    view.xhr = $.ajax({
      type: "GET",
      url: "http://wthrcdn.etouch.cn/weather_mini?city=杭州",
      dataType: "jsonp",
      success: function(data){
        view.weather = data.data;
      },
      complete: function(){
        VUX.progress.done();
        VUX.toast({
          text: '天气加载完毕！',
          delay: 1000
        })
      },
      error: function(){  
        VUX.toast({
          text: '数据请求失败',
          delay: 1000
        })
      }  
    });
    
  },

  beforeDestroy () {
    // 取消未完成ajax请求
    if(this.xhr) this.xhr.abort();
    VUX.clearToast();
  },

  methods: {
    startload: function(){
      VUX.progress.start();
    },
    closeload: function(){
      VUX.progress.done();
    }
  }
}
</script>