## 框架运行原理详解


> 说明：框架中使用了最新的ECMAScript 6标准，主要使用了export命令、 import命令来加载和导出模块。同时也支持AMD加载规范。详情可见 [ES6 Module](http://es6.ruanyifeng.com/#docs/module) 



### 1.准备
项目基础依赖的*vue*以及*vue-router*、*zepto*通过*npm*安装，通过*ProvidePlugin*插件将这些类库框架暴露为全局方法，通过*CommonsChunkPlugin*插件将这些组件模块和自定义扩展的插件提取合并打包。见如下配置参数：
<pre>
//暴露全局方法
var dep = {
    Vue: 'Vue',
    Router: 'vue-router',
    $: "webpack-zepto"
}

//全局第三方依赖库
var libs = [
        'Vue', 
        'vue-router', 
        'webpack-zepto', 
        './src/plugins'
    ]

var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin(dep)
]
</pre>


### 2.启动
项目启动入口为```src/vux/main.js```中 main.js。
启动时加载以下模块：
<pre>import App from './units/app.vue'
import routerMap from './routers'
import filter from './libs/filters'
</pre>
依次分别为：

1. 主模板文件，为框架的主要结构基础；
2. 路由地图，模板的加载和渲染将根据该文件中的配置路径进行；
3. 过滤器，遍历扩展至vue中，可直接在模板中通过vue语法（见[vue官方文档](http://cn.vuejs.org/)）进行使用，该组件亦可通过全局变量VUX进行访问。如：```VUX.filter.strToJson(str)```调用过滤器中字符串转换成json的方法。


####2.1 扩展基础组件

框架定义了一个全局变量VUX，用于保存一些常用方法和基础方法，以及关键项目运行信息的保存（比如设备信息、页面元素状态）。

**定义全局变量空间VUX** ```window.VUX = window.VUX || {}```

**实例化全局存储器** ```VUX.storage = new Storage()```

**全局使用过滤器** ```VUX.filter = filter```

**全局使用Utils** ```VUX.utils = Utils```


####2.2 初始化页面尺寸信息
1. 根据设备尺寸计算合适的rootSize，作为rem尺寸的单位基准，并保存在全局变量内；
2. 通过换算后得到footer底部和header头部的像素尺寸信息，保存在全局变量内。


####2.3 启用Router
通过 ```Vue.use(Router)```启用*vue-router*插件，并通过加载的routerMap模块，实例化一个router，为跳转事件绑定各种初始化设置，并设置默认路径以及定义一个全局的返回方法 ```VUX.back```


###3 渲染主模板
所有的页面模块，都必须在主模板 *app.vue* 内进行渲染。主模板内定义了alert、toast、loading等组件的全局方法，并在此引入所有的样式模块文件。






