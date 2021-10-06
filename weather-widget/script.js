'use strict';

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  let latitude,
    longitude,
    weatherCurrent = {},
    weatherForecast = {};

  const weatherCurrentContainer = document.querySelector('.weather-current__container'),
    weatherForecastContainer = document.querySelector('.weather-forecast__container');

  initWeatherWidget();

  // Current weather main functions BEGINNING
  async function getCoords() {
    try {
      const pos = await new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      ({ latitude, longitude } = pos.coords);
      console.log('Received coords: ', latitude.toFixed(2), longitude.toFixed(2));
    } catch (err) {
      console.log(`There's an error: ${err.message}`);
      console.log('Using London, GB as user location');
      latitude = 51.5074;
      longitude = -0.1278;
    }
  }

  async function getWeatherCurrent(lat, lng) {
    try {
      const api = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=96b719f966cdc765beb365e43ed94d6f`
      );
      weatherCurrent = await api.json();
      console.log('Received current weather: ', weatherCurrent);
    } catch (err) {
      console.log(`There's an error: ${err.message}`);
    }
  }

  function renderWeatherCurrent(weatherCurrent) {
    const weatherWidget = `
    <div class="weather-current__location">Weather in ${
      weatherCurrent.name ? weatherCurrent.name : 'an unknown place'
    }, ${weatherCurrent.sys.country ? weatherCurrent.sys.country : "No Man's Land"}</div>
    <div class="weather-current__line">
      <div class="weather-current__temperature">${weatherCurrent.main.temp.toFixed(0)} &#176;C</div>
      <div class="weather-current__icon-container"><i class="wi wi-owm-${getDayOrNight(weatherCurrent)}-${
      weatherCurrent.weather[0].id
    }"></i></div>
    </div>
    <div class="weather-current__main">${weatherCurrent.weather[0].main}</div>
    <div class="weather-current__time">${currentTime()}</div>
    <div class="weather-current__line">
      <div class="weather-current__subtitle">Description</div>
      <div class="weather-current__description-info">${weatherCurrent.weather[0].description}</div>
    </div>
    <div class="weather-current__line">
      <div class="weather-current__subtitle">Wind</div>
      <div class="weather-current__wind-info">${getWindDescription(weatherCurrent.wind.speed)}, ${
      weatherCurrent.wind.speed
    } m/s, ${getWindDirection(weatherCurrent.wind.deg)} (${weatherCurrent.wind.deg})</div>
    </div>
    <div class="weather-current__line">
      <div class="weather-current__subtitle">Pressure</div>
      <div class="weather-current__pressure-info">${weatherCurrent.main.pressure} hpa</div>
    </div>
    <div class="weather-current__line">
      <div class="weather-current__subtitle">Humidity</div>
      <div class="weather-current__humidity-info">${weatherCurrent.main.humidity}%</div>
    </div>
    <div class="weather-current__line">
      <div class="weather-current__subtitle">Sunrise</div>
      <div class="weather-current__sunrise-info">${convertUnixTime(weatherCurrent.sys.sunrise)}</div>
    </div>
    <div class="weather-current__line">
      <div class="weather-current__subtitle">Sunset</div>
      <div class="weather-current__sunset-info">${convertUnixTime(weatherCurrent.sys.sunset)}</div>
    </div>
    <div class="weather-current__line">
      <div class="weather-current__subtitle">Geo coords</div>
      <div class="weather-current__geo-info">[${weatherCurrent.coord.lat.toFixed(
        2
      )}, ${weatherCurrent.coord.lon.toFixed(2)}]</div>
    </div>

    <div class="weather-current__btns-container">
      <button class="weather-current__show-forecast-btn">Load 5-day Forecast</button>
      <button class="weather-current__change-location-btn">Wrong Location?</button>
    </div>
    <form class="weather-current__change-location-form weather-current__hidden">
      <label for="inpLat">
        <input
          type="text"
          name="inpLat"
          id="inpLat"
          class="weather-current__change-location-lat"
          placeholder="Your Latitude"
          required
      /></label>
      <label for="inpLng">
        <input
          type="text"
          name="inpLng"
          id="inpLng"
          class="weather-current__change-location-lng"
          placeholder="Your Longitude"
          required
      /></label>
      <button type="submit" class="weather-current__change-location-submit">Accept</button>
    </form>
  `;
    weatherCurrentContainer.innerHTML = weatherWidget;

    manageWidgetBtns();
  }

  function manageWidgetBtns() {
    const loadForecastBtn = weatherCurrentContainer.querySelector('.weather-current__show-forecast-btn');
    const changeLocationBtn = weatherCurrentContainer.querySelector('.weather-current__change-location-btn');
    const changeLocationForm = weatherCurrentContainer.querySelector('.weather-current__change-location-form');
    const changeLocationSubmitBtn = changeLocationForm.querySelector('.weather-current__change-location-submit');
    const inpLat = changeLocationForm.querySelector('#inpLat');
    const inpLng = changeLocationForm.querySelector('#inpLng');
    changeLocationBtn.addEventListener('click', () => {
      changeLocationForm.classList.toggle('weather-current__hidden');
      if (!changeLocationForm.classList.contains('weather-current__hidden')) {
        inpLat.focus();
      }
    });
    changeLocationSubmitBtn.addEventListener('click', async e => {
      try {
        e.preventDefault();

        let isValid = true;

        if (inpLat.value > 90 || inpLat.value < -90) {
          isValid = false;
          inpLat.style.backgroundColor = 'salmon';
        } else {
          inpLat.style.backgroundColor = 'bisque';
        }

        if (inpLng.value > 180 || inpLng.value < -180) {
          isValid = false;
          inpLng.style.backgroundColor = 'salmon';
        } else {
          inpLng.style.backgroundColor = 'bisque';
        }
        if (!changeLocationForm.checkValidity()) {
          inpLat.style.backgroundColor = 'salmon';
          inpLng.style.backgroundColor = 'salmon';
          return;
        }

        if (!isValid) {
          return;
        }

        latitude = inpLat.value;
        longitude = inpLng.value;

        console.log('Changing location...');

        await getWeatherCurrent(latitude, longitude);
        renderWeatherCurrent(weatherCurrent);
      } catch (err) {
        console.log(`There's an error: ${err.message}`);
      }
    });

    loadForecastBtn.addEventListener('click', initWeatherForecast);
  }

  async function initWeatherWidget() {
    try {
      await getCoords();
      await getWeatherCurrent(latitude, longitude);
      renderWeatherCurrent(weatherCurrent);
    } catch (err) {
      console.log(`There's an error: ${err.message}`);
    }
  }
  // Current weather main functions END

  // Forecast weather main functions BEGINNING
  async function initWeatherForecast() {
    try {
      await getWeatherForecast(latitude, longitude);
      renderWeatherForecast(weatherForecast);
    } catch (err) {
      console.log(`There's an error: ${err.message}`);
    }
  }

  async function getWeatherForecast(lat, lng) {
    try {
      const api = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=96b719f966cdc765beb365e43ed94d6f`
      );
      weatherForecast = await api.json();
      console.log('Received forecast weather: ', weatherForecast);
    } catch (err) {
      console.log(`There's an error: ${err.message}`);
    }
  }

  function addForecastCard(i) {
    const cardHTML = `
    <div class="weather-forecast__card">
      <div class="weather-forecast__time">${convertUnixTime(weatherForecast.list[i].dt)}</div>
      <div class="weather-forecast__icon-container">
      <i class="wi wi-owm-${getApproxDayOrNight(weatherForecast.list[i].dt)}-${
      weatherForecast.list[i].weather[0].id
    }"></i></i>
      </div>
      <div class="weather-forecast__info-container">
        <div class="weather-forecast__main-info">
          <span class="weather-forecast__temperature">${weatherForecast.list[i].main.temp.toFixed(0)} &#176;C</span>
          <span class="weather-forecast__description">${weatherForecast.list[i].weather[0].description}</span>
        </div>
        <div class="weather-forecast__secondary-info">${weatherForecast.list[i].wind.speed.toFixed(1)} m/s, clouds: ${
      weatherForecast.list[i].clouds.all
    }%, ${weatherForecast.list[i].main.pressure} hpa</div>
      </div>
    </div>
  `;
    weatherForecastContainer.insertAdjacentHTML('beforeend', cardHTML);
  }

  function addForecastSubtitle(i) {
    const subtitleHTML = `
    <div class="weather-forecast__subtitle">${convertUnixDate(weatherForecast.list[i].dt)}${
      i === 0 ? ' (Today)' : ''
    }</div>
  `;
    weatherForecastContainer.insertAdjacentHTML('beforeend', subtitleHTML);
  }

  function renderWeatherForecast(weatherForecast) {
    weatherForecastContainer.innerHTML = `
  <div class="weather-forecast__title">5 day weather forecast with 3 hour step for ${
    weatherForecast.city.name ? weatherForecast.city.name : 'an unknown place'
  }, ${weatherForecast.city.country ? weatherForecast.city.country : "No Man's Land"}</div>
  `;
    const numberCards = weatherForecast.list.length;
    let hour = +convertUnixTime(weatherForecast.list[0].dt).slice(0, 2);
    for (let i = 0; i < numberCards; i++) {
      if (i === 0 || hour % 24 < 3) {
        addForecastSubtitle(i);
      }
      hour += 3;
      addForecastCard(i);
    }
    weatherForecastContainer.classList.remove('weather-forecast__hidden');
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
