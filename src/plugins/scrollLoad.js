/* 页面滚动加载 */

var TEMPLATE = '<div class="scrollLoadState"><span><div class="sc-spinner"><div class="sc-spinner-icon"></div></div>正在加载中</span></div>';

// 获取元素
function getElement(expr) {
  return (typeof expr == 'string') ? document.querySelector(expr) : expr;
}

function scrollLoad(options){

  // 合并配置参数
  var opts = {
    container: null,
    fullScreen: true,
    scroller: null,
    tipTemplate: TEMPLATE,
    threshold: 200,
    callback: function(){}
  };
  for(var key in options){
      opts[key] = options[key];
  }

  var me = this;
  me.opts = opts;

  // 生成提示条
  var tmp = document.createElement('div');
  tmp.innerHTML = opts.tipTemplate;
  me.$tip = tmp.firstElementChild;
  
  // 设定滚动容器
  if(!opts.fullScreen && opts.container){
    me.$container = getElement(opts.container);
    me.$container.classList.add('autoHeight');
    opts.scroller ? 
    me.$scroller = getElement(opts.scroller) :
    me.$scroller = me.$container.firstElementChild;
  }else{
    var scroller = opts.scroller || 'article'; 
    me.$scroller = getElement(scroller);
  }

  // 提示条插入(全屏时插入scroller)
  if(opts.fullScreen){
    var inserParent;
    opts.scroller ? 
    inserParent = me.$scroller.parentNode : 
    inserParent = me.$scroller;
    inserParent.appendChild(me.$tip);
  }else{
    me.$container.appendChild(me.$tip);
  }

  // 获取滚动容器高度
  me.opts.fullScreen ?
  me.containerHeight = VUX.clientHeight || document.documentElement.clientHeight :
  me.containerHeight = me.$container.offsetHeight;

  // 防止事件重复执行
  me.flag = true;

  // 绑定滚动事件
  me.bindEvent();

}

scrollLoad.prototype = {
  refresh: function(){
    this.flag = true;
    this.$tip.classList.remove('show');
  },
  scrollFn: function(){
    var me = this, scrollTop, scrollerHeight;
    if(me.opts.fullScreen){
      scrollerHeight = document.body.scrollHeight;
      scrollTop = document.body.scrollTop;
    }else{
      scrollerHeight = me.$scroller.offsetHeight;
      scrollTop = me.$container.scrollTop;
    }
    var distance = scrollerHeight - scrollTop - me.containerHeight; 
    var threshold = me.opts.threshold;
    // 若为全屏滚动
    me.opts.fullScreen && VUX.footerHeight ? threshold += VUX.footerHeight : null;
    if(distance < threshold && me.flag){
      me.flag = false;
      me.$tip.classList.add('show');
      // 执行回调函数(传入一个刷新方法)
      me.opts.callback();
    }
  },

  bindEvent: function(){
    var me = this;
    me.opts.fullScreen ?
    document.addEventListener('scroll', function(){
      me.scrollFn()
    }, false) :
    me.$container.addEventListener('scroll', function(){
      me.scrollFn()
    }, false);
  },

  destroy: function(){
    var me = this;
    me.$tip.parentNode.removeChild(me.$tip);
    if(me.$container){
      me.$container.classList.remove('autoHeight');
      me.$container = null;
    }
    me.scrollFn = null;
  }
}

export default scrollLoad;