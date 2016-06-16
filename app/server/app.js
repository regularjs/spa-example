
var bodyParser = require( 'koa-bodyparser' );
var apiRouter = require( './router/api' );
var spaRouter = require( './router/spa' );
var kstatic = require( 'koa-static' );
var ejs = require( 'koa-ejs' );
var path = require( 'path' );
var http = require( 'http' );
var koa = require( 'koa' );
var session = require('koa-session');
var config = require('./config');

var catcher = require('./utils/catcher');
var login = require('./utils/login');
var app = koa();
app.keys = ['youdata backend'];
app.proxy = true;

process.title  = 'YOUDATA_BACKEND';


ejs(app, {
  root: path.join( __dirname, 'view' ),
  viewExt: 'ejs',
  cache: false,
  layout: false,
  debug: true
});

app.use( catcher() );
app.use( session(app) );
app.use( kstatic( path.join(__dirname, '../../public') ) );
app.use( bodyParser() );
app.use( login() );
app.use( apiRouter );
app.use( spaRouter );



app.on('error', function(err){
  throw err;
})

app.listen( config.port, function(err){
  if(!err) console.log('Server start at http://localhost:%s', config.port)
  else throw err
} );

