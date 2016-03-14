<template>
  <div>
    <div class="swiper-wrap">
      <div class="swiper" id="swiper1">
        <div class="item"><img src="../assets/img/view1.jpg"></div>
        <div class="item"><img src="../assets/img/view2.png"></div>
        <div class="item"><img src="../assets/img/view1.jpg"></div>
        <div class="item"><img src="../assets/img/view2.png"></div>
      </div>    
    </div>
    <button id="btn">跳转1</button>
    <button id="dialog">按钮测试dialog</button>
  </div>
</template>

<script>

export default {
  name: 'home',

  ready () {
    var view = this;
    VUX.clearHeaderBtn();
    VUX.setHeader({
      title: '首页'
    })

    //轮播图展示
    VUX.swiper({
      container: '#swiper1',
      item: '.item',
      showstate: true,
      autoplay: true,
      // swipedFn: function(i){
      //   console.log(i);
      // }
      //during: 5000
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