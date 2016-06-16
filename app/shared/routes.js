
var Regular = require('regularjs')

var BlogDetail = require('../client/module/blog.detail');
var BlogList = require('../client/module/blog.list');
var BlogEdit = require('../client/module/blog.edit');
var Application = require('../client/module/app');
var Poster = require('../client/module/poster');
var Index = require('../client/module/index');
var Blog = require('../client/module/blog');


// 添加一些Regular的全局配置
require('./extension');
// 这里主要是为了Promise在IE8下的使用


module.exports = {
  
  routes: {
    'app': {
      url: '',
      view: Application
    },
    'app.index': {
      url: '',
      view:  Index
    },
    'app.index.poster': {
      // 不带结构的路由节点
      view: Regular.extend({
        enter: function(){
          var manager = this.$state;
          this.poster = new Poster().show().$on('confirm', function(){
            manager.go('app.index');
          });
        },
        leave: function(){
          this.poster.destroy();
          this.poster = null;
        }
      })
    },
    'app.blog': {
      view:  Blog,
    },
    'app.blog.edit': {
      url: ':id/edit',
      view:  BlogEdit,
    },
    'app.blog.detail': {
      url: ':id',
      view:  BlogDetail
    },
    'app.blog.list': {
      url: '',
      view:  BlogList
    },
    // lazy load Chat Module
    'app.chat': {
      ssr: false,
      view:  function(option, resolve){
        require.ensure([], function(require){
          resolve(require('../client/module/chat.js'))
        })
      }
    }
  }
}
