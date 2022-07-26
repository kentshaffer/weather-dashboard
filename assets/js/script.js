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

// search button and api fetch

citySearchFormEl.addEventListener('submit', function(event){
  event.preventDefault()
  console.log(citySearchEL.value);
  var tempArray = JSON.parse(localStorage.getItem('cities')) || [] 
  tempArray.push(citySearchEL.value)
  localStorage.setItem('cities', JSON.stringify(tempArray))
  fetch('https://api.openweathermap.org/geo/1.0/direct?q='+citySearchEL.value+'&limit=1&appid='+apiKey).then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data);
    searchWeather(data[0].lat, data[0].lon, data[0].name)
    searchFiveDayWeather(data[0].lat, data[0].lon)
  })
})

// convert lat lon to city name and fetch weather data 

function searchWeather(lat, lon, cityName){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=${apiKey}`).then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data)

    var currentIcon = (data.current.weather[0].icon);
    var currentWeather = [data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi];
    var currentIconURL = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;


    // current weather inputs

    currentWeatherTitleEl.innerText = cityName;
    currentWeatherIconEl.setAttribute('src', currentIconURL);
    let currentDate = new Date((data.current.dt)* 1000).toDateString();
    console.log(currentDate)
    currentDateEl.innerText = currentDate;
    currentTempEl.innerText = 'Temp:' + ' ' + currentWeather[0] + 'ºF';
    currentWindEl.innerText = 'Wind:' + ' ' + currentWeather[1] + ' ' + 'MPH';
    currentHumidityEl.innerText = 'Humidity:' + ' ' + currentWeather[2] + ' ' + '%';
    UV.innerText = 'UV Index' + ' ' + currentWeather[3];

    // uv color change

    if (currentWeather[3] >= 0 && currentWeather[3] <= 3) {
      UV.setAttribute('style', 'background-color: springgreen; padding: 2px; width: fit-content;');
    } else if (currentWeather[3] > 3 && currentWeather[3] <= 5) {
      UV.setAttribute('style', 'background-color: gold; padding: 2px; width: fit-content;');
    } else if (currentWeather[3] > 5) {
      UV.setAttribute('style', 'background-color: tomato; padding: 2px; width: fit-content;');
    }
    console.log(currentWeather[1])
  })
}

// five day weather data fetch

function searchFiveDayWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=${apiKey}`).then(function(response){
    return response.json()
  }).then(function(data){
    console.log(data)

// for loop for five day forecast cards

var forecastDiv = document.querySelector('.five-day-forecast')
  for(var i = 1; i < 6; i++) {
    console.log(data);
    var forecastIcon = (data.daily[i].weather[0].icon);
    var forecastIconURL = `https://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
    var imageEl = document.createElement('img');
    imageEl.setAttribute('src', forecastIconURL);

    var cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'col card');

    var cardBodyDiv = document.createElement('div');
    cardBodyDiv.setAttribute('class', 'card-body');

    var cardTitleDiv = document.createElement('h5');
    let date = new Date((data.daily[i].dt)* 1000).toDateString();
    cardTitleDiv.textContent = date;
    cardTitleDiv.setAttribute('class', 'card-title');

    var tempEl = document.createElement('p');
    tempEl.setAttribute('class', 'card-text');
    tempEl.textContent = 'Temp: ' + data.daily[i].temp.day + 'ºF'

    var windEl = document.createElement('p');
    windEl.setAttribute('class', 'card-text');
    windEl.textContent = 'Wind: ' + data.daily[i].wind_speed + ' MPH'

    var humidityEl = document.createElement('p');
    humidityEl.setAttribute('class', 'card-text');
    humidityEl.textContent = 'Humidity: ' + data.daily[i].humidity + ' %'

    cardBodyDiv.appendChild(cardTitleDiv);
    cardBodyDiv.append(imageEl, tempEl, windEl, humidityEl);
    cardDiv.appendChild(cardBodyDiv);
    forecastDiv.appendChild(cardDiv);

    }
    
    // localStorage.setItem('searchedCities', document.querySelector('#search-input').value);
    // var prevSearch = document.getElementsByClassName('.prev-search');
    // var prevSearchValue = prevSearch.textContent;
    // console.log(prevSearchValue);
  })
}

// local storage get item

function recallSearchHistory() {
  var recallButton = document.querySelector('.prev-search');
  for (var i = 0; i < JSON.parse(localStorage.getItem('cities')).length; i++) {
    console.log(JSON.parse(localStorage.getItem('cities'))[i]);
      var recallButtonEl = document.createElement('li');
      recallButtonEl.setAttribute('class', 'recall-search');
      recallButtonEl.textContent = 'cities';
      recallButton.appendChild(recallButtonEl);
    }

  }


