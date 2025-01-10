const API_KEY = "3e7e81d175865be50ff70dd60a3dd94a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(API_URL + "&q=" + city + `&appid=` + API_KEY);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(
      ".country-flag"
    ).src = `https://countryflagsapi.netlify.app/flag/${data.sys.country}.svg`;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".feelslike").innerHTML =
      "feels like " + Math.round(data.main.feels_like) + "°C";
    const currentDate = new Date(data.dt * 1000);
    document.querySelector(".time").innerHTML = `${currentDate}`;
    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunriseTime = {
      hours: "0" + sunriseDate.getHours(),
      minutes: "0" + sunriseDate.getMinutes(),
      seconds: "0" + sunriseDate.getSeconds(),
    };
    document.querySelector(".sunrise").innerHTML = `${sunriseTime.hours.slice(
      -2
    )}:${sunriseTime.minutes.slice(-2)}:${sunriseTime.seconds.slice(-2)}`;
    const sunsetDate = new Date(data.sys.sunset * 1000);
    const sunsetTime = {
      hours: "0" + sunsetDate.getHours(),
      minutes: "0" + sunsetDate.getMinutes(),
      seconds: "0" + sunsetDate.getSeconds(),
    };
    document.querySelector(".sunset").innerHTML = `${sunsetTime.hours.slice(
      -2
    )}:${sunsetTime.minutes.slice(-2)}:${sunsetTime.seconds.slice(-2)}`;

    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.onkeydown = function (e) {
  if (e.keyCode == 13 && searchBox.value != "") {
    checkWeather(searchBox.value);
  }
};
