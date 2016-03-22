<template>
  <article>
    <!-- 演示开始 -->
    <div class="swiper-wrap">
      <div class="swiper" v-el:slider1>
        <div class="item"><img src="../../assets/img/v1.jpg"></div>
        <div class="item"><img src="../../assets/img/v2.jpg"></div>
        <div class="item"><img src="../../assets/img/v3.jpg"></div>
        <div class="item"><img src="../../assets/img/v4.jpg"></div>
      </div>
    </div> 
    <h1>当前显示：第 {{number}} 个</h1>
    <div class="swiper-wrap">
      <div class="swiper" v-el:slider2>
        <div class="item"><div class="text">金樽清酒斗十千</div></div>
        <div class="item"><div class="text" style="background-color:#FFA626">玉盘珍羞直万钱</div></div>
        <div class="item"><div class="text" style="background-color:#F97664">停杯投箸不能食</div></div>
        <div class="item"><div class="text" style="background-color:#4798F3">拔剑四顾心茫然</div></div>
        <div class="item"><div class="text" style="background-color:#4798F3">欲渡黄河冰塞川</div></div>
        <div class="item"><div class="text" style="background-color:#4798F3">将登太行雪满山</div></div>
      </div>
    </div>   
    <h1>当前诗句：{{text}}</h1>
    <!-- 演示结束 -->
  </article>
</template>
<style scoped>
h1{padding:0.1rem 0.2rem; margin-bottom:0.1rem;}
.text{width:100%; height:140px; line-height:140px; background-color:#91C66A; color:#FFF; text-align:center; font-size:0.52rem;}
</style>
<script>

export default {
  name: 'swiper',

  data () {
    return {
      number: 1,
      text: ''
    }
  },

  ready () {
    var view = this;
    var els = this.$els;

    // 初始化头部
    VUX.setHeader({
      title: 'swiper 轮播图组件'
    })

    // 调用swiper1
    VUX.swiper({
      container: els.slider1,
      item: '.item',
      ratio: 960/445,
      observer: true,
      autoplay: true,
      onSwiped: function(i){
        view.number = i + 1;
      },
      during: 3000
    });

    // 调用swiper2
    var itms = els.slider2.getElementsByClassName('text');
    VUX.swiper({
      container: els.slider2,
      item: '.item',
      observer: false,
      autoplay: false,
      onSwiped: function(i){
        view.text = itms[i].textContent;
      },
      during: 3000
    });
    
  }
}
</script>