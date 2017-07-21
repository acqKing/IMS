# 信管工作室项目

我们这个项目是一个多页面的项目，访问不同的页面需要跳转链接。

开发：bootstrp + sass + jquery + requirejs + juicer


### 目录结构

```
├── gulpfile.js     自动部署，监听启动
├── package.json    项目开发依赖
├── static          开发目录
│   ├── html
│   ├── sass
│   ├── css
│   ├── js
          ├── lib
          ├── util
          ├── modules
          ├── page
│   └── img
├── dist            最终目录
└── api            mock data

```
### 准备

首先，你得有一个node环境。可以在官网上去下一个node，也可以通过nvm（node version management）去安装（好处是管理多个版本的node），当然还需要npm（node package management）去管理包依赖这些哈。

接着，全局安装一个 gulp `npm install gulp -g`

另外，需要 git，不多说

### 运行

进入 IMS 目录
* `npm install / cnpm install` 安装依赖包
* `npm start` 启动应用

好了，你可以开始开发了

### mock 数据

......

### 关于第三方的插件

如果有效果需要，也可以使用第三方的插件，但是你得先看懂，然后自己灵活实现。

### 关于打包和上线


### 附言

使用工具不是目的，主要是想怎么去实现组件化，怎么去构建；
