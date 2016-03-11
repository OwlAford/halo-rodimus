<template>
  <div>
    <button id="btn">跳转</button>
    <button id="dialog">按钮测试dialog</button>
  </div>
</template>
<style>
.dot:after{content:'\e600'}
</style>
<script>


export default {
  name: 'home',
  props: {
   
  },
  data () {
    return {
      
    }
  },
  events: {
    
  },
  beforeDestroy () {
    
  },
  destroyed () {
   
  },
  ready () {
    VUX.clearHeaderBtn();
    VUX.setHeader({
      title: '首页',
      // leftTpl: '<span>左边</span>',
      // leftFn: function(){
      //   console.log('你点击了左边');
      // },
      // rightTpl: '<span>右边</span>',
      // rightFn:function(){
      //   console.log('你点击了右边');
      // }
    })

    $('#btn').on('tap', function(){
      VUX.router.go({
        name: 'plugin',
        params: {
          name: 'aford'
        }
      });

      VUX.storage.set('userifo', {
        pswd: '我保存了一个小秘密',
        name: '但是我就是不告诉你'
      });

    })

    VUX.toast({
      type: 'success',
      text: '欢迎使用 VUX 移动前端开发框架',
      delay: 2000
    })
    
    $('#dialog').on('tap', function(){
      VUX.dialog({
        type: 'confirm',
        title: '弹框测试',
        content: '我是一大段弹框测试文本内容',
        okFn: function(){
          console.log('确认成功');
        },
        cancelFn: function(){
          console.log('取消成功');
        }
      })
    })

  },
  methods: {
    
  }
}
</script>