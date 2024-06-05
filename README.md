# Weather Forecast
This is a simple weather application that fetches and displays weather information for a city input by the user. It also allows users to get weather details for their current location. The application uses the OpenWeatherMap API to retrieve weather data.

Features:-

1.Search weather details by city name.

2.Fetch weather details for the user's current location.

3.Display current weather conditions including temperature, humidity, and wind speed.

4.Display a 5-day weather forecast.

5.Save and display recently searched cities.

Prerequisites:-

An API key from OpenWeatherMap.

Usage:-

Searching for a City:-

1.Enter the name of the city in the input field.

2.Click on the "Search" button.

3.The current weather and 5-day forecast for the city will be displayed.

Using Current Location:-

1.Click on the "Use Current Location" button.

2.Allow the browser to access your location.

3.The current weather and 5-day forecast for your location will be displayed.

Viewing Recently Searched Cities:-

The dropdown menu will show the cities you have searched for recently.

Code Overview:-

Main Elements:-

1.searchButton: Button to initiate the search based on the city name.

2.locationButton: Button to fetch weather details for the current location.

3.inputCity: Input field for entering the city name.

4.temp, humidity, windSpeed, description: Elements to display weather information.

5.tempWindHumi, locationName, weatherCardDiv, weekWeather: Containers to display weather information and forecasts.

6.errorBlock: Element to display error messages.

7.recentCitiesDropdown: Dropdown to display and select recently searched cities.

Functions:- 1.saveToLocalStorage(cityName, data): Saves weather data to session storage and updates the recent cities dropdown.

2.updateRecentCitiesDropdown(): Updates the dropdown menu with recently searched cities.

3.getWeatherDetails(cityName, lat, lon): Fetches and displays weather details for the given coordinates.

4.weatherCard(cityName, weatherItm, index): Creates weather cards for the current and forecasted weather.

5.getCityCoordinates(): Fetches the coordinates of the city entered by the user.

6.getLocation(): Fetches the user's current location and retrieves the weather details.

Event Listeners:-

1.locationButton.addEventListener("click", getLocation): Triggers fetching weather details for the current location.

2.searchButton.addEventListener("click", getCityCoordinates): Triggers fetching weather details based on the city name entered by the user.

Error Handling:- If there is an error in fetching the city or weather details, an error message will be displayed in the errorBlock element.

License:- This project is open-source 
