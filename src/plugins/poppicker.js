var Scroller = require('./scroller');

// 级联弹出选择插件
function creatElement(classname, html){
  var el = document.createElement('div');
  if (classname) el.className = classname;
  if (html) el.innerHTML = html;
  return el
}

function removeElement(el){
  el && el.parentNode.removeChild(el);
}

var MASK = null;

function popPicker(options){

  var defaults = {
    single: false,
    data: [],
    onConfirm: function(){},
    onCancel: function(){}
  }

  for (var key in options){
    defaults[key] = options[key];
  }

  this.opts = defaults;
  this.opts.single ? this.colNum = 1 : this.colNum = this.opts.data.length;
  this.init();
  this.render();
  this.bindEvent();
}

popPicker.prototype = {

  init: function(){
    var me = this;
    me.$container = creatElement('dp-container');
    var header = creatElement('dp-header');
    var center = creatElement('dp-item dp-center');
    me.okBtn = creatElement('dp-item dp-right', '确定');
    me.cancelBtn = creatElement('dp-item dp-left', '取消');
    header.appendChild(me.cancelBtn);
    header.appendChild(center);
    header.appendChild(me.okBtn);
    me.$container.appendChild(header);

    var flexBox = creatElement('vux-flexbox');
    me.colum = [];
    for (var i = 0; i < me.colNum; i++){
      me.colum[i] = creatElement('vux-flexbox-item');
      flexBox.appendChild(me.colum[i]);
    }
    me.$container.appendChild(flexBox);

    var BODY = document.body;
    BODY.appendChild(me.$container);
    // 防止重复生成mask
    if (MASK) {
      me.$mask = MASK;
      return
    }
    MASK = creatElement('dp-mask');
    BODY.appendChild(MASK);
  },

  render: function(){

    function getTarget(data, value){
      var cur;
      data.forEach(function(e){
        if(e.value === value){
          return cur = e
        }
      });
      if(!cur){
        return false 
      } 
      return cur
    }

    function getChildren(data, value){
      var col = [];
      var flag = false;
      data.forEach(function(e){
        if(e.parent === value){
          flag = true;
          col.push(e);
        }else if(flag){
          return
        }
      });
      if(col.length == 0){
        return false 
      } 
      return col
    }

    function formatNameVal(obj){
      if(!obj){
        return {
          value: null,
          name: ''
        }
      }
      obj.name ? null : obj.name = '';
      obj.value ? null : obj.value = null;
      return {
        value: obj.value,
        name: obj.name
      }
    }

    function getNameVal(data, value){
      var obj = getTarget(data, value);
      return formatNameVal(obj);
    }

    var me = this;
    var DATA = me.opts.data;
    var SINGLE = me.opts.single;
    me.scroller = [];

    //////////////////////////////////////////////
    if(me.colNum == 1 || SINGLE){
      var DT;
      SINGLE ? DT = DATA : DT = DATA[0];
      me.colum[0].param = formatNameVal(DT[0]);
      //console.log(me.colum[0].param);
      me.scroller[0] = me.renderScroller(me.colum[0], DT, function(value){
        SINGLE ? me.colum[0].param = value : me.colum[0].param = getNameVal(DT, value);
        //console.log(me.colum[0].param);
      })
    }else if(me.colNum == 2){
      //////////////////////////////////
      // var log = function(){
      //   console.log(col1.param);
      //   console.log(col2.param);
      // }
      //////////////////////////////////

      var DT1 = DATA[0];
      var DT2 = DATA[1];
      var col1 = me.colum[0];
      var col2 = me.colum[1];
      var scoller1 = me.scroller[0];
      var scoller2 = me.scroller[1];

      var defaultData2 = getChildren(DT2, DT1[0]['value']);
      col1.param = formatNameVal(DT1[0]);
      col2.param = formatNameVal(defaultData2[0]);
      
      //log();

      function loop1(){
        if(scoller1) scoller1.destroy();
        scoller1 = me.renderScroller(col1, DT1, function(value){
          col1.param = getNameVal(DT1, value);
          defaultData2 = getChildren(DT2, value);
          col2.param = formatNameVal(defaultData2[0]);

          //log();
          
          loop2();
        })
      }

      var loop2 = function(){
        if(scoller2) scoller2.destroy();
        scoller2 = me.renderScroller(col2, defaultData2, function(value){
          col2.param = getNameVal(DT2, value);

          //log();
        })
      }

      loop1(); 
      loop2();

    }else if(me.colNum == 3){
      //////////////////////////////////
      // var log = function(){
      //   console.log(col1.param);
      //   console.log(col2.param);
      //   console.log(col3.param);
      // }
      //////////////////////////////////
      var DT1 = DATA[0];
      var DT2 = DATA[1];
      var DT3 = DATA[2];
      var col1 = me.colum[0];
      var col2 = me.colum[1];
      var col3 = me.colum[2];
      var scoller1 = me.scroller[0];
      var scoller2 = me.scroller[1];
      var scoller3 = me.scroller[2];

      var defaultData2 = getChildren(DT2, DT1[0]['value']);
      var defaultData3 = getChildren(DT3, defaultData2[0]['value']);
      col1.param = formatNameVal(DT1[0]);
      col2.param = formatNameVal(defaultData2[0]);
      col3.param = formatNameVal(defaultData3[0]);

      //log()

      function loop1(){
        if(scoller1) scoller1.destroy();
        scoller1 = me.renderScroller(col1, DT1, function(value){
          col1.param = getNameVal(DT1, value);
          defaultData2 = getChildren(DT2, value);
          defaultData3 = getChildren(DT3, defaultData2[0]['value']);
          col2.param = formatNameVal(defaultData2[0]);
          col3.param = formatNameVal(defaultData3[0]);
          // 解决第二、三级无数据问题
          if(!defaultData2){
            defaultData2 = [{name: '', value: 0}];
          }
          if(!defaultData3){
            defaultData3 = [{name: '', value: 0}];
          }

          //log()

          loop2();
          loop3();

        })
      }

      var loop2 = function(){
        if(scoller2) scoller2.destroy();
        scoller2 = me.renderScroller(col2, defaultData2, function(value){
          col2.param = getNameVal(DT2, value);
          defaultData3 = getChildren(DT3, value);
          col3.param = formatNameVal(defaultData3[0]);
          // 解决第三级无数据问题
          if(!defaultData3){
            defaultData3 = [{name: '', value: 0}];
          }
          //log()

          loop3();

        })
      }

      var loop3 = function(){
        if(scoller3) scoller3.destroy();
        scoller3 = me.renderScroller(col3, defaultData3, function(value){
          col3.param = getNameVal(DT3, value);

          //log()
        })
      }

      loop1();
      loop2();
      loop3();
    }  

  },

  renderScroller: function(el, data, fn){
    var scroller = new Scroller(el, {
      data: data,
      onSelect: fn
    });
    return scroller;
  },

  show: function(){
    this.$container.classList.add('show');
    MASK.classList.add('show');
  },

  hide: function(){
    var me = this;
    me.$container.classList.remove('show');
    MASK.classList.remove('show');
    me.$container.classList.add('leave');
    MASK.classList.add('leave');
    me.later(function(){
      me.$container.classList.remove('leave');
      MASK.classList.remove('leave');
    }, 300)
  },

  later: function(fn, delay){
    var timer = setTimeout(function(){
      fn();
      clearTimeout(timer);
    }, delay)
  },

  bindEvent: function(){
    var me = this;
    var SINGLE = me.opts.single;
    // 取消按钮绑定事件
    me.cancelBtn.addEventListener('click', function(){
      me.opts.onCancel();
      me.hide();
    }, false);
    // 确认按钮绑定事件
    me.okBtn.addEventListener('click', function(){
      // 获取所得参数
      var data = [];
      SINGLE ? data = me.colum[0].param :
       Array.prototype.forEach.call(me.colum, function(itm){
          data.push(itm.param);
      });
      //console.log(data);
      me.opts.onConfirm(data);
      me.hide();
    }, false);
  },

  destroy: function(){
    var me = this;
    removeElement(MASK);
    removeElement(me.$container);
    MASK = null;
    me.$container = null;
  }

}

export default popPicker;