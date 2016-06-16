var Regular = require('regularjs');



module.exports =  Regular.util.extend({

  extend(o1 , o2, override){
    for (var i in o2) if (o2.hasOwnProperty(i)){
      if(override || typeof o1[i] === 'undefined') o1[i] = o2[i]
    }
    return o1;
  },

  obj2query(data){
    var query = '';
    if( !data ) return query;
    for( var i in data ){
      query += `${i}=${encodeURIComponent(data[i])}&`
    }
    // remove last `&`;
    return query.replace(/&$/, '');
  }
}, Regular.util);