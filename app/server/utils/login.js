var https = require('https');
var qs = require('querystring');

var whitelist = [
  {
    name: 'login',
    pattern: /^\/(api\/)?login/
  }
]


module.exports = function login() {
  return function*(next) {
    var pathname = this.path;  
    if(this.session.user){
        yield next;
    }else{

      if( !whitelist.some( (rule)=>{ 
        return rule.pattern.test( pathname ) 
      })){
        this.redirect('/login');
      }else{
        yield next;
      }
    }
  };
}



