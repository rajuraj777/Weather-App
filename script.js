// Replace with your OpenWeatherMap API key
const apiKey = '14951c93f3d11e8ac8bed96dd90e8bc7';

// DOM Elements
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('icon');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

// Function to fetch weather data
async function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    locationElement.textContent = 'Failed to fetch weather data.';
  }
}

// Function to display weather data
function displayWeather(data) {
  locationElement.textContent = `${data.name}, ${data.sys.country}`;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionElement.textContent = data.weather[0].description;
  iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
  humidityElement.textContent = data.main.humidity;
  windElement.textContent = data.wind.speed;
}

// Function to get user's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      (error) => {
        console.error('Error getting location:', error);
        locationElement.textContent = 'Unable to retrieve location.';
      }
    );
  } else {
    locationElement.textContent = 'Geolocation is not supported by this browser.';
  }
}

// Function to fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    locationElement.textContent = 'Failed to fetch weather data.';
  }
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Initialize the app
getLocation();