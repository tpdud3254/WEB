const API_KEY = "518ae167ac47e19d2a061e72c6826650"
const COORDS = "coords";

const weather = document.querySelector(".js-weather")

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
            console.log(response.json()) //단순한 HTTP Response이며, 실제 JSON이 아닙니다. response 객체로부터 사진을 가져오기 위해서는 json() 메서드를 사용할 필요가 있습니다.
        }).then(function (jsonData) {
            weather.innerText = `${jsonData.main.temp} @ ${jsonData.name}`
        })
}

function handleGeoError() {
    console.log('error')
}

function handleGeoSuccess(position) {
    console.log(position)

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null) {
        askForCoords();
    } else {
        const weatherInfo = JSON.parse(loadedCoords);
        getWeather(weatherInfo.latitude, weatherInfo.longitude);
    }
}

function init() {
    loadCoords();
}

init();