<template>
  <article>
    <div v-el:circle data-num ="10" class="mycircle"></div>
    <button class="vux-btn" :class="{'disabled' : !couldClick}" @click="counter">点击倒计时</button>
  </article>
</template>
<style scoped>
article{padding:0.2rem;}
.mycircle{width:2.64rem; height:2.64rem; margin:0.6rem auto;}
.mycircle:after{content:attr(data-num); display:block; width:100%; height:100%; line-height:2.64rem; text-align:center; font-size:0.72rem; position:absolute; left:0; top:0;}
.mycircle:before{content:'sec'; display:block; width:100%; position:absolute; left:0; bottom:0.4rem; text-align:center; color:#ccc; z-index:4;}
</style>
<script>
// 单独引入插件
import circle from '../../plugins/circle' 

export default {
  name: 'circle',

  data () {
    return {
      couldClick: true
    }
  },

  ready () {
    var view = this;

    // 初始化头部
    VUX.setHeader({
      title: 'circle 组件'
    })


    // 初始化 circle
    // rem为宽高单位的容器应指定circle边长,
    // 或设置固定px宽高,以能获得准确容器宽高

    view.myCircle = new circle(view.$els.circle, {
      initial: 1,
      edge: VUX.utils.matrixing(2.64),
      during: 1000,
      circleWidth: 10
    })

    
    
  },

  beforeDestroy () {
    if(this.timer) clearTimeout(this.timer);
  },

  methods: {
    counter: function(){
      var view = this;
      if(!view.couldClick){
        return
      }
      view.couldClick = false;  
      var dom = view.$els.circle;
      var t = 10;
      dom.setAttribute('data-num', t);
      view.timer = setInterval(function() {
        dom.setAttribute('data-num', t);
        t -= 1,
        view.myCircle.set(t / 10)  
        if (t == 0){
          var tm = setTimeout(function(){
            VUX.dialog({
              type: 'alert',
              title: '提示',
              content: '倒计时结束',
              okFn: function(){
                view.couldClick = true;
                view.myCircle.set(1);
                dom.setAttribute('data-num', 10);
              }
            })
            dom.setAttribute('data-num', 0);
            clearTimeout(tm);
          },1000)
          clearTimeout(view.timer);
        }
      },
      1000);
    }
  }
}
</script>