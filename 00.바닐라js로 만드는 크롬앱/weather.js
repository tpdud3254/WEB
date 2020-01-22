const weather = document.querySelector('.js-weather');

const API_KEY = '518ae167ac47e19d2a061e72c6826650';
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json) {
        const temp = json.main.temp;
        const place= json.name;

        weather.innerText = `${temp} @ ${place}`;
    });
}

function saveCoords(coordsObg) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObg));
}

function handleGeoSucces(position) {
    console.log(position);

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCooreds() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCooreds();
}

init();