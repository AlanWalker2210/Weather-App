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
var visMile = document.getElementById('visM');
var visKm = document.getElementById("visKm");
var letLoad = document.getElementById("loader");

function nav() {
  barOne.classList.toggle("barOneMove");
  barTwo.classList.toggle("barTwoMove");
  barThi.classList.toggle("barThiMove");
  navBarBtn.classList.toggle("navBarBtnMove");
  showNav.classList.toggle("navBarDivMove");
}

function pClick() {
  chevRot.classList.toggle("rot");
  inforMation.classList.toggle("infoBlock");
}

window.onload = function() {
  setTimeout(() => {
    disappear.classList.add("toggle");
    content.classList.add("contentTogg");
  }, 10);
  // letLoad.style.display = 'none';
}



locBtn.addEventListener("click", () => {
  loader.style.display = 'block';

  let lon;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      console.log(lom, lat)

      const api = `https://api.weatherapi.com/v1/forecast.json?key=272886315d4f4f6f844162320222601&q=${lat},${lon}&days=14&aqi=yes&alerts=yes`;

      fetch(api)

        .then(response => {
          var showId = document.getElementById("mBody");
          if (response.status == 200) {
            showId.style.display = 'block';
            loader.style.display = 'none';
          }
          return response.json()
        })

        .then(data => {

          var cityNameInp = document.getElementById("searchCity");

          var cityNameIn = data.location.name;

          cityNameInp.value = cityNameIn;

          //Icon of current weather
          var img = data.current.condition.icon;
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
          fahText.innerHTML = "FahrenFeels" + " : " + fahTemp + `<sup class="celsiusUnit">°F</sup>`;
          humiText.innerHTML = "Humidity" + " - " + humPer + "%";
          feelsCelText.innerHTML = "Feels like" + " : " + feelsCel + `<sup class="celsiusUnit">°C</sup>`;
          feelsFahText.innerHTML = "Feels like" + " : " + feelsFah + `<sup class="celsiusUnit">°F</sup>`;
          feelsCelText.innerHTML = "Feels like" + " : " + feelsCel + `<sup class="celsiusUnit">°C</sup>`;

          temp.innerHTML = tempN + `<sup class="celsiusUnit">°C</sup>`;
          cond.innerHTML = condition;

          var conditionDayOne = data.forecast.forecastday[1].day.condition.text;
          var conditionDayTwo = data.forecast.forecastday[2].day.condition.text;
          conditionMul.innerHTML = '"' + conditionDayOne + '"';
          conditionMulSub.innerHTML = '"' + conditionDayTwo + '"';


          //Wind info 
          windDegree = data.current.wind_degree;
          windDirection = data.current.wind_dir;
          windMiles = data.current.wind_mph;
          windSpeed = data.current.wind_kph;

          wind_d.innerHTML = "Wind direction" + " - " + windDirection;
          windD.innerHTML = "Wind Degree" + "&nbsp;&nbsp;&nbsp;" + " - " + windDegree;
          wind_s.innerHTML = "Wind speed" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + windSpeed + " " + "KMH";
          wind_m.innerHTML = "Wind speed" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + windMiles + " " + "MPH";

          //Getting localHours For Day Night Icon 
          var a = new Date();
          let h = a.getHours();

          //GETTING AQ DATA 
          var aqC = data.current.air_quality.co;
          var aqO = data.current.air_quality.o3;
          var no2 = data.current.air_quality.no2;
          var pm2 = data.current.air_quality.pm2_5;
          var pm10d = data.current.air_quality.pm10;
          var syn = data.current.air_quality.so2;


          aqC = Math.floor(aqC);
          aqO = Math.floor(aqO);
          no2 = Math.floor(no2);
          pm2 = Math.floor(pm2);
          pm10d = Math.floor(pm10d);
          syn = Math.floor(syn)

          aqCarbon.innerHTML = "Carbon dioxide" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + aqC;
          aqOxygen.innerHTML = "Ozone" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + aqO;
          aqParticleMin.innerHTML = "Particle matter2.5" + "&nbsp;" + " - " + pm2;
          aqParticleMax.innerHTML = "Particle matter10" + "&nbsp;&nbsp;&nbsp;" + " - " + pm10d;
          aqSulfur.innerHTML = "Sulfur dioxide" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + syn;
          aqNitrogen.innerHTML = "Nitrogen dioxide" + "&nbsp;&nbsp;&nbsp;" + " - " + no2;


          //Day forecasts

          var minC = data.forecast.forecastday[1].day.mintemp_c;
          var maxC = data.forecast.forecastday[1].day.maxtemp_c;
          var minF = data.forecast.forecastday[1].day.mintemp_f;
          var maxF = data.forecast.forecastday[1].day.maxtemp_f;

          minTempC.innerHTML = minC + "°C" + "/";
          maxTempC.innerHTML = maxC + "°C";
          minTempF.innerHTML = minF + "°F" + "/";
          maxTempF.innerHTML = maxF + "°F";


          var minCSub = data.forecast.forecastday[2].day.mintemp_c;
          var maxCSub = data.forecast.forecastday[2].day.maxtemp_c;
          var minFSub = data.forecast.forecastday[2].day.mintemp_f;
          var maxFSub = data.forecast.forecastday[2].day.maxtemp_f;

          minTempSubC.innerHTML = minCSub + "°C" + "/";
          maxTempSubC.innerHTML = maxCSub + "°C";
          minTempSubF.innerHTML = minFSub + "°F" + "/";
          maxTempSubF.innerHTML = maxFSub + "°F";

          var dateSecNxt = data.forecast.forecastday[2].date;
          dayTwoSubDate.innerHTML = "Date" + " - " + dateSecNxt;
          var dateSec = data.forecast.forecastday[1].date;
          dayTwoDate.innerHTML = "Date" + " - " + dateSec;


          var epa_index = data.current.air_quality["us-epa-index"];

          if (epa_index == 0) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-0.svg"
          }
          else if (epa_index == 1) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-1.svg"

          }
          else if (epa_index == 2) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-2.svg"

          }
          else if (epa_index == 3) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-3.svg"

          }
          else if (epa_index == 4) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-4.svg"
          }
          else if (epa_index == 5) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-5.svg"
          }
          else if (epa_index == 6) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-6.svg"
          }
          else if (epa_index == 7) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-7.svg"
          }
          else if (epa_index == 8) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-8.svg"
          }
          else if (epa_index == 9) {
            aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-9.svg"
          }
          //Moon info
          var moonCres = data.forecast.forecastday[0].astro.moon_phase;
          var moonRiseT = data.forecast.forecastday[0].astro.moonrise;
          var moonSetT = data.forecast.forecastday[0].astro.moonset;

          moonCond.innerHTML = "Moon phase" + " - " + moonCres;
          moonRise.innerHTML = "Moon rise" + " - " + moonRiseT;
          moonSet.innerHTML = "Moon set" + " - " + moonSetT;

          if (moonCond.innerHTML == "Moon phase - New Moon") {
            moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-new.svg"

          }
          else if (moonCond.innerHTML == "Moon phase - Waxing Crescent") {
            moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-crescent.svg"
          }
          else if (moonCond.innerHTML == "Moon phase - First Quarter") {
            moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-first-quarter.svg"
          }
          else if (moonCond.innerHTML == "Moon phase - Waxing Gibbous") {
            moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-gibbous.svg"
          }
          else if (moonCond.innerHTML == "Moon phase - Full Moon") {
            moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-full.svg"
          }
          else if (moonCond.innerHTML == "Moon phase - Waning Gibbous") {
            moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-gibbous.svg"
          }
          else if (moonCond.innerHTML == "Moon phase - Last Quarter") {
            moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-last-quarter.svg"
          }
          else if (moonCond.innerHTML == "Moon phase - Waning Crescent") {
            moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-crescent.svg"
          }

          //Sun info 
          var sunRiseT = data.forecast.forecastday[0].astro.sunrise;
          var sunSetT = data.forecast.forecastday[0].astro.sunset;

          sunRise.innerHTML = "Sun rise" + " - " + sunRiseT;
          sunSet.innerHTML = "Sun set" + " - " + sunSetT;


          //Vis Info 
          var visInKm = data.current.vis_km;
          var visInM = data.current.vis_miles;

          visMile.innerHTML = "Visibility" + " - " + visInM + " MILES";
          visKm.innerHTML = "Visibility" + " - " + visInKm + " KM"

          var arraySize = data.alerts.alert;
          var lstUpdate = data.current.last_updated;

          lastUpdate.innerHTML = "Last updated" + ' - ' + lstUpdate;

          if (arraySize.length > 0) {
            var alertDesc = data.alerts.alert[0].desc;
            var alertPos = data.alerts.alert[0].areas;

            alertText.innerHTML = alertDesc;
            placeAlert.innerHTML = alertPos;
          }
          else {
            alertText.innerHTML = "No alerts in your area"
          }
          //Aq info
          var aqCo2 = data.current.air_quality.co;

          // aqCo.innerHTML = aqCo2;

          var min = data.forecast.forecastday[1].day.mintemp_c;
          var max = data.forecast.forecastday[1].day.maxtemp_c;
          var minF = data.forecast.forecastday[1].day.mintemp_f;
          var maxF = data.forecast.forecastday[1].day.maxtemp_f;

          minTempC.innerHTML = min + "°C" + "/";
          maxTempC.innerHTML = max + "°C";
          minTempF.innerHTML = minF + "°F" + "/";
          maxTempF.innerHTML = maxF + "°F";

          var is_day = data.current.is_day;

          if (cond.innerHTML == "Sunny" || cond.innerHTML == "Clear") {
            backWall.src = "/backgrounds/clear.jpg"
            if (is_day == 1) {
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg"
            }
            else {
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg"
            }
          }
          else if (cond.innerHTML == "Partly Cloudy") {
            // imgWall.src = "img/sunny.jpg"
            backWall.src = "/backgrounds/cloudy.jpg"

            if (is_day == 1) {
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg"
            }
            else {
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg"
            }
          }
          else if (cond.innerHTML == "Cloudy") {
            backWall.src = "/backgrounds/cloudy.jpg"

            if (is_day == 1) {
              ImgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg"
            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg"
            }
          }
          else if (cond.innerHTML == "Overcast") {
            backWall.src = "/backgrounds/cloudy.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg"
            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg"
            }
          }
          else if (cond.innerHTML == "Mist") {
            backWall.src = "/backgrounds/fog.jpg"

            if (is_day == 1) {
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg"
            }
            else {
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg"
              //Night icon
            }
          }
          else if (cond.innerHTML == "Patchy rain possible") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"
            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"
            }
          }
          else if (cond.innerHTML == "Patchy snow possible") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-snow.svg"
            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-snow.svg"
            }
          }
          else if (cond.innerHTML == "Patchy sleet possible") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"
            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"
            }
          }
          else if (cond.innerHTML == "Patchy freezing drizzle possible") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"
            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"
            }
          }
          else if (cond.innerHTML == "Blowing snow") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-snow.svg"
            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-snow.svg"
            }
          }
          else if (cond.innerHTML == "Thundery outbreaks possible") {
            backWall.src = "/backgrounds/thunderstorm.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day.svg"
            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night.svg "
            }
          }
          else if (cond.innerHTML == "Blizzard") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-hail.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-hail.svg"

            }
          }
          else if (cond.innerHTML == "Fog") {
            backWall.src = "/backgrounds/fog.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg"

            }
          }
          else if (cond.innerHTML == "Freezing fog") {
            backWall.src = "/backgrounds/fog.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog.svg"

            }
          }
          else if (cond.innerHTML == "Patchy light drizzle") {
            backWall.src = "/backgrounds/drizzle.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

            }
          }
          else if (cond.innerHTML == "Light drizzle") {
            backWall.src = "/backgrounds/drizzle.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

            }
          }
          else if (cond.innerHTML == "Freezing drizzle") {
            backWall.src = "/backgrounds/fog.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

            }
          }
          else if (cond.innerHTML == "Heavy freezing drizzle") {
            backWall.src = "/backgrounds/drizzle.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

            }
          }
          else if (cond.innerHTML == "Patchy light drizzle") {
            backWall.src = "/backgrounds/drizzle.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

            }
          }
          else if (cond.innerHTML == "Light rain") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

            }
          }
          else if (cond.innerHTML == "Moderate rain at times") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

            }
          }
          else if (cond.innerHTML == "Moderate rain") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

            }
          }
          else if (cond.innerHTML == "Heavy rain at times") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
          }
          else if (cond.innerHTML == "Heavy rain") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
          }
          else if (cond.innerHTML == "Light freezing rain") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

            }
          }
          else if (cond.innerHTML == "Moderate or heavy freezing rain") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Light sleet") {
            backWall.src = "/backgrounds/drizzle.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

            }
          }
          else if (cond.innerHTML == "Moderate or heavy sleet") {
            backWall.src = "/backgrounds/drizzle.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

            }
          }
          else if (cond.innerHTML == "Patchy light snow") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Light snow") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Patchy moderate snow") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Moderate snow") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Patchy heavy snow") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Heavy snow") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Ice pelletes") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg"

            }
          }
          else if (cond.innerHTML == "Light rain shower") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
          }
          else if (cond.innerHTML == "Moderate or heavy rain shower") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
          }
          else if (cond.innerHTML == "Torrential rain shower") {
            backWall.src = "/backgrounds/rain.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

            }
          }
          else if (cond.innerHTML == "Light sleet showers") {
            backWall.src = "/backgrounds/drizzle.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

            }
          }
          else if (cond.innerHTML == "Moderate or heavy sleet") {
            backWall.src = "/backgrounds/drizzle.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

            }
          }
          else if (cond.innerHTML == "Light snow showers") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Moderate or heavy snow showers") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

            }
          }
          else if (cond.innerHTML == "Light showers of ice pellets") {
            backWall.src = "/backgrounds/snow.jpg"
            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

            }
          }
          else if (cond.innerHTML == "Moderate or heavy showers of ice pellets") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

            }
          }
          else if (cond.innerHTML == "Patchy light rain with thunder") {
            backWall.src = "/backgrounds/thunderstorm.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg"

            }
          }
          else if (cond.innerHTML == "Moderate or heavy rain with thunder") {
            backWall.src = "/backgrounds/thunderstorm.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg"

            }
          }
          else if (cond.innerHTML == "Patchy light snow with thunder") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

            }
          }
          else if (cond.innerHTML == "Moderate or heavy snow with thunder") {
            backWall.src = "/backgrounds/snow.jpg"

            if (is_day == 1) {
              //Day icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

            }
            else {
              //Night icon
              imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

            }
          }
          var foreCastd1 = new Array();
          foreCastd1[0] = data.forecast.forecastday[0].hour[0].temp_c;
          foreCastd1[1] = data.forecast.forecastday[0].hour[1].temp_c;
          foreCastd1[2] = data.forecast.forecastday[0].hour[2].temp_c;
          foreCastd1[3] = data.forecast.forecastday[0].hour[3].temp_c;
          foreCastd1[4] = data.forecast.forecastday[0].hour[4].temp_c;
          foreCastd1[5] = data.forecast.forecastday[0].hour[5].temp_c;
          foreCastd1[6] = data.forecast.forecastday[0].hour[6].temp_c;
          foreCastd1[7] = data.forecast.forecastday[0].hour[7].temp_c;
          foreCastd1[8] = data.forecast.forecastday[0].hour[8].temp_c;
          foreCastd1[9] = data.forecast.forecastday[0].hour[9].temp_c;
          foreCastd1[10] = data.forecast.forecastday[0].hour[10].temp_c;
          foreCastd1[11] = data.forecast.forecastday[0].hour[11].temp_c;
          foreCastd1[12] = data.forecast.forecastday[0].hour[12].temp_c;
          foreCastd1[13] = data.forecast.forecastday[0].hour[13].temp_c;
          foreCastd1[14] = data.forecast.forecastday[0].hour[14].temp_c;
          foreCastd1[15] = data.forecast.forecastday[0].hour[15].temp_c;
          foreCastd1[16] = data.forecast.forecastday[0].hour[16].temp_c;
          foreCastd1[17] = data.forecast.forecastday[0].hour[17].temp_c;
          foreCastd1[18] = data.forecast.forecastday[0].hour[18].temp_c;
          foreCastd1[19] = data.forecast.forecastday[0].hour[19].temp_c;
          foreCastd1[20] = data.forecast.forecastday[0].hour[20].temp_c;
          foreCastd1[21] = data.forecast.forecastday[0].hour[21].temp_c;
          foreCastd1[22] = data.forecast.forecastday[0].hour[22].temp_c;
          foreCastd1[23] = data.forecast.forecastday[0].hour[23].temp_c;

          var foreCastd1Inf = new Array();
          foreCastd1Inf[0] = data.forecast.forecastday[0].hour[0].temp_f;
          foreCastd1Inf[1] = data.forecast.forecastday[0].hour[1].temp_f;
          foreCastd1Inf[2] = data.forecast.forecastday[0].hour[2].temp_f;
          foreCastd1Inf[3] = data.forecast.forecastday[0].hour[3].temp_f;
          foreCastd1Inf[4] = data.forecast.forecastday[0].hour[4].temp_f;
          foreCastd1Inf[5] = data.forecast.forecastday[0].hour[5].temp_f;
          foreCastd1Inf[6] = data.forecast.forecastday[0].hour[6].temp_f;
          foreCastd1Inf[7] = data.forecast.forecastday[0].hour[7].temp_f;
          foreCastd1Inf[8] = data.forecast.forecastday[0].hour[8].temp_f;
          foreCastd1Inf[9] = data.forecast.forecastday[0].hour[9].temp_f;
          foreCastd1Inf[10] = data.forecast.forecastday[0].hour[10].temp_f;
          foreCastd1Inf[11] = data.forecast.forecastday[0].hour[11].temp_f;
          foreCastd1Inf[12] = data.forecast.forecastday[0].hour[12].temp_f;
          foreCastd1Inf[13] = data.forecast.forecastday[0].hour[13].temp_f;
          foreCastd1Inf[14] = data.forecast.forecastday[0].hour[14].temp_f;
          foreCastd1Inf[15] = data.forecast.forecastday[0].hour[15].temp_f;
          foreCastd1Inf[16] = data.forecast.forecastday[0].hour[16].temp_f;
          foreCastd1Inf[17] = data.forecast.forecastday[0].hour[17].temp_f;
          foreCastd1Inf[18] = data.forecast.forecastday[0].hour[18].temp_f;
          foreCastd1Inf[19] = data.forecast.forecastday[0].hour[19].temp_f;
          foreCastd1Inf[20] = data.forecast.forecastday[0].hour[20].temp_f;
          foreCastd1Inf[21] = data.forecast.forecastday[0].hour[21].temp_f;
          foreCastd1Inf[22] = data.forecast.forecastday[0].hour[22].temp_f;
          foreCastd1Inf[23] = data.forecast.forecastday[0].hour[23].temp_f;

          const ctx = document.getElementById('myChart').getContext('2d');
          let myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
            '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
            '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ],
              datasets: [{
                label: `Celsius`,
                data: [
        foreCastd1[0], foreCastd1[1], foreCastd1[2], foreCastd1[3],
        foreCastd1[4], foreCastd1[5], foreCastd1[6], foreCastd1[7],
        foreCastd1[8], foreCastd1[9], foreCastd1[10], foreCastd1[11],
        foreCastd1[12], foreCastd1[13], foreCastd1[14], foreCastd1[15],
        foreCastd1[16], foreCastd1[17], foreCastd1[18], foreCastd1[19],
        foreCastd1[20], foreCastd1[21], foreCastd1[22], foreCastd1[23],
        ],


                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
                borderColor: [
                '#1394EF'
            ],
                borderWidth: 4,
                tension: 0.4,
        }, {
                label: `Fahrenheit`,
                data: [foreCastd1Inf[0], foreCastd1Inf[1], foreCastd1Inf[2], foreCastd1Inf[3],
                   foreCastd1Inf[4], foreCastd1Inf[5], foreCastd1Inf[6], foreCastd1Inf[7],
                   foreCastd1Inf[8], foreCastd1Inf[9], foreCastd1Inf[10], foreCastd1Inf[11],
                   foreCastd1Inf[12], foreCastd1Inf[13], foreCastd1Inf[14], foreCastd1Inf[15],
                   foreCastd1Inf[16], foreCastd1Inf[17], foreCastd1Inf[18], foreCastd1Inf[19],
                   foreCastd1Inf[20], foreCastd1Inf[21], foreCastd1Inf[22], foreCastd1Inf[23],
                           ],
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
                borderColor: [
                '#FC7403'
            ],
                borderWidth: 4,
                tension: 0.4,
        }]
            },

            options: {
              pointDotStrokeWidth: 5,
              dataSetStrokeWidth: 6,
              hoverRadius: 12,
              hitRadius: 12,
              respnsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }
            // myChart.destroy()
          })
          var foreCastCel = new Array();

          foreCastCel[0] = data.forecast.forecastday[1].hour[0].temp_c;
          foreCastCel[1] = data.forecast.forecastday[1].hour[1].temp_c;
          foreCastCel[2] = data.forecast.forecastday[1].hour[2].temp_c;
          foreCastCel[3] = data.forecast.forecastday[1].hour[3].temp_c;
          foreCastCel[4] = data.forecast.forecastday[1].hour[4].temp_c;
          foreCastCel[5] = data.forecast.forecastday[1].hour[5].temp_c;
          foreCastCel[6] = data.forecast.forecastday[1].hour[6].temp_c;
          foreCastCel[7] = data.forecast.forecastday[1].hour[7].temp_c;
          foreCastCel[8] = data.forecast.forecastday[1].hour[8].temp_c;
          foreCastCel[9] = data.forecast.forecastday[1].hour[9].temp_c;
          foreCastCel[10] = data.forecast.forecastday[1].hour[10].temp_c;
          foreCastCel[11] = data.forecast.forecastday[1].hour[11].temp_c;
          foreCastCel[12] = data.forecast.forecastday[1].hour[12].temp_c;
          foreCastCel[13] = data.forecast.forecastday[1].hour[13].temp_c;
          foreCastCel[14] = data.forecast.forecastday[1].hour[14].temp_c;
          foreCastCel[15] = data.forecast.forecastday[1].hour[15].temp_c;
          foreCastCel[16] = data.forecast.forecastday[1].hour[16].temp_c;
          foreCastCel[17] = data.forecast.forecastday[1].hour[17].temp_c;
          foreCastCel[18] = data.forecast.forecastday[1].hour[18].temp_c;
          foreCastCel[19] = data.forecast.forecastday[1].hour[19].temp_c;
          foreCastCel[20] = data.forecast.forecastday[1].hour[20].temp_c;
          foreCastCel[21] = data.forecast.forecastday[1].hour[21].temp_c;
          foreCastCel[22] = data.forecast.forecastday[1].hour[22].temp_c;
          foreCastCel[23] = data.forecast.forecastday[1].hour[23].temp_c;

          var foreCastFah = new Array();

          foreCastFah[0] = data.forecast.forecastday[1].hour[0].temp_f;
          foreCastFah[1] = data.forecast.forecastday[1].hour[1].temp_f;
          foreCastFah[2] = data.forecast.forecastday[1].hour[2].temp_f;
          foreCastFah[3] = data.forecast.forecastday[1].hour[3].temp_f;
          foreCastFah[4] = data.forecast.forecastday[1].hour[4].temp_f;
          foreCastFah[5] = data.forecast.forecastday[1].hour[5].temp_f;
          foreCastFah[6] = data.forecast.forecastday[1].hour[6].temp_f;
          foreCastFah[7] = data.forecast.forecastday[1].hour[7].temp_f;
          foreCastFah[8] = data.forecast.forecastday[1].hour[8].temp_f;
          foreCastFah[9] = data.forecast.forecastday[1].hour[9].temp_f;
          foreCastFah[10] = data.forecast.forecastday[1].hour[10].temp_f;
          foreCastFah[11] = data.forecast.forecastday[1].hour[11].temp_f;
          foreCastFah[12] = data.forecast.forecastday[1].hour[12].temp_f;
          foreCastFah[13] = data.forecast.forecastday[1].hour[13].temp_f;
          foreCastFah[14] = data.forecast.forecastday[1].hour[14].temp_f;
          foreCastFah[15] = data.forecast.forecastday[1].hour[15].temp_f;
          foreCastFah[16] = data.forecast.forecastday[1].hour[16].temp_f;
          foreCastFah[17] = data.forecast.forecastday[1].hour[17].temp_f;
          foreCastFah[18] = data.forecast.forecastday[1].hour[18].temp_f;
          foreCastFah[19] = data.forecast.forecastday[1].hour[19].temp_f;
          foreCastFah[20] = data.forecast.forecastday[1].hour[20].temp_f;
          foreCastFah[21] = data.forecast.forecastday[1].hour[21].temp_f;
          foreCastFah[22] = data.forecast.forecastday[1].hour[22].temp_f;
          foreCastFah[23] = data.forecast.forecastday[1].hour[23].temp_f;

          tempZero.innerHTML = foreCastCel[0] + "°C" + "<br>" + foreCastFah[0] + "°F";
          tempOne.innerHTML = foreCastCel[1] + "°C" + "<br>" + foreCastFah[1] + "°F";
          tempTwo.innerHTML = foreCastCel[2] + "°C" + "<br>" + foreCastFah[2] + "°F";
          tempThree.innerHTML = foreCastCel[3] + "°C" + "<br>" + foreCastFah[3] + "°F";
          tempFour.innerHTML = foreCastCel[4] + "°C" + "<br>" + foreCastFah[4] + "°F";
          tempFive.innerHTML = foreCastCel[5] + "°C" + "<br>" + foreCastFah[5] + "°F";
          tempSix.innerHTML = foreCastCel[6] + "°C" + "<br>" + foreCastFah[6] + "°F";
          tempSeven.innerHTML = foreCastCel[7] + "°C" + "<br>" + foreCastFah[7] + "°F";
          tempEight.innerHTML = foreCastCel[8] + "°C" + "<br>" + foreCastFah[8] + "°F";
          tempNine.innerHTML = foreCastCel[9] + "°C" + "<br>" + foreCastFah[9] + "°F";
          tempTen.innerHTML = foreCastCel[10] + "°C" + "<br>" + foreCastFah[10] + "°F";
          tempEleven.innerHTML = foreCastCel[11] + "°C" + "<br>" + foreCastFah[11] + "°F";
          tempTwelve.innerHTML = foreCastCel[12] + "°C" + "<br>" + foreCastFah[12] + "°F";
          tempThirteen.innerHTML = foreCastCel[13] + "°C" + "<br>" + foreCastFah[13] + "°F";
          tempFourteen.innerHTML = foreCastCel[14] + "°C" + "<br>" + foreCastFah[14] + "°F";
          tempFifteen.innerHTML = foreCastCel[15] + "°C" + "<br>" + foreCastFah[15] + "°F";
          tempSixteen.innerHTML = foreCastCel[16] + "°C" + "<br>" + foreCastFah[16] + "°F";
          tempSeventeen.innerHTML = foreCastCel[17] + "°C" + "<br>" + foreCastFah[17] + "°F";
          tempEighteen.innerHTML = foreCastCel[18] + "°C" + "<br>" + foreCastFah[18] + "°F";
          tempNineteen.innerHTML = foreCastCel[19] + "°C" + "<br>" + foreCastFah[19] + "°F";
          tempTwenty.innerHTML = foreCastCel[20] + "°C" + "<br>" + foreCastFah[20] + "°F";
          tempTwentyOne.innerHTML = foreCastCel[21] + "°C" + "<br>" + foreCastFah[21] + "°F";
          tempTwentyTwo.innerHTML = foreCastCel[22] + "°C" + "<br>" + foreCastFah[22] + "°F";
          tempTwentyThree.innerHTML = foreCastCel[23] + "°C" + "<br>" + foreCastFah[23] + "°F";

          var sunRised1 = data.forecast.forecastday[1].astro.sunrise;
          var sunSetd1 = data.forecast.forecastday[1].astro.sunset;
          var moonRised1 = data.forecast.forecastday[1].astro.moonrise;
          var moonSetd1 = data.forecast.forecastday[1].astro.moonset;


          sunRiseText.innerHTML = sunRised1;
          sunSetText.innerHTML = sunSetd1;
          moonRiseText.innerHTML = moonRised1;
          moonSetText.innerHTML = moonSetd1;

          var foreCastCel2 = new Array();

          foreCastCel2[0] = data.forecast.forecastday[2].hour[0].temp_c;
          foreCastCel2[1] = data.forecast.forecastday[2].hour[1].temp_c;
          foreCastCel2[2] = data.forecast.forecastday[2].hour[2].temp_c;
          foreCastCel2[3] = data.forecast.forecastday[2].hour[3].temp_c;
          foreCastCel2[4] = data.forecast.forecastday[2].hour[4].temp_c;
          foreCastCel2[5] = data.forecast.forecastday[2].hour[5].temp_c;
          foreCastCel2[6] = data.forecast.forecastday[2].hour[6].temp_c;
          foreCastCel2[7] = data.forecast.forecastday[2].hour[7].temp_c;
          foreCastCel2[8] = data.forecast.forecastday[2].hour[8].temp_c;
          foreCastCel2[9] = data.forecast.forecastday[2].hour[9].temp_c;
          foreCastCel2[10] = data.forecast.forecastday[2].hour[10].temp_c;
          foreCastCel2[11] = data.forecast.forecastday[2].hour[11].temp_c;
          foreCastCel2[12] = data.forecast.forecastday[2].hour[12].temp_c;
          foreCastCel2[13] = data.forecast.forecastday[2].hour[13].temp_c;
          foreCastCel2[14] = data.forecast.forecastday[2].hour[14].temp_c;
          foreCastCel2[15] = data.forecast.forecastday[2].hour[15].temp_c;
          foreCastCel2[16] = data.forecast.forecastday[2].hour[16].temp_c;
          foreCastCel2[17] = data.forecast.forecastday[2].hour[17].temp_c;
          foreCastCel2[18] = data.forecast.forecastday[2].hour[18].temp_c;
          foreCastCel2[19] = data.forecast.forecastday[2].hour[19].temp_c;
          foreCastCel2[20] = data.forecast.forecastday[2].hour[20].temp_c;
          foreCastCel2[21] = data.forecast.forecastday[2].hour[21].temp_c;
          foreCastCel2[22] = data.forecast.forecastday[2].hour[22].temp_c;
          foreCastCel2[23] = data.forecast.forecastday[2].hour[23].temp_c;

          var foreCastFah2 = new Array();

          foreCastFah2[0] = data.forecast.forecastday[2].hour[0].temp_f;
          foreCastFah2[1] = data.forecast.forecastday[2].hour[1].temp_f;
          foreCastFah2[2] = data.forecast.forecastday[2].hour[2].temp_f;
          foreCastFah2[3] = data.forecast.forecastday[2].hour[3].temp_f;
          foreCastFah2[4] = data.forecast.forecastday[2].hour[4].temp_f;
          foreCastFah2[5] = data.forecast.forecastday[2].hour[5].temp_f;
          foreCastFah2[6] = data.forecast.forecastday[2].hour[6].temp_f;
          foreCastFah2[7] = data.forecast.forecastday[2].hour[7].temp_f;
          foreCastFah2[8] = data.forecast.forecastday[2].hour[8].temp_f;
          foreCastFah2[9] = data.forecast.forecastday[2].hour[9].temp_f;
          foreCastFah2[10] = data.forecast.forecastday[2].hour[10].temp_f;
          foreCastFah2[11] = data.forecast.forecastday[2].hour[11].temp_f;
          foreCastFah2[12] = data.forecast.forecastday[2].hour[12].temp_f;
          foreCastFah2[13] = data.forecast.forecastday[2].hour[13].temp_f;
          foreCastFah2[14] = data.forecast.forecastday[2].hour[14].temp_f;
          foreCastFah2[15] = data.forecast.forecastday[2].hour[15].temp_f;
          foreCastFah2[16] = data.forecast.forecastday[2].hour[16].temp_f;
          foreCastFah2[17] = data.forecast.forecastday[2].hour[17].temp_f;
          foreCastFah2[18] = data.forecast.forecastday[2].hour[18].temp_f;
          foreCastFah2[19] = data.forecast.forecastday[2].hour[19].temp_f;
          foreCastFah2[20] = data.forecast.forecastday[2].hour[20].temp_f;
          foreCastFah2[21] = data.forecast.forecastday[2].hour[21].temp_f;
          foreCastFah2[22] = data.forecast.forecastday[2].hour[22].temp_f;
          foreCastFah2[23] = data.forecast.forecastday[2].hour[23].temp_f;


          tempZeroTwo.innerHTML = foreCastCel2[0] + "°C" + "<br>" + foreCastFah2[0] + "°F";
          tempOneTwo.innerHTML = foreCastCel2[1] + "°C" + "<br>" + foreCastFah2[1] + "°F";
          tempTwoTwo.innerHTML = foreCastCel2[2] + "°C" + "<br>" + foreCastFah2[2] + "°F";
          tempThreeTwo.innerHTML = foreCastCel2[3] + "°C" + "<br>" + foreCastFah2[3] + "°F";
          tempFourTwo.innerHTML = foreCastCel2[4] + "°C" + "<br>" + foreCastFah2[4] + "°F";
          tempFiveTwo.innerHTML = foreCastCel2[5] + "°C" + "<br>" + foreCastFah2[5] + "°F";
          tempSixTwo.innerHTML = foreCastCel2[6] + "°C" + "<br>" + foreCastFah2[6] + "°F";
          tempSevenTwo.innerHTML = foreCastCel2[7] + "°C" + "<br>" + foreCastFah2[7] + "°F";
          tempEightTwo.innerHTML = foreCastCel2[8] + "°C" + "<br>" + foreCastFah2[8] + "°F";
          tempNineTwo.innerHTML = foreCastCel2[9] + "°C" + "<br>" + foreCastFah2[9] + "°F";
          tempTenTwo.innerHTML = foreCastCel2[10] + "°C" + "<br>" + foreCastFah2[10] + "°F";
          tempElevenTwo.innerHTML = foreCastCel2[11] + "°C" + "<br>" + foreCastFah2[11] + "°F";
          tempTwelveTwo.innerHTML = foreCastCel2[12] + "°C" + "<br>" + foreCastFah2[12] + "°F";
          tempThirteenTwo.innerHTML = foreCastCel2[13] + "°C" + "<br>" + foreCastFah2[13] + "°F";
          tempFourteenTwo.innerHTML = foreCastCel2[14] + "°C" + "<br>" + foreCastFah2[14] + "°F";
          tempFifteenTwo.innerHTML = foreCastCel2[15] + "°C" + "<br>" + foreCastFah2[15] + "°F";
          tempSixteenTwo.innerHTML = foreCastCel2[16] + "°C" + "<br>" + foreCastFah2[16] + "°F";
          tempSeventeenTwo.innerHTML = foreCastCel2[17] + "°C" + "<br>" + foreCastFah2[17] + "°F";
          tempEighteenTwo.innerHTML = foreCastCel2[18] + "°C" + "<br>" + foreCastFah2[18] + "°F";
          tempNineteenTwo.innerHTML = foreCastCel2[19] + "°C" + "<br>" + foreCastFah2[19] + "°F";
          tempTwentyTwo.innerHTML = foreCastCel2[20] + "°C" + "<br>" + foreCastFah2[20] + "°F";
          tempTwentyOneTwo.innerHTML = foreCastCel2[21] + "°C" + "<br>" + foreCastFah2[21] + "°F";
          tempTwentyTwoTwo.innerHTML = foreCastCel2[22] + "°C" + "<br>" + foreCastFah2[22] + "°F";
          tempTwentyThreeTwo.innerHTML = foreCastCel2[23] + "°C" + "<br>" + foreCastFah2[23] + "°F";

          var sunRised2 = data.forecast.forecastday[2].astro.sunrise;
          var sunSetd2 = data.forecast.forecastday[2].astro.sunset;
          var moonRised2 = data.forecast.forecastday[2].astro.moonrise;
          var moonSetd2 = data.forecast.forecastday[2].astro.moonset;


          sunRiseTextNxt.innerHTML = sunRised2;
          sunSetTextNxt.innerHTML = sunSetd2;
          moonRiseTextNxt.innerHTML = moonRised2;
          moonSetTextNxt.innerHTML = moonSetd2
        })
        .catch(err => {
          var fetchIng = document.getElementById("fetchErr");
          fetchIng.classList.add("toggleFetch");
          setFetchErr.innerHTML = "An unknown error occurred...";
        })
    }, showError);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        loader.style.display = 'none';

        locError.innerHTML = "Location Permission Denied by user";
        var warn = document.getElementById("displayWarningCity");
        warn.classList.add("toggleWarn");
        //console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        loader.style.display = 'none';

        locError.innerHTML = "Location information is unavailable";
        var warn = document.getElementById("displayWarningCity");
        warn.classList.add("toggleWarn");
        // console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        loader.style.display = 'none';

        locError.innerHTML = "Location Request Timeout ";
        var warn = document.getElementById("displayWarningCity");
        warn.classList.add("toggleWarn");
        //console.log("The request to get user location timed out.");
        break;
        /*  case error.UNKNOWN_ERROR:
            loader.style.display = 'none';
            
            locError.innerHTML = "An unknown error occurred";
            var warn = document.getElementById("displayWarningCity");
            warn.classList.add("toggleWarn");
            //console.log("An unknown error occurred.");
            break;*/
    }
  }
})
//alert(1)
const btn = document.getElementById("searchCitybtn");

