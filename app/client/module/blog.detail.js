
var Regular = require('regularjs');
var blog = require('../util/fetch.js').blog;
var _ = require('../util/helper.js');

var tpl = `
<div class="blog-post">
  <h2 class="blog-post-title">{title}
    <span class="badge">preview</span>
    <a r-link='app.blog.edit({id:id})'>Edit</a>
  </h2>
  <div class="form-group">
  <label for="content">Tag</label>
  <div>
   {#list tags as tag by tag_index}
   <span class="label label-info">{tag}</span>
   {/list}
  </div>
  </div>
  <div class="blog-post-meta">
    {time|format}
    <a href='javascript:;'>{user.name}</a>
    <div class="content" r-html='content'></div>
  </div>
</div>
`;


module.exports = Regular.extend({
  template: tpl
})