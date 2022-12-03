//Ownpage.js
var Click = new Object();
Click.INFO_click = () => { //상단 bar INFO 버튼 클릭했을때 이벤트
    document.getElementById("screen").src = "./Ownpage_INFO.html" //iframe의 src를 변경
} 

Click.SCH_click = () => { //상단 bar SCHEDULE 버튼 클릭했을때 이벤트
    document.getElementById("screen").src = "./Ownpage_SCH.html" //iframe의 src를 변경
}

Click.PROJ_click = () => { // 상단 bar PROJECT 버튼 클릭했을때 이벤트
    document.getElementById("screen").src = "./Ownpage_PROJ.html" //iframe의 src를 변경
}
Click.LOGIN_click = () => {
    document.getElementById("screen").src = "./Ownpage_LOGIN.html" //iframe의 src를 변경
}

// 빈공간 0으로 포맷팅
var zeroFormating = (emt) => {
    return emt.length == 1 ? "0"+emt : emt;
}

var clock = document.querySelector("#CLOCK");

// 시계 함수
var setClock = () => {
    var date = new Date();
    var hour = date.getHours().toString();
    var minute = date.getMinutes().toString();
    var second = date.getSeconds().toString();

    clock.innerText = zeroFormating(hour)+":"+zeroFormating(minute)+":"+zeroFormating(second);
}

// 테마 지정 함수
var setTheme = () => {
    var date = new Date();
    var theme = date.getHours() >= 18 || date.getHours() < 4 ? "dark" : "light";
    document.body.dataset.theme = theme;
}

setInterval(setClock, 1000); // 1 초마다 실행
setInterval(setTheme, 1); // 1 밀리초마다 실행