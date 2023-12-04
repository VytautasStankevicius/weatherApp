let startingPlaces = ['Vilnius', 'Kaunas', 'Klaipeda', 'Siauliai']
const preloadCity = localStorage.getItem('miestuPavadinimai')
if (preloadCity){
  startingPlaces = JSON.parse(preloadCity) 
}

function placesList() {
  fetch('https://api.meteo.lt/v1/places/')
    .then((response) => {
      return response.json();
    })
    .then((places) => {
      places.forEach((place)=>{
        const code = place.code
        const name = place.name

        const option = document.createElement('option')
        option.setAttribute('value', code)
        option.innerText = name
        document.getElementById('datalistOptions').appendChild(option)
      })
    })
}
placesList()


const locationData = (miestas) => {
  fetch(`https://api.meteo.lt/v1/places/${miestas}/forecasts/long-term`)
    .then((response)=>{
      return response.json()
    })  
    .then((response)=>{
      addForecast(response)
    })
}

startingPlaces.forEach((miestas)=>{
  locationData(miestas)
})

const addForecast = (forecast) => {
  const initForecast = document.getElementById('initForecast');
  const initForecastBox = document.createElement('div');
  initForecastBox.className = 'day-forecast';
  
  const city = document.createElement('p')
  city.className = 'city';
  city.innerText = forecast.place.name;
  initForecastBox.appendChild(city);
  
  const currentHour = new Date().getHours();
  const currentHourForecast = forecast.forecastTimestamps.find((f) => { //find veikia iki pirmo kuri randa ir sustoja
    return new Date(f.forecastTimeUtc).getHours() === currentHour;
  })
  const date = new Date(currentHourForecast.forecastTimeUtc)
  const time = document.createElement('p')
  time.className = 'time';
  time.innerText = `${date.getHours()}:00`
  initForecastBox.appendChild(time)
  
  const temperature = document.createElement('p')
  temperature.className = 'temperature';
  temperature.innerText = currentHourForecast.airTemperature + '℃'
  initForecastBox.appendChild(temperature)
  
  const weatherState = document.createElement('p')
  weatherState.innerText = currentHourForecast.conditionCode.replaceAll('-', ' ')
  weatherState.className = 'weather-state';
  initForecastBox.appendChild(weatherState)

  initForecast.appendChild(initForecastBox);
}


document.querySelector('form').addEventListener('submit', (e)=>{
  e.preventDefault();
  let miestas = document.getElementById('cityInput').value
  startingPlaces.unshift(miestas)
  startingPlaces.pop()
  localStorage.setItem('miestuPavadinimai', JSON.stringify(startingPlaces))

  fetch(`https://api.meteo.lt/v1/places/${miestas}/forecasts/long-term`)
    .then((response)=>{
      return response.json()
    })  
    .then((response)=>{
      createWeekly(response)
    })
}) 


const createWeekly = (forecast) => {
  const initData = document.getElementById('initForecast');
  initData.remove();

  const forecasts = forecast.forecastTimestamps.filter((f) => {
    return new Date(f.forecastTimeUtc).getHours() === 15
  })
  .forEach((f) => {
    addDayForecast(f);
  })
}

const addDayForecast = (forecast) => {
  console.log(forecast)
  const initForecast = document.getElementById('searchForecast');
  const initForecastBox = document.createElement('div');
  initForecastBox.className = 'day-forecast';
  
  const date = new Date(forecast.forecastTimeUtc)
  const time = document.createElement('p')
  time.className = 'time';
  time.innerText = date.toDateString();
  initForecastBox.appendChild(time)
  
  const temperature = document.createElement('p')
  temperature.className = 'temperature';
  temperature.innerText = forecast.airTemperature + '℃'
  initForecastBox.appendChild(temperature)
  
  const weatherState = document.createElement('p')
  weatherState.innerText = forecast.conditionCode.replaceAll('-', ' ')
  weatherState.className = 'weather-state';
  initForecastBox.appendChild(weatherState)

  initForecast.appendChild(initForecastBox);
}

