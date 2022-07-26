let citySearchFormEl = document.querySelector('#city-search-form');
let citySearchEL = document.querySelector('#search-input');
let apiKey = 'b5e97495fa10e207fda402aae2a3635f';
let currentWeatherTitleEl = document.querySelector('.current-city')
let currentWeatherIconEl = document.querySelector('.current-weather-icon')
let currentDateEl = document.querySelector('.current-date')

let currentTempEl = document.querySelector('#current-temp')
let currentWindEl = document.querySelector('#current-wind')
let currentHumidityEl = document.querySelector('#current-humidity')
let UV = document.querySelector('#uv')





citySearchFormEl.addEventListener('submit', function(event){
  event.preventDefault()
  console.log(citySearchEL.value); 
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+citySearchEL.value+'&limit=1&appid='+apiKey).then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data);
    searchWeather(data[0].lat, data[0].lon, data[0].name)
    // searchFiveDayWeather(data[0].lat, data[0].lon)
  })
})

function searchWeather(lat, lon, cityName){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=${apiKey}`).then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data)
    // var currentCard = $('<div>').addClass('card');
    // var cityNameEl = $('<h3>').addClass('card-title').text(cityName);
    var currentIcon = (data.current.weather[0].icon);
    var currentWeather = [data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi];
    var currentIconURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    // var currentIconEl = $('<h3>').addClass('card-title').text(currentIconURL);
    // var currentWeatherEl = $('<ol>').addClass('current-weather').text(currentWeather);
    // $('.current-city').append(currentCard.append(cityNameEl, currentIconEl, currentWeatherEl))
    // $('.current-city-icon').append(currentCard.append(currentIconEl))
    // $('#current-weather').append(currentCard.append(currentWeatherEl))
    currentWeatherTitleEl.innerText = cityName;
    currentWeatherIconEl.innerHTML = currentIconURL;
    currentTempEl.innerText = 'Temp:' + ' ' + currentWeather[0] + 'ºF';
    currentWindEl.innerText = 'Wind:' + ' ' + currentWeather[1] + ' ' + 'MPH';
    currentHumidityEl.innerText = 'Humidity:' + ' ' + currentWeather[2] + ' ' + '%';
    UV.innerText = 'UV Index' + ' ' + currentWeather[3];

    console.log(currentWeather[1])
  })
}

// function searchFiveDayWeather(lat, lon){
//   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=${apiKey}`).then(function(response){
//     return response.json()
//   }).then(function(data){
//     console.log(data)
//     var fiveDayCard = $('<div>').addClass('card');
//     var forecastTitleEl = $('<h3>').addClass('card-title').text('5-Day Forecast');
//     var fiveDayIcon = (data.daily[0].weather[0].icon);
//     var fiveDayWeather = [data.daily[0].temp, data.daily[0].wind_speed, data.daily[0].humidity];
//     var fiveDayIconURL = `http://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`;
//     var fiveDayIconEl = $('<h3>').addClass('card-title').text(fiveDayIconURL);
//     var fiveDayWeatherEl = $('<ol>').addClass('current-weather').text(fiveDayWeather);
//     $('.current-city').append(fiveDayCard.append(forecastTitleEl, fiveDayIconEl, fiveDayWeatherEl))
//     $('.current-city-icon').append(fiveDayCard.append(fiveDayIconEl))
//     $('#current-weather').append(fiveDayCard.append(fiveDayWeatherEl))
//     console.log(fiveDayWeather)
//   })
// }