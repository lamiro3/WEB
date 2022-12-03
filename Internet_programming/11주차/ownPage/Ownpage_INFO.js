//Ownpage_INFO.js
var profile = document.querySelector("body #profile"); //프로필 IMG 감싸고 있는 span 태그 불러옴
var profile_info = document.createElement("span"); //자기소개 작성할 span 태그 생성

profile_info.setAttribute("id", "profile_info"); // 해당 태그의 id를 profile_info로 설정
profile_info.innerText = "I am Taehyeon Ko, currently attending Dongguk University's AI Convergence Department. I am 20 years old. My interests are computer vision and natural language processing. My future goal is to go to graduate school after graduating from undergraduate school and conduct research in the aforementioned field. My hobby is playing the guitar as you can see from the picture.";

function hoverImg(){
    profile.appendChild(profile_info); // 사진 위에 마우스 커서 올라왔을 때 profile_info 보이게끔 함
}

function escapeImg(){
    profile.removeChild(profile_info); // 사진 위에서 커서 벗어났을 때 profile_info 숨김
}