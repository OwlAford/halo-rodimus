<template>
  <div>hello！我是plugin页</div>
  <div class="mychart" v-el:chart></div>
</template>
<style>
.mychart{width:100%; height:300px;}
</style>
<script>
export default {
  name: 'plugin',

  data () {
    return {
      
    }
  },

  ready () {
    var view = this;

    console.log(VUX.storage.remove('userifo'));

    VUX.setHeader({
      title: '组件',
      leftTpl: 'back',
      leftFn: function(){
        console.log('你点击了返回');
      },
      rightTpl: 'cancel',
      rightFn:function(){
        console.log('你点击了取消');
      }
    })

    VUX.showWaitPanel();
    setTimeout(function(){
      VUX.hideWaitPanel();
      VUX.toast({
        text: '模拟加载完毕！',
        delay: 1000
      })
    },1000);

    // 基于准备好的dom，初始化echarts实例
    var myChart = VUX.echarts.init(view.$els.chart);
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

  },

  methods: {
    
  }
}
</script>