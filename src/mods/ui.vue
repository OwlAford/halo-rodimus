<template>
  <article class="ui">
    <div class="vux-list">
      <div class="vux-list-item"> 
        <span>switch 开关状态：{{switch}}</span>
        <div class="vux-switch" :class="{'active' : switch}" @click="triggerSwitch"></div>
      </div>
      <div class="vux-list-item">
        <div class="vux-checkbox">
          <label>checked：{{checked}}</label>
          <input type="checkbox" name="check" v-model="checked">
        </div>
      </div>
    </div>
    <div class="vux-list">
      <div class="vux-list-item"> 
        <div class="vux-checkbox">
          <label>李雷</label>
          <input type="checkbox" value="李雷" v-model="checkedNames">
        </div>
      </div>
      <div class="vux-list-item"> 
        <div class="vux-checkbox">
          <label>韩梅梅</label>
          <input type="checkbox" value="韩梅梅" v-model="checkedNames">
        </div>
      </div>
      <div class="vux-list-item"> 
        <div class="vux-checkbox">
          <label>汤姆</label>
          <input type="checkbox" value="汤姆" v-model="checkedNames">
        </div>
      </div>
      <div class="vux-list-item">最后选择结果为：{{checkedNames}}</div>
    </div> 

    <div class="vux-list">
      <div class="vux-list-item"> 
        <div class="vux-radio">
          <label>姚明</label>
          <input type="radio" value="姚明" v-model="picked">
        </div>
      </div>
      <div class="vux-list-item"> 
        <div class="vux-radio">
          <label>郭敬明</label>
          <input type="radio" value="郭敬明" v-model="picked">
        </div>
      </div>
      <div class="vux-list-item"> 
        <div class="vux-radio">
          <label>黄晓明</label>
          <input type="radio" value="黄晓明" v-model="picked">
        </div>
      </div>
      <div class="vux-list-item">最后选择结果为：{{picked}}</div>
    </div>

  </article>
</template>
<style>
.vux-list + .vux-list{margin-top:0.2rem;}
</style>
<script>

export default {
  name: 'ui',

  data () {
    return {
      switch: false,
      checked: false,
      checkedNames: []
    }
  },

  ready () {
    var view = this;
    var els = view.$els;

    VUX.setHeader({
      title: 'UI 组件',
      leftTpl: 'back'
    })

  },

  methods: {
    triggerSwitch: function(){
      this.switch ? this.switch = false : this.switch = true;
    }
  }
}
</script>