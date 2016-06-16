var env = process.env.NODE_ENV || 'dev';

if( env === 'development' ) env = 'dev';

module.exports = require('./' + env);


