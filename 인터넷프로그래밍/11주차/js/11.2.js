document.write('<img onclick="clickImg()" onmouseover="hoverImg(this)" src="../img/questionmark.jpg">')
if (!confirm("시작할까요?")){
    document.write('<div>시작하지 않았습니다!</div>')
}

else {
    const name = prompt("당신의 이름은 무엇인가요?")
    console.log(name)
    if (name != null && name.length == 0){
        document.write('<div>시작하지 않았습니다!</div>')
        document.write('<div>아무것도 입력하지 않았습니다.</div>')
    }

    else if(name == null) {
        document.write('<div>시작하지 않았습니다!</div>')
        document.write('<div>취소를 누르셨군요..</div>')
    }

    else {
        document.write('<div>시작하였습니다!</div>')
        document.write('<div>당신의 이름은</div>')
        document.write('<br>')
        document.write('<h2><mark id="name"></mark></h2>')

        const NAME_pos = document.getElementById("name")
        NAME_pos.innerText = "["+name+"]"
        document.write('<br>')
        document.write('<div>로군요!</div>')
    }
}

IMG = document.getElementsByTagName("img")

function hoverImg(IMG){
    IMG.setAttribute('src', "../img/ddung.jpg")
}

function clickImg(){
    alert("사랑해요~")
}