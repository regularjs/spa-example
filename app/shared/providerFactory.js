var assert = require('assert');
var consts = require('./consts');
var LIMIT = consts.LIMIT;

module.exports = function ( service, isServer) {

  function getBlogDetail (option) {
    if(option.param.id != '-1'){
      return service.call('blog.get', option.param)
    }else{
      return {
        id: '-1',
        content: null,
        title: null,
        tags: []
      }
    }
    
  }


  var providerMap = {

    // 并不是所有的模块都需要准备首屏数据, 比如chat模块
    // 
    'app': function (option) {
      var component = option.component;

      // 通过注入的isServer, 我们可以判断是后端还是前端准备数据
      if(isServer){

      }
    },
    'app.blog.edit': getBlogDetail,
    'app.blog.detail': getBlogDetail,
    'app.blog.list': function (option) {
      var page = parseInt(option.param.page || 1, 10)

      return service.call('blog.getList',  {
        page: page
      }). then( (res)=>{
        res.total = Math.ceil( res.total/ 20 );
        res.page = page;
        return res;
      })

    }
  }

  // 如果是客户端，并且是首屏路由， 我们首先尝试从 __GLOABAL_DATA__获取数据, 由于restate同时接受map或函数，我们可以
  // 统一使用一个函数来处理这个统一的逻辑处理.
  return isServer ? providerMap : function (option) {
    var globalData = window[consts.GLOBAL_DATA]
    var stateName = option.state.name
    if (option.ssr && globalData && globalData[stateName]) {
      return globalData[stateName]
    }
    return providerMap[stateName] && providerMap[stateName](option)
  }
}
