const APIKEY = "9c5c7d64d10621bbdd0725c8988f9266";

const URLBASE = "https://api.openweathermap.org/data/2.5/weather?";

async function request(url) {
    return fetch(url).then(data => data.json());
}

async function getWeather(lat, lon) {
    url = `${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    const weather = await request(url);
    console.log(weather);
    updateDom(weather.name, weather.main.temp);
}

async function getWeatherByCity(city) {
    const url = URLBASE + `q=${city}&appid=${APIKEY}`;
    const weather = await request(url);
    updateDom(weather.name, weather.main.temp);
}

document.querySelector('.buscar')
    .addEventListener('click', function () {
        const ciudad = document.querySelector('.buscador');
        const ciudadBuscar = ciudad.value;
        getWeatherByCity(ciudadBuscar);
    }
    )

function updateDom(city, temp) {
    document.querySelector('#ciudad').innerHTML = city;
    temp = (temp - 273.15).toFixed(1);
    document.querySelector('#temperatura').innerHTML = temp;
    updateBackground(temp);
    document.querySelector('.buscador').value = '';

}

function updateBackground(temp) {
    if (temp <= 10) {
        document.querySelector("body").style.backgroundColor = "#233b53";
    } else if (temp <= 20) {
        document.querySelector("body").style.backgroundColor = "#c1fd7c";
    } else if (temp <= 30) {
        document.querySelector("body").style.backgroundColor = "#e9ab8b";
    } else {
        document.querySelector("body").style.backgroundColor = "#fe5b16";
    }
}

navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
});


