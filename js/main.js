"use strict";

//DOM Selectors
const cityInputField = document.querySelector("#city");
const postcodeInputField = document.querySelector("#postcode");
const getTemp = document.querySelector("#getTemp");
const tempSpan = document.querySelector("#temp");
const icon = document.querySelector("#icon");

//API URLs
const weatherUrl =
	"http://api.openweathermap.org/data/2.5/weather?q=London&appid=1680f86f99f9722f2e92efbfac0afa4a";
const weatherUrl2 =
	"http://api.weatherunlocked.com/api/current/51.50,-0.12?app_id=5aee793e&app_key=321f0b2c5f16e7d39d14cff2dfda1351";

// shows temperature in DOM
function showTemp(city, tempC, tempF) {
	tempSpan.textContent = `${city} is ${tempC}°C / ${tempF}°F`;
}

//CODE FETCHING DATA FROM OPENWEATHERMAP API

fetch(weatherUrl)
	.then((response) => {
		if (!response.ok) throw Error(response.statusText);
		return response.json();
	})
	.then((data) => {
		console.log(data);
		// FAHRENHEIT: calculate and store Fahrenheit temperature
		const degFahrenheit = (data.main.temp - 273.15) * 1.8 + 32;
		// round calculated temperature down to the nearest whole number
		const degFahrenheitInteger = Math.floor(degFahrenheit);

		// CELSIUS: calculate and store Celsius temperature
		const degCelsius = (degFahrenheitInteger - 32) / 1.8;
		const degCelsiusInteger = Math.floor(degCelsius);

		console.log(
			`Temperature for ${data.name} in Kelvin: ${data.main.temp}°K`
		);
		console.log(
			`Temperature for ${data.name} in Fahrenheit: ${degFahrenheitInteger}°F`
		);
		console.log(
			`Temperature for ${data.name} in Celsius: ${degCelsiusInteger}°C`
		);

		tempSpan.textContent = `London is ${degCelsiusInteger}°C / ${degFahrenheitInteger}°F`;

		openWeatherIcon(data);
	});

//CODE FETCHING DATA FROM WEATHERUNLOCKED API

fetch(weatherUrl2)
	.then((response) => {
		if (!response.ok) throw Error(response.statusText);
		return response.json();
	})
	.then((data) => {
		console.log(data);

		console.log(`Temperature for London in Celsius: ${data.temp_c}°C`);
		console.log(`Temperature for London in Fahrenheit: ${data.temp_f}°F`);

		showTemp("London", data.temp_c, data.temp_f);
	});

// BONUS 2:
//Implemented a form that prompts users for a city and UK postcode and returns data for the location they specify.

getTemp.addEventListener("click", function () {
	const cityText = cityInputField.value;
	const postcodeText = postcodeInputField.value;

	const cityWeather = `http://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=1680f86f99f9722f2e92efbfac0afa4a`;
	// const postcodeWeather = `http://api.openweathermap.org/data/2.5/weather?zip=${postcodeText},GBR&appid=1680f86f99f9722f2e92efbfac0afa4a`;
	const postcodeWeather = `http://api.weatherunlocked.com/api/current/uk.${postcodeText}?app_id=5aee793e&app_key=321f0b2c5f16e7d39d14cff2dfda1351`;

	if (cityText) {
		fetch(cityWeather)
			.then((response) => {
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				console.log("Custom city:", data);
				// FAHRENHEIT: calculate and store Fahrenheit temperature
				const degFahrenheit = (data.main.temp - 273.15) * 1.8 + 32;
				// round calculated temperature down to the nearest whole number
				const degFahrenheitInteger = Math.floor(degFahrenheit);

				// CELSIUS: calculate and store Celsius temperature
				const degCelsius = (degFahrenheitInteger - 32) / 1.8;
				const degCelsiusInteger = Math.floor(degCelsius);

				console.log(
					`Temperature for ${cityText} in Fahrenheit: ${degFahrenheitInteger}°F`
				);
				console.log(
					`Temperature for ${cityText} in Celsius: ${degCelsiusInteger}°C`
				);

				showTemp(data.name, degCelsiusInteger, degFahrenheitInteger);

				//shows weather icon
				openWeatherIcon(data);
			});
	} else {
		fetch(postcodeWeather)
			.then((response) => {
				if (!response.ok) throw Error(response.statusText);
				return response.json();
			})
			.then((data) => {
				console.log("Custom postcode:", data);

				console.log(
					`Temperature for ${postcodeText} in Fahrenheit: ${data.temp_f}°F`
				);
				console.log(
					`Temperature for ${postcodeText} in Celsius: ${data.temp_c}°C`
				);

				showTemp(postcodeText, data.temp_c, data.temp_f);
				//shows ugly weather icon
				weatherUnlockedIcon(data);
			});
	}
});

// >>>>I tried to make the postcode work for any country but this would need a country select and a bit more time!
//So only UK postcode works for the time being, fetching from Weather Unlocked instead of OpenWeather. Something for me to build up on.

// BONUS 3: The response data for each request includes the name of an image file that illustrates current weather conditions.
//Use the documentation to figure out the URL for these files on the server, and then incorporate this image into the DOM.

function openWeatherIcon(data) {
	const showImage = data.weather[0].icon;
	const iconImageUrl = `http://openweathermap.org/img/wn/${showImage}@2x.png`;
	icon.innerHTML = `<img src="${iconImageUrl}" />`;
}

function weatherUnlockedIcon(data) {
	const iconImageUrl = `./images/weatherUnlockedIcons/${data.wx_icon}`;
	icon.innerHTML = `<img src="${iconImageUrl}" />`;
}

// >>> Please note, when you search by postcode, the weather icon is different from the city postcode. They're awful by the way.
// As the postcode input is fetching data from the other API.
