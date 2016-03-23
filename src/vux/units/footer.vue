<template>
  <footer v-show="showState">
    <div class="footer ui-border-t">
      <i v-link="{ name: 'home', activeClass: 'active' }">展示</i>
      <i v-link="{ name: 'plugin', activeClass: 'active' }">组件</i>
      <i>UI元件</i>
      <i v-link="{ name: 'doc', activeClass: 'active' }">文档</i>
    </div>
  </footer>
</template>
<style>
footer{width:100%; height:0.9rem;}
footer .footer{width:100%; height:0.9rem; position:fixed; left:0; bottom:0; background-color:#fff; z-index:9999; font-size:0.18rem; color:#b0b0b0; display:box; display:-webkit-box;}
footer .footer >i{display:block; -webkit-box-flex:1; box-flex:1; width:25%; text-align:center; padding-top:0.52rem;}
footer .footer >i:after{position:absolute; top:0.12rem; left:50%; margin-left:-0.2rem; font-size:0.4rem; color:#999;}
footer .footer >i.active,
footer .footer >i.active:after{color:#3AA33A;}
footer .footer >i:nth-child(1):after{content:"\e603";}
footer .footer >i:nth-child(2):after{content:"\e604";}
footer .footer >i:nth-child(3):after{content:"\e600";}
footer .footer >i:nth-child(4):after{content:"\e601";}
</style>
<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      showState: true
    }
  },
  ready () {
    var view = this;
    view.showState = VUX.footerShowState;
    //定义全局控制显示隐藏底部方法
    VUX.showFooter = function(s){
      view.showState = VUX.footerShowState = s
    };
  },
  methods: {
    
  }
}
</script>