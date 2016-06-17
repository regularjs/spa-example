
var Regular = require('regularjs');
var dom = Regular.dom;

var tpl = `
<ul class="pagination">
  <li on-click={ this.nav(current-1)}  class='pageprv {current==1? "disabled": ""}'><a  href='#' >上一页</a></li>
  {#if total - 5 > show * 2} 
  <li  on-click={ this.nav(1)} class={current==1? 'active': ''}><a href='#'>1</a></li>
  <li>{#if begin > 2}<a>...</a>{/if}</li>
  {#list begin..end as i}
    <li on-click={ this.nav(i)} class={current==i? 'active': ''}><a href='#' >{i}</a></li> 
  {/list}
  {#if (end < total-1)}<li><a>...</a></li> {/if}
  <li on-click={ this.nav(total)} class={current==total? 'active': ''}><a href='#'>{total}</a></li> 
  {#else}
  {#list 1..total as i} 
  <li on-click={ this.nav(i)} class={current==i? 'active': ''}><a href='#' >{i}</a></li>  
  {/list}
  {/if}
  <li on-click={ this.nav(current + 1)}  class='pagenxt {current==total? "disabled": ""}'><a  href='#' >下一页</a></li>
</ul>
`


var Pager = Regular.extend({

  name: 'pager',
  template: tpl,

  config (data){
    var count =  5;
    var show = data.show = Math.floor( count/2 );
    data.current = parseInt(data.current || 1);
    data.total = parseInt(data.total || 1);

    this.$watch(['current', 'total'], function( current, total ){
      data.begin = current - show;
      data.end = current + show;
      if(data.begin < 2) data.begin = 2;
      if(data.end > data.total-1) data.end = data.total-1;
      if(current-data.begin <= 1) data.end = data.end + show + data.begin- current;
      if(data.end - current <= 1) data.begin = data.begin-show-current+ data.end;
    }, {init: true});
  },


  nav ( page ){
    var data = this.data;
    if(page < 1) return false;
    if(page > data.total) return false;
    if(page === data.current) return false;
    var evObj = {page: page}
    this.$emit('nav', evObj);
    if(!evObj.stop){
      data.current = page;
    }
    return false;
  }


})


module.exports = Pager