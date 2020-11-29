const COORD = "coord"
const API_KEY = "518ae167ac47e19d2a061e72c6826650";

const span = document.querySelector('.js-weather');

function saveCoord(coordObj) {
    localStorage.setItem(COORD, JSON.stringify(coordObj));
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).
    then(function (response) {
        return response.json()
    }).then(function (jsonData) {
        span.innerText = `${jsonData.main.temp} @ ${jsonData.name}`
    })

}

function getCoordErrorCb() {
    console.log('error')
}

function getCoordCb(response) {
    const latitude = response.coords.latitude;
    const longitude = response.coords.longitude;

    getWeather(latitude, longitude);

    const coordObj = {
        latitude,
        longitude
    }
    saveCoord(coordObj)

}

function getCoord() {
    navigator.geolocation.getCurrentPosition(getCoordCb, getCoordErrorCb)
}

function init() {
    const coord = localStorage.getItem(COORD);

    if (coord === null) {
        getCoord()
    } else {
        //getweather
        const parseData = JSON.parse(coord)
        getWeather(parseData.latitude, parseData.longitude)
    }
}

init();