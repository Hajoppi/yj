'use strict';

function getCountdownTime() {
  var t1 = Date.parse("2019-04-29T23:00+03:00");
  var t2 = Date.now();
  var dif = t1 - t2;
  var seconds = Math.floor(dif / 1000 % 60);
  var minutes = Math.floor(dif / 1000 / 60 % 60);
  var hours = Math.floor(dif / 1000 / 3600);
  var days = minutes / 24;

  if (dif < 0) {
    window.location.reload(true);
  } else {
    if(hours < 10) { hours = '0'+ hours;}
    if(minutes < 10) { minutes = '0'+ minutes;}
    if(seconds < 10) { seconds = '0'+ seconds;}

    document.getElementById("timer-hours").innerHTML=hours + ':';
    document.getElementById("timer-minutes").innerHTML=minutes + ':';
    document.getElementById("timer-seconds").innerHTML=seconds + '';
  }
}
var counter=setInterval(getCountdownTime, 1000);
$(() => {
  getCountdownTime();
});
