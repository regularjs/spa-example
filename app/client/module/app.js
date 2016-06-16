
var Regular = require('regularjs');
var Menu = require('../components/menu.js');
var consts = require('../../shared/consts');


var tpl = `
  <div class="g-sd col-sm-2">
    <div class="m-nav">
      <div class="u-logo">
        <img src="/img/logo.svg" alt="网易有数">
        <h3>网易有数</h3>
      </div>
      <app-menu panes={panes} state={@(this.$state)} title={subTitle}></app-menu>
    </div>
  </div>
  <div class="g-bd col-sm-10">
    <!-- 顶栏 -->
    <div class="row m-header">
      <ul class="breadcrumb">
        <li>
          <a href="">
            <span class="glyphicon glyphicon-home"></span>
          </a>
        </li>
        <li class="active" r-hide={!subTitle}>{subTitle}</li>
      </ul>
      <ul class="nav navbar-right">
        
        <li class="dropdown">
         <a href="/api/logout">{user.name} <i class="glyphicon glyphicon-log-out"></i>登出</a>
        </li>
      </ul>
    </div>
    <!-- card -->
    <div class="row">
      <div class="col-sm-12" r-view>
      </div>
    </div>
  </div>
`;


module.exports = Regular.extend({

    template: tpl,

    config (data) {

      data.nowYear = new Date().getFullYear();
      
      data.panes = consts.PANES;
      
    },
    login (username, password){

      return false;
    }
  })
  
  
  // <app-menu menus={menus} state={@(this.$state)}></app-menu>