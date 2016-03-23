<template>
  <article class="doc">
    <iframe src="http://amaze.qiniudn.com/" style="width:100%; display:block; margin:0; padding:0" frameborder="0" v-el:frame></iframe>
  </article>
</template>
<style>

</style>
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
    var frameHeight = VUX.clientHeight - VUX.headerHeight - VUX.footerHeight;
    els.frame.style.height = frameHeight + 'px';

  },

  beforeDestroy: function () {
   
  },

  methods: {
    
  }
}
</script>