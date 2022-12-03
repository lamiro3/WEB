var num = new Array(0, 0, 0);
var sen = document.querySelectorAll('.num');
var msg = document.querySelector('#msg');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function gamble(emt, idx){
    num[idx] = getRandomInt(0, 2);
    emt.innerText = num[idx];

    if (idx == 2) {
        if (num[0] == num[1] && num[2] == num[1])
            msg.innerText = '성공입니다!!';
        else
            msg.innerText = '실패입니다..';
    }
}