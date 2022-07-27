let citySearchFormEl = document.querySelector('#city-search-form');
let citySearchEL = document.querySelector('#search-input');
let apiKey = 'b5e97495fa10e207fda402aae2a3635f';
let currentWeatherTitleEl = document.querySelector('.current-city');
let currentWeatherIconEl = document.querySelector('.current-weather-icon');
let currentDateEl = document.querySelector('.current-date');

let currentTempEl = document.querySelector('#current-temp');
let currentWindEl = document.querySelector('#current-wind');
let currentHumidityEl = document.querySelector('#current-humidity');
let UV = document.querySelector('#uv');

let oneDayDateEl = document.querySelector('#one-day-date');
let oneDayIconEl = document.querySelector('#one-day-icon');
let oneDayTempEl = document.querySelector('#one-day-temp');
let oneDayWindEl = document.querySelector('#one-day-wind');
let oneDayHumidityEl = document.querySelector('#one-day-humidity');

let twoDayDateEl = document.querySelector('#two-day-date');
let twoDayIconEl = document.querySelector('#two-day-icon');
let twoDayTempEl = document.querySelector('#two-day-temp');
let twoDayWindEl = document.querySelector('#two-day-wind');
let twoDayHumidityEl = document.querySelector('#two-day-humidity');

let threeDayDateEl = document.querySelector('#three-day-date');
let threeDayIconEl = document.querySelector('#three-day-icon');
let threeDayTempEl = document.querySelector('#three-day-temp');
let threeDayWindEl = document.querySelector('#three-day-wind');
let threeDayHumidityEl = document.querySelector('#three-day-humidity');

let fourDayDateEl = document.querySelector('#four-day-date');
let fourDayIconEl = document.querySelector('#four-day-icon');
let fourDayTempEl = document.querySelector('#four-day-temp');
let fourDayWindEl = document.querySelector('#four-day-wind');
let fourDayHumidityEl = document.querySelector('#four-day-humidity');

let fiveDayDateEl = document.querySelector('#five-day-date');
let fiveDayIconEl = document.querySelector('#five-day-icon');
let fiveDayTempEl = document.querySelector('#five-day-temp');
let fiveDayWindEl = document.querySelector('#five-day-wind');
let fiveDayHumidityEl = document.querySelector('#five-day-humidity');



citySearchFormEl.addEventListener('submit', function(event){
  event.preventDefault()
  console.log(citySearchEL.value); 
  fetch('http://api.openweathermap.org/geo/1.0/direct?q='+citySearchEL.value+'&limit=1&appid='+apiKey).then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data);
    searchWeather(data[0].lat, data[0].lon, data[0].name)
    searchFiveDayWeather(data[0].lat, data[0].lon)
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
    let currentDate = new Date((data.current.dt)* 1000).toDateString();
    console.log(currentDate)
    currentDateEl.innerText = currentDate;
    currentTempEl.innerText = 'Temp:' + ' ' + currentWeather[0] + 'ºF';
    currentWindEl.innerText = 'Wind:' + ' ' + currentWeather[1] + ' ' + 'MPH';
    currentHumidityEl.innerText = 'Humidity:' + ' ' + currentWeather[2] + ' ' + '%';
    UV.innerText = 'UV Index' + ' ' + currentWeather[3];

    console.log(currentWeather[1])
  })
}

function searchFiveDayWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=${apiKey}`).then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data)
//     var fiveDayCard = $('<div>').addClass('card');
//     var forecastTitleEl = $('<h3>').addClass('card-title').text('5-Day Forecast');
    var oneDayIcon = (data.daily[0].weather[0].icon);
    // var twoDayIcon = (data.daily[1].weather[1].icon);
    // var threeDayIcon = (data.daily[2].weather[2].icon);
    // var fourDayIcon = (data.daily[3].weather[3].icon);
    // var fiveDayIcon = (data.daily[4].weather[4].icon);

    var oneDayWeather = [data.daily[0].temp.day, data.daily[0].wind_speed, data.daily[0].humidity];
    var twoDayWeather = [data.daily[1].temp.day, data.daily[1].wind_speed, data.daily[1].humidity];
    var threeDayWeather = [data.daily[2].temp.day, data.daily[2].wind_speed, data.daily[2].humidity];
    var fourDayWeather = [data.daily[3].temp.day, data.daily[3].wind_speed, data.daily[3].humidity];
    var fiveDayWeather = [data.daily[4].temp.day, data.daily[4].wind_speed, data.daily[4].humidity];
    
    // var oneDayIconURL = `http://openweathermap.org/img/wn/${oneDayIcon}@2x.png`;    
    // var twoDayIconURL = `http://openweathermap.org/img/wn/${twoDayIcon}@2x.png`;    
    // var threeDayIconURL = `http://openweathermap.org/img/wn/${threeDayIcon}@2x.png`;    
    // var fourDayIconURL = `http://openweathermap.org/img/wn/${fourDayIcon}@2x.png`;    
    // var fiveDayIconURL = `http://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`;

    // oneDayDateEl.innerText = 
    // oneDayIconEl.innerText = oneDayIconURL;
    let oneDate = new Date((data.daily[1].dt)* 1000).toDateString();
    oneDayDateEl.innerText = oneDate;
    oneDayTempEl.innerText = 'Temp:' + ' ' + oneDayWeather[0] + 'ºF';
    oneDayWindEl.innerText = 'Wind:' + ' ' + oneDayWeather[1] + ' ' + 'MPH';
    oneDayHumidityEl.innerText = 'Humidity:' + ' ' + oneDayWeather[2] + ' ' + '%';

    let twoDate = new Date((data.daily[2].dt)* 1000).toDateString();
    twoDayDateEl.innerText = twoDate;
    twoDayTempEl.innerText = 'Temp:' + ' ' + twoDayWeather[0] + 'ºF';
    twoDayWindEl.innerText = 'Wind:' + ' ' + twoDayWeather[1] + ' ' + 'MPH';
    twoDayHumidityEl.innerText = 'Humidity:' + ' ' + twoDayWeather[2] + ' ' + '%';

    let threeDate = new Date((data.daily[3].dt)* 1000).toDateString();
    threeDayDateEl.innerText = threeDate;
    threeDayTempEl.innerText = 'Temp:' + ' ' + threeDayWeather[0] + 'ºF';
    threeDayWindEl.innerText = 'Wind:' + ' ' + threeDayWeather[1] + ' ' + 'MPH';
    threeDayHumidityEl.innerText = 'Humidity:' + ' ' + threeDayWeather[2] + ' ' + '%';

    let fourDate = new Date((data.daily[4].dt)* 1000).toDateString();
    fourDayDateEl.innerText = fourDate;
    fourDayTempEl.innerText = 'Temp:' + ' ' + fourDayWeather[0] + 'ºF';
    fourDayWindEl.innerText = 'Wind:' + ' ' + fourDayWeather[1] + ' ' + 'MPH';
    fourDayHumidityEl.innerText = 'Humidity:' + ' ' + fourDayWeather[2] + ' ' + '%';

    let fiveDate = new Date((data.daily[5].dt)* 1000).toDateString();
    fiveDayDateEl.innerText = fiveDate;
    fiveDayTempEl.innerText = 'Temp:' + ' ' + fiveDayWeather[0] + 'ºF';
    fiveDayWindEl.innerText = 'Wind:' + ' ' + fiveDayWeather[1] + ' ' + 'MPH';
    fiveDayHumidityEl.innerText = 'Humidity:' + ' ' + fiveDayWeather[2] + ' ' + '%';
//     var fiveDayIconEl = $('<h3>').addClass('card-title').text(fiveDayIconURL);
//     var fiveDayWeatherEl = $('<ol>').addClass('current-weather').text(fiveDayWeather);
//     $('.current-city').append(fiveDayCard.append(forecastTitleEl, fiveDayIconEl, fiveDayWeatherEl))
//     $('.current-city-icon').append(fiveDayCard.append(fiveDayIconEl))
//     $('#current-weather').append(fiveDayCard.append(fiveDayWeatherEl))
//     console.log(fiveDayWeather)
  })
}