<template>
  <article>
    <div class="scroller" v-el:scroller></div>
  </article>
</template>
<style scoped>
.scroller{width:100%; height:238px; background-color:#fff;}
</style>
<script>

export default {
  name: 'toast',

  data () {
    return {
      type: '普通提示',
      typeParam: 'default',
    }
  },

  ready () {
    var view = this;

    // 初始化头部
    VUX.setHeader({
      title: 'scroller 组件'
    })

    // 调用scroller组件
    view.SCR = VUX.scroller(view.$els.scroller, {
      data: [
        {name: '金樽清酒斗十千，玉盘珍羞直万钱', value: 0},
        {name: '停杯投箸不能食，拔剑四顾心茫然', value: 1},
        {name: '欲渡黄河冰塞川，将登太行雪满山', value: 2},
        {name: '闲来垂钓碧溪上，忽复乘舟梦日边', value: 3},
        {name: '行路难！行路难！多歧路，今安在', value: 4},
        {name: '长风破浪会有时，直挂云帆济沧海', value: 5},
        {name: '长风破浪会有时，直挂云帆济沧海', value: 6},
        {name: '杨花落尽子规啼，闻道龙标过五溪', value: 7},
        {name: '我寄愁心与明月，随风直到夜郎西', value: 8},
        {name: '谁家玉笛暗飞声，散入春风满洛城', value: 9},
        {name: '此夜曲中闻折柳，何人不起故园情', value: 10},
        {name: '懒摇白羽扇，裸袒青林中', value: 11},
        {name: '脱巾挂石壁，露顶洒松风', value: 12},
        {name: '兰陵美酒郁金香，玉碗盛来琥珀光', value: 13},
        {name: '但使主人能醉客，不知何处是他乡', value: 14}
      ],
      onSelect: function(data){
        VUX.toast({
          text: '你选择了第'+ (data*1 + 1) + '行诗句'
        })
      }
    })
  },

  beforeDestroy () {
    // 跳转时必须销毁选择插件
    this.SCR.destroy();
  },

  methods: {
    
  }
}
</script>