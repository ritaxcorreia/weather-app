"use strict";

//DOM Selectors
const cityInputField = document.querySelector("#city");
const getTemp = document.querySelector("#getTemp");
const tempSpan = document.querySelector("#temp");
const icon = document.querySelector("#icon");

//API URL
const weatherUrl =
	"http://api.openweathermap.org/data/2.5/weather?q=London&appid=1680f86f99f9722f2e92efbfac0afa4a";

// Shows temperature in DOM
function showTemp(city, tempC, tempF) {
	tempSpan.textContent = `${city} is ${tempC}°C / ${tempF}°F`;
}

// Data fetch from OpenWeatherMap API

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

// Users press Get Weather button and returns data for the city specified

getTemp.addEventListener("click", function () {
	const cityText = cityInputField.value;

	const cityWeather = `http://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=1680f86f99f9722f2e92efbfac0afa4a`;

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
});

// Weather icon
function openWeatherIcon(data) {
	const showImage = data.weather[0].icon;
	const iconImageUrl = `http://openweathermap.org/img/wn/${showImage}@2x.png`;
	icon.innerHTML = `<img src="${iconImageUrl}" />`;
}
