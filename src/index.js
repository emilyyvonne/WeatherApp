function formatDay(date) {
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
}

function formatDate(date) {
  let months = [
    "Jauary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dayOfMonth = date.getDate();
  let year = date.getFullYear();
  let formattedDate = `${month} ${dayOfMonth}, ${year}`;

  return formattedDate;
}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

function searchCity(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search-city").value;

  searchWeatherApi(searchValue);
}

function searchWeatherApi(search) {
  let apiKey = "27969f782ac2c0734e890d4b54f49e0a";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(handleWeatherApiResponse);
}

function handleWeatherApiResponse(response) {
  setWeather(response);
  setLocation(response);
}

function setWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temp-value").innerHTML = `${temperature}`;
}

function setLocation(response) {
  document.querySelector("h1").innerHTML = response.data.name;
}

function setDateDisplay(date) {
  document.querySelector("#day").innerHTML = formatDay(date);
  document.querySelector("#date").innerHTML = formatDate(date);
  document.querySelector("#time").innerHTML = formatTime(date);
}

function handleCurrentLocationClick() {
  navigator.geolocation.getCurrentPosition(setCurrentLocationWeather);
}

function setCurrentLocationWeather(position) {
  let apiKey = "27969f782ac2c0734e890d4b54f49e0a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(handleWeatherApiResponse);
}

function onPageLoad() {
  setDateDisplay(new Date());
  let search = document.querySelector("#search-form");
  search.addEventListener("submit", searchCity);
  let currentLocationButton = document.querySelector("#current-location-btn");
  currentLocationButton.addEventListener("click", handleCurrentLocationClick);
}

onPageLoad();