btn.addEventListener('click', () => {

  loader.style.display = 'block';

  var inp = document.getElementById("searchCity").value;

  const apiData = `https://api.weatherapi.com/v1/forecast.json?key=272886315d4f4f6f844162320222601&q=${inp}&days=10&aqi=yes&alerts=yes`;

  fetch(apiData)

    .then(response => {
      var showId = document.getElementById("mBody");
      if (response.status == 200) {
        showId.style.display = 'block';
        loader.style.display = 'none';
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
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
      
      var todayChanceRain = data.forecast.forecastday[0].day.daily_chance_of_rain;
      var todayChanceSnow = data.forecast.forecastday[0].day.daily_chance_of_snow;
      //IMAGE DISPLAY
      //imgC.src = img;

      //COUNTRY DISPLAY
      countryName.innerHTML = cName;
      regionName.innerHTML = rName;
      cityName.innerHTML = ctName;
      //TEMP DISPLAY
      var tempN = Math.floor(tempN);
      var condition = data.current.condition.text;

      temp.innerHTML = tempN + `<sup class="celsiusUnit">°C</sup>`;
      fahText.innerHTML =`<text class="fahMin">Fahrenheit</text>`+ " : " + fahTemp + `<sup class="celsiusUnit">°F</sup>`;
      humiText.innerHTML = "Humidity" + " : " + humPer + "%";
      feelsFahText.innerHTML = "Feels like" + " : " + feelsFah + `<sup class="celsiusUnit">°F</sup>`;
      feelsCelText.innerHTML = "Feels like" + " : " + feelsCel + `<sup class="celsiusUnit">°C</sup>`;
      chanceRain.innerHTML = `<text class="fahMin">Rain Chance</text>` + " : " + todayChanceRain + "%";
      chanceSnow.innerHTML = `<text class="fahMin">Snow Chance</text>` + " : " + todayChanceSnow + "%";


      cond.innerHTML = condition;

      /*    var conditionDayOne = data.forecast.forecastday[1].day.condition.text;
          var conditionDayTwo = data.forecast.forecastday[2].day.condition.text;
          conditionMul.innerHTML = '"' + conditionDayOne + '"';
          conditionMulSub.innerHTML = '"' + conditionDayTwo + '"';*/

      //Wind INFO

      windDegree = data.current.wind_degree;
      windDirection = data.current.wind_dir;
      windMiles = data.current.wind_mph;
      windSpeed = data.current.wind_kph;

      wind_d.innerHTML = "Wind direction" + " - " + windDirection;
      windD.innerHTML = "Wind Degree" + "&nbsp;&nbsp;&nbsp;" + " - " + windDegree;
      wind_s.innerHTML = "Wind speed" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + windSpeed + " " + "KMH";
      wind_m.innerHTML = "Wind speed" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + windMiles + " " + "MPH";
      //Getting Hours For Day Night Icon 
      //var a = new Date();

      //  let h = a.getHours();

      //GETTING AQ DATA 
      var arraySize = data.alerts.alert;
      var lstUpdate = data.current.last_updated;

      var aqC = data.current.air_quality.co;
      var aqO = data.current.air_quality.o3;
      var no2 = data.current.air_quality.no2;
      var pm2 = data.current.air_quality.pm2_5;
      var pm10d = data.current.air_quality.pm10;
      //var o3 = data.current.air_quality.o3;
      var syn = data.current.air_quality.so2;

      aqC = Math.floor(aqC);
      aqO = Math.floor(aqO);
      no2 = Math.floor(no2);
      pm2 = Math.floor(pm2);
      pm10d = Math.floor(pm10d);
      syn = Math.floor(syn)

      aqCarbon.innerHTML = "Carbon dioxide" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + aqC;
      aqOxygen.innerHTML = "Ozone" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + aqO;
      aqParticleMin.innerHTML = "Particle matter2.5" + "&nbsp;" + " - " + pm2;
      aqParticleMax.innerHTML = "Particle matter10" + "&nbsp;&nbsp;" + " - " + pm10d;
      aqSulfur.innerHTML = "Sulfur dioxide" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + " - " + syn;
      aqNitrogen.innerHTML = "Nitrogen dioxide" + "&nbsp;&nbsp;&nbsp;" + " - " + no2;

      var epa_index = data.current.air_quality["us-epa-index"];

      if (epa_index == 0) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-0.svg"
      }
      else if (epa_index == 1) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-1.svg"

      }
      else if (epa_index == 2) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-2.svg"

      }
      else if (epa_index == 3) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-3.svg"

      }
      else if (epa_index == 4) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-4.svg"
      }
      else if (epa_index == 5) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-5.svg"
      }
      else if (epa_index == 6) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-6.svg"
      }
      else if (epa_index == 7) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-7.svg"
      }
      else if (epa_index == 8) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-8.svg"
      }
      else if (epa_index == 9) {
        aqOfIndex.src = "/weather-icons-2.0.0/design/fill/animation-ready/wind-beaufort-9.svg"
      }

     // lastUpdate.innerHTML = "Last updated" + ' - ' + lstUpdate;

      if (arraySize.length > 0) {
        var alertDesc = data.alerts.alert[0].desc;
        var alertPos = data.alerts.alert[0].areas;
        placeAlert.innerHTML = alertPos;
        alertText.innerHTML = alertDesc;
      }
      else {
        alertText.innerHTML = "No alerts in your area"
      }
      //  aqCo.innerHTML = aqCo2;
      //VIS INFO 
      var visInKm = data.current.vis_km;
      var visInM = data.current.vis_miles;

      visMile.innerHTML = "Visibility" + " - " + visInM + " MILES";
      visKm.innerHTML = "Visibility" + " - " + visInKm + " KM"


      //Sun info 
      var sunRiseT = data.forecast.forecastday[0].astro.sunrise;
      var sunSetT = data.forecast.forecastday[0].astro.sunset;

      sunRise.innerHTML = "Sun rise" + " - " + sunRiseT;
      sunSet.innerHTML = "Sun set" + " - " + sunSetT;

      //Moon Crescent info {

      var moonCres = data.forecast.forecastday[0].astro.moon_phase;
      var moonRiseT = data.forecast.forecastday[0].astro.moonrise;
      var moonSetT = data.forecast.forecastday[0].astro.moonset;

      var moonCond = document.getElementById("moonCond");

      moonCond.innerHTML = "Moon phase" + " - " + moonCres;
      moonRise.innerHTML = "Moon rise" + " - " + moonRiseT;
      moonSet.innerHTML = "Moon set" + " - " + moonSetT;

      if (moonCond.innerHTML == "Moon phase - New Moon") {
        moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-new.svg"
      }
      else if (moonCond.innerHTML == "Moon phase - Waxing Crescent") {
        moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-crescent.svg"
      }
      else if (moonCond.innerHTML == "Moon phase - First Quarter") {
        moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-first-quarter.svg"
      }
      else if (moonCond.innerHTML == "Moon phase - Waxing Gibbous") {
        moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-waxing-gibbous.svg"
      }
      else if (moonCond.innerHTML == "Moon phase - Full Moon") {
        moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-full.svg"
      }
      else if (moonCond.innerHTML == "Moon phase - Waning Gibbous") {
        moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-gibbous.svg"
      }
      else if (moonCond.innerHTML == "Moon phase - Last Quarter") {
        moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-last-quarter.svg"
      }
      else if (moonCond.innerHTML == "Moon phase - Waning Crescent") {
        moonDist.src = "/weather-icons-2.0.0/design/fill/animation-ready/moon-waning-crescent.svg"
      }


      //DAY TWO FORECAST
      //   dayTwoDate.innerHTML = "Date" + " - " + dateSec;

      var minC = data.forecast.forecastday[1].day.mintemp_c;
      var maxC = data.forecast.forecastday[1].day.maxtemp_c;
      var minF = data.forecast.forecastday[1].day.mintemp_f;
      var maxF = data.forecast.forecastday[1].day.maxtemp_f;

      /*    minTempC.innerHTML = minC + "°C" + "/";
          maxTempC.innerHTML = maxC + "°C";
          minTempF.innerHTML = minF + "°F" + "/";
          maxTempF.innerHTML = maxF + "°F";*/


      var dateSecNxt = data.forecast.forecastday[2].date;
      //  dayTwoSubDate.innerHTML = "Date" + " - " + dateSecNxt;

      var minCSub = data.forecast.forecastday[2].day.mintemp_c;
      var maxCSub = data.forecast.forecastday[2].day.maxtemp_c;
      var minFSub = data.forecast.forecastday[2].day.mintemp_f;
      var maxFSub = data.forecast.forecastday[2].day.maxtemp_f;

      /* minTempSubC.innerHTML = minCSub + "°C" + "/";
       maxTempSubC.innerHTML = maxCSub + "°C";
       minTempSubF.innerHTML = minFSub + "°F" + "/";
       maxTempSubF.innerHTML = maxFSub + "°F";*/

      var is_day = data.current.is_day;

      //Weather icon condition
      if (cond.innerHTML == "Sunny" || cond.innerHTML == "Clear") {
        backWall.src = "/backgrounds/clear.jpg"
        if (is_day == 1) {
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/clear-day.svg"
        }
        else {
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/clear-night.svg"
        }
      }
      else if (cond.innerHTML == "Partly cloudy") {
        // imgWall.src = "img/sunny.jpg"
        backWall.src = "/backgrounds/cloudy.jpg"

        if (is_day == 1) {
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day.svg"
        }
        else {
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night.svg"
        }
      }
      else if (cond.innerHTML == "Cloudy") {
        backWall.src = "/backgrounds/cloudy.jpg"

        if (is_day == 1) {
          ImgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg"
        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/cloudy.svg"
        }
      }
      else if (cond.innerHTML == "Overcast") {
        backWall.src = "/backgrounds/cloudy.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/overcast-day.svg"
        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/overcast-night.svg"
        }
      }
      else if (cond.innerHTML == "Mist") {
        backWall.src = "/backgrounds/fog.jpg"

        if (is_day == 1) {
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg"
        }
        else {
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/mist.svg"
          //Night icon
        }
      }
      else if (cond.innerHTML == "Patchy rain possible") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"
        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"
        }
      }
      else if (cond.innerHTML == "Patchy snow possible") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-snow.svg"
        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-snow.svg"
        }
      }
      else if (cond.innerHTML == "Patchy sleet possible") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"
        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"
        }
      }
      else if (cond.innerHTML == "Patchy freezing drizzle possible") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"
        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"
        }
      }
      else if (cond.innerHTML == "Blowing snow") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-snow.svg"
        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-snow.svg"
        }
      }
      else if (cond.innerHTML == "Thundery outbreaks possible") {
        backWall.src = "/backgrounds/thunderstorm.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-day.svg"
        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-night.svg "
        }
      }
      else if (cond.innerHTML == "Blizzard") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-hail.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-hail.svg"

        }
      }
      else if (cond.innerHTML == "Fog") {
        backWall.src = "/backgrounds/fog.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog-day.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog-night.svg"

        }
      }
      else if (cond.innerHTML == "Freezing fog") {
        backWall.src = "/backgrounds/fog.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/fog.svg"

        }
      }
      else if (cond.innerHTML == "Patchy light drizzle") {
        backWall.src = "/backgrounds/drizzle.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

        }
      }
      else if (cond.innerHTML == "Light drizzle") {
        backWall.src = "/backgrounds/drizzle.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

        }
      }
      else if (cond.innerHTML == "Freezing drizzle") {
        backWall.src = "/backgrounds/fog.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

        }
      }
      else if (cond.innerHTML == "Heavy freezing drizzle") {
        backWall.src = "/backgrounds/drizzle.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

        }
      }
      else if (cond.innerHTML == "Patchy light drizzle") {
        backWall.src = "/backgrounds/drizzle.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

        }
      }
      else if (cond.innerHTML == "Light rain") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

        }
      }
      else if (cond.innerHTML == "Moderate rain at times") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

        }
      }
      else if (cond.innerHTML == "Moderate rain") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-drizzle.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-drizzle.svg"

        }
      }
      else if (cond.innerHTML == "Heavy rain at times") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
      }
      else if (cond.innerHTML == "Heavy rain") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
      }
      else if (cond.innerHTML == "Light freezing rain") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

        }
      }
      else if (cond.innerHTML == "Moderate or heavy freezing rain") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Light sleet") {
        backWall.src = "/backgrounds/drizzle.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-day-sleet.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/partly-cloudy-night-sleet.svg"

        }
      }
      else if (cond.innerHTML == "Moderate or heavy sleet") {
        backWall.src = "/backgrounds/drizzle.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

        }
      }
      else if (cond.innerHTML == "Patchy light snow") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Light snow") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Patchy moderate snow") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Moderate snow") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Patchy heavy snow") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Heavy snow") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Ice pelletes") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snowflake.svg"

        }
      }
      else if (cond.innerHTML == "Light rain shower") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
      }
      else if (cond.innerHTML == "Moderate or heavy rain shower") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
      }
      else if (cond.innerHTML == "Torrential rain shower") {
        backWall.src = "/backgrounds/rain.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/rain.svg"

        }
      }
      else if (cond.innerHTML == "Light sleet showers") {
        backWall.src = "/backgrounds/drizzle.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

        }
      }
      else if (cond.innerHTML == "Moderate or heavy sleet") {
        backWall.src = "/backgrounds/drizzle.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/sleet.svg"

        }
      }
      else if (cond.innerHTML == "Light snow showers") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Moderate or heavy snow showers") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/snow.svg"

        }
      }
      else if (cond.innerHTML == "Light showers of ice pellets") {
        backWall.src = "/backgrounds/snow.jpg"
        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

        }
      }
      else if (cond.innerHTML == "Moderate or heavy showers of ice pellets") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

        }
      }
      else if (cond.innerHTML == "Patchy light rain with thunder") {
        backWall.src = "/backgrounds/thunderstorm.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg"

        }
      }
      else if (cond.innerHTML == "Moderate or heavy rain with thunder") {
        backWall.src = "/backgrounds/thunderstorm.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-rain.svg"

        }
      }
      else if (cond.innerHTML == "Patchy light snow with thunder") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

        }
      }
      else if (cond.innerHTML == "Moderate or heavy snow with thunder") {
        backWall.src = "/backgrounds/snow.jpg"

        if (is_day == 1) {
          //Day icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"

        }
        else {
          //Night icon
          imgC.src = "/weather-icons-2.0.0/design/fill/animation-ready/thunderstorms-snow.svg"
        }
      }
   /*   var foreCastd1 = new Array();
      foreCastd1[0] = data.forecast.forecastday[0].hour[0].temp_c;
      foreCastd1[1] = data.forecast.forecastday[0].hour[1].temp_c;
      foreCastd1[2] = data.forecast.forecastday[0].hour[2].temp_c;
      foreCastd1[3] = data.forecast.forecastday[0].hour[3].temp_c;
      foreCastd1[4] = data.forecast.forecastday[0].hour[4].temp_c;
      foreCastd1[5] = data.forecast.forecastday[0].hour[5].temp_c;
      foreCastd1[6] = data.forecast.forecastday[0].hour[6].temp_c;
      foreCastd1[7] = data.forecast.forecastday[0].hour[7].temp_c;
      foreCastd1[8] = data.forecast.forecastday[0].hour[8].temp_c;
      foreCastd1[9] = data.forecast.forecastday[0].hour[9].temp_c;
      foreCastd1[10] = data.forecast.forecastday[0].hour[10].temp_c;
      foreCastd1[11] = data.forecast.forecastday[0].hour[11].temp_c;
      foreCastd1[12] = data.forecast.forecastday[0].hour[12].temp_c;
      foreCastd1[13] = data.forecast.forecastday[0].hour[13].temp_c;
      foreCastd1[14] = data.forecast.forecastday[0].hour[14].temp_c;
      foreCastd1[15] = data.forecast.forecastday[0].hour[15].temp_c;
      foreCastd1[16] = data.forecast.forecastday[0].hour[16].temp_c;
      foreCastd1[17] = data.forecast.forecastday[0].hour[17].temp_c;
      foreCastd1[18] = data.forecast.forecastday[0].hour[18].temp_c;
      foreCastd1[19] = data.forecast.forecastday[0].hour[19].temp_c;
      foreCastd1[20] = data.forecast.forecastday[0].hour[20].temp_c;
      foreCastd1[21] = data.forecast.forecastday[0].hour[21].temp_c;
      foreCastd1[22] = data.forecast.forecastday[0].hour[22].temp_c;
      foreCastd1[23] = data.forecast.forecastday[0].hour[23].temp_c;

      var foreCastd1Inf = new Array();
      foreCastd1Inf[0] = data.forecast.forecastday[0].hour[0].temp_f;
      foreCastd1Inf[1] = data.forecast.forecastday[0].hour[1].temp_f;
      foreCastd1Inf[2] = data.forecast.forecastday[0].hour[2].temp_f;
      foreCastd1Inf[3] = data.forecast.forecastday[0].hour[3].temp_f;
      foreCastd1Inf[4] = data.forecast.forecastday[0].hour[4].temp_f;
      foreCastd1Inf[5] = data.forecast.forecastday[0].hour[5].temp_f;
      foreCastd1Inf[6] = data.forecast.forecastday[0].hour[6].temp_f;
      foreCastd1Inf[7] = data.forecast.forecastday[0].hour[7].temp_f;
      foreCastd1Inf[8] = data.forecast.forecastday[0].hour[8].temp_f;
      foreCastd1Inf[9] = data.forecast.forecastday[0].hour[9].temp_f;
      foreCastd1Inf[10] = data.forecast.forecastday[0].hour[10].temp_f;
      foreCastd1Inf[11] = data.forecast.forecastday[0].hour[11].temp_f;
      foreCastd1Inf[12] = data.forecast.forecastday[0].hour[12].temp_f;
      foreCastd1Inf[13] = data.forecast.forecastday[0].hour[13].temp_f;
      foreCastd1Inf[14] = data.forecast.forecastday[0].hour[14].temp_f;
      foreCastd1Inf[15] = data.forecast.forecastday[0].hour[15].temp_f;
      foreCastd1Inf[16] = data.forecast.forecastday[0].hour[16].temp_f;
      foreCastd1Inf[17] = data.forecast.forecastday[0].hour[17].temp_f;
      foreCastd1Inf[18] = data.forecast.forecastday[0].hour[18].temp_f;
      foreCastd1Inf[19] = data.forecast.forecastday[0].hour[19].temp_f;
      foreCastd1Inf[20] = data.forecast.forecastday[0].hour[20].temp_f;
      foreCastd1Inf[21] = data.forecast.forecastday[0].hour[21].temp_f;
      foreCastd1Inf[22] = data.forecast.forecastday[0].hour[22].temp_f;
      foreCastd1Inf[23] = data.forecast.forecastday[0].hour[23].temp_f;

      // myChart.destroy();

      var ctx = document.getElementById("myChart").getContext('2d');

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
                  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
                  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
          ],
          datasets: [{
            label: `Celsius`,
            data: [
              foreCastd1[0], foreCastd1[1], foreCastd1[2], foreCastd1[3],
              foreCastd1[4], foreCastd1[5], foreCastd1[6], foreCastd1[7],
              foreCastd1[8], foreCastd1[9], foreCastd1[10], foreCastd1[11],
              foreCastd1[12], foreCastd1[13], foreCastd1[14], foreCastd1[15],
              foreCastd1[16], foreCastd1[17], foreCastd1[18], foreCastd1[19],
              foreCastd1[20], foreCastd1[21], foreCastd1[22], foreCastd1[23],
              ],


            backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                  ],
            borderColor: [
                      '#1394EF'
                  ],
            borderWidth: 4,
            tension: 0.4,
              }, {
            label: `Fahrenheit`,
            data: [foreCastd1Inf[0], foreCastd1Inf[1], foreCastd1Inf[2], foreCastd1Inf[3],
                         foreCastd1Inf[4], foreCastd1Inf[5], foreCastd1Inf[6], foreCastd1Inf[7],
                         foreCastd1Inf[8], foreCastd1Inf[9], foreCastd1Inf[10], foreCastd1Inf[11],
                         foreCastd1Inf[12], foreCastd1Inf[13], foreCastd1Inf[14], foreCastd1Inf[15],
                         foreCastd1Inf[16], foreCastd1Inf[17], foreCastd1Inf[18], foreCastd1Inf[19],
                         foreCastd1Inf[20], foreCastd1Inf[21], foreCastd1Inf[22], foreCastd1Inf[23],
                                 ],
            backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                  ],
            borderColor: [
                      '#FC7403'
                  ],
            borderWidth: 4,
            tension: 0.4,
              }]
        },

        options: {
          pointDotStrokeWidth: 5,
          dataSetStrokeWidth: 6,
          hoverRadius: 12,
          hitRadius: 12,
          respnsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })*/

      /* var foreCastCel = new Array();

       foreCastCel[0] = data.forecast.forecastday[1].hour[0].temp_c;
       foreCastCel[1] = data.forecast.forecastday[1].hour[1].temp_c;
       foreCastCel[2] = data.forecast.forecastday[1].hour[2].temp_c;
       foreCastCel[3] = data.forecast.forecastday[1].hour[3].temp_c;
       foreCastCel[4] = data.forecast.forecastday[1].hour[4].temp_c;
       foreCastCel[5] = data.forecast.forecastday[1].hour[5].temp_c;
       foreCastCel[6] = data.forecast.forecastday[1].hour[6].temp_c;
       foreCastCel[7] = data.forecast.forecastday[1].hour[7].temp_c;
       foreCastCel[8] = data.forecast.forecastday[1].hour[8].temp_c;
       foreCastCel[9] = data.forecast.forecastday[1].hour[9].temp_c;
       foreCastCel[10] = data.forecast.forecastday[1].hour[10].temp_c;
       foreCastCel[11] = data.forecast.forecastday[1].hour[11].temp_c;
       foreCastCel[12] = data.forecast.forecastday[1].hour[12].temp_c;
       foreCastCel[13] = data.forecast.forecastday[1].hour[13].temp_c;
       foreCastCel[14] = data.forecast.forecastday[1].hour[14].temp_c;
       foreCastCel[15] = data.forecast.forecastday[1].hour[15].temp_c;
       foreCastCel[16] = data.forecast.forecastday[1].hour[16].temp_c;
       foreCastCel[17] = data.forecast.forecastday[1].hour[17].temp_c;
       foreCastCel[18] = data.forecast.forecastday[1].hour[18].temp_c;
       foreCastCel[19] = data.forecast.forecastday[1].hour[19].temp_c;
       foreCastCel[20] = data.forecast.forecastday[1].hour[20].temp_c;
       foreCastCel[21] = data.forecast.forecastday[1].hour[21].temp_c;
       foreCastCel[22] = data.forecast.forecastday[1].hour[22].temp_c;
       foreCastCel[23] = data.forecast.forecastday[1].hour[23].temp_c;

       var foreCastFah = new Array();

       foreCastFah[0] = data.forecast.forecastday[1].hour[0].temp_f;
       foreCastFah[1] = data.forecast.forecastday[1].hour[1].temp_f;
       foreCastFah[2] = data.forecast.forecastday[1].hour[2].temp_f;
       foreCastFah[3] = data.forecast.forecastday[1].hour[3].temp_f;
       foreCastFah[4] = data.forecast.forecastday[1].hour[4].temp_f;
       foreCastFah[5] = data.forecast.forecastday[1].hour[5].temp_f;
       foreCastFah[6] = data.forecast.forecastday[1].hour[6].temp_f;
       foreCastFah[7] = data.forecast.forecastday[1].hour[7].temp_f;
       foreCastFah[8] = data.forecast.forecastday[1].hour[8].temp_f;
       foreCastFah[9] = data.forecast.forecastday[1].hour[9].temp_f;
       foreCastFah[10] = data.forecast.forecastday[1].hour[10].temp_f;
       foreCastFah[11] = data.forecast.forecastday[1].hour[11].temp_f;
       foreCastFah[12] = data.forecast.forecastday[1].hour[12].temp_f;
       foreCastFah[13] = data.forecast.forecastday[1].hour[13].temp_f;
       foreCastFah[14] = data.forecast.forecastday[1].hour[14].temp_f;
       foreCastFah[15] = data.forecast.forecastday[1].hour[15].temp_f;
       foreCastFah[16] = data.forecast.forecastday[1].hour[16].temp_f;
       foreCastFah[17] = data.forecast.forecastday[1].hour[17].temp_f;
       foreCastFah[18] = data.forecast.forecastday[1].hour[18].temp_f;
       foreCastFah[19] = data.forecast.forecastday[1].hour[19].temp_f;
       foreCastFah[20] = data.forecast.forecastday[1].hour[20].temp_f;
       foreCastFah[21] = data.forecast.forecastday[1].hour[21].temp_f;
       foreCastFah[22] = data.forecast.forecastday[1].hour[22].temp_f;
       foreCastFah[23] = data.forecast.forecastday[1].hour[23].temp_f;

       tempZero.innerHTML = foreCastCel[0] + "°C" + "<br>" + foreCastFah[0] + "°F";
       tempOne.innerHTML = foreCastCel[1] + "°C" + "<br>" + foreCastFah[1] + "°F";
       tempTwo.innerHTML = foreCastCel[2] + "°C" + "<br>" + foreCastFah[2] + "°F";
       tempThree.innerHTML = foreCastCel[3] + "°C" + "<br>" + foreCastFah[3] + "°F";
       tempFour.innerHTML = foreCastCel[4] + "°C" + "<br>" + foreCastFah[4] + "°F";
       tempFive.innerHTML = foreCastCel[5] + "°C" + "<br>" + foreCastFah[5] + "°F";
       tempSix.innerHTML = foreCastCel[6] + "°C" + "<br>" + foreCastFah[6] + "°F";
       tempSeven.innerHTML = foreCastCel[7] + "°C" + "<br>" + foreCastFah[7] + "°F";
       tempEight.innerHTML = foreCastCel[8] + "°C" + "<br>" + foreCastFah[8] + "°F";
       tempNine.innerHTML = foreCastCel[9] + "°C" + "<br>" + foreCastFah[9] + "°F";
       tempTen.innerHTML = foreCastCel[10] + "°C" + "<br>" + foreCastFah[10] + "°F";
       tempEleven.innerHTML = foreCastCel[11] + "°C" + "<br>" + foreCastFah[11] + "°F";
       tempTwelve.innerHTML = foreCastCel[12] + "°C" + "<br>" + foreCastFah[12] + "°F";
       tempThirteen.innerHTML = foreCastCel[13] + "°C" + "<br>" + foreCastFah[13] + "°F";
       tempFourteen.innerHTML = foreCastCel[14] + "°C" + "<br>" + foreCastFah[14] + "°F";
       tempFifteen.innerHTML = foreCastCel[15] + "°C" + "<br>" + foreCastFah[15] + "°F";
       tempSixteen.innerHTML = foreCastCel[16] + "°C" + "<br>" + foreCastFah[16] + "°F";
       tempSeventeen.innerHTML = foreCastCel[17] + "°C" + "<br>" + foreCastFah[17] + "°F";
       tempEighteen.innerHTML = foreCastCel[18] + "°C" + "<br>" + foreCastFah[18] + "°F";
       tempNineteen.innerHTML = foreCastCel[19] + "°C" + "<br>" + foreCastFah[19] + "°F";
       tempTwenty.innerHTML = foreCastCel[20] + "°C" + "<br>" + foreCastFah[20] + "°F";
       tempTwentyOne.innerHTML = foreCastCel[21] + "°C" + "<br>" + foreCastFah[21] + "°F";
       tempTwentyTwo.innerHTML = foreCastCel[22] + "°C" + "<br>" + foreCastFah[22] + "°F";
       tempTwentyThree.innerHTML = foreCastCel[23] + "°C" + "<br>" + foreCastFah[23] + "°F";

       var sunRised1 = data.forecast.forecastday[1].astro.sunrise;
       var sunSetd1 = data.forecast.forecastday[1].astro.sunset;
       var moonRised1 = data.forecast.forecastday[1].astro.moonrise;
       var moonSetd1 = data.forecast.forecastday[1].astro.moonset;


       sunRiseText.innerHTML = sunRised1;
       sunSetText.innerHTML = sunSetd1;
       moonRiseText.innerHTML = moonRised1;
       moonSetText.innerHTML = moonSetd1;

       var foreCastCel2 = new Array();

       foreCastCel2[0] = data.forecast.forecastday[2].hour[0].temp_c;
       foreCastCel2[1] = data.forecast.forecastday[2].hour[1].temp_c;
       foreCastCel2[2] = data.forecast.forecastday[2].hour[2].temp_c;
       foreCastCel2[3] = data.forecast.forecastday[2].hour[3].temp_c;
       foreCastCel2[4] = data.forecast.forecastday[2].hour[4].temp_c;
       foreCastCel2[5] = data.forecast.forecastday[2].hour[5].temp_c;
       foreCastCel2[6] = data.forecast.forecastday[2].hour[6].temp_c;
       foreCastCel2[7] = data.forecast.forecastday[2].hour[7].temp_c;
       foreCastCel2[8] = data.forecast.forecastday[2].hour[8].temp_c;
       foreCastCel2[9] = data.forecast.forecastday[2].hour[9].temp_c;
       foreCastCel2[10] = data.forecast.forecastday[2].hour[10].temp_c;
       foreCastCel2[11] = data.forecast.forecastday[2].hour[11].temp_c;
       foreCastCel2[12] = data.forecast.forecastday[2].hour[12].temp_c;
       foreCastCel2[13] = data.forecast.forecastday[2].hour[13].temp_c;
       foreCastCel2[14] = data.forecast.forecastday[2].hour[14].temp_c;
       foreCastCel2[15] = data.forecast.forecastday[2].hour[15].temp_c;
       foreCastCel2[16] = data.forecast.forecastday[2].hour[16].temp_c;
       foreCastCel2[17] = data.forecast.forecastday[2].hour[17].temp_c;
       foreCastCel2[18] = data.forecast.forecastday[2].hour[18].temp_c;
       foreCastCel2[19] = data.forecast.forecastday[2].hour[19].temp_c;
       foreCastCel2[20] = data.forecast.forecastday[2].hour[20].temp_c;
       foreCastCel2[21] = data.forecast.forecastday[2].hour[21].temp_c;
       foreCastCel2[22] = data.forecast.forecastday[2].hour[22].temp_c;
       foreCastCel2[23] = data.forecast.forecastday[2].hour[23].temp_c;

       var foreCastFah2 = new Array();

       foreCastFah2[0] = data.forecast.forecastday[2].hour[0].temp_f;
       foreCastFah2[1] = data.forecast.forecastday[2].hour[1].temp_f;
       foreCastFah2[2] = data.forecast.forecastday[2].hour[2].temp_f;
       foreCastFah2[3] = data.forecast.forecastday[2].hour[3].temp_f;
       foreCastFah2[4] = data.forecast.forecastday[2].hour[4].temp_f;
       foreCastFah2[5] = data.forecast.forecastday[2].hour[5].temp_f;
       foreCastFah2[6] = data.forecast.forecastday[2].hour[6].temp_f;
       foreCastFah2[7] = data.forecast.forecastday[2].hour[7].temp_f;
       foreCastFah2[8] = data.forecast.forecastday[2].hour[8].temp_f;
       foreCastFah2[9] = data.forecast.forecastday[2].hour[9].temp_f;
       foreCastFah2[10] = data.forecast.forecastday[2].hour[10].temp_f;
       foreCastFah2[11] = data.forecast.forecastday[2].hour[11].temp_f;
       foreCastFah2[12] = data.forecast.forecastday[2].hour[12].temp_f;
       foreCastFah2[13] = data.forecast.forecastday[2].hour[13].temp_f;
       foreCastFah2[14] = data.forecast.forecastday[2].hour[14].temp_f;
       foreCastFah2[15] = data.forecast.forecastday[2].hour[15].temp_f;
       foreCastFah2[16] = data.forecast.forecastday[2].hour[16].temp_f;
       foreCastFah2[17] = data.forecast.forecastday[2].hour[17].temp_f;
       foreCastFah2[18] = data.forecast.forecastday[2].hour[18].temp_f;
       foreCastFah2[19] = data.forecast.forecastday[2].hour[19].temp_f;
       foreCastFah2[20] = data.forecast.forecastday[2].hour[20].temp_f;
       foreCastFah2[21] = data.forecast.forecastday[2].hour[21].temp_f;
       foreCastFah2[22] = data.forecast.forecastday[2].hour[22].temp_f;
       foreCastFah2[23] = data.forecast.forecastday[2].hour[23].temp_f;


       tempZeroTwo.innerHTML = foreCastCel2[0] + "°C" + "<br>" + foreCastFah2[0] + "°F";
       tempOneTwo.innerHTML = foreCastCel2[1] + "°C" + "<br>" + foreCastFah2[1] + "°F";
       tempTwoTwo.innerHTML = foreCastCel2[2] + "°C" + "<br>" + foreCastFah2[2] + "°F";
       tempThreeTwo.innerHTML = foreCastCel2[3] + "°C" + "<br>" + foreCastFah2[3] + "°F";
       tempFourTwo.innerHTML = foreCastCel2[4] + "°C" + "<br>" + foreCastFah2[4] + "°F";
       tempFiveTwo.innerHTML = foreCastCel2[5] + "°C" + "<br>" + foreCastFah2[5] + "°F";
       tempSixTwo.innerHTML = foreCastCel2[6] + "°C" + "<br>" + foreCastFah2[6] + "°F";
       tempSevenTwo.innerHTML = foreCastCel2[7] + "°C" + "<br>" + foreCastFah2[7] + "°F";
       tempEightTwo.innerHTML = foreCastCel2[8] + "°C" + "<br>" + foreCastFah2[8] + "°F";
       tempNineTwo.innerHTML = foreCastCel2[9] + "°C" + "<br>" + foreCastFah2[9] + "°F";
       tempTenTwo.innerHTML = foreCastCel2[10] + "°C" + "<br>" + foreCastFah2[10] + "°F";
       tempElevenTwo.innerHTML = foreCastCel2[11] + "°C" + "<br>" + foreCastFah2[11] + "°F";
       tempTwelveTwo.innerHTML = foreCastCel2[12] + "°C" + "<br>" + foreCastFah2[12] + "°F";
       tempThirteenTwo.innerHTML = foreCastCel2[13] + "°C" + "<br>" + foreCastFah2[13] + "°F";
       tempFourteenTwo.innerHTML = foreCastCel2[14] + "°C" + "<br>" + foreCastFah2[14] + "°F";
       tempFifteenTwo.innerHTML = foreCastCel2[15] + "°C" + "<br>" + foreCastFah2[15] + "°F";
       tempSixteenTwo.innerHTML = foreCastCel2[16] + "°C" + "<br>" + foreCastFah2[16] + "°F";
       tempSeventeenTwo.innerHTML = foreCastCel2[17] + "°C" + "<br>" + foreCastFah2[17] + "°F";
       tempEighteenTwo.innerHTML = foreCastCel2[18] + "°C" + "<br>" + foreCastFah2[18] + "°F";
       tempNineteenTwo.innerHTML = foreCastCel2[19] + "°C" + "<br>" + foreCastFah2[19] + "°F";
       tempTwentyTwoSub.innerHTML = foreCastCel2[20] + "°C" + "<br>" + foreCastFah2[20] + "°F";
       tempTwentyOneTwo.innerHTML = foreCastCel2[21] + "°C" + "<br>" + foreCastFah2[21] + "°F";
       tempTwentyTwoTwo.innerHTML = foreCastCel2[22] + "°C" + "<br>" + foreCastFah2[22] + "°F";
       tempTwentyThreeTwo.innerHTML = foreCastCel2[23] + "°C" + "<br>" + foreCastFah2[23] + "°F";

       var sunRised2 = data.forecast.forecastday[2].astro.sunrise;
       var sunSetd2 = data.forecast.forecastday[2].astro.sunset;
       var moonRised2 = data.forecast.forecastday[2].astro.moonrise;
       var moonSetd2 = data.forecast.forecastday[2].astro.moonset;


       sunRiseTextNxt.innerHTML = sunRised2;
       sunSetTextNxt.innerHTML = sunSetd2;
       moonRiseTextNxt.innerHTML = moonRised2;
       moonSetTextNxt.innerHTML = moonSetd2;*/

       let rainFeatArrToday = document.querySelectorAll('.rainFaetToday');

       let rainTodayArr = new Array();

       rainTodayArr[00] = data.forecast.forecastday[0].hour[0].chance_of_rain;
       rainTodayArr[01] = data.forecast.forecastday[0].hour[1].chance_of_rain;
       rainTodayArr[02] = data.forecast.forecastday[0].hour[2].chance_of_rain;
       rainTodayArr[03] = data.forecast.forecastday[0].hour[3].chance_of_rain;
       rainTodayArr[04] = data.forecast.forecastday[0].hour[4].chance_of_rain;
       rainTodayArr[05] = data.forecast.forecastday[0].hour[5].chance_of_rain;
       rainTodayArr[06] = data.forecast.forecastday[0].hour[6].chance_of_rain;
       rainTodayArr[07] = data.forecast.forecastday[0].hour[7].chance_of_rain;
       rainTodayArr[08] = data.forecast.forecastday[0].hour[8].chance_of_rain;
       rainTodayArr[09] = data.forecast.forecastday[0].hour[9].chance_of_rain;
       rainTodayArr[10] = data.forecast.forecastday[0].hour[10].chance_of_rain;
       rainTodayArr[11] = data.forecast.forecastday[0].hour[11].chance_of_rain;
       rainTodayArr[12] = data.forecast.forecastday[0].hour[12].chance_of_rain;
       rainTodayArr[13] = data.forecast.forecastday[0].hour[13].chance_of_rain;
       rainTodayArr[14] = data.forecast.forecastday[0].hour[14].chance_of_rain;
       rainTodayArr[15] = data.forecast.forecastday[0].hour[15].chance_of_rain;
       rainTodayArr[16] = data.forecast.forecastday[0].hour[16].chance_of_rain;
       rainTodayArr[17] = data.forecast.forecastday[0].hour[17].chance_of_rain;
       rainTodayArr[18] = data.forecast.forecastday[0].hour[18].chance_of_rain;
       rainTodayArr[19] = data.forecast.forecastday[0].hour[19].chance_of_rain;
       rainTodayArr[20] = data.forecast.forecastday[0].hour[20].chance_of_rain;
       rainTodayArr[21] = data.forecast.forecastday[0].hour[21].chance_of_rain;
       rainTodayArr[22] = data.forecast.forecastday[0].hour[22].chance_of_rain;
       rainTodayArr[23] = data.forecast.forecastday[0].hour[23].chance_of_rain;

       rainFeatArrToday[0].innerHTML = rainTodayArr[00] + "%";
       rainFeatArrToday[1].innerHTML = rainTodayArr[01] + "%";
       rainFeatArrToday[2].innerHTML = rainTodayArr[02] + "%";
       rainFeatArrToday[3].innerHTML = rainTodayArr[03] + "%";
       rainFeatArrToday[4].innerHTML = rainTodayArr[04] + "%";
       rainFeatArrToday[5].innerHTML = rainTodayArr[05] + "%";
       rainFeatArrToday[6].innerHTML = rainTodayArr[06] + "%";
       rainFeatArrToday[7].innerHTML = rainTodayArr[07] + "%";
       rainFeatArrToday[8].innerHTML = rainTodayArr[08] + "%";
       rainFeatArrToday[9].innerHTML = rainTodayArr[09] + "%";
       rainFeatArrToday[10].innerHTML = rainTodayArr[10] + "%";
       rainFeatArrToday[11].innerHTML = rainTodayArr[11] + "%";
       rainFeatArrToday[12].innerHTML = rainTodayArr[12] + "%";
       rainFeatArrToday[13].innerHTML = rainTodayArr[13] + "%";
       rainFeatArrToday[14].innerHTML = rainTodayArr[14] + "%";
       rainFeatArrToday[15].innerHTML = rainTodayArr[15] + "%";
       rainFeatArrToday[16].innerHTML = rainTodayArr[16] + "%";
       rainFeatArrToday[17].innerHTML = rainTodayArr[17] + "%";
       rainFeatArrToday[18].innerHTML = rainTodayArr[18] + "%";
       rainFeatArrToday[19].innerHTML = rainTodayArr[19] + "%";
       rainFeatArrToday[20].innerHTML = rainTodayArr[20] + "%";
       rainFeatArrToday[21].innerHTML = rainTodayArr[21] + "%";
       rainFeatArrToday[22].innerHTML = rainTodayArr[22] + "%";
       rainFeatArrToday[23].innerHTML = rainTodayArr[23] + "%";


       let snowRender = document.querySelectorAll('.snowFaetToday');
       let snowTodayArr = new Array();

       snowTodayArr[00] = data.forecast.forecastday[0].hour[0].chance_of_snow;
       snowTodayArr[01] = data.forecast.forecastday[0].hour[1].chance_of_snow;
       snowTodayArr[02] = data.forecast.forecastday[0].hour[2].chance_of_snow;
       snowTodayArr[03] = data.forecast.forecastday[0].hour[3].chance_of_snow;
       snowTodayArr[04] = data.forecast.forecastday[0].hour[4].chance_of_snow;
       snowTodayArr[05] = data.forecast.forecastday[0].hour[5].chance_of_snow;
       snowTodayArr[06] = data.forecast.forecastday[0].hour[6].chance_of_snow;
       snowTodayArr[07] = data.forecast.forecastday[0].hour[7].chance_of_snow;
       snowTodayArr[08] = data.forecast.forecastday[0].hour[8].chance_of_snow;
       snowTodayArr[09] = data.forecast.forecastday[0].hour[9].chance_of_snow;
       snowTodayArr[10] = data.forecast.forecastday[0].hour[10].chance_of_snow;
       snowTodayArr[11] = data.forecast.forecastday[0].hour[11].chance_of_snow;
       snowTodayArr[12] = data.forecast.forecastday[0].hour[12].chance_of_snow;
       snowTodayArr[13] = data.forecast.forecastday[0].hour[13].chance_of_snow;
       snowTodayArr[14] = data.forecast.forecastday[0].hour[14].chance_of_snow;
       snowTodayArr[15] = data.forecast.forecastday[0].hour[15].chance_of_snow;
       snowTodayArr[16] = data.forecast.forecastday[0].hour[16].chance_of_snow;
       snowTodayArr[17] = data.forecast.forecastday[0].hour[17].chance_of_snow;
       snowTodayArr[18] = data.forecast.forecastday[0].hour[18].chance_of_snow;
       snowTodayArr[19] = data.forecast.forecastday[0].hour[19].chance_of_snow;
       snowTodayArr[20] = data.forecast.forecastday[0].hour[20].chance_of_snow;
       snowTodayArr[21] = data.forecast.forecastday[0].hour[21].chance_of_snow;
       snowTodayArr[22] = data.forecast.forecastday[0].hour[22].chance_of_snow;
       snowTodayArr[23] = data.forecast.forecastday[0].hour[23].chance_of_snow;
       
       snowRender[0].innerHTML = snowTodayArr[0] + "%";
       snowRender[1].innerHTML = snowTodayArr[1] + "%";
       snowRender[2].innerHTML = snowTodayArr[2] + "%";
       snowRender[3].innerHTML = snowTodayArr[3] + "%";
       snowRender[4].innerHTML = snowTodayArr[4] + "%";
       snowRender[5].innerHTML = snowTodayArr[5] + "%";
       snowRender[6].innerHTML = snowTodayArr[6] + "%";
       snowRender[7].innerHTML = snowTodayArr[7] + "%";
       snowRender[8].innerHTML = snowTodayArr[8] + "%";
       snowRender[9].innerHTML = snowTodayArr[9] + "%";
       snowRender[10].innerHTML = snowTodayArr[10] + "%";
       snowRender[11].innerHTML = snowTodayArr[11] + "%";
       snowRender[12].innerHTML = snowTodayArr[12] + "%";
       snowRender[13].innerHTML = snowTodayArr[13] + "%";
       snowRender[14].innerHTML = snowTodayArr[14] + "%";
       snowRender[15].innerHTML = snowTodayArr[15] + "%";
       snowRender[16].innerHTML = snowTodayArr[16] + "%";
       snowRender[17].innerHTML = snowTodayArr[17] + "%";
       snowRender[18].innerHTML = snowTodayArr[18] + "%";
       snowRender[19].innerHTML = snowTodayArr[19] + "%";
       snowRender[20].innerHTML = snowTodayArr[20] + "%";
       snowRender[21].innerHTML = snowTodayArr[21] + "%";
       snowRender[22].innerHTML = snowTodayArr[22] + "%";
       snowRender[23].innerHTML = snowTodayArr[23] + "%";

    /*   let rainFeatArr = document.querySelectorAll(".rainFaet");

       let rainGetArr = new Array();

       console.log(data)

       rainGetArr[00] = data.forecast.forecastday[1].hour[0].chance_of_rain;
       rainGetArr[01] = data.forecast.forecastday[1].hour[1].chance_of_rain;
       rainGetArr[02] = data.forecast.forecastday[1].hour[2].chance_of_rain;
       rainGetArr[03] = data.forecast.forecastday[1].hour[3].chance_of_rain;
       rainGetArr[04] = data.forecast.forecastday[1].hour[4].chance_of_rain;
       rainGetArr[05] = data.forecast.forecastday[1].hour[5].chance_of_rain;
       rainGetArr[06] = data.forecast.forecastday[1].hour[6].chance_of_rain;
       rainGetArr[07] = data.forecast.forecastday[1].hour[7].chance_of_rain;
       rainGetArr[08] = data.forecast.forecastday[1].hour[8].chance_of_rain;
       rainGetArr[09] = data.forecast.forecastday[1].hour[9].chance_of_rain;
       rainGetArr[10] = data.forecast.forecastday[1].hour[10].chance_of_rain;
       rainGetArr[11] = data.forecast.forecastday[1].hour[11].chance_of_rain;
       rainGetArr[12] = data.forecast.forecastday[1].hour[12].chance_of_rain;
       rainGetArr[13] = data.forecast.forecastday[1].hour[13].chance_of_rain;
       rainGetArr[14] = data.forecast.forecastday[1].hour[14].chance_of_rain;
       rainGetArr[15] = data.forecast.forecastday[1].hour[15].chance_of_rain;
       rainGetArr[16] = data.forecast.forecastday[1].hour[16].chance_of_rain;
       rainGetArr[17] = data.forecast.forecastday[1].hour[17].chance_of_rain;
       rainGetArr[18] = data.forecast.forecastday[1].hour[18].chance_of_rain;
       rainGetArr[19] = data.forecast.forecastday[1].hour[19].chance_of_rain;
       rainGetArr[20] = data.forecast.forecastday[1].hour[20].chance_of_rain;
       rainGetArr[21] = data.forecast.forecastday[1].hour[21].chance_of_rain;
       rainGetArr[22] = data.forecast.forecastday[1].hour[22].chance_of_rain;
       rainGetArr[23] = data.forecast.forecastday[1].hour[23].chance_of_rain;

       rainFeatArr[0].innerHTML = rainGetArr[00] + "%";
       rainFeatArr[1].innerHTML = rainGetArr[01] + "%";
       rainFeatArr[2].innerHTML = rainGetArr[02] + "%";
       rainFeatArr[3].innerHTML = rainGetArr[03] + "%";
       rainFeatArr[4].innerHTML = rainGetArr[04] + "%";
       rainFeatArr[5].innerHTML = rainGetArr[05] + "%";
       rainFeatArr[6].innerHTML = rainGetArr[06] + "%";
       rainFeatArr[7].innerHTML = rainGetArr[07] + "%";
       rainFeatArr[8].innerHTML = rainGetArr[08] + "%";
       rainFeatArr[9].innerHTML = rainGetArr[09] + "%";
       rainFeatArr[10].innerHTML = rainGetArr[10] + "%";
       rainFeatArr[11].innerHTML = rainGetArr[11] + "%";
       rainFeatArr[12].innerHTML = rainGetArr[12] + "%";
       rainFeatArr[13].innerHTML = rainGetArr[13] + "%";
       rainFeatArr[14].innerHTML = rainGetArr[14] + "%";
       rainFeatArr[15].innerHTML = rainGetArr[15] + "%";
       rainFeatArr[16].innerHTML = rainGetArr[16] + "%";
       rainFeatArr[17].innerHTML = rainGetArr[17] + "%";
       rainFeatArr[18].innerHTML = rainGetArr[18] + "%";
       rainFeatArr[19].innerHTML = rainGetArr[19] + "%";
       rainFeatArr[20].innerHTML = rainGetArr[20] + "%";
       rainFeatArr[21].innerHTML = rainGetArr[21] + "%";
       rainFeatArr[22].innerHTML = rainGetArr[22] + "%";
       rainFeatArr[23].innerHTML = rainGetArr[23] + "%";
       
       
       let rainNextArr = new Array();
       
       rainNextArr[00] = data.forecast.forecastday[2].hour[0].chance_of_rain;
       rainNextArr[01] = data.forecast.forecastday[2].hour[1].chance_of_rain;
       rainNextArr[02] = data.forecast.forecastday[2].hour[2].chance_of_rain;
       rainNextArr[03] = data.forecast.forecastday[2].hour[3].chance_of_rain;
       rainNextArr[04] = data.forecast.forecastday[2].hour[4].chance_of_rain;
       rainNextArr[05] = data.forecast.forecastday[2].hour[5].chance_of_rain;
       rainNextArr[06] = data.forecast.forecastday[2].hour[6].chance_of_rain;
       rainNextArr[07] = data.forecast.forecastday[2].hour[7].chance_of_rain;
       rainNextArr[08] = data.forecast.forecastday[2].hour[8].chance_of_rain;
       rainNextArr[09] = data.forecast.forecastday[2].hour[9].chance_of_rain;
       rainNextArr[10] = data.forecast.forecastday[2].hour[10].chance_of_rain;
       rainNextArr[11] = data.forecast.forecastday[2].hour[11].chance_of_rain;
       rainNextArr[12] = data.forecast.forecastday[2].hour[12].chance_of_rain;
       rainNextArr[13] = data.forecast.forecastday[2].hour[13].chance_of_rain;
       rainNextArr[14] = data.forecast.forecastday[2].hour[14].chance_of_rain;
       rainNextArr[15] = data.forecast.forecastday[2].hour[15].chance_of_rain;
       rainNextArr[16] = data.forecast.forecastday[2].hour[16].chance_of_rain;
       rainNextArr[17] = data.forecast.forecastday[2].hour[17].chance_of_rain;
       rainNextArr[18] = data.forecast.forecastday[2].hour[18].chance_of_rain;
       rainNextArr[19] = data.forecast.forecastday[2].hour[19].chance_of_rain;
       rainNextArr[20] = data.forecast.forecastday[2].hour[20].chance_of_rain;
       rainNextArr[21] = data.forecast.forecastday[2].hour[21].chance_of_rain;
       rainNextArr[22] = data.forecast.forecastday[2].hour[22].chance_of_rain;
       rainNextArr[23] = data.forecast.forecastday[2].hour[23].chance_of_rain;
       
       let rainNextDay = document.querySelectorAll('.rainFaetNext');
       
       rainNextDay[0].innerHTML = rainNextArr[00] + "%";
       rainNextDay[1].innerHTML = rainNextArr[01] + "%";
       rainNextDay[2].innerHTML = rainNextArr[02] + "%";
       rainNextDay[3].innerHTML = rainNextArr[03] + "%";
       rainNextDay[4].innerHTML = rainNextArr[04] + "%";
       rainNextDay[5].innerHTML = rainNextArr[05] + "%";
       rainNextDay[6].innerHTML = rainNextArr[06] + "%";
       rainNextDay[7].innerHTML = rainNextArr[07] + "%";
       rainNextDay[8].innerHTML = rainNextArr[08] + "%";
       rainNextDay[9].innerHTML = rainNextArr[09] + "%";
       rainNextDay[10].innerHTML = rainNextArr[10] + "%";
       rainNextDay[11].innerHTML = rainNextArr[11] + "%";
       rainNextDay[12].innerHTML = rainNextArr[12] + "%";
       rainNextDay[13].innerHTML = rainNextArr[13] + "%";
       rainNextDay[14].innerHTML = rainNextArr[14] + "%";
       rainNextDay[15].innerHTML = rainNextArr[15] + "%";
       rainNextDay[16].innerHTML = rainNextArr[16] + "%";
       rainNextDay[17].innerHTML = rainNextArr[17] + "%";
       rainNextDay[18].innerHTML = rainNextArr[18] + "%";
       rainNextDay[19].innerHTML = rainNextArr[19] + "%";
       rainNextDay[20].innerHTML = rainNextArr[20] + "%";
       rainNextDay[21].innerHTML = rainNextArr[21] + "%";
       rainNextDay[22].innerHTML = rainNextArr[22] + "%";
       rainNextDay[23].innerHTML = rainNextArr[23] + "%";
       */
      let dateOne = data.forecast.forecastday[1].date;
      dayOneDate.innerHTML = dateOne;

      let dateTwo = data.forecast.forecastday[2].date;
      dayTwoDate.innerHTML = dateTwo;

      let condOne = data.forecast.forecastday[1].day.condition.text;
      conditionMulOne.innerHTML = condOne;

      let condTwo = data.forecast.forecastday[2].day.condition.text;
      conditionMulTwo.innerHTML = condTwo;

      let celMaximum = data.forecast.forecastday[1].day.mintemp_c;
      let celMinimum = data.forecast.forecastday[1].day.maxtemp_c;
      let fahMinimum = data.forecast.forecastday[1].day.mintemp_f;
      let fahMaximum = data.forecast.forecastday[1].day.maxtemp_f;

      let celMaximumT = data.forecast.forecastday[2].day.mintemp_c;
      let celMinimumT = data.forecast.forecastday[2].day.maxtemp_c;
      let fahMinimumT = data.forecast.forecastday[2].day.mintemp_f;
      let fahMaximumT = data.forecast.forecastday[2].day.maxtemp_f;

      celMinMaxOne.innerHTML = "Minimum : " + celMinimum + "<sup>°</sup>C" + "&nbsp;|&nbsp;" + "Maximum : " + celMaximum + '<sup>°</sup>C ';
      fahMinMaxOne.innerHTML = "Minimum : " + fahMinimum + "<sup>°</sup>F" + "&nbsp;|&nbsp;" + "Maximum : " + fahMaximum + "<sup>°</sup>F";
      celMinMaxTwo.innerHTML = "Minimum : " + celMinimumT + "<sup>°</sup>C" + "&nbsp;|&nbsp;" + "Maximum : " + celMaximumT + "<sup>°</sup>C";
      fahMinMaxTwo.innerHTML = "Minimum : " + fahMinimumT + "<sup>°</sup>F" + "&nbsp;|&nbsp;" + "Maximum : " + fahMaximumT + "<sup>°</sup>F";

      let willItRain = data.forecast.forecastday[1].day.daily_chance_of_rain;
      let willItSnow = data.forecast.forecastday[1].day.daily_chance_of_snow;
      let willItRainT = data.forecast.forecastday[2].day.daily_chance_of_rain;
      let willItSnowT = data.forecast.forecastday[2].day.daily_chance_of_snow;

      rainChance.innerHTML = "Daily Chance Of Rain : " + willItRain + "%";
      snowChance.innerHTML = "Daily Chance Of Snow : " + willItSnow + "%";
      rainChanceT.innerHTML = "Dailly Chance Of Rain : " + willItRainT + "%";
      snowChanceT.innerHTML = "Daily Chance Of Snow : " + willItSnowT + "%";


      let getId = document.getElementById('getId');

      getId.addEventListener('scroll', changeDynamic);

      changeDynamic();

      function changeDynamic() {
        var collector = document.querySelectorAll(".tempQuery");
        //  console.log(collector);


        var scrollVar = document.getElementById('toScrollForUp');
        var stickyCard = -scrollVar.getBoundingClientRect().left;
        var stickyProgCard = (stickyCard / (scrollVar.getBoundingClientRect().width - document.documentElement.clientWidth)) * 100 + 5;


       // console.log(Math.floor(stickyProgCard));

        if (stickyProgCard > 0 && stickyProgCard < 50) {
          let tempArr = new Array();

          tempArr[0] = data.forecast.forecastday[1].hour[0].temp_c;
          tempArr[1] = data.forecast.forecastday[1].hour[1].temp_c;
          tempArr[2] = data.forecast.forecastday[1].hour[2].temp_c;
          tempArr[3] = data.forecast.forecastday[1].hour[3].temp_c;
          tempArr[4] = data.forecast.forecastday[1].hour[4].temp_c;
          tempArr[5] = data.forecast.forecastday[1].hour[5].temp_c;
          tempArr[6] = data.forecast.forecastday[1].hour[6].temp_c;
          tempArr[7] = data.forecast.forecastday[1].hour[7].temp_c;
          tempArr[8] = data.forecast.forecastday[1].hour[8].temp_c;
          tempArr[9] = data.forecast.forecastday[1].hour[9].temp_c;
          tempArr[10] = data.forecast.forecastday[1].hour[10].temp_c;
          tempArr[11] = data.forecast.forecastday[1].hour[11].temp_c;
          tempArr[12] = data.forecast.forecastday[1].hour[12].temp_c;
          tempArr[13] = data.forecast.forecastday[1].hour[13].temp_c;
          tempArr[14] = data.forecast.forecastday[1].hour[14].temp_c;
          tempArr[15] = data.forecast.forecastday[1].hour[15].temp_c;
          tempArr[16] = data.forecast.forecastday[1].hour[16].temp_c;
          tempArr[17] = data.forecast.forecastday[1].hour[17].temp_c;
          tempArr[18] = data.forecast.forecastday[1].hour[18].temp_c;
          tempArr[19] = data.forecast.forecastday[1].hour[19].temp_c;
          tempArr[20] = data.forecast.forecastday[1].hour[20].temp_c;
          tempArr[21] = data.forecast.forecastday[1].hour[21].temp_c;
          tempArr[22] = data.forecast.forecastday[1].hour[22].temp_c;
          tempArr[23] = data.forecast.forecastday[1].hour[23].temp_c;

          let tempFahArr = new Array();
          tempFahArr[0] = data.forecast.forecastday[1].hour[0].temp_f;
          tempFahArr[1] = data.forecast.forecastday[1].hour[1].temp_f;
          tempFahArr[2] = data.forecast.forecastday[1].hour[2].temp_f;
          tempFahArr[3] = data.forecast.forecastday[1].hour[3].temp_f;
          tempFahArr[4] = data.forecast.forecastday[1].hour[4].temp_f;
          tempFahArr[5] = data.forecast.forecastday[1].hour[5].temp_f;
          tempFahArr[6] = data.forecast.forecastday[1].hour[6].temp_f;
          tempFahArr[7] = data.forecast.forecastday[1].hour[7].temp_f;
          tempFahArr[8] = data.forecast.forecastday[1].hour[8].temp_f;
          tempFahArr[9] = data.forecast.forecastday[1].hour[9].temp_f;
          tempFahArr[10] = data.forecast.forecastday[1].hour[10].temp_f;
          tempFahArr[11] = data.forecast.forecastday[1].hour[11].temp_f;
          tempFahArr[12] = data.forecast.forecastday[1].hour[12].temp_f;
          tempFahArr[13] = data.forecast.forecastday[1].hour[13].temp_f;
          tempFahArr[14] = data.forecast.forecastday[1].hour[14].temp_f;
          tempFahArr[15] = data.forecast.forecastday[1].hour[15].temp_f;
          tempFahArr[16] = data.forecast.forecastday[1].hour[16].temp_f;
          tempFahArr[17] = data.forecast.forecastday[1].hour[17].temp_f;
          tempFahArr[18] = data.forecast.forecastday[1].hour[18].temp_f;
          tempFahArr[19] = data.forecast.forecastday[1].hour[19].temp_f;
          tempFahArr[20] = data.forecast.forecastday[1].hour[20].temp_f;
          tempFahArr[21] = data.forecast.forecastday[1].hour[21].temp_f;
          tempFahArr[22] = data.forecast.forecastday[1].hour[22].temp_f;
          tempFahArr[23] = data.forecast.forecastday[1].hour[23].temp_f;


          collector[0].innerHTML = tempArr[0] + " <sup>°</sup> C" + "<br>" + tempFahArr[0] + " <sup>°</sup> F";
          collector[1].innerHTML = tempArr[1] + " <sup>°</sup> C" + "<br>" + tempFahArr[1] + " <sup>°</sup> F";
          collector[2].innerHTML = tempArr[2] + " <sup>°</sup> C" + "<br>" + tempFahArr[2] + " <sup>°</sup> F";
          collector[3].innerHTML = tempArr[3] + " <sup>°</sup> C" + "<br>" + tempFahArr[3] + " <sup>°</sup> F";
          collector[4].innerHTML = tempArr[4] + " <sup>°</sup> C" + "<br>" + tempFahArr[4] + " <sup>°</sup> F";
          collector[5].innerHTML = tempArr[5] + " <sup>°</sup> C" + "<br>" + tempFahArr[5] + " <sup>°</sup> F";
          collector[6].innerHTML = tempArr[6] + " <sup>°</sup> C" + "<br>" + tempFahArr[6] + " <sup>°</sup> F";
          collector[7].innerHTML = tempArr[7] + " <sup>°</sup> C" + "<br>" + tempFahArr[7] + " <sup>°</sup> F";
          collector[8].innerHTML = tempArr[8] + " <sup>°</sup> C" + "<br>" + tempFahArr[8] + " <sup>°</sup> F";
          collector[9].innerHTML = tempArr[9] + " <sup>°</sup> C" + "<br>" + tempFahArr[9] + " <sup>°</sup> F";
          collector[10].innerHTML = tempArr[10] + " <sup>°</sup> C" + "<br>" + tempFahArr[10] + " <sup>°</sup> F";
          collector[11].innerHTML = tempArr[11] + " <sup>°</sup> C" + "<br>" + tempFahArr[11] + " <sup>°</sup> F";
          collector[12].innerHTML = tempArr[12] + " <sup>°</sup> C" + "<br>" + tempFahArr[12] + " <sup>°</sup> F";
          collector[13].innerHTML = tempArr[13] + " <sup>°</sup> C" + "<br>" + tempFahArr[13] + " <sup>°</sup> F";
          collector[14].innerHTML = tempArr[14] + " <sup>°</sup> C" + "<br>" + tempFahArr[14] + " <sup>°</sup> F";
          collector[15].innerHTML = tempArr[15] + " <sup>°</sup> C" + "<br>" + tempFahArr[15] + " <sup>°</sup> F";
          collector[16].innerHTML = tempArr[16] + " <sup>°</sup> C" + "<br>" + tempFahArr[16] + " <sup>°</sup> F";
          collector[17].innerHTML = tempArr[17] + " <sup>°</sup> C" + "<br>" + tempFahArr[17] + " <sup>°</sup> F";
          collector[18].innerHTML = tempArr[18] + " <sup>°</sup> C" + "<br>" + tempFahArr[18] + " <sup>°</sup> F";
          collector[19].innerHTML = tempArr[19] + " <sup>°</sup> C" + "<br>" + tempFahArr[19] + " <sup>°</sup> F";
          collector[20].innerHTML = tempArr[20] + " <sup>°</sup> C" + "<br>" + tempFahArr[20] + " <sup>°</sup> F";
          collector[21].innerHTML = tempArr[21] + " <sup>°</sup> C" + "<br>" + tempFahArr[21] + " <sup>°</sup> F";
          collector[22].innerHTML = tempArr[22] + " <sup>°</sup> C" + "<br>" + tempFahArr[22] + " <sup>°</sup> F";
          collector[23].innerHTML = tempArr[23] + " <sup>°</sup> C" + "<br>" + tempFahArr[23] + " <sup>°</sup> F";
          
          let sunRiseDec = data.forecast.forecastday[1].astro.sunrise;
          let sunSetDec = data.forecast.forecastday[1].astro.sunset;
          let moonRiseDec = data.forecast.forecastday[1].astro.moonrise;
          let moonSetDec = data.forecast.forecastday[1].astro.moonset;
          
          let lastInfo = document.querySelectorAll(".letDayInfo");
          
          lastInfo[0].innerHTML = sunRiseDec;
          lastInfo[1].innerHTML = sunSetDec;
          lastInfo[2].innerHTML = moonRiseDec;
          lastInfo[3].innerHTML = moonSetDec;
 
          // collector[23].innerHTML = tempArr[0] + " <sup>°</sup> C" + "<br>" + tempFahArr[23] + " <sup>°</sup> F";

        }
        else if (stickyProgCard > 50) {
          let tempArr = new Array();

          tempArr[0] = data.forecast.forecastday[2].hour[0].temp_c;
          tempArr[1] = data.forecast.forecastday[2].hour[1].temp_c;
          tempArr[2] = data.forecast.forecastday[2].hour[2].temp_c;
          tempArr[3] = data.forecast.forecastday[2].hour[3].temp_c;
          tempArr[4] = data.forecast.forecastday[2].hour[4].temp_c;
          tempArr[5] = data.forecast.forecastday[2].hour[5].temp_c;
          tempArr[6] = data.forecast.forecastday[2].hour[6].temp_c;
          tempArr[7] = data.forecast.forecastday[2].hour[7].temp_c;
          tempArr[8] = data.forecast.forecastday[2].hour[8].temp_c;
          tempArr[9] = data.forecast.forecastday[2].hour[9].temp_c;
          tempArr[10] = data.forecast.forecastday[2].hour[10].temp_c;
          tempArr[11] = data.forecast.forecastday[2].hour[11].temp_c;
          tempArr[12] = data.forecast.forecastday[2].hour[12].temp_c;
          tempArr[13] = data.forecast.forecastday[2].hour[13].temp_c;
          tempArr[14] = data.forecast.forecastday[2].hour[14].temp_c;
          tempArr[15] = data.forecast.forecastday[2].hour[15].temp_c;
          tempArr[16] = data.forecast.forecastday[2].hour[16].temp_c;
          tempArr[17] = data.forecast.forecastday[2].hour[17].temp_c;
          tempArr[18] = data.forecast.forecastday[2].hour[18].temp_c;
          tempArr[19] = data.forecast.forecastday[2].hour[19].temp_c;
          tempArr[20] = data.forecast.forecastday[2].hour[20].temp_c;
          tempArr[21] = data.forecast.forecastday[2].hour[21].temp_c;
          tempArr[22] = data.forecast.forecastday[2].hour[22].temp_c;
          tempArr[23] = data.forecast.forecastday[2].hour[23].temp_c;

          let tempFahArr = new Array();
          tempFahArr[0] = data.forecast.forecastday[2].hour[0].temp_f;
          tempFahArr[1] = data.forecast.forecastday[2].hour[1].temp_f;
          tempFahArr[2] = data.forecast.forecastday[2].hour[2].temp_f;
          tempFahArr[3] = data.forecast.forecastday[2].hour[3].temp_f;
          tempFahArr[4] = data.forecast.forecastday[2].hour[4].temp_f;
          tempFahArr[5] = data.forecast.forecastday[2].hour[5].temp_f;
          tempFahArr[6] = data.forecast.forecastday[2].hour[6].temp_f;
          tempFahArr[7] = data.forecast.forecastday[2].hour[7].temp_f;
          tempFahArr[8] = data.forecast.forecastday[2].hour[8].temp_f;
          tempFahArr[9] = data.forecast.forecastday[2].hour[9].temp_f;
          tempFahArr[10] = data.forecast.forecastday[2].hour[10].temp_f;
          tempFahArr[11] = data.forecast.forecastday[2].hour[11].temp_f;
          tempFahArr[12] = data.forecast.forecastday[2].hour[12].temp_f;
          tempFahArr[13] = data.forecast.forecastday[2].hour[13].temp_f;
          tempFahArr[14] = data.forecast.forecastday[2].hour[14].temp_f;
          tempFahArr[15] = data.forecast.forecastday[2].hour[15].temp_f;
          tempFahArr[16] = data.forecast.forecastday[2].hour[16].temp_f;
          tempFahArr[17] = data.forecast.forecastday[2].hour[17].temp_f;
          tempFahArr[18] = data.forecast.forecastday[2].hour[18].temp_f;
          tempFahArr[19] = data.forecast.forecastday[2].hour[19].temp_f;
          tempFahArr[20] = data.forecast.forecastday[2].hour[20].temp_f;
          tempFahArr[21] = data.forecast.forecastday[2].hour[21].temp_f;
          tempFahArr[22] = data.forecast.forecastday[2].hour[22].temp_f;
          tempFahArr[23] = data.forecast.forecastday[2].hour[23].temp_f;

          // collector[0].innerHTML = tempArr[0] + "<br>" + tempFahArr[0];
          collector[0].innerHTML = tempArr[0] + " <sup>°</sup> C" + "<br>" + tempFahArr[0] + " <sup>°</sup> F";
          collector[1].innerHTML = tempArr[1] + " <sup>°</sup> C" + "<br>" + tempFahArr[1] + " <sup>°</sup> F";
          collector[2].innerHTML = tempArr[2] + " <sup>°</sup> C" + "<br>" + tempFahArr[2] + " <sup>°</sup> F";
          collector[3].innerHTML = tempArr[3] + " <sup>°</sup> C" + "<br>" + tempFahArr[3] + " <sup>°</sup> F";
          collector[4].innerHTML = tempArr[4] + " <sup>°</sup> C" + "<br>" + tempFahArr[4] + " <sup>°</sup> F";
          collector[5].innerHTML = tempArr[5] + " <sup>°</sup> C" + "<br>" + tempFahArr[5] + " <sup>°</sup> F";
          collector[6].innerHTML = tempArr[6] + " <sup>°</sup> C" + "<br>" + tempFahArr[6] + " <sup>°</sup> F";
          collector[7].innerHTML = tempArr[7] + " <sup>°</sup> C" + "<br>" + tempFahArr[7] + " <sup>°</sup> F";
          collector[8].innerHTML = tempArr[8] + " <sup>°</sup> C" + "<br>" + tempFahArr[8] + " <sup>°</sup> F";
          collector[9].innerHTML = tempArr[9] + " <sup>°</sup> C" + "<br>" + tempFahArr[9] + " <sup>°</sup> F";
          collector[10].innerHTML = tempArr[10] + " <sup>°</sup> C" + "<br>" + tempFahArr[10] + " <sup>°</sup> F";
          collector[11].innerHTML = tempArr[11] + " <sup>°</sup> C" + "<br>" + tempFahArr[11] + " <sup>°</sup> F";
          collector[12].innerHTML = tempArr[12] + " <sup>°</sup> C" + "<br>" + tempFahArr[12] + " <sup>°</sup> F";
          collector[13].innerHTML = tempArr[13] + " <sup>°</sup> C" + "<br>" + tempFahArr[13] + " <sup>°</sup> F";
          collector[14].innerHTML = tempArr[14] + " <sup>°</sup> C" + "<br>" + tempFahArr[14] + " <sup>°</sup> F";
          collector[15].innerHTML = tempArr[15] + " <sup>°</sup> C" + "<br>" + tempFahArr[15] + " <sup>°</sup> F";
          collector[16].innerHTML = tempArr[16] + " <sup>°</sup> C" + "<br>" + tempFahArr[16] + " <sup>°</sup> F";
          collector[17].innerHTML = tempArr[17] + " <sup>°</sup> C" + "<br>" + tempFahArr[17] + " <sup>°</sup> F";
          collector[18].innerHTML = tempArr[18] + " <sup>°</sup> C" + "<br>" + tempFahArr[18] + " <sup>°</sup> F";
          collector[19].innerHTML = tempArr[19] + " <sup>°</sup> C" + "<br>" + tempFahArr[19] + " <sup>°</sup> F";
          collector[20].innerHTML = tempArr[20] + " <sup>°</sup> C" + "<br>" + tempFahArr[20] + " <sup>°</sup> F";
          collector[21].innerHTML = tempArr[21] + " <sup>°</sup> C" + "<br>" + tempFahArr[21] + " <sup>°</sup> F";
          collector[22].innerHTML = tempArr[22] + " <sup>°</sup> C" + "<br>" + tempFahArr[22] + " <sup>°</sup> F";
          collector[23].innerHTML = tempArr[23] + " <sup>°</sup> C" + "<br>" + tempFahArr[23] + " <sup>°</sup> F";
          // collector[23].innerHTML = tempArr[0] + " <sup>°</sup> C" + "<br>" + tempFahArr[23] + " <sup>°</sup> F";
          
          let sunRiseDec = data.forecast.forecastday[2].astro.sunrise;
          let sunSetDec = data.forecast.forecastday[2].astro.sunset;
          let moonRiseDec = data.forecast.forecastday[2].astro.moonrise;
          let moonSetDec = data.forecast.forecastday[2].astro.moonset;
          
          let lastInfo = document.querySelectorAll(".letDayInfo");
          
          lastInfo[0].innerHTML = sunRiseDec;
          lastInfo[1].innerHTML = sunSetDec;
          lastInfo[2].innerHTML = moonRiseDec;
          lastInfo[3].innerHTML = moonSetDec;
 
        }
      }


    })
    .catch(err => {
      var fetchIng = document.getElementById("fetchErr");
      if (err == "TypeError: Cannot read properties of undefined (reading 'country')") {
        fetchIng.classList.add('toggleFetch');
        setFetchErr.innerHTML = 'City not found...';
      }
      else {
        console.log(err);
        fetchIng.classList.add("toggleFetch");
        setFetchErr.innerHTML = "An unknown error occurred...";
      }
    })
})

