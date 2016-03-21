<template>
  <article class="toast">
    <div class="textarea">
      <textarea placeholder="请输入您想要的toast内容" v-el:txt></textarea>
    </div>
    <div class="type">当前toast类型：{{type}}</div>
    <div class="vux-flexbox">
      <button class="vux-flexbox-item vux-btn" @click="selectType">选择toast类型</button>
      <button class="vux-flexbox-item vux-btn red" @click="fireToast">点击弹出toast</button>
    </div>
  </article>
</template>
<style scoped>
.toast{padding:0.3rem 0.2rem 0.4rem; background-color:#fff;}
.textarea{padding:0.2rem; height:2rem; background-color:#f4f4f4;}
.textarea textarea{width:100%; height:100%; resize:none;}
.type{margin:0.2rem 0;}
</style>
<script>

export default {
  name: 'toast',

  data () {
    return {
      type: '普通提示',
      typeParam: 'default',
    }
  },

  ready () {
    var view = this;

    // 初始化头部
    VUX.setHeader({
      title: 'toast组件'
    })

    view.ppicker = VUX.popPicker({
      data: [
              // 此为级联菜单，会根据第一层数组length确定级联层级
              [
                {name:'普通类型', value: 'default'},
                {name:'错误提示', value: 'error'},
                {name:'成功提示', value: 'success'}
              ]  
            ],
      onConfirm: function(data){
        console.log(data);
        view.type = data[0].name;
        view.typeParam = data[0].value;
      }
    })
  },

  beforeDestroy: function () {
    // 跳转时必须销毁 级联选择插件
    this.ppicker.destroy();
  },

  methods: {
    selectType: function(){
      this.ppicker.show();
    },
    fireToast: function(){
      var view = this;
      VUX.toast({
        text: view.$els.txt.value || '欢迎使用 vux',
        delay: 3000,
        type: view.typeParam
      })
    }
  }
}
</script>