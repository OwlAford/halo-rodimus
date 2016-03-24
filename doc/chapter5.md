# 插件的基本使用方法

## 1. eCharts百度统计图插件

> 该组件使用了百度官方插件，通过统一接口调用。所有API与官方保持一致，详情见官方文档：[eCharts3官网](http://echarts.baidu.com/)。此处仅提供基础使用说明。


**1.容器准备**

eCharts图表的渲染需要一个固定像素尺寸的容器，由于框架采用了rem为单位，故需要进行单位尺寸换算才能正常工作,框架提供了`VUX.utils.matrixing`方法来实现rem和px单位的换算。以`width:100%; height:3.2rem` 的DOM节点为例：

<pre>[element].style.height = VUX.utils.matrixing(0.32) + 'px';</pre>

> 注：一般情况下，图表容器宽度即为可视区域宽度（VUX.clientWidth）,若需要减去对应的padding及margin，可通过换算后减去，以`padding:0 0.16rem`为例：

<pre>[element].style.width = VUX.clientWidth - VUX.utils.matrixing(0.16*2) + 'px';</pre>

**2. 初始化并调用**

<pre>var myChart = VUX.echarts.init([element]);
myChart.setOption(options);</pre>

其中options为图表的基础配置参数，官网有详细文档和案例演示，在此不作介绍。




## 2. scroller滑动选择插件

**方法：** `VUX.scroller(element, data, onSelect）`

**实例：** 

<pre>// element可为一个dom对象，也可以是 '#name' 或 '.name'
var myScroller = VUX.scroller([element], {
      data: [
        {name: '金樽清酒斗十千，玉盘珍羞直万钱', value: 0},
        {name: '停杯投箸不能食，拔剑四顾心茫然', value: 1},
        {name: '欲渡黄河冰塞川，将登太行雪满山', value: 2}
      ],
      onSelect: function(data){
        VUX.toast({
          text: '你选择了第'+ (data*1 + 1) + '行诗句'
        })
      }
    })</pre>

**参数说明：**

|参数名|类型|默认|描述|
| -- | -- | -- | -- |
|element|string/object|无|元素或元素名，为当前滑动的容器|
|data|json|无|滑动内容数组，格式见上述实例|
|onSelect|function|无|滑动停止后选中了当前元素后回调方法，传入当前选择内容value值|

> 注：该插件调用后请调用 `myScroller.destroy()`销毁当前实例。


## 3. datePicker日期时间选择插件

**调用：** `var myPickdate = VUX.datePicker(options)`

**显示实例化对象：** `myPickdate.show()`

**实例：** 

<pre>var myPickdate = VUX.datePicker({
      trigger: els.pickdate,
      format: 'YYYY-MM-DD',
      minYear: 2000,
      maxYear: 2020,
      onConfirm: function (value){
        VUX.toast({
          type: 'success',
          text: '您选择的时间为：'+ value
        })
      }
    })</pre>


**参数说明：**

|参数名|类型|默认|描述|
| -- | -- | -- | -- |
|trigger|string/object|无|元素或元素名，为点击触发该选择器的元素|
|format|string|YYYY-MM-DD|显示日期时间格式|
|minYear|number|2000|起始最小年份|
|maxYear|number|2030|结束最大年份|
|yearRow|string|{value}年|年份格式|
|monthRow|string|{value}月|月份格式|
|dayRow|string|{value}日|日期份格式|
|hourRow|string|{value}时|时刻格式|
|minuteRow|string|{value}分|分钟格式|
|onSelect|function|无|选择并停止滚动后后回调函数|
|onConfirm|function|无|点击确定按钮并停止滚动后后回调函数|
|onShow|function|无|弹出选择框回调函数|
|onHide|function|无|关闭选择框回调函数|
|confirmText|string|确定|确定按钮文本内容|
|cancelText|string|取消|取消按钮文本内容|

> 注：该插件调用后请调用 `myPickdate.destroy()`销毁当前实例。


## 4. popPicker级联弹框滑动选择插件

> 注：该方法最多支持三级级联，最少支持一级，通过判断传入参数二维数组长度确定级联层数，如 `[[数组1]，[数组2]]`为一个二级级联，  `[[数组1]，[数组2],[数组3]]`则为一个三级级联

**调用：** `var myPopPicker = VUX.popPicker(options)`

**显示实例化对象：** `myPopPicker.show()`

**参数说明：**


|参数名|类型|默认|描述|
| -- | -- | -- | -- |
|single|boolean|false|是否关闭级联，若关闭级联，则接收一个一维数组，不进行级联层数判断|
|data|array|无|级联所需二维数组，若single为false则为一维数组|
|onConfirm|function|无|点击确定回调函数，接收一个选择结果数组|
|onCancel|function|无|点击取消回调函数|


## 5. swiper滑动轮播图插件

**调用：** `var mySwiper = VUX.swiper(options)`

**实例：**

<pre>VUX.swiper({
      container: [element],
      item: '.item',
      ratio: 960/445,
      observer: true,
      autoplay: true,
      onSwiped: function(i){
        console.log('当前轮播图索引值为：' + i);
      },
      during: 3000
    });</pre>


**参数说明：**

*HTML结构：*

<pre>&lt;div class="swiper-wrap"&gt;
    &lt;div class="swiper" v-el:slider1&gt;
        &lt;div class="item"&gt;
            &lt你的html片段&gt;
            如： &lt;div class="item"&gt;&lt;img src="../../assets/img/v4.jpg"&gt;&lt;/div&gt; 
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>


|参数名|类型|默认|描述|
| -- | -- | -- | -- |
|container|string/object|无|元素或元素名，轮播图容器|
|item|string|item|轮播子元素样式名|
|ratio|number|无|容器宽高比，可自动根据宽度计算并为容器设定高度，适用于需要匹配设备宽度的轮播图|
|observer|boolean|true|轮播图轮播状态显示，true为显示，false为隐藏|
|autoplay|boolean|true|轮播图自动播放，true为开启，false为关闭|
|onSwiped|function|无|滑动结束回调函数，传入一个index参数|
|during|number|3000|播放间隔时间|
|duration|number|300|动画持续时间|
|threshold|number|50|滑动临界翻页值|


## 6. scrollLoad滚动加载插件

**调用：** `var myScroller = VUX.scrollLoad(options)`

**刷新容器：** `myScroller.refresh()`

**实例1：**

 <pre>var myScrollLoad = VUX.scrollLoad({
      fullScreen: true, 
      threshold: 100,
      scroller: '#scroller', 
      callback: function(){
        // do something
      }
    })</pre>

**实例2：**

 <pre>var myScrollLoad = VUX.scrollLoad({
      fullScreen: false, 
	  container: '#container',
      threshold: 100,
      scroller: '#scroller', 
      callback: function(){
        // do something
      }
    })</pre>

> 注： 全屏滚动不指定滚动容器，仅需指定滚动主体即可。每次滚动后加载结束或者页面长度发生变化时，需调用`myScroller.refresh()`刷新容器，重新获取滚动主体高度。

**参数说明：**

|参数名|类型|默认|描述|
| -- | -- | -- | -- |
|fullScreen|boolean|true|是否开启全屏，true为开启，false为关闭|
|threshold|number|100|滚动到底部触发加载临界距离|
|container|string/object|无|元素或元素名，滚动容器|
|scroller|string/object|无|元素或元素名，滚动容器|
|callback|function|无|滚动触发回调函数|

