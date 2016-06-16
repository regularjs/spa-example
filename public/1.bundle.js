webpackJsonp([1],{

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Regular = __webpack_require__(1);
	
	var template = '\n<div class="panel panel-primary">\n  <div class="panel-heading">\n    <h3 class="panel-title">Chat Room <span class="badge">{messages.length}</span></h3>\n  </div>\n  <div class="panel-body">\n  <div class="message-list">\n  {#list messages as message}\n  <div class="media" r-animation="on: enter; class: animated fadeInY; on: leave; class: animated fadeOutY;">\n    <a class="media-left" href="#">\n      <img  src="{message.user.avatar}"  style="width: 64px; height: 64px;">\n    </a>\n    <div class="media-body">\n      <h4 class="media-heading"><a href="#!/user/{message.user.id}">{message.user.name}</a>\n      <span class=\'small\'>{message.time|format}</span>\n      <a href="#" r-hide={message.user !== this.$state.user} on-click={messages.splice(message_index, 1)}>delete</a>\n      </h4>\n      {message.content}\n    </div>\n  </div>\n  {/list}\n  </div>\n\n  </div>\n    <div class="row">\n      <div class="col-sm-12">\n        <div class="input-group">\n          <input type="text" class="form-control" r-model={text} on-enter={this.post(text)} placeholder="Say something for...">\n          <span class="input-group-btn">\n            <button class="btn btn-primary" type="button" on-click={this.post(text)}>Post Message!</button>\n          </span>\n        </div><!-- /input-group -->\n      </div><!-- /.col-lg-6 -->\n    </div><!-- /.row -->\n</div>\n';
	
	// 偷懒，用本地数据
	module.exports = Regular.extend({
	
	  template: template,
	
	  canLeave: function canLeave(option) {
	    return confirm('confirm to leave chat?');
	  },
	
	  enter: function enter(option) {
	    var page = option.page || 1;
	    if (!this.data.messages) this.data.messages = [];
	  },
	
	  post: function post(text) {
	    var data = this.data;
	
	    data.messages.push({
	      user: this.$state.user,
	      content: text,
	      time: +new Date()
	    });
	
	    data.text = '';
	  }
	});

/***/ }

});
//# sourceMappingURL=1.bundle.js.map