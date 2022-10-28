var imgC = document.getElementById("imgWeath");
var countryName = document.getElementById("countryName");
var regionName = document.getElementById("stateName");
var cityName = document.getElementById("cityName");
var cond = document.getElementById("conditionText");
var temp = document.getElementById("weatherTemp");
var backWall = document.getElementById("backImg");
var alertText = document.getElementById("alertDesc");
const locBtn = document.getElementById("clickLocation");
var lastUpdate = document.getElementById("lastUpdate");
var fahText = document.getElementById("fahrenText");
var humiText = document.getElementById("humText");
var feelsCelText = document.getElementById("feelsCel");
var feelsFahText = document.getElementById("feelsFah");
var placeAlert = document.getElementById("alertPlace");
var wind_s = document.getElementById("windSpeed");
var wind_m = document.getElementById("windSpeedMiles");
var wind_d = document.getElementById("windDirection");
var windD = document.getElementById("windDegree");
var aqCarbon = document.getElementById("aqCo2");
var aqNitrogen = document.getElementById("aqNo2");
var aqSulfur = document.getElementById("aqSo2");
var aqParticleMax = document.getElementById("aqPm10");
var aqParticleMin = document.getElementById("aq2p");
var aqOxygen = document.getElementById("aqOx3");
var aqOfIndex = document.getElementById("aqIndex");
var visMile = document.getElementById("visM");
var visKm = document.getElementById("visKm");
var letLoad = document.getElementById("loader");

function navFunc() {
  barWhole.classList.add("barWholeMove");
  barOne.classList.add("barOneMove");
  barTwo.classList.add("barTwoMove");
  barThi.classList.add("barThiMove");
  navCall.classList.add("navCallTogg");
  styleDis.style.display = "block";
}

function runSomefunc() {
  chevRot.classList.toggle("rotC");
  prRun.classList.toggle("extendPr");
}

function runSomeF() {
  itSelf.classList.toggle("toggC");
  arrowDown.classList.toggle("rotC");
}

function disableNav() {
  barWhole.classList.remove("barWholeMove");
  barOne.classList.remove("barOneMove");
  barTwo.classList.remove("barTwoMove");
  barThi.classList.remove("barThiMove");
  navCall.classList.remove("navCallTogg");
  styleDis.style.display = "none";
}

function funcToDet() {
  resId.classList.toggle("showDat");
}

window.onload = function () {
  setTimeout(() => {
    disappear.classList.add("toggle");
  }, 40);
  letLoad.style.display = "none";
};

loader.style.display = "block";

