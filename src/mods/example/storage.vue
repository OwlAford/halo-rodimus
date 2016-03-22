<template>
  <article class="storage">
    <div class="textarea">
      <textarea placeholder="请输入您想要的存储内容" v-el:txt>vux是个好框架</textarea>
    </div>
    <div class="vux-flexbox">
      <button class="vux-flexbox-item vux-btn" @click="save">保存文本</button>
      <button class="vux-flexbox-item vux-btn" @click="read">读取文本</button>
      <button class="vux-flexbox-item vux-btn red" @click="remove">删除文本</button>
    </div>
  </article>
</template>
<style scoped>
.storage{padding:0.3rem 0.2rem 0.4rem; background-color:#fff;}
.textarea{padding:0.2rem; height:2rem; background-color:#f4f4f4; margin-bottom:0.3rem;}
.textarea textarea{width:100%; height:100%; resize:none;}
.type{margin:0.2rem 0;}
</style>
<script>

export default {
  name: 'storage',

  ready () {
    var view = this;

    // 初始化头部
    VUX.setHeader({
      title: 'storage 存储组件'
    })

  },

  methods: {
    save: function(){
      VUX.storage.set('storageMsg', this.$els.txt.value);
    },
    read: function(){
      var view = this;
      var msg = VUX.storage.get('storageMsg');
      VUX.toast({
        text: msg || '尚未保存信息',
        delay: 2000
      })
    },
    remove: function(){
      var msg = VUX.storage.remove('storageMsg');
      msg ? msg = '“' + msg + '” 已删除' : msg = '该信息不存在';
      VUX.toast({
        text: msg,
        delay: 2000
      })
    }
  }
}
</script>