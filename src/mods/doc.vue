<template>
  <article class="doc">
    <iframe src="https://owlaford.gitbooks.io/vux-mobile-framework/content/index.html" style="width:100%; display:block; margin:0; padding:0" frameborder="0" v-el:frame></iframe>
  </article>
</template>

<script>

export default {
  name: 'doc',

  data () {
    return {

    }
  },

  ready () {
    var view = this;
    var els = view.$els;

    VUX.setHeader({
      title: '框架文档',
      leftTpl: 'back'
    })

    // 设定嵌套页面高度
    VUX.progress.start();
    var frameHeight = VUX.clientHeight - VUX.headerHeight - VUX.footerHeight;
    els.frame.style.height = frameHeight + 'px';
    els.frame.onload = function(){
      VUX.progress.done();
    }

  }
}
</script>