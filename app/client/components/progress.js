var Regular =  require('regularjs');
var _  = require('../util/helper');

var tpl = `
<div class="progress progress-fix animated" r-hide={!progress}  r-animation= 'on:enter; class: {inClass}; on: leave; class: {outClass};'>
  <div class="progress-bar progress-bar-striped active" role="rogressbar" style=" background-color: {currentColor};width: {percent||0}% ;">
  </div>
</div>
`


function mix(c1, c2, weight){
  var p = weight/100,
      a = 0,
      w = p * 2 -1,
      w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0,
      w2 = 1 - w1,
      channels = [
          parseInt(c1[0] * w1 + c2[0] * w2, 10),
          parseInt(c1[1] * w1 + c2[1] * w2, 10),
          parseInt(c1[2] * w1 + c2[2] * w2, 10)
      ];
  return channels;
}


var COLORS = {
  SUCCESS: [92,184,92], // '#5cb85c';
  INFO: [91,192,222], // '#5bc0de',
  DANGER: [217,83,79], //'#d9534f',
  WARNING: [240,173,78] // '#f0ad4e';
};


var Progress = Regular.extend({

  template: tpl,
  // 计算属性
  computed: {
    currentColor ( data ){
      var channels = mix(data.startColor, data.endColor, 100 - data.percent);
      return `rgb(${channels[0]},${channels[1]},${channels[2]})`;
    }
  },
  config (data){
  // 默认属性
    _.extend(data, {
      startColor: COLORS.INFO,
      endColor: COLORS.SUCCESS,
      inClass: 'fadeIn',
      outClass: 'fadeOut',
      percent: 0
    })
  },
  // 初始化后的函数
  init (){
    // 证明不是内嵌组件
    if(this.$root == this) this.$inject(document.body);
    if(this.data.autoStart) this.start();
  },
  // 移动到某个百分比
  move (percent){
    clearTimeout(this.timer);
    if(percent === 100) this.end(true);
    else this.$update('percent', percent);
  },
  // 开始
  start (){
    if(this.timer) clearTimeout(this.timer);
    this.data.progress = true;
    this.data.percent = 2;
    this.data.endColor = COLORS.SUCCESS;
    this.$update();
    this._startTimer();
  },
  // 结束
  end (error){
    clearTimeout(this.timer);
    this.data.progress = false;
    this.data.percent = 100;
    this.data.endColor = !error? COLORS.SUCCESS: COLORS.DANGER;
    this.$update();
  },
  // 开始定时器
  _startTimer (){
    var data = this.data;
    this.timer = this.$timeout(function(){
      data.percent = data.percent + (100 - data.percent) * (Math.random() * 0.2);
      this._startTimer();
    }, Math.random() * 300 + 500);
  }
  // 使用timeout模块
}).use('$timeout');


module.exports = Progress
