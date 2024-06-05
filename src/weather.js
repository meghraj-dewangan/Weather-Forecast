
const searchButton = document.getElementById('searchButton');
const locationButton = document.getElementById('locationButton')
const inputCity = document.getElementById("inputCity");
const temp = document.getElementById("temp")
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const description = document.getElementById("description")
const img1 = document.getElementById("img1")

const dropletLogo = document.getElementById("dropletLogo")
const windLogo = document.getElementById("windLogo")
const humidityPara = document.getElementById("humidityPara")
const windPara = document.getElementById("windPara")
const errorBlock = document.getElementById("errorBlock")

const tempWindHumi = document.getElementById("tempWindHumi")
const locationName = document.getElementById("locationName")
const cardTemp1 = document.getElementById("cardTemp1")
const cardWind1 = document.getElementById("cardWind1")
const cardHumi1 = document.getElementById("cardHumi1")

const cardTemp2 = document.getElementById("cardTemp2")
const cardWind2 = document.getElementById("cardWind2")
const cardHumi2 = document.getElementById("cardHumi2")

const cardDate1 = document.getElementById("cardDate1")
const cardDate2 = document.getElementById("cardDate2")

const weatherCardDiv = document.querySelector(".weatherCardDiv")

const cardImg = document.querySelectorAll(".cardImg")
const weekWeather = document.getElementById("weekWeather")


const apiKey = "3a978b4ef83fc4c4c36cde2654485a14"


//Save weather data to session storage

function saveToLOcalStorage(cityName, data) {

    sessionStorage.setItem(cityName, JSON.stringify(data));
    let recentCities = JSON.parse(sessionStorage.getItem('recentCities')) || []
    if (!recentCities.includes(cityName)) {
        recentCities.push(cityName);
        sessionStorage.setItem('recentCities', JSON.stringify(recentCities));
    }

    updateRecentCitiesDropdown();
}

// Update the recent cities dropdown menu
function updateRecentCitiesDropdown() {
    let recentCities = JSON.parse(sessionStorage.getItem('recentCities')) || [];
    const recentCitiesDropdown = document.getElementById('recentCities');
    console.log(recentCities)
    if (recentCities.length > 0) {
        recentCitiesDropdown.style.display = 'block';
        recentCitiesDropdown.innerHTML = '<option value="">Select a recently searched city</option>';
        recentCities.forEach(city => {
            recentCitiesDropdown.innerHTML += `<option value="${city}">${city}</option>`;
        });

    } else {
        recentCitiesDropdown.style.display = 'none';
    }
}





// Fetch weather details using city coordinates for 5 days extended api fetching
const getWeatherDetails = (cityName, lat, lon) => {
    const WeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(WeatherApiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const uniqueCastDay = [];
            const fiveDaysWeather = data.list.filter(cast => {
                const castDate = new Date(cast.dt_txt).getDate();
                if (!uniqueCastDay.includes(castDate)) {
                    return uniqueCastDay.push(castDate);
                }
            });

            tempWindHumi.style.display = "block";
            weekWeather.style.display = "block";
            inputCity.value = '';
            tempWindHumi.innerHTML = '';
            weatherCardDiv.innerHTML = '';

            console.log(fiveDaysWeather);

            fiveDaysWeather.forEach((weatherItm, index) => {
                if (index === 0) {
                    tempWindHumi.insertAdjacentHTML("beforeend", weatherCard(cityName, weatherItm, index));
                } else {
                    weatherCardDiv.insertAdjacentHTML("beforeend", weatherCard(cityName, weatherItm, index));
                }
            });
        })
        .catch(error => {
            console.log("Fetching error", error);
            errorBlock.style.display = "block";
            tempWindHumi.style.display = "none";
        });
}

// Function to create weather cards for 5 days
const weatherCard = (cityName, weatherItm, index) => {
    if (index === 0) {
        // Main weather card
        return `
            <div id="tempWindHumi" class="text-center pb-3 rounded-xl mt-5 py-3 sm:mx-16">
                <p id="locationName" class="font-bold text-2xl">${cityName} <span class="text-xl">(${weatherItm.dt_txt.split(" ")[0]})</span></p>
                <div class="mainCardImage w-full flex justify-center m-2 mb-4 sm:mr-2">
                    <img id="img1" src="https://openweathermap.org/img/wn/${weatherItm.weather[0].icon}@2x.png" alt="weather image" class="w-40">
                </div>
                <div id="temp" class="text-4xl font-medium text-white"><span>${Math.round(weatherItm.main.temp - 273.15)}°C</span></div>
                <p id="description" class="text-3xl font-medium text-white">${weatherItm.weather[0].description}</p>
                <div class="flex justify-between mt-5">
                    <div class="flex ml-4 sm:relative sm:right-3">
                        <i id="dropletLogo" class="fa-solid fa-droplet text-4xl"></i>
                        <div>
                            <span id="humidity" class="text-xl">${weatherItm.main.humidity}%</span>
                            <p id="humidityPara">Humidity</p>
                        </div>
                    </div>
                    <div class="flex mr-4">
                        <i id="windLogo" class="fa-solid fa-wind text-4xl"></i>
                        <div>
                            <span id="windSpeed" class="text-xl">${weatherItm.wind.speed}Km/h</span>
                            <p id="windPara">Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>`;
    } else {
        // Other 5-day weather cards
        return `
            <li class="card px-3 py-5 m-2 rounded-xl bg-purple-500 shadow-lg shadow-black">
                <div class="sm:w-36 w-32 md:mr-4">
                    <h3 id="cardDate${index}" class="text-white font-semibold">${weatherItm.dt_txt.split(" ")[0]}</h3>
                    <div class="w-full flex justify-center m-2 mb-4">
                        <img src="https://openweathermap.org/img/wn/${weatherItm.weather[0].icon}@2x.png" alt="weather_image" class="w-16">
                    </div>
                    <p id="cardTemp${index}">Temp: ${Math.round(weatherItm.main.temp - 273.15)}°C</p>
                    <p id="cardWind${index}">Wind: ${weatherItm.wind.speed}km/h</p>
                    <p id="cardHumi${index}">Humidity: ${weatherItm.main.humidity}%</p>
                </div>
            </li>`;
    }
}

// Fetch city coordinates using city name
const getCityCoordinates = () => {
    const cityName = inputCity.value.trim();
    if (!cityName) return;
    const geoCoadingApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    fetch(geoCoadingApi)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const { name, lat, lon } = data[0];
            getWeatherDetails(name, lat, lon);
            saveToLOcalStorage(name, data)


        })
        .catch(error => {
            console.log('Error in Finding', error);
            errorBlock.style.display = "block";
            tempWindHumi.style.display = "none";
        });
}


// Fetch current location and get weather details
function getLocation() {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const reverseGeocoding = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;

            fetch(reverseGeocoding)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const { name } = data[0];
                    getWeatherDetails(name, latitude, longitude);
                })
                .catch(() => {
                    alert('Error occurred while fetching the city!');
                });
        },
        error => {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Geolocation Permission denied. Please enable location access.');
            }
        }
    );
}
  

locationButton.addEventListener("click", getLocation);

searchButton.addEventListener("click", getCityCoordinates);
