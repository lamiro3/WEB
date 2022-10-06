//This script is not compatible with the latest version and will be converted to a react.
//Made by Lamiro Ko.

const API_KEY = "1cacefc85af793f9e81e10aa60e79e60";

const weather = document.querySelector(".weather");

function GetWeather(lat, lon){
    const latitude = lat;
    const longitude = lon;
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=$(lat)&lon=$(lon)&appid=1cacefc85af793f9e81e10aa60e79e60'
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const CurrentPosition = json.name;
        weather.innerText = '${temperature} ${CurrentPosition}';
    });
}

function savePosition(result){
    localStorage.setItem(resultPos, JSON.stringify(result));
}

function RequestDataSucess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const result = {
        latitude,
        longitude
    };
    savePosition(result);
}

function RequestDataErr(){

}

function GetPosition(){
    navigator.geolocation.getCurrentPosition(RequestDataSucess, RequestDataErr);
}

function loadPosition() {
    const loadData = localStorage.getItem(resultPos);
    if(loadData === null){
        GetPosition();
    }else{
        const parseData = JSON.parse(loadData);
        GetWeather(parseData.latitude, parseData.longitude);
    }
}
