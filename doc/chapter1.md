## 搭建node.js开发平台



### 1.安装node.js
本项目的开发和调试工作全部依赖于node.js来完成。请移步[node.js官网](https://nodejs.org/en/) 根据当前操作系统下载对应的软件版本，按照对应操作提示完成软件安装，本文暂不赘述。


### 2.安装开发所需工具及插件
通过cmd命令打开对应的项目文件夹，输入 ```npm install``` 安装配置文件中所有依赖的开发工具和项目必需组件。

### 3.快速开发
1. 【开发模式】  输入 ```npm run dev```  通过http://127.0.0.1:8080/ 即可访问本地开发环境下的项目并进行开发工作。本地每次保存修改，开发环境中的代码热替换（HMR）插件将会实时刷新浏览器；

2. 【生产模式】 输入 ```npm run build``` 将项目文件编译打包至根目录```dist```文件夹下，可用于项目生产。




## 目录简介和一览

以下为框架基础目录结构：

<pre>
│  .gitignore          # git忽略文件列表
│  package.json        # 项目配置
│  readme.md           # 项目说明
│  index.html          # 首页入口
├─ static              # 静态首页模板
├─ dist                # 生产文件
│    └─ index.html
├─ node_modules         # node 开发组件和功能模块
│
├─ config
│     │  css-loaders.js                 # css 文件加载配置
│     │  webpack.base.config.js         # webpack 基础配置
│     │  webpack.dev.config.js          # webpack 开发配置
│     └─ webpack.pro.config.js          # webpack 生产配置
│
└─ src
    ├─ vux  # vux 项目核心
    │   │  main.js            # 项目启动配置
    │   │  routers.js         # 路由路径配置
    │   ├─ libs
    │   │    │ filters.js         # 过滤器
    │   │    │ storage.js         # 存储器
    │   │    └─ utils.js          # 工具库
    │   └─ units  # 项目基础模板结构
    │        │ app.vue         # 主模板
    │        │ footer.vue      # 底部模板
    │        └─ header.vue     # 头部模板
    │
    ├─ plugins    # 常用插件库
    ├─ mods       # 功能演示组件  
    │   ├─ example          # 插件演示案例
    │   │  main.vue         # 演示首页
    │   │  ui.vue           # 常用ui组件（暂无）
    │   │  doc.vue          # 框架文档 
    │   └─ plugin.vue       # 组件演示
    │
    └─ assets                  
          ├─ css         # 公用css
    	  ├─ font        # 字体文件
          ├─ svg         # svg矢量图
    	  └─ img         # 图片资源
</pre>










