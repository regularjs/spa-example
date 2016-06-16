
var Regular = require('regularjs');

var tpl = `
<h1 class="page-header"></h1>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    
    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li  class={ this.$state.is("app.blog.list")? 'active':'' }>
          <a r-link='/blog'>List</a>
        </li>
        <li  class={ this.$state.is("app.blog.detail")? 'active':'' }>
          <a href='javascript:;'>Detail</a>
        </li>
        <li  class={ this.$state.is("app.blog.edit")? 'active':'' }>
          <a r-link='/blog/-1/edit'>Edit</a>
        </li>
        <li></li>
      </ul>
    </div>
    </div>
</nav>
<menu state={$state} menu={menus} ></menu>
<div class="col-sm-12" r-view ></div>
`

module.exports = Regular.extend({

  template: tpl,

  config (){
    this.$state.on('end', this.$update.bind(this,null));
    // 监听其它模块的$notify
    this.$on('updateTotal', function(option){
      this.$update('total', option.param);
    })
  },

})