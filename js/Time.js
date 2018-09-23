var time = new Date();
var timer = document.getElementsByClassName('gradtext');
var timerText = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
timer.innerText = timerText;