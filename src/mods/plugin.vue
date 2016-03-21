<template>
  <article class="plugins">
    <div class="vux-list">
      <ul>
        <li><div class="vux-list-item folder" v-link="{ name: 'toast' }"><i class="a">toast 消息提示</i></div></li>
        <li><div class="vux-list-item folder"><i class="b">alert 提示框</i></div></li>
        <li><div class="vux-list-item folder"><i class="c">confirm 消息确认框</i></div></li>
        <li><div class="vux-list-item folder"><i class="d">loading 加载等待层</i></div></li>
        <li><div class="vux-list-item folder"><i class="e">eCharts 统计图表插件</i></div></li>
        <li><div class="vux-list-item folder"><i class="h">scroller 滑动选择</i></div></li>
        <li><div class="vux-list-item folder"><i class="f">poppicker 弹出省市地级联选择框</i></div></li>
        <li><div class="vux-list-item folder"><i class="g">datetimepicker 日期时间选择</i></div></li>
        <li><div class="vux-list-item folder"><i class="i">swiper 轮播图组件</i></div></li>
        <li><div class="vux-list-item folder"><i class="j">progress 加载组件</i></div></li>
        <li><div class="vux-list-item folder"><i class="k">storage 数据存储</i></div></li>
      </ul>

    </div>
    <!-- /////////////////////////////////////////////////////////////////// -->
    <div class="wrap1">
      <button class="btn1" v-el:pop0>点击选择省</button>
      <button class="btn1" v-el:pop1>点击选择省市</button>
      <!-- <button class="btn1" v-el:pop2>点击选择省市地</button> -->
      <button class="btn1" v-el:datetime1>点击选取时间1</button>
      <button class="btn1" v-el:datetime2>点击选取时间2</button>
      <div class="time">所选时间显示为：{{value}}</div>
      <div class="weather">{{weather}}</div>
      <div class="device">当前设备环境为{{device}}{{weixin}}</div>
      <div class="mychart" v-el:chart></div>
    </div>
    <div style="width:100%" v-el:con  id="scroller">
      <div>测试1 <br>测试1 <br>测试2 <br>测试3 <br>测试4 <br>测试5 <br>测试6 <br>测试7 <br>测试8 <br></div>
    </div>
  </article>
</template>
<style>
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
/*================================================================*/
.wrap1{padding:10px;}
.mychart{width:100%; height:300px;}
.btn1{padding:12px; text-align:center; display:block; color:#FFF; background-color:#0094e8; width:100%; margin:10px 0; border-radius:4px;}
.time,.weather,.device{padding:10px; background-color:#eee; color:#999; margin:8px 0;}
</style>
<script>
import filter from '../vux/libs/filters'

export default {
  name: 'plugin',

  data () {
    return {
      value: '请选择时间',
      weather: '暂无天气',
      device: VUX.device.os,
      weixin: '浏览器'
    }
  },

  ready () {
    var view = this;
    var els = view.$els;

    // console.log(VUX.storage.remove('userifo'));

    if(VUX.device.weixin) view.weixin = '微信';

    VUX.setHeader({
      title: '组件',
      leftTpl: 'back',
      // leftFn: function(){
      //   console.log('你点击了返回');
      // },
      // rightTpl: 'cancel',
      // rightFn:function(){
      //   console.log('你点击了取消');
      // }
    })

    // 基于准备好的dom，初始化echarts实例
    var myChart = VUX.echarts.init(els.chart);
    // 绘制图表
    myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });

    //调用级联选择插件
    view.ppicker0 = VUX.popPicker({
      data: [VUX.province],
      onConfirm: function(data){
        var arr = [];
        Array.prototype.forEach.call(data, function(itm){
          arr.push(itm.name);
        });
        VUX.dialog({
          title: '选择结果',
          content: arr.join('-'),
          okFn: function(){
            console.log('你点击了确认')
          },
          cancelFn: function(){
            console.log('你点击了取消')
          }
        })
      }
    })
    $(els.pop0).on('click',function(){
      view.ppicker0.show();
    })

    view.ppicker1 = VUX.popPicker({
      // single: true,
      // data: [0,1,2,3,4],
      // data: [
      //         {name:'a', value:1},
      //         {name:'b', value:2},
      //         {name:'c', value:3},
      //         {name:'d', value:4},
      //       ],
      data: [VUX.province, VUX.city],
      onConfirm: function(data){
        var arr = [];
        Array.prototype.forEach.call(data, function(itm){
          arr.push(itm.name);
        });
        console.log(arr);
        VUX.dialog({
          type: 'alert',
          title: '选择结果',
          content: arr.join('-'),
        })
      }
    })
    $(els.pop1).on('click',function(){
      view.ppicker1.show();
    })

    // view.ppicker2 = VUX.popPicker({
    //   data: [VUX.province, VUX.city, VUX.county],
    //   onConfirm: function(data){
    //     VUX.dialog({
    //       title: '选择结果',
    //       content: data.join('-'),
    //     })
    //   }
    // })

    // $(els.pop2).on('click',function(){
    //   view.ppicker2.show();
    // })


    // 调用滚动选择日期插件
    view.datePicker1 = VUX.datePicker({
      trigger: els.datetime1,
      format: 'MM-DD',
      minYear: 1990,
      maxYear: 2050,
      onConfirm: function (value) {
        console.log(value);
        view.value = value;
      }
    })
    view.datePicker2 = VUX.datePicker({
      trigger: els.datetime2,
      //format: 'YYYY-MM-DD-HH-II',
      format: 'YYYY-MM-DD',
      minYear: 2000,
      maxYear: 2020,
      onConfirm: function (value) {
        console.log(value);
        view.value = value;
      }
    })


    VUX.progress.start();
    // ajax获取天气数据
    view.xhr = $.ajax({
      type: "GET",
      url: "http://wthrcdn.etouch.cn/weather_mini?city=杭州",
      dataType: "jsonp",
      success: function(data){
        view.weather = JSON.stringify(data.data);
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

    // 滚动到底部加载新内容
    var num = 0;
    var SC = VUX.scrollLoad({
      //fullScreen: false,
      //container: els.con,
      scroller: '#scroller',
      callback: function(){
        setTimeout(function(){
          var dom = document.createElement('div');
          dom.style.height = '100px';
          dom.innerHTML = '当前设备环境为' + num;
          num++;
          SC.$scroller.appendChild(dom);
          SC.refresh();
        },3000)
      }
    })

  },
  beforeDestroy: function () {
    // 页面跳转并销毁当前页面前，必须销毁已调用滚动插件
    this.datePicker1.destroy();
    this.datePicker2.destroy();
    this.ppicker0.destroy();
    this.ppicker1.destroy();
    //this.ppicker2.destroy();
    this.ppicker0 = 
    this.ppicker1 = 
    //this.ppicker2 = 
    this.datePicker1 = 
    this.datePicker2 = null;
    // 取消未完成ajax请求
    if(this.xhr) this.xhr.abort();
    VUX.clearToast();
  },
  methods: {
    
  }
}
</script>