locBtn.addEventListener("click", () => {
  loader.style.display = "block";

  let lon;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/forecast.json?key=272886315d4f4f6f844162320222601&q=${lat},${lon}&days=14&aqi=yes&alerts=yes`;

      fetch(api)
        .then((response) => {
          var showId = document.getElementById("mBody");
          if (response.status == 200) {
            showId.style.display = "block";
            loader.style.display = "none";
          }
          return response.json();
        })
        .then((data) => {
          var cityNameInp = document.getElementById("searchCity");
          var cityNameIn = data.location.name;
          cityNameInp.value = cityNameIn;

          //Icon of current weather
          //COUNTRY details
          var cName = data.location.country;
          var rName = data.location.region;
          var ctName = data.location.name;

          var tempN = data.current.temp_c;
          var fahTemp = data.current.temp_f;
          var humPer = data.current.humidity;
          var feelsCel = data.current.feelslike_c;
          var feelsFah = data.current.feelslike_f;

          //COUNTRY DISPLAY
          countryName.innerHTML = cName;
          regionName.innerHTML = rName;
          cityName.innerHTML = ctName;
          //TEMP DISPLAY
          var tempN = Math.floor(tempN);
          var condition = data.current.condition.text;
          fahText.innerHTML =
            "Fahrenheit" + ": " + fahTemp + `<sup class="celsiusUnit">°F</sup>`;
          humiText.innerHTML = "Humidity" + ": " + humPer + "%";
          feelsCelText.innerHTML =
            "Feels like" +
            ": " +
            feelsCel +
            `<sup class="celsiusUnit">°C</sup>`;
          feelsFahText.innerHTML =
            "Feels like" +
            ": " +
            feelsFah +
            `<sup class="celsiusUnit">°F</sup>`;
          feelsCelText.innerHTML =
            "Feels like" +
            ": " +
            feelsCel +
            `<sup class="celsiusUnit">°C</sup>`;

          temp.innerHTML = tempN + `<sup class="celsiusUnit">°C</sup>`;
          cond.innerHTML = condition;

          //Wind info
          windDegree = data.current.wind_degree;
          windDirection = data.current.wind_dir;
          windMiles = data.current.wind_mph;
          windSpeed = data.current.wind_kph;

          wind_d.innerHTML = "Wind direction" + " - " + windDirection;
          windD.innerHTML =
            "Wind Degree" + "&nbsp;&nbsp;&nbsp;" + " - " + windDegree;
          wind_s.innerHTML =
            "Wind speed" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            " - " +
            windSpeed +
            " " +
            "KMH";
          wind_m.innerHTML =
            "Wind speed" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
            " - " +
            windMiles +
            " " +
            "MPH";

          //Getting localHours For Day Night Icon
          var todayChanceRain =
            data.forecast.forecastday[0].day.daily_chance_of_rain;
          var todayChanceSnow =
            data.forecast.forecastday[0].day.daily_chance_of_snow;

          chanceRain.innerHTML =
            `<text class="fahMin">Rain Chance</text>` +
            " : " +
            todayChanceRain +
            "%";
          chanceSnow.innerHTML =
            `<text class="fahMin">Snow Chance</text>` +
            " : " +
            todayChanceSnow +
            "%";

          //GETTING AQ DATA
          var aqC = data.current.air_quality.co;
          var aqO = data.current.air_quality.o3;
          var no2 = data.current.air_quality.no2;
          var pm2 = data.current.air_quality.pm2_5;
          var pm10d = data.current.air_quality.pm10;
          var syn = data.current.air_quality.so2;

          aqC = Math.round(aqC);
          aqO = Math.round(aqO);
          no2 = Math.round(no2);
          pm2 = Math.round(pm2);
          pm10d = Math.round(pm10d);
          syn = Math.round(syn);

          aqCarbon.innerHTML = aqC;
          aqOxygen.innerHTML = aqO;
          aqParticleMin.innerHTML = pm2;
          aqParticleMax.innerHTML = pm10d;
          aqSulfur.innerHTML = syn;
          aqNitrogen.innerHTML = no2;

          var epa_index = data.current.air_quality["us-epa-index"];

          if (epa_index == 0) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-0.svg";
          } else if (epa_index == 1) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-1.svg";
          } else if (epa_index == 2) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-2.svg";
          } else if (epa_index == 3) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-3.svg";
          } else if (epa_index == 4) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-4.svg";
          } else if (epa_index == 5) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-5.svg";
          } else if (epa_index == 6) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-6.svg";
          } else if (epa_index == 7) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-7.svg";
          } else if (epa_index == 8) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-8.svg";
          } else if (epa_index == 9) {
            aqOfIndex.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-9.svg";
          }
          var sunRiseT = data.forecast.forecastday[0].astro.sunrise;
          var sunSetT = data.forecast.forecastday[0].astro.sunset;

          sunRise.innerHTML = sunRiseT;
          sunSet.innerHTML = sunSetT;

          var moonCres = data.forecast.forecastday[0].astro.moon_phase;
          var moonRiseT = data.forecast.forecastday[0].astro.moonrise;
          var moonSetT = data.forecast.forecastday[0].astro.moonset;

          var moonCond = document.getElementById("moonCond");

          moonCond.innerHTML = moonCres;
          moonRise.innerHTML = moonRiseT;
          moonSet.innerHTML = moonSetT;

          if (moonCond.innerHTML == "New Moon") {
            moonDist.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-new.svg";
          } else if (moonCond.innerHTML == "Waxing Crescent") {
            moonDist.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-crescent.svg";
          } else if (moonCond.innerHTML == "First Quarter") {
            moonDist.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-first-quarter.svg";
          } else if (moonCond.innerHTML == "Waxing Gibbous") {
            moonDist.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-gibbous.svg";
          } else if (moonCond.innerHTML == "Full Moon") {
            moonDist.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-full.svg";
          } else if (moonCond.innerHTML == "Waning Gibbous") {
            moonDist.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-gibbous.svg";
          } else if (moonCond.innerHTML == "Last Quarter") {
            moonDist.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-last-quarter.svg";
          } else if (moonCond.innerHTML == "Waning Crescent") {
            moonDist.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-crescent.svg";
          }

          //Vis Info
          var visInKm = data.current.vis_km;
          var visInM = data.current.vis_miles;

          visMile.innerHTML = "Visibility" + " - " + visInM + " MILES";
          visKm.innerHTML = "Visibility" + " - " + visInKm + " KM";

          var arraySize = data.alerts.alert;
          var lstUpdate = data.current.last_updated;

          lastUpdate.innerHTML = "Last updated" + " - " + lstUpdate;

          if (arraySize.length > 0) {
            noAlert.style.display = "none";
            var alertDesc = data.alerts.alert[0].desc;
            var alertPos = data.alerts.alert[0].areas;
            let headLineFrom = data.alerts.alert[0].headline;
            warnHead.innerHTML = headLineFrom;
            let descFull = data.alerts.alert[0].desc;
            alertDescM.innerHTML = descFull;
            let alertCategory = data.alerts.alert[0].category;
            category.innerHTML = alertCategory;
            let alertEfx = data.alerts.alert[0].effective;
            alertEffective.innerHTML = alertEfx;
            let alertExp = data.alerts.alert[0].expires;
            alertExpires.innerHTML = alertExp;

            let alertNone = document.querySelectorAll(".alertHide");

            for (var i = 0; i < alertNone.length; i++) {
              alertNone[i].style.display = "block";
            }
          } else {
            warnHead.innerHTML = "";
            alertDescM.innerHTML = "";
            category.innerHTML = "";
            alertEffective.innerHTML = "";
            alertExpires.innerHTML = "";

            noAlert.style.display = "block";
            let alertNone = document.querySelectorAll(".alertHide");

            for (var i = 0; i < alertNone.length; i++) {
              alertNone[i].style.display = "none";
            }
          }
          //Aq info
          var aqCo2 = data.current.air_quality.co;

          var is_day = data.current.is_day;

          if (cond.innerHTML == "Sunny" || cond.innerHTML == "Clear") {
            backWall.src = "/backgrounds/clear.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg";
            }
          } else if (cond.innerHTML == "Partly cloudy") {
            backWall.src = "/backgrounds/cloudy.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg";
            }
          } else if (cond.innerHTML == "Cloudy") {
            backWall.src = "/backgrounds/cloudy.jpg";
            if (is_day == 1) {
              ImgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
            }
          } else if (cond.innerHTML == "Overcast") {
            backWall.src = "/backgrounds/cloudy.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg";
            }
          } else if (cond.innerHTML == "Mist") {
            backWall.src = "/backgrounds/fog.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
            }
          } else if (cond.innerHTML == "Patchy rain possible") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
            }
          } else if (cond.innerHTML == "Patchy snow possible") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-snow.svg";
            }
          } else if (cond.innerHTML == "Patchy sleet possible") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
            }
          } else if (cond.innerHTML == "Patchy freezing drizzle possible") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
            }
          } else if (cond.innerHTML == "Blowing snow") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-snow.svg";
            }
          } else if (cond.innerHTML == "Thundery outbreaks possible") {
            backWall.src = "/backgrounds/thunderstorm.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night.svg ";
            }
          } else if (cond.innerHTML == "Blizzard") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-hail.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-hail.svg";
            }
          } else if (cond.innerHTML == "Fog") {
            backWall.src = "/backgrounds/fog.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
            }
          } else if (cond.innerHTML == "Freezing fog") {
            backWall.src = "/backgrounds/fog.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/fog.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/fog.svg";
            }
          } else if (cond.innerHTML == "Patchy light drizzle") {
            backWall.src = "/backgrounds/drizzle.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
            }
          } else if (cond.innerHTML == "Light drizzle") {
            backWall.src = "/backgrounds/drizzle.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
            }
          } else if (cond.innerHTML == "Freezing drizzle") {
            backWall.src = "/backgrounds/fog.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
            }
          } else if (cond.innerHTML == "Heavy freezing drizzle") {
            backWall.src = "/backgrounds/drizzle.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
            }
          } else if (cond.innerHTML == "Heavy freezing drizzle") {
            backWall.src = "/backgrounds/drizzle.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
            }
          } else if (cond.innerHTML == "Light rain") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
            }
          } else if (cond.innerHTML == "Moderate rain at times") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
            }
          } else if (cond.innerHTML == "Moderate rain") {
            backWall.src = "/backgrounds/rain.jpg";

            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
            }
          } else if (cond.innerHTML == "Heavy rain at times") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            }
          } else if (cond.innerHTML == "Heavy rain") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            }
          } else if (cond.innerHTML == "Light freezing rain") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
            }
          } else if (cond.innerHTML == "Moderate or heavy freezing rain") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Light sleet") {
            backWall.src = "/backgrounds/drizzle.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
            }
          } else if (cond.innerHTML == "Moderate or heavy sleet") {
            backWall.src = "/backgrounds/drizzle.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
            }
          } else if (cond.innerHTML == "Patchy light snow") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Light snow") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Patchy moderate snow") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Moderate snow") {
            backWall.src = "/backgrounds/snow.jpg";

            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Patchy heavy snow") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Heavy snow") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Ice pelletes") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
            }
          } else if (cond.innerHTML == "Light rain shower") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            }
          } else if (cond.innerHTML == "Moderate or heavy rain shower") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            }
          } else if (cond.innerHTML == "Torrential rain shower") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            }
          } else if (cond.innerHTML == "Light sleet showers") {
            backWall.src = "/backgrounds/drizzle.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
            }
          } else if (cond.innerHTML == "Moderate or heavy sleet") {
            backWall.src = "/backgrounds/drizzle.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
            }
          } else if (cond.innerHTML == "Light snow showers") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Moderate or heavy snow showers") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
            }
          } else if (cond.innerHTML == "Light showers of ice pellets") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
            }
          } else if (
            cond.innerHTML == "Moderate or heavy showers of ice pellets"
          ) {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
            }
          } else if (cond.innerHTML == "Patchy light rain with thunder") {
            backWall.src = "/backgrounds/thunderstorm.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg";
            }
          } else if (cond.innerHTML == "Patchy light rain") {
            backWall.src = "/backgrounds/rain.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
            }
          } else if (cond.innerHTML == "Moderate or heavy rain with thunder") {
            backWall.src = "/backgrounds/thunderstorm.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg";
            }
          } else if (cond.innerHTML == "Patchy light snow with thunder") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
            }
          } else if (cond.innerHTML == "Moderate or heavy snow with thunder") {
            backWall.src = "/backgrounds/snow.jpg";
            if (is_day == 1) {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
            } else {
              imgC.src =
                "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
            }
          }

          for (var i = 0; i < 24; i++) {
            var foreCastd1 = new Array();
            foreCastd1[i] = data.forecast.forecastday[0].hour[i].temp_c;
            var foreCastd1Inf = new Array();
            foreCastd1Inf[i] = data.forecast.forecastday[0].hour[i].temp_f;
            let tempFahCol = document.querySelectorAll(".tempQueryMain");
            tempFahCol[i].innerHTML =
              foreCastd1[i] + "°C" + " | " + foreCastd1Inf[i] + "°F";

            var rainTodayArr = new Array();
            rainTodayArr[i] =
              data.forecast.forecastday[0].hour[i].chance_of_rain;
            let rainFeatArrToday = document.querySelectorAll(".rainFaetToday");
            rainFeatArrToday[i].innerHTML = rainTodayArr[i] + "%";
            let snowTodayArr = new Array();
            snowTodayArr[i] =
              data.forecast.forecastday[0].hour[i].chance_of_snow;
            let snowRender = document.querySelectorAll(".snowFaetToday");
            snowRender[i].innerHTML = snowTodayArr[i] + "%";
          }

          let dateOne = data.forecast.forecastday[1].date;
          dayOneDate.innerHTML = dateOne;

          let dateTwo = data.forecast.forecastday[2].date;
          dayTwoDate.innerHTML = dateTwo;

          let condOne = data.forecast.forecastday[1].day.condition.text;
          conditionMulOne.innerHTML = condOne;

          let condTwo = data.forecast.forecastday[2].day.condition.text;
          conditionMulTwo.innerHTML = condTwo;

          let celMaximum = data.forecast.forecastday[1].day.maxtemp_c;
          let celMinimum = data.forecast.forecastday[1].day.mintemp_c;
          let fahMinimum = data.forecast.forecastday[1].day.mintemp_f;
          let fahMaximum = data.forecast.forecastday[1].day.maxtemp_f;

          let celMaximumT = data.forecast.forecastday[2].day.maxtemp_c;
          let celMinimumT = data.forecast.forecastday[2].day.mintemp_c;
          let fahMinimumT = data.forecast.forecastday[2].day.mintemp_f;
          let fahMaximumT = data.forecast.forecastday[2].day.maxtemp_f;

          celMinMaxOne.innerHTML =
            "Minimum : " +
            celMinimum +
            "<sup>°</sup>C" +
            "&nbsp;|&nbsp;" +
            "Maximum : " +
            celMaximum +
            "<sup>°</sup>C ";
          fahMinMaxOne.innerHTML =
            "Minimum : " +
            fahMinimum +
            "<sup>°</sup>F" +
            "&nbsp;|&nbsp;" +
            "Maximum : " +
            fahMaximum +
            "<sup>°</sup>F";
          celMinMaxTwo.innerHTML =
            "Minimum : " +
            celMinimumT +
            "<sup>°</sup>C" +
            "&nbsp;|&nbsp;" +
            "Maximum : " +
            celMaximumT +
            "<sup>°</sup>C";
          fahMinMaxTwo.innerHTML =
            "Minimum : " +
            fahMinimumT +
            "<sup>°</sup>F" +
            "&nbsp;|&nbsp;" +
            "Maximum : " +
            fahMaximumT +
            "<sup>°</sup>F";

          let willItRain =
            data.forecast.forecastday[1].day.daily_chance_of_rain;
          let willItSnow =
            data.forecast.forecastday[1].day.daily_chance_of_snow;
          let willItRainT =
            data.forecast.forecastday[2].day.daily_chance_of_rain;
          let willItSnowT =
            data.forecast.forecastday[2].day.daily_chance_of_snow;

          rainChance.innerHTML = "Daily Chance Of Rain : " + willItRain + "%";
          snowChance.innerHTML = "Daily Chance Of Snow : " + willItSnow + "%";
          rainChanceT.innerHTML =
            "Dailly Chance Of Rain : " + willItRainT + "%";
          snowChanceT.innerHTML = "Daily Chance Of Snow : " + willItSnowT + "%";

          let rainRenderMulp = document.querySelectorAll(".rainFaetNext");
          let snowRenderMulp = document.querySelectorAll(".snowRenderMulp");

          for (var i = 0; i < 24; i++) {
            let condRender = new Array();
            condRender[i] = data.forecast.forecastday[0].hour[i].condition.text;
            let condToday = document.querySelectorAll(".tempCondForeMain");
            condToday[i].innerHTML = condRender[i];
            let is_days = new Array();
            is_days[i] = data.forecast.forecastday[0].hour[i].is_day;

            let imageSrcMain = document.querySelectorAll(".letClassMain");

            if (condRender[i] == "Sunny" || condRender[i] == "Clear") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg";
              }
            } else if (condRender[i] == "Partly cloudy") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg";
              }
            } else if (condRender[i] == "Cloudy") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
              }
            } else if (condRender[i] == "Overcast") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg";
              }
            } else if (condRender[i] == "Mist") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
              }
            } else if (condRender[i] == "Patchy rain possible") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (condRender[i] == "Patchy snow possible") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (condRender[i] == "Patchy sleet possible") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
              }
            } else if (condRender[i] == "Patchy freezing drizzle possible") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (condRender[i] == "Blowing snow") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
              }
            } else if (condRender[i] == "Thundery outbreaks possible") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
              }
            } else if (condRender[i] == "Blizzard") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-hail.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-hail.svg";
              }
            } else if (condRender[i] == "Fog") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
              }
            } else if (condRender[i] == "Freezing fog") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
              }
            } else if (condRender[i] == "Patchy light drizzle") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (condRender[i] == "Light drizzle") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (condRender[i] == "Freezing drizzle") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (condRender[i] == "Heavy freezing drizzle") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (condRender[i] == "Light rain") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
              }
            } else if (condRender[i] == "Moderate rain at times") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
              }
            } else if (condRender[i] == "Moderate rain") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (condRender[i] == "Heavy rain at times") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              }
            } else if (condRender[i] == "Heavy rain") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              }
            } else if (condRender[i] == "Light freezing rain") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-night.svg";
              }
            } else if (condRender[i] == "Moderate or heavy freezing rain") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (condRender[i] == "Light sleet") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (condRender[i] == "Moderate or heavy sleet") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (condRender[i] == "Patchy light snow") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (condRender[i] == "Light snow") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
              }
            } else if (condRender[i] == "Patchy moderate snow") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
              }
            } else if (condRender[i] == "Moderate snow") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (condRender[i] == "Patchy heavy snow") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (condRender[i] == "Heavy snow") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (condRender[i] == "Ice pelletes") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (condRender[i] == "Light rain shower") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (condRender[i] == "Moderate or heavy rain shower") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-rain.svg";
              }
            } else if (condRender[i] == "Torrential rain shower") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain-rain.svg";
              }
            } else if (condRender[i] == "Light sleet showers") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-sleet.svg";
              }
            } else if (condRender[i] == "Light snow showers") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (condRender[i] == "Moderate or heavy snow showers") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (condRender[i] == "Light showers of ice pellets") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (
              condRender[i] == "Moderate or heavy showers of ice pellets"
            ) {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (condRender[i] == "Patchy light rain with thunder") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-overcast-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-overcast-rain.svg";
              }
            } else if (condRender[i] == "Patchy light rain") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
              }
            } else if (condRender[i] == "Moderate or heavy rain with thunder") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-extreme-rain.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-extreme-rain.svg";
              }
            } else if (condRender[i] == "Patchy light snow with thunder") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (condRender[i] == "Moderate or heavy snow with thunder") {
              if (is_days[i] == 1) {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                imageSrcMain[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            }
          }

          let getId = document.getElementById("getId");

          getId.addEventListener("scroll", changeDynamic);

          changeDynamic();

          function changeDynamic() {
            //  console.log(collector);

            var scrollVar = document.getElementById("toScrollForUp");
            var stickyCard = -scrollVar.getBoundingClientRect().left;
            var stickyProgCard =
              (stickyCard /
                (scrollVar.getBoundingClientRect().width -
                  document.documentElement.clientWidth)) *
                100 +
              5;

            // console.log(Math.floor(stickyProgCard));

            if (stickyProgCard > 0 && stickyProgCard < 50) {
              // disArr.style.opacity = '1';
              disArr.classList.remove("arrLeft");

              for (var i = 0; i < 24; i++) {
                var collector = document.querySelectorAll(".tempQuery");

                var tempArr = new Array();
                tempArr[i] = data.forecast.forecastday[1].hour[i].temp_c;

                var tempFahArr = new Array();
                tempFahArr[i] = data.forecast.forecastday[1].hour[i].temp_f;

                collector[i].innerHTML =
                  tempArr[i] + "°C" + " | " + tempFahArr[i] + "°F";
              }

              for (let i = 0; i < 24; i++) {
                let rainTom = new Array();
                let rainRenderMulp = document.querySelectorAll(".rainFaetNext");
                rainTom[i] =
                  data.forecast.forecastday[1].hour[i].chance_of_rain;
                rainRenderMulp[i].innerHTML = rainTom[i] + "%";

                let snowTom = new Array();
                let snowRenderMulp =
                  document.querySelectorAll(".snowRenderMulp");

                snowTom[i] =
                  data.forecast.forecastday[1].hour[i].chance_of_snow;
                snowRenderMulp[i].innerHTML = snowTom[i] + "%";
              }

              let sunRiseDec = data.forecast.forecastday[1].astro.sunrise;
              let sunSetDec = data.forecast.forecastday[1].astro.sunset;
              let moonRiseDec = data.forecast.forecastday[1].astro.moonrise;
              let moonSetDec = data.forecast.forecastday[1].astro.moonset;
              let moon_phase = data.forecast.forecastday[1].astro.moon_phase;

              sunRiseFore.innerHTML = sunRiseDec;
              sunSetFore.innerHTML = sunSetDec;
              moonRiseFore.innerHTML = moonRiseDec;
              moonSetFore.innerHTML = moonSetDec;
              moonCondFore.innerHTML = moon_phase;

              if (moon_phase == "New Moon") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-new.svg";
              } else if (moon_phase == "Waxing Crescent") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-crescent.svg";
              } else if (moon_phase == "First Quarter") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-first-quarter.svg";
              } else if (moon_phase == "Waxing Gibbous") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-gibbous.svg";
              } else if (moon_phase == "Full Moon") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-full.svg";
              } else if (moon_phase == "Waning Gibbous") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-gibbous.svg";
              } else if (moon_phase == "Last Quarter") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-last-quarter.svg";
              } else if (moon_phase == "Waning Crescent") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-crescent.svg";
              }

              var collecterText = new Array();

              collecterText[0] =
                data.forecast.forecastday[1].hour[0].condition.text;
              collecterText[1] =
                data.forecast.forecastday[1].hour[1].condition.text;
              collecterText[2] =
                data.forecast.forecastday[1].hour[2].condition.text;
              collecterText[3] =
                data.forecast.forecastday[1].hour[3].condition.text;
              collecterText[4] =
                data.forecast.forecastday[1].hour[4].condition.text;
              collecterText[5] =
                data.forecast.forecastday[1].hour[5].condition.text;
              collecterText[6] =
                data.forecast.forecastday[1].hour[6].condition.text;
              collecterText[7] =
                data.forecast.forecastday[1].hour[7].condition.text;
              collecterText[8] =
                data.forecast.forecastday[1].hour[8].condition.text;
              collecterText[9] =
                data.forecast.forecastday[1].hour[9].condition.text;
              collecterText[10] =
                data.forecast.forecastday[1].hour[10].condition.text;
              collecterText[11] =
                data.forecast.forecastday[1].hour[11].condition.text;
              collecterText[12] =
                data.forecast.forecastday[1].hour[12].condition.text;
              collecterText[13] =
                data.forecast.forecastday[1].hour[13].condition.text;
              collecterText[14] =
                data.forecast.forecastday[1].hour[14].condition.text;
              collecterText[15] =
                data.forecast.forecastday[1].hour[15].condition.text;
              collecterText[16] =
                data.forecast.forecastday[1].hour[16].condition.text;
              collecterText[17] =
                data.forecast.forecastday[1].hour[17].condition.text;
              collecterText[18] =
                data.forecast.forecastday[1].hour[18].condition.text;
              collecterText[19] =
                data.forecast.forecastday[1].hour[19].condition.text;
              collecterText[20] =
                data.forecast.forecastday[1].hour[20].condition.text;
              collecterText[21] =
                data.forecast.forecastday[1].hour[21].condition.text;
              collecterText[22] =
                data.forecast.forecastday[1].hour[22].condition.text;
              collecterText[23] =
                data.forecast.forecastday[1].hour[23].condition.text;

              console.log(collecterText);

              let collectCond = document.querySelectorAll(".tempCondFore");

              for (var i = 0; i < collecterText.length; i++) {
                collectCond[i].innerHTML = collecterText[i];
              }

              var letImageArray = document.querySelectorAll(".letClass");

              for (var i = 0; i < collecterText.length; i++) {
                let is_day = new Array();
                is_day[i] = data.forecast.forecastday[1].hour[i].is_day;

                let is_cloud = new Array();
                is_cloud[i] = data.forecast.forecastday[1].hour[i].cloud;
                let is_cloud_rend = document.querySelectorAll(".cloudtxt");

                is_cloud_rend[i].innerHTML = is_cloud[i] + "%";

                if (
                  collecterText[i] == "Sunny" ||
                  collecterText[i] == "Clear"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg";
                  }
                } else if (collecterText[i] == "Partly cloudy") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg";
                  }
                } else if (collecterText[i] == "Cloudy") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
                  }
                } else if (collecterText[i] == "Overcast") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg";
                  }
                } else if (collecterText[i] == "Mist") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
                  }
                } else if (collecterText[i] == "Patchy rain possible") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  }
                } else if (collecterText[i] == "Patchy snow possible") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (collecterText[i] == "Patchy sleet possible") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
                  }
                } else if (
                  collecterText[i] == "Patchy freezing drizzle possible"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Blowing snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
                  }
                } else if (collecterText[i] == "Thundery outbreaks possible") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
                  }
                } else if (collecterText[i] == "Blizzard") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-hail.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-hail.svg";
                  }
                } else if (collecterText[i] == "Fog") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
                  }
                } else if (collecterText[i] == "Freezing fog") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
                  }
                } else if (collecterText[i] == "Patchy light drizzle") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Light drizzle") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Freezing drizzle") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Heavy freezing drizzle") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Light rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
                  }
                } else if (collecterText[i] == "Moderate rain at times") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
                  }
                } else if (collecterText[i] == "Moderate rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  }
                } else if (collecterText[i] == "Heavy rain at times") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
                  }
                } else if (collecterText[i] == "Heavy rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
                  }
                } else if (collecterText[i] == "Light freezing rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-night.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy freezing rain"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
                  }
                } else if (collecterText[i] == "Light sleet") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
                  }
                } else if (collecterText[i] == "Moderate or heavy sleet") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
                  }
                } else if (collecterText[i] == "Patchy light snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (collecterText[i] == "Light snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
                  }
                } else if (collecterText[i] == "Patchy moderate snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
                  }
                } else if (collecterText[i] == "Moderate snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
                  }
                } else if (collecterText[i] == "Patchy heavy snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
                  }
                } else if (collecterText[i] == "Heavy snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
                  }
                } else if (collecterText[i] == "Ice pelletes") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  }
                } else if (collecterText[i] == "Light rain shower") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy rain shower"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-rain.svg";
                  }
                } else if (collecterText[i] == "Torrential rain shower") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain-rain.svg";
                  }
                } else if (collecterText[i] == "Light sleet showers") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-sleet.svg";
                  }
                } else if (collecterText[i] == "Light snow showers") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy snow showers"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (collecterText[i] == "Light showers of ice pellets") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy showers of ice pellets"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  }
                } else if (
                  collecterText[i] == "Patchy light rain with thunder"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-overcast-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-overcast-rain.svg";
                  }
                } else if (collecterText[i] == "Patchy light rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy rain with thunder"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-extreme-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-extreme-rain.svg";
                  }
                } else if (
                  collecterText[i] == "Patchy light snow with thunder"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy snow with thunder"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                }
              }
            }
            //CHANGE CONTENT
            else if (stickyProgCard > 50) {
              // disArr.style.opacity = '0';
              disArr.classList.add("arrLeft");

              for (var i = 0; i < 24; i++) {
                var collector = document.querySelectorAll(".tempQuery");

                var tempArr = new Array();
                tempArr[i] = data.forecast.forecastday[2].hour[i].temp_c;

                var tempFahArr = new Array();
                tempFahArr[i] = data.forecast.forecastday[2].hour[i].temp_f;

                collector[i].innerHTML =
                  tempArr[i] + "°C" + " | " + tempFahArr[i] + "°F";
              }

              let sunRiseDec = data.forecast.forecastday[2].astro.sunrise;
              let sunSetDec = data.forecast.forecastday[2].astro.sunset;
              let moonRiseDec = data.forecast.forecastday[2].astro.moonrise;
              let moonSetDec = data.forecast.forecastday[2].astro.moonset;
              let moon_phase = data.forecast.forecastday[2].astro.moon_phase;

              sunRiseFore.innerHTML = sunRiseDec;
              sunSetFore.innerHTML = sunSetDec;
              moonRiseFore.innerHTML = moonRiseDec;
              moonSetFore.innerHTML = moonSetDec;
              moonCondFore.innerHTML = moon_phase;

              if (moon_phase == "New Moon") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-new.svg";
              } else if (moon_phase == "Waxing Crescent") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-crescent.svg";
              } else if (moon_phase == "First Quarter") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-first-quarter.svg";
              } else if (moon_phase == "Waxing Gibbous") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-gibbous.svg";
              } else if (moon_phase == "Full Moon") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-full.svg";
              } else if (moon_phase == "Waning Gibbous") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-gibbous.svg";
              } else if (moon_phase == "Last Quarter") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-last-quarter.svg";
              } else if (moon_phase == "Waning Crescent") {
                moonDistFore.src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-crescent.svg";
              }

              for (let i = 0; i < 24; i++) {
                let rainTom = new Array();
                let rainRenderMulp = document.querySelectorAll(".rainFaetNext");
                rainTom[i] =
                  data.forecast.forecastday[2].hour[i].chance_of_rain;
                rainRenderMulp[i].innerHTML = rainTom[i] + "%";

                let snowTom = new Array();
                let snowRenderMulp =
                  document.querySelectorAll(".snowRenderMulp");

                snowTom[i] =
                  data.forecast.forecastday[2].hour[i].chance_of_snow;
                snowRenderMulp[i].innerHTML = snowTom[i] + "%";
              }

              var collecterText = new Array();

              collecterText[0] =
                data.forecast.forecastday[2].hour[0].condition.text;
              collecterText[1] =
                data.forecast.forecastday[2].hour[1].condition.text;
              collecterText[2] =
                data.forecast.forecastday[2].hour[2].condition.text;
              collecterText[3] =
                data.forecast.forecastday[2].hour[3].condition.text;
              collecterText[4] =
                data.forecast.forecastday[2].hour[4].condition.text;
              collecterText[5] =
                data.forecast.forecastday[2].hour[5].condition.text;
              collecterText[6] =
                data.forecast.forecastday[2].hour[6].condition.text;
              collecterText[7] =
                data.forecast.forecastday[2].hour[7].condition.text;
              collecterText[8] =
                data.forecast.forecastday[2].hour[8].condition.text;
              collecterText[9] =
                data.forecast.forecastday[2].hour[9].condition.text;
              collecterText[10] =
                data.forecast.forecastday[2].hour[10].condition.text;
              collecterText[11] =
                data.forecast.forecastday[2].hour[11].condition.text;
              collecterText[12] =
                data.forecast.forecastday[2].hour[12].condition.text;
              collecterText[13] =
                data.forecast.forecastday[2].hour[13].condition.text;
              collecterText[14] =
                data.forecast.forecastday[2].hour[14].condition.text;
              collecterText[15] =
                data.forecast.forecastday[2].hour[15].condition.text;
              collecterText[16] =
                data.forecast.forecastday[2].hour[16].condition.text;
              collecterText[17] =
                data.forecast.forecastday[2].hour[17].condition.text;
              collecterText[18] =
                data.forecast.forecastday[2].hour[18].condition.text;
              collecterText[19] =
                data.forecast.forecastday[2].hour[19].condition.text;
              collecterText[20] =
                data.forecast.forecastday[2].hour[20].condition.text;
              collecterText[21] =
                data.forecast.forecastday[2].hour[21].condition.text;
              collecterText[22] =
                data.forecast.forecastday[2].hour[22].condition.text;
              collecterText[23] =
                data.forecast.forecastday[2].hour[23].condition.text;

              console.log(collecterText);

              let collectCond = document.querySelectorAll(".tempCondFore");

              for (var i = 0; i < collecterText.length; i++) {
                collectCond[i].innerHTML = collecterText[i];
              }

              var letImageArray = document.querySelectorAll(".letClass");

              for (var i = 0; i < collecterText.length; i++) {
                let is_day = new Array();
                is_day[i] = data.forecast.forecastday[2].hour[i].is_day;

                let is_cloud = new Array();
                is_cloud[i] = data.forecast.forecastday[2].hour[i].cloud;
                let is_cloud_rend = document.querySelectorAll(".cloudtxt");

                is_cloud_rend[i].innerHTML = is_cloud[i] + "%";

                if (
                  collecterText[i] == "Sunny" ||
                  collecterText[i] == "Clear"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg";
                  }
                } else if (collecterText[i] == "Partly cloudy") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg";
                  }
                } else if (collecterText[i] == "Cloudy") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
                  }
                } else if (collecterText[i] == "Overcast") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg";
                  }
                } else if (collecterText[i] == "Mist") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
                  }
                } else if (collecterText[i] == "Patchy rain possible") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  }
                } else if (collecterText[i] == "Patchy snow possible") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (collecterText[i] == "Patchy sleet possible") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
                  }
                } else if (
                  collecterText[i] == "Patchy freezing drizzle possible"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Blowing snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
                  }
                } else if (collecterText[i] == "Thundery outbreaks possible") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
                  }
                } else if (collecterText[i] == "Blizzard") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-hail.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-hail.svg";
                  }
                } else if (collecterText[i] == "Fog") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
                  }
                } else if (collecterText[i] == "Freezing fog") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
                  }
                } else if (collecterText[i] == "Patchy light drizzle") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Light drizzle") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Freezing drizzle") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Heavy freezing drizzle") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
                  }
                } else if (collecterText[i] == "Light rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
                  }
                } else if (collecterText[i] == "Moderate rain at times") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-night.svg";
                  }
                } else if (collecterText[i] == "Moderate rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  }
                } else if (collecterText[i] == "Heavy rain at times") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
                  }
                } else if (collecterText[i] == "Heavy rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
                  }
                } else if (collecterText[i] == "Light freezing rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-night.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy freezing rain"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
                  }
                } else if (collecterText[i] == "Light sleet") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
                  }
                } else if (collecterText[i] == "Moderate or heavy sleet") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
                  }
                } else if (collecterText[i] == "Patchy light snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (collecterText[i] == "Light snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
                  }
                } else if (collecterText[i] == "Patchy moderate snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
                  }
                } else if (collecterText[i] == "Moderate snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
                  }
                } else if (collecterText[i] == "Patchy heavy snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
                  }
                } else if (collecterText[i] == "Heavy snow") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
                  }
                } else if (collecterText[i] == "Ice pelletes") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  }
                } else if (collecterText[i] == "Light rain shower") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy rain shower"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-rain.svg";
                  }
                } else if (collecterText[i] == "Torrential rain shower") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain-rain.svg";
                  }
                } else if (collecterText[i] == "Light sleet showers") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-sleet.svg";
                  }
                } else if (collecterText[i] == "Light snow showers") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy snow showers"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (collecterText[i] == "Light showers of ice pellets") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy showers of ice pellets"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
                  }
                } else if (
                  collecterText[i] == "Patchy light rain with thunder"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-overcast-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-overcast-rain.svg";
                  }
                } else if (collecterText[i] == "Patchy light rain") {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy rain with thunder"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-extreme-rain.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-extreme-rain.svg";
                  }
                } else if (
                  collecterText[i] == "Patchy light snow with thunder"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                } else if (
                  collecterText[i] == "Moderate or heavy snow with thunder"
                ) {
                  if (is_day[i] == 1) {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  } else {
                    letImageArray[i].src =
                      "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
                  }
                }
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          var fetchIng = document.getElementById("fetchErr");
          fetchIng.classList.add("toggleFetch");
          setFetchErr.innerHTML = "An unknown error occurred...";
        });
    }, showError);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        loader.style.display = "none";
        locError.innerHTML = "Location Permission Denied by user";
        var warn = document.getElementById("displayWarningCity");
        warn.classList.add("toggleWarn");
        break;
      case error.POSITION_UNAVAILABLE:
        loader.style.display = "none";
        locError.innerHTML = "Location information is unavailable";
        var warn = document.getElementById("displayWarningCity");
        warn.classList.add("toggleWarn");
        break;
      case error.TIMEOUT:
        loader.style.display = "none";
        locError.innerHTML = "Location Request Timeout ";
        var warn = document.getElementById("displayWarningCity");
        warn.classList.add("toggleWarn");
        break;
    }
  }
});

const btn = document.getElementById("searchCitybtn");

btn.addEventListener("click", () => {
  loader.style.display = "block";
  var inp = document.getElementById("searchCity").value;

  const apiData = `https://api.weatherapi.com/v1/forecast.json?key=272886315d4f4f6f844162320222601&q=${inp}&days=10&aqi=yes&alerts=yes`;

  fetch(apiData)
    .then((response) => {
      var showId = document.getElementById("mBody");
      if (response.status == 200) {
        showId.style.display = "block";
        loader.style.display = "none";
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      //IMAGE JSON
      //var img = data.current.condition.icon;
      //COUNTRY JSON
      var cName = data.location.country;
      var rName = data.location.region;
      var ctName = data.location.name;
      //TEMP JSON
      var tempN = data.current.temp_c;
      var fahTemp = data.current.temp_f;
      var humPer = data.current.humidity;
      var feelsFah = data.current.feelslike_f;
      var feelsCel = data.current.feelslike_c;

      var todayChanceRain =
        data.forecast.forecastday[0].day.daily_chance_of_rain;
      var todayChanceSnow =
        data.forecast.forecastday[0].day.daily_chance_of_snow;

      countryName.innerHTML = cName;
      regionName.innerHTML = rName;
      cityName.innerHTML = ctName;

      var tempN = Math.floor(tempN);
      var condition = data.current.condition.text;

      temp.innerHTML = tempN + `<sup class="celsiusUnit">°C</sup>`;
      fahText.innerHTML =
        `<text class="fahMin">Fahrenheit</text>` +
        " : " +
        fahTemp +
        `<sup class="celsiusUnit">°F</sup>`;
      humiText.innerHTML = "Humidity" + " : " + humPer + "%";
      feelsFahText.innerHTML =
        "Feels like" + " : " + feelsFah + `<sup class="celsiusUnit">°F</sup>`;
      feelsCelText.innerHTML =
        "Feels like" + " : " + feelsCel + `<sup class="celsiusUnit">°C</sup>`;
      chanceRain.innerHTML =
        `<text class="fahMin">Rain Chance</text>` +
        " : " +
        todayChanceRain +
        "%";
      chanceSnow.innerHTML =
        `<text class="fahMin">Snow Chance</text>` +
        " : " +
        todayChanceSnow +
        "%";

      windDegree = data.current.wind_degree;
      windDirection = data.current.wind_dir;
      windMiles = data.current.wind_mph;
      windSpeed = data.current.wind_kph;

      wind_d.innerHTML = "Wind direction" + " - " + windDirection;
      windD.innerHTML =
        "Wind Degree" + "&nbsp;&nbsp;&nbsp;" + " - " + windDegree;
      wind_s.innerHTML =
        "Wind speed" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        " - " +
        windSpeed +
        " " +
        "KMH";
      wind_m.innerHTML =
        "Wind speed" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        " - " +
        windMiles +
        " " +
        "MPH";

      var arraySize = data.alerts.alert;
      var lstUpdate = data.current.last_updated;

      var aqC = data.current.air_quality.co;
      var aqO = data.current.air_quality.o3;
      var no2 = data.current.air_quality.no2;
      var pm2 = data.current.air_quality.pm2_5;
      var pm10d = data.current.air_quality.pm10;
      var syn = data.current.air_quality.so2;

      aqC = Math.round(aqC);
      aqO = Math.round(aqO);
      no2 = Math.round(no2);
      pm2 = Math.round(pm2);
      pm10d = Math.round(pm10d);
      syn = Math.round(syn);

      aqCarbon.innerHTML = aqC;
      aqOxygen.innerHTML = aqO;
      aqParticleMin.innerHTML = pm2;
      aqParticleMax.innerHTML = pm10d;
      aqSulfur.innerHTML = syn;
      aqNitrogen.innerHTML = no2;

      var epa_index = data.current.air_quality["us-epa-index"];

      if (epa_index == 0) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-0.svg";
      } else if (epa_index == 1) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-1.svg";
      } else if (epa_index == 2) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-2.svg";
      } else if (epa_index == 3) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-3.svg";
      } else if (epa_index == 4) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-4.svg";
      } else if (epa_index == 5) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-5.svg";
      } else if (epa_index == 6) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-6.svg";
      } else if (epa_index == 7) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-7.svg";
      } else if (epa_index == 8) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-8.svg";
      } else if (epa_index == 9) {
        aqOfIndex.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-9.svg";
      }

      lastUpdate.innerHTML = "Last updated" + " - " + lstUpdate;

      if (arraySize.length > 0) {
        noAlert.style.display = "none";
        var alertDesc = data.alerts.alert[0].desc;
        var alertPos = data.alerts.alert[0].areas;
        let headLineFrom = data.alerts.alert[0].headline;
        warnHead.innerHTML = headLineFrom;
        let descFull = data.alerts.alert[0].desc;
        alertDescM.innerHTML = descFull;
        let alertCategory = data.alerts.alert[0].category;
        category.innerHTML = alertCategory;
        let alertEfx = data.alerts.alert[0].effective;
        alertEffective.innerHTML = alertEfx;
        let alertExp = data.alerts.alert[0].expires;
        alertExpires.innerHTML = alertExp;

        let alertNone = document.querySelectorAll(".alertHide");

        for (var i = 0; i < alertNone.length; i++) {
          alertNone[i].style.display = "block";
        }
      } else {
        warnHead.innerHTML = "";
        alertDescM.innerHTML = "";
        category.innerHTML = "";
        alertEffective.innerHTML = "";
        alertExpires.innerHTML = "";

        noAlert.style.display = "block";
        let alertNone = document.querySelectorAll(".alertHide");

        for (var i = 0; i < alertNone.length; i++) {
          alertNone[i].style.display = "none";
        }
      }

      var visInKm = data.current.vis_km;
      var visInM = data.current.vis_miles;

      visMile.innerHTML = "Visibility" + " - " + visInM + " MILES";
      visKm.innerHTML = "Visibility" + " - " + visInKm + " KM";

      //Sun info
      var sunRiseT = data.forecast.forecastday[0].astro.sunrise;
      var sunSetT = data.forecast.forecastday[0].astro.sunset;

      sunRise.innerHTML = sunRiseT;
      sunSet.innerHTML = sunSetT;

      //Moon Crescent info {

      var moonCres = data.forecast.forecastday[0].astro.moon_phase;
      var moonRiseT = data.forecast.forecastday[0].astro.moonrise;
      var moonSetT = data.forecast.forecastday[0].astro.moonset;

      var moonCond = document.getElementById("moonCond");

      moonCond.innerHTML = moonCres;
      moonRise.innerHTML = moonRiseT;
      moonSet.innerHTML = moonSetT;

      if (moonCond.innerHTML == "New Moon") {
        moonDist.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/moon-new.svg";
      } else if (moonCond.innerHTML == "Waxing Crescent") {
        moonDist.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-crescent.svg";
      } else if (moonCond.innerHTML == "First Quarter") {
        moonDist.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/moon-first-quarter.svg";
      } else if (moonCond.innerHTML == "Waxing Gibbous") {
        moonDist.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-gibbous.svg";
      } else if (moonCond.innerHTML == "Full Moon") {
        moonDist.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/moon-full.svg";
      } else if (moonCond.innerHTML == "Waning Gibbous") {
        moonDist.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-gibbous.svg";
      } else if (moonCond.innerHTML == "Last Quarter") {
        moonDist.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/moon-last-quarter.svg";
      } else if (moonCond.innerHTML == "Waning Crescent") {
        moonDist.src =
          "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-crescent.svg";
      }

      var minC = data.forecast.forecastday[1].day.mintemp_c;
      var maxC = data.forecast.forecastday[1].day.maxtemp_c;
      var minF = data.forecast.forecastday[1].day.mintemp_f;
      var maxF = data.forecast.forecastday[1].day.maxtemp_f;

      var dateSecNxt = data.forecast.forecastday[2].date;

      var minCSub = data.forecast.forecastday[2].day.mintemp_c;
      var maxCSub = data.forecast.forecastday[2].day.maxtemp_c;
      var minFSub = data.forecast.forecastday[2].day.mintemp_f;
      var maxFSub = data.forecast.forecastday[2].day.maxtemp_f;

      cond.innerHTML = condition;
      let is_day = data.current.is_day;
      if (cond.innerHTML == "Sunny" || cond.innerHTML == "Clear") {
        backWall.src = "/backgrounds/clear.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg";
        }
      } else if (cond.innerHTML == "Partly cloudy") {
        backWall.src = "/backgrounds/cloudy.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg";
        }
      } else if (cond.innerHTML == "Cloudy") {
        backWall.src = "/backgrounds/cloudy.jpg";
        if (is_day == 1) {
          ImgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
        }
      } else if (cond.innerHTML == "Overcast") {
        backWall.src = "/backgrounds/cloudy.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg";
        }
      } else if (cond.innerHTML == "Mist") {
        backWall.src = "/backgrounds/fog.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
        }
      } else if (cond.innerHTML == "Patchy rain possible") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
        }
      } else if (cond.innerHTML == "Patchy snow possible") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-snow.svg";
        }
      } else if (cond.innerHTML == "Patchy sleet possible") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
        }
      } else if (cond.innerHTML == "Patchy freezing drizzle possible") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
        }
      } else if (cond.innerHTML == "Blowing snow") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-snow.svg";
        }
      } else if (cond.innerHTML == "Thundery outbreaks possible") {
        backWall.src = "/backgrounds/thunderstorm.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night.svg ";
        }
      } else if (cond.innerHTML == "Blizzard") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-hail.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-hail.svg";
        }
      } else if (cond.innerHTML == "Fog") {
        backWall.src = "/backgrounds/fog.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
        }
      } else if (cond.innerHTML == "Freezing fog") {
        backWall.src = "/backgrounds/fog.jpg";
        if (is_day == 1) {
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog.svg";
        } else {
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog.svg";
        }
      } else if (cond.innerHTML == "Patchy light drizzle") {
        backWall.src = "/backgrounds/drizzle.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
        }
      } else if (cond.innerHTML == "Light drizzle") {
        backWall.src = "/backgrounds/drizzle.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
        }
      } else if (cond.innerHTML == "Freezing drizzle") {
        backWall.src = "/backgrounds/fog.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
        }
      } else if (cond.innerHTML == "Heavy freezing drizzle") {
        backWall.src = "/backgrounds/drizzle.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
        }
      } else if (cond.innerHTML == "Heavy freezing drizzle") {
        backWall.src = "/backgrounds/drizzle.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
        }
      } else if (cond.innerHTML == "Light rain") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
        }
      } else if (cond.innerHTML == "Moderate rain at times") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
        }
      } else if (cond.innerHTML == "Moderate rain") {
        backWall.src = "/backgrounds/rain.jpg";

        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg";
        }
      } else if (cond.innerHTML == "Heavy rain at times") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        }
      } else if (cond.innerHTML == "Heavy rain") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        }
      } else if (cond.innerHTML == "Light freezing rain") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
        }
      } else if (cond.innerHTML == "Moderate or heavy freezing rain") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Light sleet") {
        backWall.src = "/backgrounds/drizzle.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg";
        }
      } else if (cond.innerHTML == "Moderate or heavy sleet") {
        backWall.src = "/backgrounds/drizzle.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
        }
      } else if (cond.innerHTML == "Patchy light snow") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Light snow") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Patchy moderate snow") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Moderate snow") {
        backWall.src = "/backgrounds/snow.jpg";

        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Patchy heavy snow") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Heavy snow") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Ice pelletes") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
        }
      } else if (cond.innerHTML == "Light rain shower") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        }
      } else if (cond.innerHTML == "Moderate or heavy rain shower") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        }
      } else if (cond.innerHTML == "Torrential rain shower") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        }
      } else if (cond.innerHTML == "Light sleet showers") {
        backWall.src = "/backgrounds/drizzle.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
        }
      } else if (cond.innerHTML == "Moderate or heavy sleet") {
        backWall.src = "/backgrounds/drizzle.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
        }
      } else if (cond.innerHTML == "Light snow showers") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Moderate or heavy snow showers") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
        }
      } else if (cond.innerHTML == "Light showers of ice pellets") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
        }
      } else if (cond.innerHTML == "Moderate or heavy showers of ice pellets") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
        }
      } else if (cond.innerHTML == "Patchy light rain with thunder") {
        backWall.src = "/backgrounds/thunderstorm.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg";
        }
      } else if (cond.innerHTML == "Patchy light rain") {
        backWall.src = "/backgrounds/rain.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
        }
      } else if (cond.innerHTML == "Moderate or heavy rain with thunder") {
        backWall.src = "/backgrounds/thunderstorm.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg";
        }
      } else if (cond.innerHTML == "Patchy light snow with thunder") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
        }
      } else if (cond.innerHTML == "Moderate or heavy snow with thunder") {
        backWall.src = "/backgrounds/snow.jpg";
        if (is_day == 1) {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
        } else {
          imgC.src =
            "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg";
        }
      }

      for (let i = 0; i < 24; i++) {
        var foreCastd1 = new Array();
        foreCastd1[i] = data.forecast.forecastday[0].hour[i].temp_c;
        var foreCastd1Inf = new Array();
        foreCastd1Inf[i] = data.forecast.forecastday[0].hour[i].temp_f;
        let tempFahCol = document.querySelectorAll(".tempQueryMain");
        tempFahCol[i].innerHTML =
          foreCastd1[i] + "°C" + " | " + foreCastd1Inf[i] + "°F";

        let rainTodayArr = new Array();
        let rainFeatArrToday = document.querySelectorAll(".rainFaetToday");
        rainTodayArr[i] = data.forecast.forecastday[0].hour[i].chance_of_rain;
        rainFeatArrToday[i].innerHTML = rainTodayArr[i] + "%";

        let snowTodayArr = new Array();
        let snowRender = document.querySelectorAll(".snowFaetToday");
        snowTodayArr[i] = data.forecast.forecastday[0].hour[i].chance_of_snow;
        snowRender[i].innerHTML = snowTodayArr[i] + "%";

        let cloudToday = new Array();
        cloudToday[i] = data.forecast.forecastday[0].hour[i].cloud;
        let cloudTodayRend = document.querySelectorAll(".cloudtxtmain");

        cloudTodayRend[i].innerHTML = cloudToday[i] + "%";
      }

      for (var i = 0; i < 24; i++) {
        let condRender = new Array();
        condRender[i] = data.forecast.forecastday[0].hour[i].condition.text;
        let condToday = document.querySelectorAll(".tempCondForeMain");
        condToday[i].innerHTML = condRender[i];
        let is_days = new Array();
        is_days[i] = data.forecast.forecastday[0].hour[i].is_day;

        let imageSrcMain = document.querySelectorAll(".letClassMain");

        if (condRender[i] == "Sunny" || condRender[i] == "Clear") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg";
          }
        } else if (condRender[i] == "Partly cloudy") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg";
          }
        } else if (condRender[i] == "Cloudy") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
          }
        } else if (condRender[i] == "Overcast") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg";
          }
        } else if (condRender[i] == "Mist") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
          }
        } else if (condRender[i] == "Patchy rain possible") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
          }
        } else if (condRender[i] == "Patchy snow possible") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          }
        } else if (condRender[i] == "Patchy sleet possible") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
          }
        } else if (condRender[i] == "Patchy freezing drizzle possible") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          }
        } else if (condRender[i] == "Blowing snow") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
          }
        } else if (condRender[i] == "Thundery outbreaks possible") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
          }
        } else if (condRender[i] == "Blizzard") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-hail.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-hail.svg";
          }
        } else if (condRender[i] == "Fog") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
          }
        } else if (condRender[i] == "Freezing fog") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
          }
        } else if (condRender[i] == "Patchy light drizzle") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          }
        } else if (condRender[i] == "Light drizzle") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          }
        } else if (condRender[i] == "Freezing drizzle") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          }
        } else if (condRender[i] == "Heavy freezing drizzle") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
          }
        } else if (condRender[i] == "Light rain") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
          }
        } else if (condRender[i] == "Moderate rain at times") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
          }
        } else if (condRender[i] == "Moderate rain") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
          }
        } else if (condRender[i] == "Heavy rain at times") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
          }
        } else if (condRender[i] == "Heavy rain") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
          }
        } else if (condRender[i] == "Light freezing rain") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-night.svg";
          }
        } else if (condRender[i] == "Moderate or heavy freezing rain") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
          }
        } else if (condRender[i] == "Light sleet") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
          }
        } else if (condRender[i] == "Moderate or heavy sleet") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
          }
        } else if (condRender[i] == "Patchy light snow") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          }
        } else if (condRender[i] == "Light snow") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
          }
        } else if (condRender[i] == "Patchy moderate snow") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
          }
        } else if (condRender[i] == "Moderate snow") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
          }
        } else if (condRender[i] == "Patchy heavy snow") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
          }
        } else if (condRender[i] == "Heavy snow") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
          }
        } else if (condRender[i] == "Ice pelletes") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
          }
        } else if (condRender[i] == "Light rain shower") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
          }
        } else if (condRender[i] == "Moderate or heavy rain shower") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-rain.svg";
          }
        } else if (condRender[i] == "Torrential rain shower") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain-rain.svg";
          }
        } else if (condRender[i] == "Light sleet showers") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-sleet.svg";
          }
        } else if (condRender[i] == "Light snow showers") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          }
        } else if (condRender[i] == "Moderate or heavy snow showers") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          }
        } else if (condRender[i] == "Light showers of ice pellets") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
          }
        } else if (
          condRender[i] == "Moderate or heavy showers of ice pellets"
        ) {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
          }
        } else if (condRender[i] == "Patchy light rain with thunder") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-overcast-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-overcast-rain.svg";
          }
        } else if (condRender[i] == "Patchy light rain") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
          }
        } else if (condRender[i] == "Moderate or heavy rain with thunder") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-extreme-rain.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-extreme-rain.svg";
          }
        } else if (condRender[i] == "Patchy light snow with thunder") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          }
        } else if (condRender[i] == "Moderate or heavy snow with thunder") {
          if (is_days[i] == 1) {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          } else {
            imageSrcMain[i].src =
              "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
          }
        }
      }

      let dateOne = data.forecast.forecastday[1].date;
      dayOneDate.innerHTML = dateOne;

      let dateTwo = data.forecast.forecastday[2].date;
      dayTwoDate.innerHTML = dateTwo;

      let condOne = data.forecast.forecastday[1].day.condition.text;
      conditionMulOne.innerHTML = condOne;

      let condTwo = data.forecast.forecastday[2].day.condition.text;
      conditionMulTwo.innerHTML = condTwo;

      let celMaximum = data.forecast.forecastday[1].day.maxtemp_c;
      let celMinimum = data.forecast.forecastday[1].day.mintemp_c;
      let fahMinimum = data.forecast.forecastday[1].day.mintemp_f;
      let fahMaximum = data.forecast.forecastday[1].day.maxtemp_f;

      let celMaximumT = data.forecast.forecastday[2].day.maxtemp_c;
      let celMinimumT = data.forecast.forecastday[2].day.mintemp_c;
      let fahMinimumT = data.forecast.forecastday[2].day.mintemp_f;
      let fahMaximumT = data.forecast.forecastday[2].day.maxtemp_f;

      celMinMaxOne.innerHTML =
        "Minimum : " +
        celMinimum +
        "<sup>°</sup>C" +
        "&nbsp;|&nbsp;" +
        "Maximum : " +
        celMaximum +
        "<sup>°</sup>C ";
      fahMinMaxOne.innerHTML =
        "Minimum : " +
        fahMinimum +
        "<sup>°</sup>F" +
        "&nbsp;|&nbsp;" +
        "Maximum : " +
        fahMaximum +
        "<sup>°</sup>F";
      celMinMaxTwo.innerHTML =
        "Minimum : " +
        celMinimumT +
        "<sup>°</sup>C" +
        "&nbsp;|&nbsp;" +
        "Maximum : " +
        celMaximumT +
        "<sup>°</sup>C";
      fahMinMaxTwo.innerHTML =
        "Minimum : " +
        fahMinimumT +
        "<sup>°</sup>F" +
        "&nbsp;|&nbsp;" +
        "Maximum : " +
        fahMaximumT +
        "<sup>°</sup>F";

      let willItRain = data.forecast.forecastday[1].day.daily_chance_of_rain;
      let willItSnow = data.forecast.forecastday[1].day.daily_chance_of_snow;
      let willItRainT = data.forecast.forecastday[2].day.daily_chance_of_rain;
      let willItSnowT = data.forecast.forecastday[2].day.daily_chance_of_snow;

      rainChance.innerHTML = "Daily Chance Of Rain : " + willItRain + "%";
      snowChance.innerHTML = "Daily Chance Of Snow : " + willItSnow + "%";
      rainChanceT.innerHTML = "Dailly Chance Of Rain : " + willItRainT + "%";
      snowChanceT.innerHTML = "Daily Chance Of Snow : " + willItSnowT + "%";

      let getId = document.getElementById("getId");

      getId.addEventListener("scroll", changeDynamic);

      changeDynamic();

      function changeDynamic() {
        var scrollVar = document.getElementById("toScrollForUp");
        var stickyCard = -scrollVar.getBoundingClientRect().left;
        var stickyProgCard =
          (stickyCard /
            (scrollVar.getBoundingClientRect().width -
              document.documentElement.clientWidth)) *
            100 +
          5;

        if (stickyProgCard > 0 && stickyProgCard < 50) {
          disArr.classList.remove("arrLeft");

          for (var i = 0; i < 24; i++) {
            var collector = document.querySelectorAll(".tempQuery");

            var tempArr = new Array();
            tempArr[i] = data.forecast.forecastday[1].hour[i].temp_c;

            var tempFahArr = new Array();
            tempFahArr[i] = data.forecast.forecastday[1].hour[i].temp_f;

            collector[i].innerHTML =
              tempArr[i] + "°C" + " | " + tempFahArr[i] + "°F";

            let rainTom = new Array();
            let rainRenderMulp = document.querySelectorAll(".rainFaetNext");
            rainTom[i] = data.forecast.forecastday[1].hour[i].chance_of_rain;
            rainRenderMulp[i].innerHTML = rainTom[i] + "%";

            let snowTom = new Array();
            let snowRenderMulp = document.querySelectorAll(".snowRenderMulp");

            snowTom[i] = data.forecast.forecastday[1].hour[i].chance_of_snow;
            snowRenderMulp[i].innerHTML = snowTom[i] + "%";
          }

          let sunRiseDec = data.forecast.forecastday[1].astro.sunrise;
          let sunSetDec = data.forecast.forecastday[1].astro.sunset;
          let moonRiseDec = data.forecast.forecastday[1].astro.moonrise;
          let moonSetDec = data.forecast.forecastday[1].astro.moonset;
          let moon_phase = data.forecast.forecastday[1].astro.moon_phase;

          sunRiseFore.innerHTML = sunRiseDec;
          sunSetFore.innerHTML = sunSetDec;
          moonRiseFore.innerHTML = moonRiseDec;
          moonSetFore.innerHTML = moonSetDec;
          moonCondFore.innerHTML = moon_phase;

          if (moon_phase == "New Moon") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-new.svg";
          } else if (moon_phase == "Waxing Crescent") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-crescent.svg";
          } else if (moon_phase == "First Quarter") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-first-quarter.svg";
          } else if (moon_phase == "Waxing Gibbous") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-gibbous.svg";
          } else if (moon_phase == "Full Moon") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-full.svg";
          } else if (moon_phase == "Waning Gibbous") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-gibbous.svg";
          } else if (moon_phase == "Last Quarter") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-last-quarter.svg";
          } else if (moon_phase == "Waning Crescent") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-crescent.svg";
          }

          // collector[23].innerHTML = tempArr[0] + " <sup>°</sup> C" + "<br>" + tempFahArr[23] + " <sup>°</sup> F";
          var collecterText = new Array();

          collecterText[0] =
            data.forecast.forecastday[1].hour[0].condition.text;
          collecterText[1] =
            data.forecast.forecastday[1].hour[1].condition.text;
          collecterText[2] =
            data.forecast.forecastday[1].hour[2].condition.text;
          collecterText[3] =
            data.forecast.forecastday[1].hour[3].condition.text;
          collecterText[4] =
            data.forecast.forecastday[1].hour[4].condition.text;
          collecterText[5] =
            data.forecast.forecastday[1].hour[5].condition.text;
          collecterText[6] =
            data.forecast.forecastday[1].hour[6].condition.text;
          collecterText[7] =
            data.forecast.forecastday[1].hour[7].condition.text;
          collecterText[8] =
            data.forecast.forecastday[1].hour[8].condition.text;
          collecterText[9] =
            data.forecast.forecastday[1].hour[9].condition.text;
          collecterText[10] =
            data.forecast.forecastday[1].hour[10].condition.text;
          collecterText[11] =
            data.forecast.forecastday[1].hour[11].condition.text;
          collecterText[12] =
            data.forecast.forecastday[1].hour[12].condition.text;
          collecterText[13] =
            data.forecast.forecastday[1].hour[13].condition.text;
          collecterText[14] =
            data.forecast.forecastday[1].hour[14].condition.text;
          collecterText[15] =
            data.forecast.forecastday[1].hour[15].condition.text;
          collecterText[16] =
            data.forecast.forecastday[1].hour[16].condition.text;
          collecterText[17] =
            data.forecast.forecastday[1].hour[17].condition.text;
          collecterText[18] =
            data.forecast.forecastday[1].hour[18].condition.text;
          collecterText[19] =
            data.forecast.forecastday[1].hour[19].condition.text;
          collecterText[20] =
            data.forecast.forecastday[1].hour[20].condition.text;
          collecterText[21] =
            data.forecast.forecastday[1].hour[21].condition.text;
          collecterText[22] =
            data.forecast.forecastday[1].hour[22].condition.text;
          collecterText[23] =
            data.forecast.forecastday[1].hour[23].condition.text;

          let collectCond = document.querySelectorAll(".tempCondFore");

          for (var i = 0; i < collecterText.length; i++) {
            collectCond[i].innerHTML = collecterText[i];
          }

          var letImageArray = document.querySelectorAll(".letClass");

          for (var i = 0; i < collecterText.length; i++) {
            let is_day = new Array();
            is_day[i] = data.forecast.forecastday[1].hour[i].is_day;

            let is_cloud = new Array();
            is_cloud[i] = data.forecast.forecastday[1].hour[i].cloud;
            let is_cloud_rend = document.querySelectorAll(".cloudtxt");

            is_cloud_rend[i].innerHTML = is_cloud[i] + "%";
            if (collecterText[i] == "Sunny" || collecterText[i] == "Clear") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg";
              }
            } else if (collecterText[i] == "Partly cloudy") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg";
              }
            } else if (collecterText[i] == "Cloudy") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
              }
            } else if (collecterText[i] == "Overcast") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg";
              }
            } else if (collecterText[i] == "Mist") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
              }
            } else if (collecterText[i] == "Patchy rain possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (collecterText[i] == "Patchy snow possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (collecterText[i] == "Patchy sleet possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
              }
            } else if (collecterText[i] == "Patchy freezing drizzle possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Blowing snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
              }
            } else if (collecterText[i] == "Thundery outbreaks possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
              }
            } else if (collecterText[i] == "Blizzard") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-hail.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-hail.svg";
              }
            } else if (collecterText[i] == "Fog") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
              }
            } else if (collecterText[i] == "Freezing fog") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
              }
            } else if (collecterText[i] == "Patchy light drizzle") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Light drizzle") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Freezing drizzle") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Heavy freezing drizzle") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Light rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
              }
            } else if (collecterText[i] == "Moderate rain at times") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
              }
            } else if (collecterText[i] == "Moderate rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (collecterText[i] == "Heavy rain at times") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              }
            } else if (collecterText[i] == "Heavy rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              }
            } else if (collecterText[i] == "Light freezing rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-night.svg";
              }
            } else if (collecterText[i] == "Moderate or heavy freezing rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (collecterText[i] == "Light sleet") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (collecterText[i] == "Moderate or heavy sleet") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (collecterText[i] == "Patchy light snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (collecterText[i] == "Light snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
              }
            } else if (collecterText[i] == "Patchy moderate snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
              }
            } else if (collecterText[i] == "Moderate snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (collecterText[i] == "Patchy heavy snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (collecterText[i] == "Heavy snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (collecterText[i] == "Ice pelletes") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (collecterText[i] == "Light rain shower") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (collecterText[i] == "Moderate or heavy rain shower") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-rain.svg";
              }
            } else if (collecterText[i] == "Torrential rain shower") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain-rain.svg";
              }
            } else if (collecterText[i] == "Light sleet showers") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-sleet.svg";
              }
            } else if (collecterText[i] == "Light snow showers") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (collecterText[i] == "Moderate or heavy snow showers") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (collecterText[i] == "Light showers of ice pellets") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (
              collecterText[i] == "Moderate or heavy showers of ice pellets"
            ) {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (collecterText[i] == "Patchy light rain with thunder") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-overcast-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-overcast-rain.svg";
              }
            } else if (collecterText[i] == "Patchy light rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
              }
            } else if (
              collecterText[i] == "Moderate or heavy rain with thunder"
            ) {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-extreme-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-extreme-rain.svg";
              }
            } else if (collecterText[i] == "Patchy light snow with thunder") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (
              collecterText[i] == "Moderate or heavy snow with thunder"
            ) {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            }
          }
        }
        //CHANGE CONTENT
        else if (stickyProgCard > 50) {
          // disArr.style.opacity = '0';
          disArr.classList.add("arrLeft");

          for (var i = 0; i < 24; i++) {
            var collector = document.querySelectorAll(".tempQuery");

            var tempArr = new Array();
            tempArr[i] = data.forecast.forecastday[2].hour[i].temp_c;

            var tempFahArr = new Array();
            tempFahArr[i] = data.forecast.forecastday[2].hour[i].temp_f;

            collector[i].innerHTML =
              tempArr[i] + "°C" + " | " + tempFahArr[i] + "°F";
          }

          for (let i = 0; i < 24; i++) {
            let rainTom = new Array();
            let rainRenderMulp = document.querySelectorAll(".rainFaetNext");
            rainTom[i] = data.forecast.forecastday[2].hour[i].chance_of_rain;
            rainRenderMulp[i].innerHTML = rainTom[i] + "%";

            let snowTom = new Array();
            let snowRenderMulp = document.querySelectorAll(".snowRenderMulp");

            snowTom[i] = data.forecast.forecastday[2].hour[i].chance_of_snow;
            snowRenderMulp[i].innerHTML = snowTom[i] + "%";
          }

          let sunRiseDec = data.forecast.forecastday[2].astro.sunrise;
          let sunSetDec = data.forecast.forecastday[2].astro.sunset;
          let moonRiseDec = data.forecast.forecastday[2].astro.moonrise;
          let moonSetDec = data.forecast.forecastday[2].astro.moonset;
          let moon_phase = data.forecast.forecastday[2].astro.moon_phase;

          sunRiseFore.innerHTML = sunRiseDec;
          sunSetFore.innerHTML = sunSetDec;
          moonRiseFore.innerHTML = moonRiseDec;
          moonSetFore.innerHTML = moonSetDec;
          moonCondFore.innerHTML = moon_phase;

          if (moon_phase == "New Moon") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-new.svg";
          } else if (moon_phase == "Waxing Crescent") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-crescent.svg";
          } else if (moon_phase == "First Quarter") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-first-quarter.svg";
          } else if (moon_phase == "Waxing Gibbous") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-gibbous.svg";
          } else if (moon_phase == "Full Moon") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-full.svg";
          } else if (moon_phase == "Waning Gibbous") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-gibbous.svg";
          } else if (moon_phase == "Last Quarter") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-last-quarter.svg";
          } else if (moon_phase == "Waning Crescent") {
            moonDistFore.src =
              "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-crescent.svg";
          }

          // collector[23].innerHTML = tempArr[0] + " <sup>°</sup> C" + "<br>" + tempFahArr[23] + " <sup>°</sup> F";
          var collecterText = new Array();

          collecterText[0] =
            data.forecast.forecastday[2].hour[0].condition.text;
          collecterText[1] =
            data.forecast.forecastday[2].hour[1].condition.text;
          collecterText[2] =
            data.forecast.forecastday[2].hour[2].condition.text;
          collecterText[3] =
            data.forecast.forecastday[2].hour[3].condition.text;
          collecterText[4] =
            data.forecast.forecastday[2].hour[4].condition.text;
          collecterText[5] =
            data.forecast.forecastday[2].hour[5].condition.text;
          collecterText[6] =
            data.forecast.forecastday[2].hour[6].condition.text;
          collecterText[7] =
            data.forecast.forecastday[2].hour[7].condition.text;
          collecterText[8] =
            data.forecast.forecastday[2].hour[8].condition.text;
          collecterText[9] =
            data.forecast.forecastday[2].hour[9].condition.text;
          collecterText[10] =
            data.forecast.forecastday[2].hour[10].condition.text;
          collecterText[11] =
            data.forecast.forecastday[2].hour[11].condition.text;
          collecterText[12] =
            data.forecast.forecastday[2].hour[12].condition.text;
          collecterText[13] =
            data.forecast.forecastday[2].hour[13].condition.text;
          collecterText[14] =
            data.forecast.forecastday[2].hour[14].condition.text;
          collecterText[15] =
            data.forecast.forecastday[2].hour[15].condition.text;
          collecterText[16] =
            data.forecast.forecastday[2].hour[16].condition.text;
          collecterText[17] =
            data.forecast.forecastday[2].hour[17].condition.text;
          collecterText[18] =
            data.forecast.forecastday[2].hour[18].condition.text;
          collecterText[19] =
            data.forecast.forecastday[2].hour[19].condition.text;
          collecterText[20] =
            data.forecast.forecastday[2].hour[20].condition.text;
          collecterText[21] =
            data.forecast.forecastday[2].hour[21].condition.text;
          collecterText[22] =
            data.forecast.forecastday[2].hour[22].condition.text;
          collecterText[23] =
            data.forecast.forecastday[2].hour[23].condition.text;

          console.log(collecterText);

          let collectCond = document.querySelectorAll(".tempCondFore");

          for (var i = 0; i < collecterText.length; i++) {
            collectCond[i].innerHTML = collecterText[i];
          }

          var letImageArray = document.querySelectorAll(".letClass");

          for (var i = 0; i < collecterText.length; i++) {
            let is_day = new Array();
            is_day[i] = data.forecast.forecastday[2].hour[i].is_day;

            let is_cloud = new Array();
            is_cloud[i] = data.forecast.forecastday[2].hour[i].cloud;
            let is_cloud_rend = document.querySelectorAll(".cloudtxt");

            is_cloud_rend[i].innerHTML = is_cloud[i] + "%";

            if (collecterText[i] == "Sunny" || collecterText[i] == "Clear") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg";
              }
            } else if (collecterText[i] == "Partly cloudy") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg";
              }
            } else if (collecterText[i] == "Cloudy") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg";
              }
            } else if (collecterText[i] == "Overcast") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg";
              }
            } else if (collecterText[i] == "Mist") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg";
              }
            } else if (collecterText[i] == "Patchy rain possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (collecterText[i] == "Patchy snow possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (collecterText[i] == "Patchy sleet possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg";
              }
            } else if (collecterText[i] == "Patchy freezing drizzle possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Blowing snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/wind-snow.svg";
              }
            } else if (collecterText[i] == "Thundery outbreaks possible") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms.svg";
              }
            } else if (collecterText[i] == "Blizzard") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-hail.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-hail.svg";
              }
            } else if (collecterText[i] == "Fog") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
              }
            } else if (collecterText[i] == "Freezing fog") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg";
              }
            } else if (collecterText[i] == "Patchy light drizzle") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Light drizzle") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Freezing drizzle") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Heavy freezing drizzle") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/drizzle.svg";
              }
            } else if (collecterText[i] == "Light rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
              }
            } else if (collecterText[i] == "Moderate rain at times") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-night.svg";
              }
            } else if (collecterText[i] == "Moderate rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (collecterText[i] == "Heavy rain at times") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              }
            } else if (collecterText[i] == "Heavy rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain.svg";
              }
            } else if (collecterText[i] == "Light freezing rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-night.svg";
              }
            } else if (collecterText[i] == "Moderate or heavy freezing rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (collecterText[i] == "Light sleet") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (collecterText[i] == "Moderate or heavy sleet") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-sleet.svg";
              }
            } else if (collecterText[i] == "Patchy light snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (collecterText[i] == "Light snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
              }
            } else if (collecterText[i] == "Patchy moderate snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-snow.svg";
              }
            } else if (collecterText[i] == "Moderate snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (collecterText[i] == "Patchy heavy snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (collecterText[i] == "Heavy snow") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-snow.svg";
              }
            } else if (collecterText[i] == "Ice pelletes") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (collecterText[i] == "Light rain shower") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg";
              }
            } else if (collecterText[i] == "Moderate or heavy rain shower") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-night-rain.svg";
              }
            } else if (collecterText[i] == "Torrential rain shower") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/extreme-rain-rain.svg";
              }
            } else if (collecterText[i] == "Light sleet showers") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-sleet.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-sleet.svg";
              }
            } else if (collecterText[i] == "Light snow showers") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (collecterText[i] == "Moderate or heavy snow showers") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (collecterText[i] == "Light showers of ice pellets") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (
              collecterText[i] == "Moderate or heavy showers of ice pellets"
            ) {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg";
              }
            } else if (collecterText[i] == "Patchy light rain with thunder") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-overcast-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-overcast-rain.svg";
              }
            } else if (collecterText[i] == "Patchy light rain") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night-rain.svg";
              }
            } else if (
              collecterText[i] == "Moderate or heavy rain with thunder"
            ) {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day-extreme-rain.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night-extreme-rain.svg";
              }
            } else if (collecterText[i] == "Patchy light snow with thunder") {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            } else if (
              collecterText[i] == "Moderate or heavy snow with thunder"
            ) {
              if (is_day[i] == 1) {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              } else {
                letImageArray[i].src =
                  "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg";
              }
            }
          }
        }
      }
    })
    .catch((err) => {
      var fetchIng = document.getElementById("fetchErr");
      if (
        err ==
        "TypeError: Cannot read properties of undefined (reading 'country')"
      ) {
        fetchIng.classList.add("toggleFetch");
        setFetchErr.innerHTML = "City not found...";
      } else {
        console.log(err);
        fetchIng.classList.add("toggleFetch");
        setFetchErr.innerHTML = "An unknown error occurred...";
      }
    });
});

