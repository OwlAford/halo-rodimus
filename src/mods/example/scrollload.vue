<template>
  <article>
    <div class="vux-list" id="scroller">
      <ul v-el:container>
        <li  v-for="itm in citys"><div class="vux-list-item">{{itm.name}}</div></li>
        <li>
          <div id="innerScroll">
            <div class="vux-list" id="scroller2">
              <ul id="inserted">
                <li  v-for="itm in citys"><div class="vux-list-item">{{itm.name}}</div></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>  
    </div>
  </article>
</template>
<style scoped>
.vux-list{text-indent:0.3rem;}
#innerScroll{width:100%; height:200px; background-color:#f8f8f8;}
#innerScroll .vux-list{background-color:#f8f8f8;}
</style>
<script>

export default {
  name: 'scrollLoad',

  data () {
    return {
      citys: null
    }
  },

  ready () {
    var view = this;

    // 初始化头部
    VUX.setHeader({
      title: 'scrollLoad 组件'
    })

    // 获取演示所需的城市数据
    VUX.progress.start();
    view.xhr = $.ajax({
      type: "GET",
      async: false, 
      url: "http://plug.qiniudn.com/citys.json",
      dataType: "json",
      success: function(citys){
        view.citys = citys[0]
      },
      complete: function(){
        VUX.progress.done();
      },
      error: function(){  
        VUX.toast({
          text: '模拟数据获取失败',
          delay: 1000
        })
      }  
    });

    // 全屏滚动加载
    var SC = VUX.scrollLoad({
      fullScreen: true,  // 全屏滚动可不指定滚动容器
      threshold: 100,
      scroller: '#scroller', // 滚动主体不能为当前模板页及其父节点
      callback: function(){
        view.addChild(SC, view.$els.container);
      }
    })

    // 局部滚动加载
    var SC1 = VUX.scrollLoad({
      fullScreen: false,  // 全屏滚动可不指定滚动容器
      container: '#innerScroll',
      threshold: 100,
      scroller: '#scroller2', // 滚动主体不能为当前模板页及其父节点
      callback: function(){
        view.addChild(SC1, document.getElementById('inserted'));
      }
    })
    
  },

  beforeDestroy: function () {
    // 跳转时必须销毁滚动加载插件
  },

  methods: {
    addChild: function(instance, inserted){
      var num = 0;
      setTimeout(function(){
        for(var i = 0; i < 12; i++){
          var dom = document.createElement('li');
          dom.innerHTML = '<div class="vux-list-item">新增子元素节点为' + num + '</div>';
          num++;
          inserted.appendChild(dom);
        }
        instance.refresh();
      },3000)
    }
  }
}
</script>