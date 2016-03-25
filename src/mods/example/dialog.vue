<template>
  <article class="alert">
    <div class="textarea">
      <textarea placeholder="请输入您想要{{type}}内容" v-el:txt></textarea>
    </div>
    <button class="vux-btn" @click="fireDialog">点击触发 {{type}} 弹框</button>
  </article>
</template>
<style scoped>
.alert{padding:0.3rem 0.2rem 0.4rem; background-color:#fff;}
.textarea{padding:0.2rem; height:2rem; background-color:#f4f4f4;}
.textarea textarea{width:100%; height:100%; resize:none;}
</style>
<script>

export default {
  name: 'toast',

  data () {
    return {
      text: '欢迎使用 vux',
      type: 'alert'
    }
  },

  ready () {
    var view = this;

    // 初始化头部
    VUX.setHeader({
      title: 'alert/confirm 组件'
    })

    // 通过router传递参数获取dailog类型
    view.type = view.$route.params.type;
  },

  methods: {
    fireDialog: function(){
      var view = this;
      VUX.dialog({
        type: view.type,
        title: '提示',
        content: view.$els.txt.value || '欢迎使用 vux',
        cancelFn: function(){
          console.log('点击了取消');
        },
        okFn: function(){
          console.log('点击了确定');
        }
      })
    }
  }
}
</script>