function suggestCity() {
  var inp = document.getElementById("searchCity").value;
  fetch(`https://api.api-ninjas.com/v1/city?name=${inp}&limit=30`, {
    method: "GET",
    headers: {
      "X-Api-Key": "iD+J6v11YMcxj+7ZBVgJWg==Yy92RR2H7vZ2NJuC",
    },
  })
    .then((response) => {
      //   console.log(response)

      var first = document.getElementById("firstLine");
      var seco = document.getElementById("secondLine");
      var thi = document.getElementById("thirdLine");
      var four = document.getElementById("fourLine");
      var five = document.getElementById("fiveLine");

      if (response.status == 200 || response.status == 400) {
        first.style.display = "none";
        seco.style.display = "none";
        thi.style.display = "none";
        four.style.display = "none";
        five.style.display = "none";
      } else {
        undefined;
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(data)

      var cityName = new Array();

      cityName[0] = data[0].name;
      cityName[1] = data[1].name;
      cityName[2] = data[2].name;
      cityName[3] = data[3].name;
      cityName[4] = data[4].name;

      firstCity.innerHTML = cityName[0];
      if (firstCity.innerHTML == "Ahmadabad") {
        firstCity.innerHTML = "Ahmedabad";
      }
      secondCity.innerHTML = cityName[1];
      if (secondCity.innerHTML == "Ahmadabad") {
        secondCity.innerHTML = "Ahmedabad";
      }
      thirdCity.innerHTML = cityName[2];
      fourCity.innerHTML = cityName[3];
      fiveCity.innerHTML = cityName[4];

      var field = document.getElementById("searchCity");
      firstCity.onclick = function () {
        field.value = firstCity.innerHTML;
        if (firstCity.innerHTML == "Ahmadabad") {
          field.value = "Ahmedabad";
        }
      };
      secondCity.onclick = function () {
        field.value = secondCity.innerHTML;
        if (secondCity.innerHTML == "Ahmadabad") {
          field.value = "Ahmedabad";
        }
      };
      thirdCity.onclick = function () {
        field.value = thirdCity.innerHTML;
      };

      fourCity.onclick = function () {
        field.value = fourCity.innerHTML;
      };

      fiveCity.onclick = function () {
        field.value = fiveCity.innerHTML;
      };

      var countName = new Array();
      countName[0] = data[0].country;
      countName[1] = data[1].country;
      countName[2] = data[2].country;
      countName[3] = data[3].country;
      countName[4] = data[4].country;

      firstCountry.innerHTML = countName[0];
      secondCountry.innerHTML = countName[1];
      thirdCountry.innerHTML = countName[2];
      fourCountry.innerHTML = countName[3];
      fiveCountry.innerHTML = countName[4];
    })
    .catch((err) => {
      // console.log(err)
    });
}

function displayNoneWarn() {
  var warn = document.getElementById("displayWarningCity");
  var inpField = document.getElementById("searchCity");

  warn.classList.remove("toggleWarn");
}

function enableInp() {
  var mainBox = document.getElementById("suggestionBox");
  var subBox = document.getElementById("suggestionSubBox");

  mainBox.classList.add("pointer");
  subBox.classList.add("pointer");
}

function disableInp() {
  var mainBox = document.getElementById("suggestionBox");
  var subBox = document.getElementById("suggestionSubBox");

  mainBox.classList.remove("pointer");
  subBox.classList.remove("pointer");
}

const ArrowUp = document.getElementById("arrowUp");
const rootElem = document.documentElement;

window.onscroll = function myfunc() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    ArrowUp.classList.add("navAd");
  } else {
    ArrowUp.classList.remove("navAd");
  }
};
ArrowUp.onclick = function () {
  document.body.scrollTop = 0;
  rootElem.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function rotateArr() {
  arOne.classList.toggle("arrowRotTwo");
  showFore.classList.toggle("folderShow");
}

function disableFetch() {
  fetchErr.classList.remove("toggleFetch");
}

function disableStatus() {
  statusDisplay.classList.remove("toggleNet");
}
checkInt();

function checkInt() {
  setInterval(() => {
    var checkStatus = navigator.onLine;
    var divDis = document.getElementById("statusDisplay");

    if (checkStatus == true) {
      divDis.classList.remove("toggleNet");
    } else {
      divDis.classList.add("toggleNet");
    }
  }, 3000);
}
