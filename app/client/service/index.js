
var fetch = require('../util/fetch');



var service = {
  call( channel, param, opt ){
    
  // fix blog.get   to blog/get
    channel = channel.replace('/', '.');

    return fetch('/api/call/' + channel, {
      // 定义一个自定义头部
      headers: {
        'X-Proxy-By': 'service',
      },
      method: 'POST',
      data: param
    })

  },

  login (username, password){
    return fetch('/api/login', {
      method: 'POST',
      data: {username, password}
    });
  }
}


module.exports = service;