//Ownpage_LOGIN.js
myStorage = window.localStorage; // 계정 정보를 저장할 LOCAL STORAGE
var account = 0; // 계정 개수
var ID = ""; // 입력된 ID
var PW = ""; // 입력된 PW

// 입력된 ID 저장/갱신
function getID(input){
    ID = input.value;
}

// 입력된 PW 저장/갱신
function getPW(input){
    PW = input.value;
}

// SIGN_UP에서 입력한 ID, PW LOCAL STORAGE에 저장 & 계정 개수 1 증가
function setID_PW(){
    myStorage.setItem('ID'+account, ID);
    myStorage.setItem('PW'+account, PW);
    account+=1
}

// LOG_IN submit 버튼 눌렀을 때 실행
function on_LI_Submit(){
    for (var i = 0; i<account; i++){
        var r_id = myStorage.getItem('ID'+i)
        var r_pw = myStorage.getItem('PW'+i)
        
        if (ID == r_id && PW == r_pw){
            confirm("로그인 성공!\n"+ID+"님 반갑습니다.");
            return 0;
        }
    }
    confirm("아이디나 비밀번호가 일치하지 않습니다. 다시 입력해주십시오.");
}

// SIGN_UP submit 버튼 눌렀을 때 실행
function on_SU_Submit(){
    setID_PW();
}

var setTheme = () => {
    var date = new Date();
    var theme = date.getHours() >= 18 || date.getHours() < 4 ? "dark" : "light";
    document.body.dataset.theme = theme;
}
setInterval(setTheme, 1); // 1 초마다 실행