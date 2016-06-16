
var Regular = require('regularjs');
var service = require('../service/index');
var blog = require('../util/fetch.js').blog;

var tpl = `
<h2>{$param.id=='-1'?'Add':'Edit'} Post</h2>
<div class="row">
  <div class="col-md-10">
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" r-model={title} placeholder="Enter Title">
      </div>
      <div class="form-group">
        <label for="content">Tag</label>
        <div>
         {#list tags as tag by tag_index}
         <span class="label label-info">{tag} <i class='glyphicon glyphicon-remove' on-click={tags.splice(tag_index, 1)}></i></span>
         {/list}
         <input r-model={tagContent} placeholder="Enter Tag" on-enter={this.addTag(tagContent)} >
        </div>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea r-model={content} placeholder="Blog Content" class="form-control" rows=10 ></textarea>
      </div>
       <a class="btn btn-primary" on-click={this.submit( id )}>Submit</a>
    </form>
  </div>
</div>
`;



module.exports =  Regular.extend({

  template: tpl,


  submit ( id ){
      var data = this.data;
      id= parseInt(id);
      var detail = {
        content: data.content,
        title: data.title,
        tags: data.tags
      }

      if(id == '-1'){ //add
        service.call('blog.create', detail).then( ()=> {
          this.$state.go('app.blog.list');
        })
      }else{
        detail.id = id;
        service.call('blog.update', detail).then( ()=> {
          this.$state.go('app.blog.detail', {param: {id: id}});
        })
      }
    },
    addTag(){
      var data = this.data;
      if(!data.tagContent) return;
      data.tags.push(data.tagContent);
      data.tagContent = '';
    }
   
  })
