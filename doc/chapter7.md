# vue基础语法（一）

### 1.1 数据绑定语法 
[点此查看详细官方文档](http://cn.vuejs.org/guide/syntax.html)


**文本插值示例**

<pre>&lt;span&gt;Message: { { msg } }&lt;/span&gt;</pre>

<pre>&lt;div id=&quot;item-{ { id } }&quot;&gt;&lt;/div&gt;</pre>


**绑定表达式示例**

<pre>{ { number + 1 } }
{ { ok ? 'YES' : 'NO' } }
{ { message.split('').reverse().join('') } }</pre>

*错误示例*

<pre>// 这是一个语句，不是一个表达式
{ { var a = 1 } }
// 流程控制也不可以，可改用三元表达式
{ { if (ok) { return message } } }</pre>


**过滤器示例**

<pre>{ { message | capitalize } }</pre>

*过滤器串联*

<pre>{ { message | filterA | filterB } }</pre>

*过滤器也可以接受参数*

<pre>{ { message | filterA 'arg1' arg2 } }</pre>

> 过滤器函数始终以表达式的值作为第一个参数。带引号的参数视为字符串，而不带引号的参数按表达式计算。这里，字符串 'arg1' 将传给过滤器作为第二个参数，表达式 arg2 的值在计算出来之后作为第三个参数。


**指令**

> 指令 (Directives) 是特殊的带有前缀 v- 的特性。指令的值限定为绑定表达式，指令的职责就是当其表达式的值改变时把某些特殊的行为应用到 DOM 上。例：

<pre>&lt;p v-if=&quot;greeting&quot;&gt;Hello!&lt;/p&gt;</pre>

*参数*

> 有些指令可以在其名称后面带一个“参数” (Argument)，中间放一个冒号隔开。例如，v-bind 指令用于响应地更新 HTML 特性：

<pre>&lt;a v-bind:href=&quot;url&quot;&gt;&lt;/a&gt;</pre>

<pre>&lt;a v-on:click=&quot;doSomething&quot;&gt;</pre>


**缩写**

*v-bind缩写*

<pre>&lt;!-- 完整语法 --&gt;<br />&lt;a v-bind:href=&quot;url&quot;&gt;&lt;/a&gt;<br /> <br />&lt;!-- 缩写 --&gt;<br />&lt;a :href=&quot;url&quot;&gt;&lt;/a&gt;<br /> <br />&lt;!-- 完整语法 --&gt;<br />&lt;button v-bind:disabled=&quot;someDynamicCondition&quot;&gt;Button&lt;/button&gt;<br /> <br />&lt;!-- 缩写 --&gt;<br />&lt;button :disabled=&quot;someDynamicCondition&quot;&gt;Button&lt;/button&gt;</pre>

*v-on缩写*

<pre>&lt;!-- 完整语法 --&gt;<br />&lt;a v-on:click=&quot;doSomething&quot;&gt;&lt;/a&gt;<br /> <br />&lt;!-- 缩写 --&gt;<br />&lt;a @click=&quot;doSomething&quot;&gt;&lt;/a&gt;</pre>


### 1.2 计算属性

[点此查看详细官方文档](http://cn.vuejs.org/guide/computed.html)

> 在模板中表达式非常便利，但是它们实际上只用于简单的操作。模板是为了描述视图的结构。在模板中放入太多的逻辑会让模板过重且难以维护。如果需要多于一个表达式的逻辑，应当使用计算属性。

**基础示例**

<pre>&lt;div id=&quot;example&quot;&gt;<br />  a={ { a } }, b={ { b } }<br />&lt;/div&gt;</pre>

<pre>var vm = new Vue({
  el: '#example',
  data: {
    a: 1
  },
  computed: {
    // 一个计算属性的 getter
    b: function () {
      // `this` 指向 vm 实例
      return this.a + 1
    }
  }
})</pre>

结果： 

<pre>a=1,b=1</pre>

>你可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 vm.b 依赖于 vm.a，因此当 vm.a 发生改变时，依赖于 vm.b 的绑定也会更新。


### 1.3 Class绑定

> 注意：尽管可以用 Mustache 标签绑定 class，比如 class="{ { className } }"，但是不推荐这种写法和 v-bind:class 混用。两者只能选其一！


**对象语法示例**

<pre>&lt;div class=&quot;static&quot; v-bind:class=&quot;{ 'class-a': isA, 'class-b': isB }&quot;&gt;&lt;/div&gt;</pre>

<pre>data: {
  isA: true,
  isB: false
}</pre>

渲染为：

<pre>&lt;div class=&quot;static class-a&quot;&gt;&lt;/div&gt;</pre>

*也可以直接绑定数据里的一个对象*：

<pre>&lt;div v-bind:class=&quot;classObject&quot;&gt;&lt;/div&gt;</pre>

<pre>data: {
  classObject: {
    'class-a': true,
    'class-b': false
  }
}</pre>


**数组语法示例**

<pre>&lt;div v-bind:class=&quot;[classA, classB]&quot;&gt;</pre>

<pre>data: {
  classA: 'class-a',
  classB: 'class-b'
}</pre>

渲染为：

<pre>&lt;div class=&quot;class-a class-b&quot;&gt;&lt;/div&gt;</pre>

*根据条件切换列表中的 class，可以用三元表达式：*

<pre>&lt;div v-bind:class=&quot;[classA, isB ? classB : '']&quot;&gt;</pre>


### 1.4 绑定内联样式

v-bind:style 的对象语法十分直观——看着非常像 CSS，其实它是一个 JavaScript 对象。CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：

<pre>&lt;div v-bind:style=&quot;{ color: activeColor, fontSize: fontSize + 'px' }&quot;&gt;&lt;/div&gt;</pre>

<pre>data: {
  activeColor: 'red',
  fontSize: 30
}</pre>

直接绑定到一个样式对象通常更好，让模板更清晰：

<pre>&lt;div v-bind:style=&quot;styleObject&quot;&gt;&lt;/div&gt;</pre>

<pre>data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}</pre>


###1.5 条件渲染

**v-if**

通过条件判断选择渲染html片段，如下例：

<pre>&lt;h1 v-if=&quot;ok&quot;&gt;Yes&lt;/h1&gt;<br />&lt;h1 v-else&gt;No&lt;/h1&gt;</pre>

**template v-if**

因为 v-if 是一个指令，需要将它添加到一个元素上。但是如果我们想切换多个元素呢？此时我们可以把一个 <template> 元素当做包装元素，并在上面使用 v-if，最终的渲染结果不会包含它。

<pre>&lt;template v-if=&quot;ok&quot;&gt;<br />  &lt;h1&gt;Title&lt;/h1&gt;<br />  &lt;p&gt;Paragraph 1&lt;/p&gt;<br />  &lt;p&gt;Paragraph 2&lt;/p&gt;<br />&lt;/template&gt;</pre>

**v-show**

另一个根据条件展示元素的选项是 v-show 指令。用法大体上一样，不同的是有 v-show 的元素会始终渲染并保持在 DOM 中。v-show 是简单的切换元素的 CSS 属性 display。

>注意 v-show 不支持 < template > 语法。

**v-else**

v-else 元素必须立即跟在 v-if 或 v-show 元素的后面——否则它不能被识别。



###1.6 方法处理器


可以用 v-on 指令监听 DOM 事件：

<pre>&lt;div id=&quot;example&quot;&gt;<br />  &lt;button v-on:click=&quot;greet&quot;&gt;Greet&lt;/button&gt;<br />&lt;/div&gt;</pre>

我们绑定了一个单击事件处理器到一个方法 greet。下面在 Vue 实例中定义这个方法：

<pre>var vm = new Vue({<br />  el: '#example',<br />  data: {<br />    name: 'Vue.js'<br />  },<br />  // 在 `methods` 对象中定义方法<br />  methods: {<br />    greet: function (event) {<br />      // 方法内 `this` 指向 vm<br />      alert('Hello ' + this.name + '!')<br />      // `event` 是原生 DOM 事件<br />      alert(event.target.tagName)<br />    }<br />  }<br />})<br /> <br />// 也可以在 JavaScript 代码中调用方法<br />vm.greet() // -&gt; 'Hello Vue.js!'</pre>

###1.7 表单控件绑定

参见UI元件演示模块 *(src/mods/ui.vue)*