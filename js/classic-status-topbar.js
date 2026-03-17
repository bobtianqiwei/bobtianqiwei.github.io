// classic-status-topbar.js developed by Bob Tianqi Wei
(function () {
  var sfStatus = document.getElementById("sf-status");
  var sfWeatherIcon = document.getElementById("sf-weather-icon");

  if (!sfStatus) {
    return;
  }

  var sfTimeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
  var sfWeatherText = "";
  var sfWeatherCodes = {
    0: "Clear",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Fog",
    51: "Light drizzle",
    53: "Drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Freezing rain",
    71: "Light snow",
    73: "Snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Rain showers",
    81: "Rain showers",
    82: "Heavy showers",
    85: "Snow showers",
    86: "Snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm"
  };

  function getSfWeatherIconName(weatherCode, isDay) {
    if (weatherCode === 0 || weatherCode === 1) {
      return isDay ? "clear-day" : "clear-night";
    }

    if (weatherCode === 2) {
      return isDay ? "partly-cloudy-day" : "partly-cloudy-night";
    }

    if (weatherCode === 3) {
      return "overcast";
    }

    if (weatherCode === 45 || weatherCode === 48) {
      return "fog";
    }

    if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
      return "drizzle";
    }

    if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65 || weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
      return "rain";
    }

    if (weatherCode === 66 || weatherCode === 67) {
      return "sleet";
    }

    if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75 || weatherCode === 77 || weatherCode === 85 || weatherCode === 86) {
      return "snow";
    }

    if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
      return "thunderstorms";
    }

    return isDay ? "partly-cloudy-day" : "partly-cloudy-night";
  }

  function renderSfStatus() {
    var timeLabel = sfTimeFormatter.format(new Date());

    if (sfWeatherText) {
      sfStatus.textContent = sfWeatherText + ", " + timeLabel;
      return;
    }

    sfStatus.textContent = timeLabel;
  }

  function renderSfWeather(data) {
    var weatherLabel;
    var roundedTemp;

    if (!data || !data.current_weather) {
      sfWeatherText = "";
      if (sfWeatherIcon) {
        sfWeatherIcon.style.display = "none";
      }
      renderSfStatus();
      return;
    }

    weatherLabel = sfWeatherCodes[data.current_weather.weathercode] || "Current conditions";
    roundedTemp = Math.round(data.current_weather.temperature);
    sfWeatherText = roundedTemp + "F, " + weatherLabel;

    if (sfWeatherIcon) {
      sfWeatherIcon.style.display = "";
      sfWeatherIcon.src = "https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/" + getSfWeatherIconName(data.current_weather.weathercode, data.current_weather.is_day !== 0) + ".svg";
      sfWeatherIcon.alt = weatherLabel;
    }

    renderSfStatus();
  }

  renderSfStatus();
  window.setInterval(renderSfStatus, 30000);

  window.fetch("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true&temperature_unit=fahrenheit")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Weather request failed");
      }
      return response.json();
    })
    .then(renderSfWeather)
    .catch(function () {
      sfWeatherText = "";
      if (sfWeatherIcon) {
        sfWeatherIcon.style.display = "none";
      }
      renderSfStatus();
    });
})();
