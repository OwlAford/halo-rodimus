<template>
  <article class="elastic" v-el:elastic>
    <div class="draggable-header-view" :style="{height: fullHeight + 'px'}" @touchstart="startDrag" @touchmove="onDrag" @mouseup="stopDrag" @touchend="stopDrag">
      <svg class="bg" width="100%" :height="fullHeight">
        <path :d="headerPath" fill="#3F51B5"></path>
      </svg>
      <div class="header">
        <h1>Elastic Draggable</h1>
      </div>
      <div class="content" :style="contentPosition">
        <p>Note this is just an effect demo - there are of course many additional details if you want to use this in production, e.g. handling responsive sizes, reload threshold and content scrolling. Those are out of scope for this quick little hack. However, the idea is that you can hide them as internal details of a Vue.js component and expose a simple Web-Component-like interface.</p>
      </div>
    </div>
  </article>
</template>
<style scoped>
h1 {
  font-weight: 300;
  font-size: 0.56rem;
  margin-top: 0;
  color: #fff;
  text-align: center;
  line-height: 2rem;
}

.draggable-header-view {
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.draggable-header-view .bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.draggable-header-view .header, .draggable-header-view .content {
  position: relative;
  z-index: 1;
  padding: 0.6rem;
  box-sizing: border-box;
}
.draggable-header-view .header {
  height: 3.2rem;
}
.draggable-header-view .content {
  color: #333;
  line-height: 1.5;
}
</style>
<script>
import dynamics from 'dynamics.js'

const mtH = VUX.utils.matrixing(3.2);

export default {
  name: 'elastic',

  data () {
    return {
      fullHeight: VUX.clientHeight - VUX.headerHeight,
      dragging: false,
      // quadratic bezier control point
      c: { x: mtH, y: mtH },
      // record drag start point
      start: { x: 0, y: 0 }
    }
  },

  ready () {
    var view = this;

    // 初始化头部
    VUX.setHeader({
      title: 'elastic 演示',
      leftTpl: 'back'
    })

    // 隐藏底部
    VUX.showFooter(false);

    // this.$els.elastic.addEventListener('touchmove', function (e) {
    //   e.preventDefault()
    // })
  },

  compiled () {
  },

  computed: {
    headerPath: function () {
      return 'M0,0 L'+ VUX.clientWidth +',0 '+ VUX.clientWidth +','+ mtH +'Q' + this.c.x + ',' + this.c.y +
        ' 0,'+ mtH
    },
    contentPosition: function () {
      var dy = this.c.y - mtH
      var dampen = dy > 0 ? 2 : 4
      return {
        transform: 'translate3d(0,' + dy / dampen + 'px,0)'
      }
    }
  },

  methods: {
    startDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      this.dragging = true
      this.start.x = e.pageX
      this.start.y = e.pageY
    },
    onDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging) {
        this.c.x = mtH + (e.pageX - this.start.x)
        // dampen vertical drag by a factor
        var dy = e.pageY - this.start.y
        var dampen = dy > 0 ? 1.5 : 4
        this.c.y = mtH + dy / dampen
      }
    },
    stopDrag: function () {
      if (this.dragging) {
        this.dragging = false
        dynamics.animate(this.c, {
          x: mtH,
          y: mtH
        }, {
          type: dynamics.spring,
          duration: 700,
          friction: 280
        })
      }
    }
  }
}
</script>