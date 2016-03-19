<template>
  <article>
    <div class="swiper-wrap">
      <div class="swiper" v-el:slider>
        <div class="item"><img src="../assets/img/v1.jpg"></div>
        <div class="item"><img src="../assets/img/v2.jpg"></div>
        <div class="item"><img src="../assets/img/v3.jpg"></div>
        <div class="item"><img src="../assets/img/v4.jpg"></div>
      </div>    
    </div>
    <div class="channel vux-flexbox ui-border-b">
      <i class="vux-flexbox-item a">级联选择</i>
      <i class="vux-flexbox-item b">统计图</i>
      <i class="vux-flexbox-item c">日历选择</i>
    </div>
    <div class="essay">
      <h1 class="title row">
        <i class="cell">推荐文章</i>
        <i class="more">更多</i>
      </h1>
      <div class="grid">
        <ul>
          <li v-for="itm in list" track-by="$index">
            <a :href="itm.tar" target="blank">
              <div class="item">
                <div class="imgr" :data-time=itm.time :style="{backgroundImage: 'url('+itm.url+')'}"></div>
                <div class="txt">{{itm.title}}</div>
              </div>
            </a>  
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped>
.channel{height:1.78rem; background-color:#fff; width:100%;}
.channel .vux-flexbox-item{height:100%; width:33.333%; display:block; padding-top:1.28rem; font-size:0.24rem; text-align:center;}
.channel .vux-flexbox-item:after{content:'\e60b'; display:block; height:0.84rem; width:0.84rem;color:#2a2f31; border-radius:50%; background-color:#fff; line-height:0.86rem; position:absolute; top:0.32rem; left:50%; overflow:hidden; margin-left:-0.42rem; transition:all .3s; -webkit-transition:all .3s; background:url(../assets/svg/circle.svg) no-repeat; background-size:100% 100%;}
.channel .vux-flexbox-item.b:after{content:'\e610';}
.channel .vux-flexbox-item.c:after{content:'\e615';}
.channel .vux-flexbox-item:active:after{color:#fff; background-color:#2a2f31;}
.essay{padding:0 0.16rem; background-color:#fff; overflow:hidden;}
.essay .title{padding:0.14rem 0; line-height:0.42rem;}
.essay .title i{display:block;}
.essay .title i.cell{padding-left:0.4rem;}
.essay .title i.cell:after{content:'\e613'; font-size:0.32rem; position:absolute; color:#33383a; left:0; top:50%; margin-top:-0.18rem;}
.essay .title i.more{font-size:0.24rem; color:#545453;}
.essay .title i.more:after{content:'\e61a'; font-size:0.22rem; color:#545453; vertical-align:middle; margin-top:-0.04rem;}
.essay .grid{width:100%; min-height:1rem; font-size:0;}
.essay .grid li{height:2.8rem; width:33.333%; padding-right:0.12rem; display:inline-block; overflow:hidden; vertical-align:top;}
.essay .grid li:nth-child(3n+0){padding-right:0;}
.essay .grid li a{font-size:0.23rem; color:#252525; line-height:1.34;}
.essay .grid li .item{width:100%;}
.grid li .item .imgr{width:100%; height:1.95rem; background-color:#f8f8f8; background-size:auto 100%; background-position:center center;}
.grid li .item .txt{width:100%; height:0.616rem; overflow:hidden; padding:0.06rem 0 0;}
</style>

<script>
import Firebase from 'firebase'
const FB = new Firebase('https://zenway.firebaseio.com/')
const UID = 'user-000000'


export default {
  name: 'home',
  data () {
    return {
      list: [
        {title:'', url: '', tar:''},
        {title:'', url: '', tar:''},
        {title:'', url: '', tar:''},
        {title:'', url: '', tar:''},
        {title:'', url: '', tar:''},
        {title:'', url: '', tar:''}
      ]
    }
  },    
  ready () {
    var view = this;
    var els = this.$els;

    VUX.headerBtnEmpty();
    VUX.setHeader({
      title: '首页'
    })

    //轮播图展示
    VUX.swiper({
      container: els.slider,
      item: '.item',
      ratio: 960/445,
      observer: true,
      autoplay: true,
      onSwiped: function(i){
        //console.log(i);
      },
      during: 3000
    });

    // 获取列表
    // VUX.showWaitPanel();
    VUX.progress.start();
    FB.child(UID + '/home/list').once("value", function(snapshot){
        var data = snapshot.val(), rzt = [];
        Object.keys(data).forEach(function(k) {
            rzt.push(data[k]);
        });
        view.list = (rzt.reverse()).slice(0, 100);
        //VUX.hideWaitPanel();
        VUX.progress.done();
        //console.log(rzt);
      }, function(err){
          if(errorCallback) errorCallback();
          var errStr = "数据获取失败: " + err.code;
          //VUX.hideWaitPanel();
          VUX.progress.done();
          VUX.toast({
            type: 'error',
            text: errStr,
            delay: 1600
          })
      });

    // $('#btn').on('click', function(){
    //   VUX.router.go({
    //     name: 'plugin',
    //     params: {
    //       name: 'aford'
    //     }
    //   });

    //   VUX.storage.set('userifo', {
    //     pswd: '我保存了一个小秘密',
    //     name: '但是我就是不告诉你'
    //   });

    // })

    // VUX.toast({
    //   type: 'success',
    //   text: '欢迎使用 VUX 移动前端开发框架',
    //   delay: 2000
    // })
    
    // $('#dialog').on('click', function(){
    //   VUX.dialog({
    //     type: 'confirm',
    //     title: '弹框测试',
    //     content: '我是一大段弹框测试文本内容',
    //     okFn: function(){
    //       console.log('确认成功');
    //     },
    //     cancelFn: function(){
    //       console.log('取消成功');
    //     }
    //   })
    // })

  }
  
}
</script>