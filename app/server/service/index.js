
var fs = require('fs');

/**
 * 这个封装过的service主要是基于约定，
 * 即service.call('blog.getList', {id: 1}) 即等同于 require('./services/blogService').getList
 */

module.exports = {
  call( channel, param, opt ){
    var parts = channel.split(/\.|\//);
    var serviceName = parts[0];
    var method = parts[1];

    try{
      var service = require('./services/' + serviceName + 'Service');
    }catch(e){
      return Promise.reject( Error('所请求service不存在'))
    }

    return service[method](param);
  }
}