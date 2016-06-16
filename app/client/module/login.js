
var Regular = require('regularjs');
var service = require('../service/index');


var template = `
<div class="m-login" ref=container>
  <div class="login-triangle"></div>
  
  <h2 class="login-header">Log In</h2>

  <form class="login-container" on-submit={this.login($event)}>
    <p><input type="text" placeholder="Username" r-model={username} /></p>
    <p><input type="password" placeholder="Password" r-model={password} /></p>
    <p><input class='btn btn-primary' type="submit" value="Log In" /></p>
  </form>
</div>
`


module.exports = Regular.extend({

  template,

  login($event){

    $event.preventDefault();

    var data = this.data;
    service.login(data.username, data.password).then( ()=>{
      location.href='/'
    })['catch'](function( err ){
      console.log(err)
      throw err
    })
    return false;
  }

})