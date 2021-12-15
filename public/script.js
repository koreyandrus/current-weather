const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement);

function geolocation() { 
    navigator.geolocation.getCurrentPosition((data) => {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;

    fetch('/weather', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, data.location.name)
    })
})};


searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if(place == null) return;
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    fetch('/weather', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, data.location.name)
    })
})

const locationLink = document.querySelector('.current-location');
const icon = document.querySelector('.icon-container');
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')

locationLink.addEventListener('click', () => geolocation())

function setWeatherData(data, place) {
    locationElement.textContent = place;
    statusElement.textContent = data.current.condition.text;
    temperatureElement.textContent = data.current.temp_f;
    precipitationElement.textContent = `${data.current.precip_in}"`;
    windElement.textContent = data.current.wind_mph;
    icon.innerHTML = `<img src="${data.current.condition.icon}">`
}


