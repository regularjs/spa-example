

var Regular= require('regularjs');

require('es6-promise').polyfill();


// Application entry 
// 这里描述两种服务端渲染启动方式
// 第一种: 直接从组件启动
if(location.pathname === '/login'){
  var Login = require('./module/login');
  new Login({
    mountNode: document.getElementById('app')
  })

}else{
  // 第二种，即配置单页路由
  var router = require('./router');
  router.start({ ssr: true, view: document.getElementById('app')});
}





