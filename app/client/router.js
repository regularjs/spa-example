
var Regular = require( 'regularjs');

var providerFactory = require( '../shared/providerFactory' );
var routeConfig = require( '../shared/routes' );
var service = require( './service/index' );
var restate = require( 'regular-state' );



var dataProvider = providerFactory( service );






routeConfig.dataProvider = dataProvider;
routeConfig.view = '#app';

var router = restate( routeConfig );



module.exports = router;

