/**
 * 这个文件就是处理前端路由在后端的预处理, 公用的是和client/router 同一套配置文件
 */

var restate = require('regular-state/server');
var routesConfig = require('../../shared/routes');
var providerFactory = require('../../shared/providerFactory');
var consts = require('../../shared/consts');
var service = require('../service/index');
var uaParse = require('ua-parser-js');
var Login = require('../../client/module/login');
var argv = require('yargs').argv;
var mode = argv.mode || argv.m; 

var ssr = mode !== 1;


 

// 这里注入的service是后端, 这样可以实现,前后端 可以在一个位置书写dataProvider，
// 但是又不讲server部分的service打包进去
routesConfig.dataProvider = providerFactory( service , true);

//JSON.stringify 不处理 注入 
function safeStringify(json){
  return JSON.stringify.apply(JSON,arguments).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}




function* spaRouter ( next){

  var uaObj = uaParse(this.headers['user-agent']);
  var isLowerIE = uaObj.browser.name === 'IE' && parseInt(uaObj.browser.major, 10) < 10;

  if(this.path === '/login'){
    var html = restate.render(Login);
    yield this.render('index', {
      renderString: html,
      renderData: ''
    })
    return ;
  }

  var manager = restate( routesConfig );

  if( isLowerIE || !ssr){
 
    // 其实对于IE或不开启ssr的话, 不一定要通过decode来判断，可以通过约定 
    // 比如我们默认/api为异步接口，对于所有非API开头的我们都认为是页面入口即可
    // 这样后台就不需要是Nodejs, 我们也不用去关心，是否会在Component中引入了node无法跑的代码
    // 
    // 但是关键点就是，将所有页面导到同一个入口html即可, 路由到前端由restate接管.
    if( manager.decode(this.path) ){ // find in routes
        // redirect /blog =>  #/blog
      if(this.path !== '/' && isLowerIE  ){
        this.redirect(`/#${this.url}`);
        this.body = 'Redirecting to Index Page';
        return;
      }
      return yield this.render('index',{
        renderString:'',
        renderData:''
      })
    }else{
      return yield next;
    }
  }



  // 我们需要带上koaContext给dataProvider , 比如user等信息无法从service获取，
  // 而需要从单次请求的session等容器中获取
  manager.koaContext = this;
  var self = this;
  try{
    
    var options = yield manager.run( this.url );

  }catch(e){

    if(e) console.log(e.stack, 'log err')
  }
  
  

  if(options){
    // 带上全局user信息

    options.data.__user__ = this.session.user;

    console.log(options.html, options)

    yield this.render('index', {
      renderString: options.html,
      renderData: `var ${consts.GLOBAL_DATA} = ${safeStringify(options.data)};`
    })

  }else{

    yield next;

  }
  

}


module.exports = spaRouter;



