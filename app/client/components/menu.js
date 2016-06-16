var Regular = require('regularjs');

var tpl = `

{#list panes as pane by pane_index}
  <div class="m-snav">
    <h4>{pane.title}</h4>
    <ul class="nav">
      {#list pane.menus as menu by menu_index}
      <li class="snav_item" r-class={{'active': title==menu.title }} >
        <a r-link={menu.url} >
          <span class="glyphicon glyphicon-{menu.icon||'inbox'}"></span>{menu.title}
        </a>
        {#if menu.menus}
        <ul class='nav'>
          {#list menu.menus as mn}
            <li> <a r-link={mn.url} >{mn.title}</a> </li>
          {/list}
        </ul>
        {/if}
      </li>
      {/list}
    </ul>
  </div>
{/list}
`


var Menu = Regular.extend({

  name: 'app-menu',
  template: tpl,

  config: function(data){
    // 确保在每次state改变后Menu会重新update
    if(!Regular.isServer){
      data.state.on('end', ( option) => {
        this.$update( () => this.findMenu(option.path) )        
      })

    }
    
  },
  findMenu(path){
    
      var data = this.data;
      var panes = data.panes; 
      
      panes.forEach((pane) => {
        if(pane.menus){
          pane.menus.some( (menu) =>{
            if(menu.test && menu.test.test(path)){
              console.log(path, menu)
              data.title = menu.title;
              return true;
            }
          })
        }
        
      })
  }
})


module.exports = Menu

