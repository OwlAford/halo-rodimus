<template>
  <header v-show="showState">
      <div class="header">
        <div class="title" v-el:header-title>{{title}}</div>
        <div class="left" v-el:header-left></div>
        <div class="right" v-el:header-right></div>
      </div>
  </header>
</template>
<style>
header{width:100%; height:0.8rem;}
header .header{width:100%; height:0.8rem; background-color:#313638; color:#fff; position:fixed; left:0; top:0; z-index:999; line-height:0.8rem; z-index:9999;}
header .title{text-align:center;}
header .left,
header .right{position:absolute; top:0; right:0.1rem; transition:opacity .3s; -webkit-transition:opacity .3s;}
header .left:active,
header .right:active{opacity:.8;}
header .left{left:0.1rem; right:auto;}
header .left i{padding-left:0.46rem;}
header .right i{padding-right:0.46rem;}
header .left i:after{left:0;}
header i:after{font-size:0.36rem; position:absolute; right:0; top:50%; margin-top:-0.18rem;}
header .back:after{content:'\e602';}
header .list:after{content:'\e60f';}
</style>
<script>

export default {
  name: 'AppHeader',
  data () {
    return {
      showState: true,
      title: '首页'
    }
  },
  ready () {
    var view = this;
    var elems = view.$els;
    var headerLeft = elems.headerLeft;
    var headerRight = elems.headerRight;

    //定义全局控制显示隐藏头部方法,传入参数为布尔值为显示状态
    //true为显示，false为隐藏
    VUX.showHeader = function(s){
      view.showState = VUX.headerShowState = s
    };

    //定义头部功能按钮模板
    var templates = {
      back: '<i class="back">返回</i>',
      cancel: '<span>取消</span>',
      list: '<i class="list"></i>'
    }
    
    // 清除头部按钮
    // 'left', 'right'分别代表左按钮和右按钮,若不设置则为全部清空
    VUX.headerBtnEmpty = function(part){
      if(part == 'right' || !part) headerRight.innerHTML = '';
      if(part == 'left' || !part) headerLeft.innerHTML = '';
    }

    // 定义全局左右按钮默认点击方法
    VUX.headerBtnLeftFn = VUX.back;
    VUX.headerBtnRightFn = VUX.noop;

    // 左右按钮全局绑定事件
    headerLeft.addEventListener('click', function(){
      VUX.headerBtnLeftFn()
    }, false);
    headerRight.addEventListener('click', function(){
      VUX.headerBtnRightFn()
    }, false);

    /* ## 定义全局控制头部
     *
     * @ param --> title 头部标题
     * @ param --> leftTpl, rightTpl 为按钮默认片段模板名或者自定义html片段(不可为纯文本)
     * @ param --> leftFn, rightFn 为按钮绑定方法, back对应模板默认为返回事件
     */
    VUX.setHeader = function(opt){
      view.title = opt.title;
      var getTpl = function(t){
        var tpl;
        (new RegExp(/<[^>]+>/)).test(t) ? tpl = t : tpl = templates[t];
        return tpl;
      }
      var insertDom = function(tpl, fn, side){
        var parent;
        side == 'left' ? parent = headerLeft : parent = headerRight;
        parent.innerHTML = getTpl(tpl);
        if(fn){
          var callback = function(){
            fn();
            tpl == 'back' && VUX.back();
          }
          side == 'left' ? 
          VUX.headerBtnLeftFn = callback : 
          VUX.headerBtnRightFn = callback;
        };
      }
      if(opt.leftTpl){
        headerLeft.innerHTML = '';
        insertDom(opt.leftTpl, opt.leftFn, 'left');
      } 
      if(opt.rightTpl){
        headerRight.innerHTML = '';
        insertDom(opt.rightTpl, opt.rightFn, 'right');
      }
    }

  }
}
</script>