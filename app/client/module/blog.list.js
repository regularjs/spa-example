
var Regular = require('regularjs');
var Pager = require('../components/pager.js');
var service = require('../service/index');

var tpl = `
  <h2 class="sub-header">Bloging List <a  r-link='app.blog.edit({id:-1})' class='btn btn-primary'>(Add a blog)</a></h2>
<div class="table-responsive">

<pager total={total} linkTemplate={linkTemplate} current={page} on-nav={this.refresh($event.page, true)}></pager>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>id</th>
        <th>author</th>
        <th>time</th>
        <th>title</th>
        <th>abstract</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {#list blogs as blog by blog_index}
      <tr on-click={activeIndex = blog_index} class={activeIndex === blog_index? 'active': 'disabled'}>
        <td>{blog.id}</td>
        <td>{blog.user.name}</td>
        <td>{blog.time|format}</td>
        <td>{blog.title}</td>
        <td>{blog.content.slice(0,30) + "..."}</td>
        <td>
        <div class="btn-group" role="group" aria-label="...">
          <a r-link='app.blog.edit({id: blog.id})' class="btn btn-sm btn-default">edit</a>
          <a r-link='app.blog.detail({id: blog.id})'  class="btn btn-sm btn-default">view</a>
          <a href='#' on-click={this.remove(blog.id, blog_index)} class="btn btn-sm btn-danger">delete</a>
        </div>
      </td>
      </tr>
      {#else}
      <tr><td colspan=6>no blogs here</td></tr>
      {/list}
    </tbody>
  </table>
  <pager total={total} linkTemplate={linkTemplate} current={page} on-nav={this.refresh($event.page)}></pager>
</div>
`;

module.exports =  Regular.extend({

  template: tpl,

  config( data ){
    data.linkTemplate = '/blog?page={page}'
  },
 
  // get particular page
  refresh( page, redirect ){

    var data = this.data;

    return this.$state.go('app.blog.list', { param: {page: page} });
  },
  remove( id, index ){
    var data = this.data;

    service.call('blog.remove', {id: id}).then( ()=> {
      data.blogs.splice(index,1);
      this.$update();
    })
    
    return false; 
  }

})



