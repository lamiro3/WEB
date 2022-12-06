var num = new Array(0, 0, 0);
var sen = document.querySelectorAll('.num');
var msg = document.querySelector('#msg');

function getRandomInt(min, max) { // min과 max 사이의 랜덤한 정수를 return하는 함수
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function gamble(emt, idx){
    num[idx] = getRandomInt(0, 3);
    emt.innerText = num[idx];

    if (idx == 2) { // 세 번째 숫자를 눌렀을 경우
        if (num[0] == num[1] && num[2] == num[1]) // 모든 숫자가 같을 때
            msg.innerText = '성공입니다!!';
        else
            msg.innerText = '실패입니다..';
    }
}