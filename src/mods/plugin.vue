<template>
  <article class="plugins">
    <div class="vux-list">
      <ul>
        <li><div class="vux-list-item"><i class="n">当前系统环境：{{os}} {{platform}}</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'toast'}"><i class="a">toast 消息提示</i></div></li>
        <li><div class="vux-list-item folder" v-link="{path: '/dialog/alert'}"><i class="b">alert 提示框</i></div></li>
        <li><div class="vux-list-item folder" v-link="{path: '/dialog/confirm'}"><i class="c">confirm 消息确认框</i></div></li>
        <li><div class="vux-list-item" @click="triggerLoading"><i class="d">loading 加载等待层 (演示3秒)</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'chart'}"><i class="e">eCharts 统计图表插件</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'scroller'}"><i class="h">scroller 滑动选择</i></div></li>
        <li><div class="vux-list-item" @click="triggerCascade"><i class="f">poppicker 弹出省市地级联选择框</i></div></li>
        <li><div class="vux-list-item" v-el:pickdate><i class="g">datetimepicker 日期时间选择</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'swiper'}"><i class="i">swiper 轮播图组件</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'progress'}"><i class="j">progress 加载组件</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'storage'}"><i class="k">storage 数据存储</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'scrollload'}"><i class="l">scrollLoad 滚动加载组件</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'elastic'}"><i class="m">elastic弹性演示</i></div></li>
        <li><div class="vux-list-item folder" v-link="{name: 'circle'}"><i class="o">circle圆环进度组件</i></div></li>
      </ul>
    </div>
  </article>
</template>
<style>
.plugins{margin-bottom:0.2rem;}
.plugins .vux-list li{padding:0 0.3rem; font-size:0.26rem;}
.plugins .vux-list li >.vux-list-item{padding:0.24rem 0;}
.plugins .vux-list i{padding-left:0.58rem;}
.plugins .vux-list i:after{content:'\e608'; color:#4fa5f1; font-size:0.36rem; position:absolute; left:0; top:50%; margin-top:-0.18rem;}
.android:not(.weixin) .plugins .vux-list i:after{margin-top:-0.14rem;}
.plugins .vux-list i.b:after{content:'\e60a'; color:#00c193;}
.plugins .vux-list i.c:after{content:'\e60c'; color:#4798f3;}
.plugins .vux-list i.d:after{content:'\e60e'; color:#ffa626;}
.plugins .vux-list i.e:after{content:'\e611'; color:#f97664;}
.plugins .vux-list i.f:after{content:'\e614'; color:#967db3;}
.plugins .vux-list i.g:after{content:'\e616'; color:#91c66a;}
.plugins .vux-list i.h:after{content:'\e61b'; color:#4fa5f1;}
.plugins .vux-list i.i:after{content:'\e612'; color:#00c193;}
.plugins .vux-list i.j:after{content:'\e61d'; color:#4798f3;}
.plugins .vux-list i.k:after{content:'\e61c'; color:#ffa626;}
.plugins .vux-list i.l:after{content:'\e61f'; color:#f97664;}
.plugins .vux-list i.m:after{content:'\e623'; color:#967db3;}
.plugins .vux-list i.n:after{content:'\e622'; color:#f97664;}
.plugins .vux-list i.o:after{content:'\e624'; color:#91c66a;}

</style>
<script>
import filter from '../vux/libs/filters'

export default {
  name: 'plugin',

  data () {
    return {
      os: VUX.device.os,
      platform: '浏览器'
    }
  },

  ready () {
    var view = this;
    var els = view.$els;

    VUX.headerBtnEmpty('right');
    VUX.setHeader({
      title: '组件',
      leftTpl: 'back'
    })

    // 判断是否为微信
    VUX.device.weixin ? view.platform = '微信' : view.platform = '浏览器';

    // 获取省市地数据
    VUX.progress.start();
    view.xhr = $.ajax({
      type: "GET",
      // async: false, 
      url: "http://plug.qiniudn.com/address.json",
      dataType: "json",
      success: function(address){
        // 初始化省市地级联选择插件
        view.cascade = VUX.popPicker({
          data: address,
          onConfirm: function(data){
            var arr = [];
            Array.prototype.forEach.call(data, function(itm){
              itm.name != '' && arr.push(itm.name);
            });
            VUX.toast({
              type: 'success',
              text: arr.join('-')
            })
          }
        })
      },
      complete: function(){
        VUX.progress.done();
      },
      error: function(){  
        VUX.toast({
          text: '省市地数据获取失败',
          delay: 1000
        })
      }  
    });


    // 日期时间选择器
    view.pickdate = VUX.datePicker({
      trigger: els.pickdate,
      // format: 'YYYY-MM-DD HH:II',
      format: 'YYYY-MM-DD',
      minYear: 2000,
      maxYear: 2020,
      onConfirm: function (value){
        VUX.toast({
          type: 'success',
          text: '您选择的时间为：'+ value
        })
      }
    })
    // view.pickdate.show();

  },

  beforeDestroy () {
    // 页面跳转前必须销毁已调用滚动插件
    this.pickdate.destroy();
    this.cascade && this.cascade.destroy();
    
    // 取消未完成ajax请求
    if(this.xhr) this.xhr.abort();
    VUX.clearToast();

    // 结束未完成加载进度
    VUX.progress.done();
  },

  methods: {
    triggerLoading: function(){
      VUX.showWaitPanel();
      // 三秒后自动清除等待层
      setTimeout(function(){
        VUX.hideWaitPanel();
      },3000)
    },
    triggerCascade: function(){
      this.cascade && this.cascade.show();
    }
  }
}
</script>