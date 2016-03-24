# 组件使用介绍

###1. 头部(header)及底部（footer）导航设置
头部导航主要分为三部分：

1. 左按钮

2. 右按钮

3. 标题

其功能及模板定义在 *vux/units/header.vue* 内。主要功能列表和调用参数如下：

####1.1【控制头部显示隐藏】 

<pre>VUX.showHeader(boolean)</pre>

当参数为`true`时显示，`false`时隐藏

####1.2【控制底部显示隐藏】

<pre>VUX.showFooter(boolean)</pre>

当参数为`true`时显示，`false`时隐藏

####1.3 【顶部导航设置】

<pre>VUX.setHeader(options)</pre>


|参数名|类型|默认|描述|
| -- | -- | -- | -- |
|title|string|无|设置头部标题|
|leftTpl|string|无|设置左按钮模板，可为模板名或html片段|
|leftFn|function|无|左按钮绑定事件|
|rightTpl|string|无|同左按钮|
|rightFn|function|无|右按钮绑定事件|

**清除顶部导航按钮**

<pre>VUX.headerBtnEmpty(string)</pre>

当参数为```left```时，清除左按钮，同理参数为```right```时则清除右按钮，为空则全部清除。


###2. toast提示框设置

<pre>VUX.toast(options)</pre>

|参数名|类型|默认|描述|
| -- | -- | -- | -- |
|text|string|无|toast提示文本内容（必填）|
|delay|number|3000|显示时间长度单位为ms（毫秒），最小为1000|
|type|string|default|显示类型：【成功】'success'，【错误】'error'，【默认】'default'(可不填)|

###3. alert (confirm) 弹框设置

<pre>VUX.dialog(options)</pre>

|参数名|类型|默认|描述|
| -- | -- | -- | -- |
|type|string|confirm|dialog类型：【消息弹框】'alert',【确认框】'confirm'|
|title|string|提示|弹框标题|
|content|string|暂无提示|提示文本内容|
|okFn|function|无|确定按钮绑定事件|
|cancelFn|function|无|取消按钮绑定事件|


###4. 等待层设置
**显示等待层**

<pre>VUX.showWaitPanel()</pre>

**隐藏等待层**

<pre>VUX.hideWaitPanel()</pre>

###5. 加载进度设置

**开启加载状态**

<pre>VUX.progress.start()</pre>

**结束加载状态**

<pre>VUX.progress.done()</pre>
