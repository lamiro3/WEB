function printTime(){

    var time = new Date();
    var month;
    var timer = document.getElementById('time');
    var AllCalendar = document.getElementById('calendar');
    var DivideDay = 'AM';
    var CurHours = AddBlank(time.getHours(), 2) ;
    var CurMinutes = AddBlank(time.getMinutes(), 2); 
    var CurSeconds = AddBlank(time.getSeconds(), 2);

    if(CurHours > 12){
        DivideDay = 'PM';
    }
    
    if(CurSeconds >= 55){
        CurSeconds = '<span style="color:#ff0000;">'+ CurSeconds + '</span>';
    }

    var calendar = time.getFullYear() + "." + (time.getMonth()+1) + "." + time.getDate();

    timer.innerHTML = " <span style='font-size:90px;'>" + DivideDay + "</span>" + " " + CurHours + ':' + CurMinutes;
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
    window.open("D:/DEV-WEB/WEB-OS/Clock/html/Setting.html", "Setting", "width = 800, height = 600, left = 100, top= 50");
}

function CreateFacebook(){
    window.open("https://www.facebook.com/Studi0-Lamir0-204322660176214/");
}

function flick(){ // : 깜빡임 기능 함수 ... 현재는 일단 보류 ㅠㅠ
    if(time.getSeconds() % 0)
        return ':';
    
    else if(time.getSeconds() % 1)
        return ' ';
}

var settingtext = document.getElementById('settingText');
var facebooktext = document.getElementById('facebookText');
var facebook = document.getElementById('facebook');
var setting = document.getElementById('setting');

