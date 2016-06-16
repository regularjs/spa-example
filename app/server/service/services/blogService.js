
// Service Example 
// -------------------
// just mock data

function random(min, max){
  return Math.floor(Math.random() * ( max - min + 1 )) + min;
}


var i = 0;
var blogs = [];
while( (i++) < 1008 ) {
  blogs.push({
    id: ''+i,
    title: 'post ' + i,
    content: new Array(random(10, 100)).join(' post ' + i + ' content '),
    tags: ['tag1'],
    time: +new Date()
  })
}

blogs.get = function(id){
  var found;
  blogs.some(function( blog ){
    if( blog.id == id){
      found = blog
      return true
    } 
  })
  return found
}


var limit = 20;

function getList( param ){
  var page =  parseInt(param.page || 1, 10);
  var offset = ( page -1) * limit;
  return Promise.resolve({
    page: page,
    total: blogs.length,
    blogs:blogs.slice(offset, offset + limit)
  })
}


function get( param ){
  return Promise.resolve( blogs.get(param.id) )
}

function update( param ){
  var blog = blogs.get( param.id );
  Object.assign(blog, param) 

  blog.time = +new Date()

  return Promise.resolve( blog )
    
}

function create( param ){
  param.id = i++;
  param.time = +new Date();
  blogs.unshift(param)
  if(blogs.length > 2048) blogs = blogs.slice(0,2048);
  return Promise.resolve(  param  );
}

function remove( param ){
  var index = blogs.indexOf( (blog) => blog.id == param.id )
  blogs.splice( index, 1 );
  Promise.resolve( param );
}

module.exports = { 
  getList: getList, 
  get: get, 
  update: update, 
  remove: remove, 
  create: create 
}