var Regular = require('regularjs');

var template = `
<div class="panel panel-primary">
  <div class="panel-heading">
    <h3 class="panel-title">Chat Room <span class="badge">{messages.length}</span></h3>
  </div>
  <div class="panel-body">
  <div class="message-list">
  {#list messages as message}
  <div class="media" r-animation="on: enter; class: animated fadeInY; on: leave; class: animated fadeOutY;">
    <a class="media-left" href="#">
      <img  src="{message.user.avatar}"  style="width: 64px; height: 64px;">
    </a>
    <div class="media-body">
      <h4 class="media-heading"><a href="#!/user/{message.user.id}">{message.user.name}</a>
      <span class='small'>{message.time|format}</span>
      <a href="#" r-hide={message.user !== this.$state.user} on-click={messages.splice(message_index, 1)}>delete</a>
      </h4>
      {message.content}
    </div>
  </div>
  {/list}
  </div>

  </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="input-group">
          <input type="text" class="form-control" r-model={text} on-enter={this.post(text)} placeholder="Say something for...">
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button" on-click={this.post(text)}>Post Message!</button>
          </span>
        </div><!-- /input-group -->
      </div><!-- /.col-lg-6 -->
    </div><!-- /.row -->
</div>
`;


// 偷懒，用本地数据
module.exports = Regular.extend({

  template,

  canLeave(option){
    return confirm('confirm to leave chat?')
  },

  enter( option){
    var page = option.page || 1;
    if(!this.data.messages) this.data.messages = [];
  },

  post( text ){
    var data = this.data;

    data.messages.push({
      user: this.$state.user,
      content: text,
      time: +new Date
    })

    data.text = '';
  }
})