function suggestCity() {

  var inp = document.getElementById("searchCity").value;

  fetch(`https://api.api-ninjas.com/v1/city?name=${inp}&limit=30`, {
      "method": "GET",
      "headers": {
        'X-Api-Key': 'iD+J6v11YMcxj+7ZBVgJWg==Yy92RR2H7vZ2NJuC',
      },
    })
    .then(response => {
      var first = document.getElementById('firstLine');
      var seco = document.getElementById('secondLine');
      var thi = document.getElementById('thirdLine');
      var four = document.getElementById('fourLine');
      var five = document.getElementById('fiveLine');

      if (response.status == 200 || response.status == 400) {
        first.style.display = 'none';
        seco.style.display = 'none';
        thi.style.display = 'none';
        four.style.display = 'none';
        five.style.display = 'none';
      }
      else {
        undefined
      }
      return response.json()
    })
    .then(data => {

      var cityName = new Array();

      cityName[0] = data[0].name;
      cityName[1] = data[1].name;
      cityName[2] = data[2].name;
      cityName[3] = data[3].name;
      cityName[4] = data[4].name;

      firstCity.innerHTML = cityName[0];
      if (firstCity.innerHTML == 'Ahmadabad') {
        firstCity.innerHTML = 'Ahmedabad';
      }
      secondCity.innerHTML = cityName[1];
      if (secondCity.innerHTML == 'Ahmadabad') {
        secondCity.innerHTML = 'Ahmedabad';
      }
      thirdCity.innerHTML = cityName[2];
      fourCity.innerHTML = cityName[3];
      fiveCity.innerHTML = cityName[4];

      var field = document.getElementById("searchCity");
      firstCity.onclick = function() {
        field.value = firstCity.innerHTML;
        if (firstCity.innerHTML == 'Ahmadabad') {
          field.value = 'Ahmedabad';
        }
      }
      secondCity.onclick = function() {
        field.value = secondCity.innerHTML;
        if (secondCity.innerHTML == 'Ahmadabad') {
          field.value = 'Ahmedabad';
        }
      }
      thirdCity.onclick = function() {
        field.value = thirdCity.innerHTML;
      }

      fourCity.onclick = function() {
        field.value = fourCity.innerHTML;
      }

      fiveCity.onclick = function() {
        field.value = fiveCity.innerHTML;
      }


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
    .catch(err => {
      console.log(err)
    });
}

function displayNoneWarn() {
  var warn = document.getElementById("displayWarningCity");
  var inpField = document.getElementById("searchCity");

  warn.classList.remove("toggleWarn");
  // inpField.focus()
  //inpField.value = '';
}

function enableInp() {
  var mainBox = document.getElementById("suggestionBox");
  var subBox = document.getElementById("suggestionSubBox");

  mainBox.classList.add("pointer");
  subBox.classList.add("pointer")
}

function disableInp() {
  var mainBox = document.getElementById("suggestionBox");
  var subBox = document.getElementById("suggestionSubBox");

  mainBox.classList.remove("pointer");
  subBox.classList.remove("pointer")
}

const ArrowUp = document.getElementById("arrowUp");
const rootElem = document.documentElement;
// var stick = up.offsetTop;

window.onscroll = function myfunc() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    ArrowUp.classList.add("navAd");
  }
  else {
    ArrowUp.classList.remove("navAd");

  }
}
ArrowUp.onclick = function() {
  document.body.scrollTop = 0;
  rootElem.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function rotateArr() {
  arOne.classList.toggle("arrowRotOne");
  arTwo.classList.toggle("arrowRotTwo");
  showFore.classList.toggle("folderShow");
}

function disableFetch() {
  fetchErr.classList.remove('toggleFetch');
}

function disableStatus() {
  statusDisplay.classList.remove('toggleNet');
}
checkInt()

function checkInt() {
  setInterval(() => {
    var checkStatus = navigator.onLine;
    var divDis = document.getElementById("statusDisplay");

    if (checkStatus == true) {
      divDis.classList.remove("toggleNet");
    }
    else {
      divDis.classList.add("toggleNet");
    }
  }, 3000)
}


/*.addEventListener('scroll', () => {
  let cardLength = document.getElementById("cardSlider");

  let scrollBar = -cardLength.getBoundingClientRect().left;
  let progBar = (scrollBar / (cardLength.getBoundingClientRect().width - document.documentElement.clientWidth)) * 100 - 2;

  if (progBar <= 0) {
    widthBar.style.display = 'none';
    opaqueBar.style.opacity = '0';
    positionChev.style.display = 'block';
  }
  else {
    widthBar.style.display = 'block';
    widthBar.style.width = progBar + "%";
    opaqueBar.style.opacity = '1';
    positionChev.style.display = 'none';
  }
})

scrollerSec.addEventListener('scroll', () => {
  let cardLength = document.getElementById("cardSliderSec");

  let scrollBar = -cardLength.getBoundingClientRect().left;
  let progBar = (scrollBar / (cardLength.getBoundingClientRect().width - document.documentElement.clientWidth)) * 100 - 2;

  if (progBar <= 0) {
    widthBarSec.style.display = 'none';
    opaqueBarSec.style.opacity = '0';
    positionChevSec.style.display = 'block';

  }
  else {
    opaqueBarSec.style.opacity = '1';
    widthBarSec.style.display = 'block';
    widthBarSec.style.width = progBar + "%";
    positionChevSec.style.display = 'none';
  }
});
*/


function runMath() {
   var stickyRain = document.querySelectorAll(".willItRain-s");
   var stickyRainPos = document.querySelectorAll('.toolTipRainOne')

   let stickyPos = -stickyRain[0].getBoundingClientRect().left;
   let stickyProg = (stickyPos / (stickyRain[0].getBoundingClientRect().width - document.documentElement.clientWidth)) * 100 - 2;

   console.log(stickyProg);

   if (stickyProg > 2) {
     stickyRainPos[0].classList.add('stickyClass');
   }
   else {
     stickyRainPos[0].classList.remove('stickyClass');
   }


   let stickyPosTwo = -stickyRain[1].getBoundingClientRect().left;
   let stickyProgTwo = (stickyPosTwo / (stickyRain[1].getBoundingClientRect().width - document.documentElement.clientWidth)) * 100 - 2;

   if (stickyProgTwo > 2) {
     stickyRainPos[1].classList.add('stickyClass');
   }
   else {
     stickyRainPos[1].classList.remove('stickyClass');
   }
   
   let stickyPosThi = -stickyRain[2].getBoundingClientRect().left;
   let stickyProgThi = (stickyPosThi / (stickyRain[2].getBoundingClientRect().width - document.documentElement.clientWidth)) * 100 - 2;

   if (stickyProgThi > 2) {
     stickyRainPos[2].classList.add('stickyClass');
   }
   else {
     stickyRainPos[2].classList.remove('stickyClass');
   }

  let tFourCast = document.getElementById("willFore");

  let stickyCard = -tFourCast.getBoundingClientRect().left;
  let stickyProgCard = (stickyCard / (tFourCast.getBoundingClientRect().width - document.documentElement.clientWidth)) * 100 - 2;


  let toTogg = document.getElementById("toToggCard");
  let tFourText = document.getElementById("toToggText");

  if (stickyProgCard > 2) {
    toTogg.classList.add('twentyFourTagTog');
  //  tFourText.classList.add('textTFtog');
  }
  else {
    toTogg.classList.remove('twentyFourTagTog');
   // tFourText.classList.remove('textTFtog');
  }
}
