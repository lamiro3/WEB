//IMG 정의 - onClick event 발생할 때 clickImg func 작동, onMouseover event 발생할 때 hoverImg func 작동
document.write('<img onclick="clickImg()" onmouseover="hoverImg(this)" src="../img/questionmark.jpg">')
if (!confirm("시작할까요?")){ // 페이지 시작 확인/취소 창
    document.write('<div>시작하지 않았습니다!</div>') //취소 눌렀을 시
}

else { //앞선 창에서 확인 눌렀을 시
    const name = prompt("당신의 이름은 무엇인가요?") // 이름 입력 창
    console.log(name)
    if (name != null && name.length == 0){ // 미입력 후 확인 눌렀을 시
        document.write('<div>시작하지 않았습니다!</div>')
        document.write('<div>아무것도 입력하지 않았습니다.</div>')
    }

    else if(name == null) { // 취소 눌렀을 시
        document.write('<div>시작하지 않았습니다!</div>')
        document.write('<div>취소를 누르셨군요..</div>')
    }

    else { // 입력 후 확인 눌렀을 시
        document.write('<div>시작하였습니다!</div>')
        document.write('<div>당신의 이름은</div>')
        document.write('<br>')
        document.write('<h2><mark id="name"></mark></h2>') // 이름 삽입 할 태그 미리 정의

        //입력한 이름 NAME_pos element의 innerText에 삽입
        const NAME_pos = document.getElementById("name") 
        NAME_pos.innerText = "["+name+"]"
        document.write('<br>')
        document.write('<div>로군요!</div>')
    }
}

IMG = document.getElementsByTagName("img")

function hoverImg(IMG){ // hover시 event
    IMG.setAttribute('src', "../img/ddung.jpg") //이미지 경로 변경
}

function clickImg(){ // click시 event
    alert("사랑해요~") // 경고창 출력
}