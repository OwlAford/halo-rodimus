<template>
  <div>
    <button v-el:throw>点击选取数字</button>
    <div class="vux-flexbox">
      <div class="vux-flexbox-item" v-el:picker1></div>
      <div class="vux-flexbox-item" v-el:picker2></div>
      <div class="vux-flexbox-item" v-el:picker3></div>
    </div>
  </div>
  <div v-el:datetime>点击选取时间</div>
  <div class="vux-datetime-value">{{value}}</div>
  <div class="mychart" v-el:chart></div>
</template>
<style>
.mychart{width:100%; height:300px;}
</style>
<script>
import filter from '../vux/libs/filters'

export default {
  name: 'plugin',

  data () {
    return {
      value: '请选择时间'
    }
  },

  ready () {
    var view = this;
    var els = view.$els;

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


    var addr = VUX.address;

    function getName(value){
      var cur;
      addr.forEach(function(e){
        if(e.value === value){
          return cur = e.name
        }
      });
      return cur
    }

    function getChildren(value){
      var col = [];
      addr.forEach(function(e){
        if(e.parent === value){
          col.push(e);
        }
      });
      return col
    }

    function getFirstColumn(data){
      var col = [];
      addr.forEach(function(e){
        if(!e.parent || e.parent === 0){
          col.push(e);
        }
      });
      return col
    }
    var pozArr = [];
    var province = getFirstColumn(addr);
    var firstCity = getChildren(province[0].value);
    var firstArea = getChildren(firstCity[0].value);
    pozArr[0] = province[0].name;
    pozArr[1] = firstCity[0].name;
    pozArr[2] = firstArea[0].name;

    console.log(pozArr);

    // 调用滚动选择插件
    view.scroller = [];
    view.scroller[0] = VUX.scroller(els.picker1, {
      data: province,
      onSelect: function (value) {
        pozArr[0] = getName(value);
        var curCity = getChildren(value);
        var firstArea = getChildren(curCity[0].value);
        view.scroller[1].destroy();
        pozArr[1] = curCity[0].name;
        pozArr[2] = firstArea[0].name;
        console.log(pozArr);
        view.scroller[1] = VUX.scroller(els.picker2, {
          data: curCity,
          onSelect: function (value) {
            pozArr[1] = getName(value);
            var curArea = getChildren(value);
            pozArr[2] = curArea[0].name;
            view.scroller[2].destroy();
            console.log(pozArr);
            view.scroller[2] = VUX.scroller(els.picker3, {
              data: curArea,
              onSelect: function (value) {
                pozArr[2] = getName(value);
                console.log(pozArr);
              }
            })
          }
        })
        view.scroller[2].destroy();
        view.scroller[2] = VUX.scroller(els.picker3, {
          data: firstArea,
          onSelect: function (value) {
            pozArr[2] = getName(value);
            console.log(pozArr);
          }
        })
      }
    })

    view.scroller[1] = VUX.scroller(els.picker2, {
      data: firstCity,
      onSelect: function (value) {
        pozArr[1] = getName(value);
        var curArea = getChildren(value);
        pozArr[2] = curArea[0].name;
        view.scroller[2].destroy();
        console.log(pozArr);
        view.scroller[2] = VUX.scroller(els.picker3, {
          data: curArea,
          onSelect: function (value) {
            pozArr[2] = getName(value);
            console.log(pozArr);
          }
        })
      }
    })

    view.scroller[2] = VUX.scroller(els.picker3, {
      data: firstArea,
      onSelect: function (value) {
        pozArr[2] = getName(value);
        console.log(pozArr);
      }
    })

    $(view.$els.throw).on('click', function(){
      alert(pozArr.join("-"));
    })

    // 调用滚动选择日期插件
    view.datePicker = VUX.datePicker({
      trigger: els.datetime,
      format: 'YYYY-MM-DD-HH-II',
      minYear: 1990,
      maxYear: 2050,
      onConfirm: function (value) {
        console.log(value);
        view.value = value;
      }
    })

  },
  beforeDestroy: function () {
    for (var i = 0; i < 3; i++) {
      this.scroller[i].destroy()
      this.scroller[i] = null
    }
    this.datePicker.destroy();
    this.datePicker = null;
  },
  methods: {
    
  }
}
</script>