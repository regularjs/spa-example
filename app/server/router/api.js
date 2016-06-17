
var service = require('../service/index');
var router = require('koa-router');
var api = router();

// serviceCall 主要处理
api.post('/call/(.*)', function *(){
  

  var channel = this.params[0];
  var body = this.request.body;
  // fix blog.get   to blog/get
  var channel = channel.replace('/', '.');

  try{
    var ret = yield service.call( channel, body ); 
    this.body = ret;
  }catch(e){
    this.body = {
      code: 500,
      message: 'Internal Server Error'
    }
  }

})

api.post('/login', function *(){

  var body = this.request.body;

  delete body.password;
  
  this.session.user = body
  this.body = body;

})

api.get('/logout', function *(){

  this.session.user = null;

  this.redirect('/login');

})

module.exports = router()
  .use( '/api', api.routes(), api.allowedMethods())
  .routes();
