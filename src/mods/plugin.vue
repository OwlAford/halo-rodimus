<template>
  <div class="plu">hello！我是plugin页</div>
</template>
<style>
.plu{height:1600px; width:100%;}
</style>
<script>
export default {
  name: 'plugin',

  data () {
    return {
      
    }
  },

  ready () {
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
    },5000)
  },

  methods: {
    
  }
}
</script>