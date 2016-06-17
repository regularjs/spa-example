# Regular多级单页应用服务端渲染范例

A comprehensive Example for creating Single page application with regular-state 。


<img align=center src='https://cloud.githubusercontent.com/assets/731333/16143435/5bec1302-349f-11e6-917b-9504bc05d5fe.png' width=80%/ >


## 目录介绍

```
├── app   // 源码目录
│   ├── client   // 客户端模块
│   ├── server   // 服务端模块
│   └── shared   // 公用模块
├── public       // 静态资源发布目录
├── scripts      // 脚本, 部署、发布、gulp-task等
├── gulpfile.js  // gulp任务脚本
├── package.json // 略...
├── README.md    
└── webpack.config.js  // gulp 和 webpack并不冲突
```

## 启动


```js
git clone https://github.com/regularjs/spa-example

npm install # 安装缓慢请使用cnpm
npm run build
npm start

```

打开你的浏览器访问 [http://localhost:8009](http://localhost:8009) . 账号密码随意，假的

## 例子包含

- 多级模块   http://localhost:8009/blog
- 异步模块   http://localhost:8009/chat
- 一种同构service解决思路(这个才是服务端直出的灵活点，其它regular-state都已经封装完毕)
- 不依赖路由系统独立渲染一个组件:  http://localhost:8009/login



> 固执不使用virtual dom,  既然原有技术可以解决我们的问题, 没有 track-id, 即可实现前端组件的重组 

