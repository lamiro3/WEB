const Formula = prompt("수식 입력:")
const result = eval(Formula)

// Tags
var GRID = document.createElement("div")
var strong = document.createElement("strong")
var u1 = document.createElement("u")
var u2 = document.createElement("u")
var u3 = document.createElement("u")
var u4 = document.createElement("u")
var i = document.createElement("i")
var mark = document.createElement("mark")

//rows
var row_1 = document.createElement("div")
var row_2 = document.createElement("div")
var row_3 = document.createElement("div")
var row_4 = document.createElement("div")
var row_5 = document.createElement("div")
var row_6 = document.createElement("div")
var row_7 = document.createElement("div")
var row_8 = document.createElement("div")

row_1.setAttribute("class", "row")
row_2.setAttribute("class", "row")
row_3.setAttribute("class", "row")
row_4.setAttribute("class", "row")
row_5.setAttribute("class", "row")
row_6.setAttribute("class", "row")
row_7.setAttribute("class", "row")
row_8.setAttribute("class", "row")

function getResult(first, last, formula, tagName, row) {
    row.appendChild(document.createTextNode(first))
    tagName.appendChild(document.createTextNode(eval(formula)))
    row.appendChild(tagName)
    row.appendChild(document.createTextNode(last))
    GRID.appendChild(row)
}

function hover(color){
    var rows = document.getElementsByClassName("row")
    for (i = 0; i < rows.length; i++){
        rows[i].setAttribute("style", "color: "+color+";")
    }
}

function escape(){
    var rows = document.getElementsByClassName("row")
    for (i = 0; i < rows.length; i++){
        rows[i].setAttribute("style", "color: black;")
    }
}

row_1.appendChild(document.createTextNode("입력한 수식의 결과: " + result))
GRID.appendChild(row_1)

getResult("15 + 0xc5 = ", " 입니다!", "15 + 0xc5", strong, row_2)
var r1 = eval("15 + 0xc5")

getResult("0xf3 - 0o77 = ", " 입니다!", "0xf3 - 0o77", u1, row_3)
var r2 = eval("0xf3 - 0o77")

getResult("0xf3 - 0o77 = ", " 입니다!", "10.571", u2, row_4)
var r3 = 10.571

getResult('위 세개 결과값을 더한 값은 "', '" 입니다!', r1 + r2 + r3, u3, row_5)

getResult('위 결과값과 NaN을 더한 값은 "', '" 입니다!', r1 + r2 + r3 + NaN, u4, row_6)

getResult("NaN에서 NaN을 뺴면? :", "입니다!", NaN - NaN, i, row_7)

var bool = false
getResult("bool 변수에 담겨있는 값은 ", " 입니다!", bool, mark, row_8)

document.body.appendChild(GRID)
GRID.setAttribute("id", "grid")

document.write("<br>")
document.write('<div id="grid"><b class="row"><i>인생은 "한방"이야!</i></b></div>')