function printTime(){

    var time = new Date();
    var timer = document.getElementById('time');
    var AllCalendar = document.getElementById('calendar');
    var calendar = time.getFullYear() + "년 " + (time.getMonth() + 1) + "월 " + time.getDate() + "일 ";
    var DivideDay = '오전';
    var CurHours = AddBlank(time.getHours(), 2) ;
    var CurMinutes = AddBlank(time.getMinutes(), 2); 
    var CurSeconds = AddBlank(time.getSeconds(), 2);

    if(CurHours > 12){
        DivideDay = '오후';
    }
    
    if(CurSeconds >= 55){
        CurSeconds = '<span style="color:#ff0000;">'+ CurSeconds + '</span>';
    }

    timer.innerHTML = " <span style='font-size:90px;'>" + DivideDay + "</span>" + " " + CurHours + "시 " + CurMinutes + "분 " + CurSeconds +  "초 ";
    AllCalendar.innerHTML = calendar;

    setTimeout("printTime()",1000);
}

function AddBlank (num, digit){
    var blank = '';
    num = num.toString();
    if(num.length < digit)
    {
        for(i = 0; i < digit - num.length; i++)
            blank += '0';
    }
    return blank + num;
}

function CreatePopup(){
    window.open("D:/DEV-WEB/WEB-OS/Clock/html/Setting.html", "Setting", "width = 400, height = 300, left = 100, top= 50");
}

function CreateFacebook(){
    window.open("https://www.facebook.com/Studi0-Lamir0-204322660176214/");
}

var settingtext = document.getElementById('settingText');
var facebooktext = document.getElementById('facebookText');
var facebook = document.getElementById('facebook');
var setting = document.getElementById('setting');

