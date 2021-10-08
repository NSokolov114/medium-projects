'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  let latitude, longitude, weatherCurrent, weatherForecast;

  const weatherCurrentContainer = document.querySelector('.weather-current__container'),
    loader = weatherCurrentContainer.querySelector('.weather-current__loader'),
    loadForecastBtn = weatherCurrentContainer.querySelector('.weather-current__show-forecast-btn'),
    weatherForecastContainer = document.querySelector('.weather-forecast__container');

  initWeatherWidget();

  // Current weather main functions BEGINNING
  async function getCoords() {
    let pos;

    try {
      pos = await new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    } catch (err) {
      console.log(`There's an error: ${err.message}`);
      console.log('Using London, GB as user location');
      latitude = 51.5074;
      longitude = -0.1278;
    }

    if (pos) {
      ({ latitude, longitude } = pos.coords);
      console.log('Received coords: ', latitude.toFixed(2), longitude.toFixed(2));
    }
  }

  async function getWeatherCurrent(lat, lng) {
    let api;

    try {
      api = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=96b719f966cdc765beb365e43ed94d6f`
      );
      weatherCurrent = await api.json();
    } catch (err) {
      console.log(`There's an error: ${err.message}`);
    }

    if (api) {
      console.log('Received current weather: ', weatherCurrent);
    }
  }

  function renderWeatherCurrent(weatherCurrent) {
    const location = weatherCurrentContainer.querySelector('.weather-current__location'),
      temperature = weatherCurrentContainer.querySelector('.weather-current__temperature'),
      icon = weatherCurrentContainer.querySelector('i'),
      main = weatherCurrentContainer.querySelector('.weather-current__main'),
      time = weatherCurrentContainer.querySelector('.weather-current__time'),
      description = weatherCurrentContainer.querySelector('.weather-current__description-info'),
      wind = weatherCurrentContainer.querySelector('.weather-current__wind-info'),
      pressure = weatherCurrentContainer.querySelector('.weather-current__pressure-info'),
      humidity = weatherCurrentContainer.querySelector('.weather-current__humidity-info'),
      sunrise = weatherCurrentContainer.querySelector('.weather-current__sunrise-info'),
      sunset = weatherCurrentContainer.querySelector('.weather-current__sunset-info'),
      geo = weatherCurrentContainer.querySelector('.weather-current__geo-info');

    location.innerText = `Weather in ${weatherCurrent.name ? weatherCurrent.name : 'an unknown place'}, ${
      weatherCurrent.sys.country ? weatherCurrent.sys.country : "No Man's Land"
    }`;
    temperature.innerText = `${weatherCurrent.main.temp.toFixed(0)} °C`;
    icon.classList.add(`wi-owm-${getDayOrNight(weatherCurrent)}-${weatherCurrent.weather[0].id}`);
    main.innerText = weatherCurrent.weather[0].main;
    time.innerText = currentTime();
    description.innerText = weatherCurrent.weather[0].description;
    wind.innerText = `${getWindDescription(weatherCurrent.wind.speed)}, ${
      weatherCurrent.wind.speed
    } m/s, ${getWindDirection(weatherCurrent.wind.deg)} (${weatherCurrent.wind.deg})`;
    pressure.innerText = `${weatherCurrent.main.pressure} hpa`;
    humidity.innerText = `${weatherCurrent.main.humidity} %`;
    sunrise.innerText = convertUnixTime(weatherCurrent.sys.sunrise);
    sunset.innerText = convertUnixTime(weatherCurrent.sys.sunset);
    geo.innerText = `[${weatherCurrent.coord.lat.toFixed(2)}, ${weatherCurrent.coord.lon.toFixed(2)}]`;

    manageWidgetBtns();

    loader.classList.add('weather-current__hidden');
  }

  function manageWidgetBtns() {
    const changeLocationBtn = weatherCurrentContainer.querySelector('.weather-current__change-location-btn'),
      changeLocationForm = weatherCurrentContainer.querySelector('.weather-current__change-location-form'),
      changeLocationSubmitBtn = changeLocationForm.querySelector('.weather-current__change-location-submit'),
      inpLat = changeLocationForm.querySelector('#inpLat'),
      inpLng = changeLocationForm.querySelector('#inpLng');

    changeLocationBtn.addEventListener('click', () => {
      changeLocationForm.classList.toggle('weather-current__hidden');
      if (!changeLocationForm.classList.contains('weather-current__hidden')) {
        inpLat.focus();
      }
    });

    changeLocationSubmitBtn.addEventListener('click', async e => {
      e.preventDefault();

      let isValid = true;

      if (inpLat.value > 90 || inpLat.value < -90) {
        isValid = false;
        inpLat.classList.add('weather-current__error');
      } else {
        inpLat.classList.remove('weather-current__error');
      }

      if (inpLng.value > 180 || inpLng.value < -180) {
        isValid = false;
        inpLng.classList.add('weather-current__error');
      } else {
        inpLng.classList.remove('weather-current__error');
      }

      if (!changeLocationForm.checkValidity()) {
        inpLng.classList.add('weather-current__error');
        inpLat.classList.add('weather-current__error');
        return;
      }

      if (!isValid) {
        return;
      }

      latitude = inpLat.value;
      longitude = inpLng.value;
      console.log('Changing location...');
      loader.classList.remove('weather-current__hidden');

      await getWeatherCurrent(latitude, longitude);
      renderWeatherCurrent(weatherCurrent);
    });

    loadForecastBtn.addEventListener('click', initWeatherForecast);
  }

  async function initWeatherWidget() {
    await getCoords();
    await getWeatherCurrent(latitude, longitude);
    renderWeatherCurrent(weatherCurrent);
  }
  // Current weather main functions END

  // Forecast weather main functions BEGINNING
  async function initWeatherForecast() {
    loadForecastBtn.innerText = 'loading...';

    await getWeatherForecast(latitude, longitude);
    renderWeatherForecast(weatherForecast);
  }

  async function getWeatherForecast(lat, lng) {
    let api;

    try {
      api = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=96b719f966cdc765beb365e43ed94d6f`
      );
      weatherForecast = await api.json();
    } catch (err) {
      console.log(`There's an error: ${err.message}`);
    }

    if (api) {
      console.log('Received forecast weather: ', weatherForecast);
    }
  }

  function renderWeatherForecast(weatherForecast) {
    const title = weatherForecastContainer.querySelector('.weather-forecast__title'),
      subtitles = weatherForecastContainer.querySelectorAll('.weather-forecast__subtitle'),
      cards = weatherForecastContainer.querySelectorAll('.weather-forecast__card'),
      icons = weatherForecastContainer.querySelectorAll('i'),
      temperatures = weatherForecastContainer.querySelectorAll('.weather-forecast__temperature'),
      descriptions = weatherForecastContainer.querySelectorAll('.weather-forecast__description'),
      secondaries = weatherForecastContainer.querySelectorAll('.weather-forecast__secondary-info');

    title.innerText = `5 day weather forecast with 3 hour step for ${
      weatherForecast.city.name ? weatherForecast.city.name : 'an unknown place'
    }, ${weatherForecast.city.country ? weatherForecast.city.country : "No Man's Land"}`;

    for (let i = 0; i < subtitles.length; i++) {
      subtitles[i].innerText = `${convertUnixDate(weatherForecast.list[i * 8].dt)}${i === 0 ? ' (Today)' : ''}`;
    }

    const numberCards = 40;
    const startingHour = +convertUnixTime(weatherForecast.list[0].dt).slice(0, 2);
    const skip = startingHour / 3;
    console.log(convertUnixTime(weatherForecast.list[0].dt));

    for (let i = 0; i < 8; i++) {
      cards[i].classList.remove('weather-forecast__hidden');
    }

    for (let i = 0; i < skip; i++) {
      cards[i].classList.add('weather-forecast__hidden');
    }

    for (let i = skip; i < numberCards; i++) {
      const j = i - skip;

      if (!!weatherForecastContainer) return;

      icons[i].classList.add(
        `wi-owm-${getApproxDayOrNight(weatherForecast.list[j].dt)}-${weatherForecast.list[j].weather[0].id}`
      );
      temperatures[i].innerText = `${weatherForecast.list[j].main.temp.toFixed(0)} °C`;
      descriptions[i].innerText = weatherForecast.list[j].weather[0].description;
      secondaries[i].innerText = `${weatherForecast.list[j].wind.speed.toFixed(1)} m/s, clouds: ${
        weatherForecast.list[j].clouds.all
      }%, ${weatherForecast.list[j].main.pressure} hpa`;
    }

    // weatherForecastContainer.classList.remove('weather-forecast__hidden');
    loadForecastBtn.innerText = 'load new forecast';
  }
  // Forecast weather main functions END

  // Helper functions BEGINNING
  function currentTime() {
    const time = new Date();

    return `${time.toLocaleTimeString('en-GB').slice(0, -3)} ${time.toDateString().slice(4, -5)}`;
  }

  function convertUnixTime(unixTime) {
    const time = new Date(unixTime * 1000);

    return time.toLocaleTimeString('en-GB').slice(0, -3);
  }

  function getWindDescription(speed) {
    switch (true) {
      case speed < 0 || speed > 80:
        console.log('Make sure that wind speed is in m/s');
        return 'Unknown';
      case speed < 0.5:
        return 'Calm';
      case speed < 1.6:
        return 'Light Air';
      case speed < 3.4:
        return 'Light Breeze';
      case speed < 5.6:
        return 'Gentle Breeze';
      case speed < 8:
        return 'Moderate Breeze';
      case speed < 10.8:
        return 'Fresh Breeze';
      case speed < 13.9:
        return 'Strong Breeze';
      case speed < 17.2:
        return 'High Wind';
      case speed < 20.8:
        return 'Gale';
      case speed < 24.5:
        return 'Strong Gale';
      case speed < 28.5:
        return 'Storm';
      case speed < 32.7:
        return 'Violent Storm';
      case speed >= 32.7:
        return 'Violent Storm';
      default:
        throw new Error('Something is wrong with the wind speed');
    }
  }

  function getWindDirection(deg) {
    //prettier-ignore
    const windDir = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]

    return windDir[Math.floor(deg / 22.5 + 0.5)];
  }

  function getDayOrNight(weatherCurrent) {
    return weatherCurrent.dt > weatherCurrent.sys.sunrise && weatherCurrent.dt < weatherCurrent.sys.sunset
      ? 'day'
      : 'night';
  }

  function getApproxDayOrNight(timeUnix) {
    return convertUnixTime(timeUnix).slice(0, 2) > convertUnixTime(weatherCurrent.sys.sunrise).slice(0, 2) &&
      convertUnixTime(timeUnix).slice(0, 2) < convertUnixTime(weatherCurrent.sys.sunset).slice(0, 2)
      ? 'day'
      : 'night';
  }

  function convertUnixDate(unixDate) {
    const date = new Date(unixDate * 1000);

    return date.toDateString();
  }
  // Helper functions END
}
