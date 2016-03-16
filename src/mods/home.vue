<template>
  <div>
    <div class="swiper-wrap">
      <div class="swiper" v-el:slider>
        <div class="item"><img src="../assets/img/v1.jpg"></div>
        <div class="item"><img src="../assets/img/v2.jpg"></div>
        <div class="item"><img src="../assets/img/v1.jpg"></div>
        <div class="item"><img src="../assets/img/v2.jpg"></div>
      </div>    
    </div>
    <div class="wrap1">
      <button class="btn1" id="btn">点击跳转</button>
      <button class="btn1" id="dialog">点击测试dialog</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',

  ready () {
    var view = this;
    var els = this.$els;

    VUX.headerBtnEmpty();
    VUX.setHeader({
      title: '首页展示'
    })

    //轮播图展示
    VUX.swiper({
      container: els.slider,
      item: '.item',
      ratio: 640/360,
      observer: true,
      autoplay: true,
      onSwiped: function(i){
        console.log(i);
      },
      during: 3000
    });

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

  }
  
}
</script>