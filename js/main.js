"use strict";

//DOM Selectors
const cityInputField = document.querySelector("#city");
const getTemp = document.querySelector("#getTemp");
const tempSpan = document.querySelector("#temp");
const icon = document.querySelector("#icon");

//API URL
const weatherUrl =
	"https://api.openweathermap.org/data/2.5/weather?q=London&appid=1680f86f99f9722f2e92efbfac0afa4a";

// Shows temperature in DOM
function showTemp(data) {
	const degFahrenheit = (data.main.temp - 273.15) * 1.8 + 32;
	// // round calculated temperature down to the nearest whole number
	const degFahrenheitInteger = Math.floor(degFahrenheit);

	// // CELSIUS: calculate and store Celsius temperature
	const degCelsius = (degFahrenheitInteger - 32) / 1.8;
	const degCelsiusInteger = Math.floor(degCelsius);

	const feelsLikeFahrenheit = Math.floor(
		(data.main.feels_like - 273.15) * 1.8 + 32
	);
	const feelsLikeCelsius = Math.floor((feelsLikeFahrenheit - 32) / 1.8);
	const clouds = data.weather[0].main;
	const typeOfClouds = data.weather[0].description;
	const humidity = data.main.humidity;
	const visibility = data.visibility / 1000;

	tempSpan.innerHTML = `<h2>${data.name}</h2>
    <h3>${degCelsiusInteger}°C / ${degFahrenheitInteger}°F</h3>
        <p>Feels like ${feelsLikeCelsius}°C / ${feelsLikeFahrenheit}°F</p>
        <p>${clouds}, ${typeOfClouds}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Visibility: ${visibility}km</p>
        `;
}

// Data fetch from OpenWeatherMap API, displays London weather as default

fetch(weatherUrl)
	.then((response) => {
		if (!response.ok) throw Error(response.statusText);
		return response.json();
	})
	.then((data) => {
		console.log(data);
		// FAHRENHEIT: calculate and store Fahrenheit temperature
		const degFahrenheit = (data.main.temp - 273.15) * 1.8 + 32;
		// // round calculated temperature down to the nearest whole number
		const degFahrenheitInteger = Math.floor(degFahrenheit);

		// // CELSIUS: calculate and store Celsius temperature
		const degCelsius = (degFahrenheitInteger - 32) / 1.8;
		const degCelsiusInteger = Math.floor(degCelsius);

		const feelsLikeFahrenheit = Math.floor(
			(data.main.feels_like - 273.15) * 1.8 + 32
		);
		const feelsLikeCelsius = Math.floor((feelsLikeFahrenheit - 32) / 1.8);
		const clouds = data.weather[0].main;
		const typeOfClouds = data.weather[0].description;
		const humidity = data.main.humidity;
		const visibility = data.visibility / 1000;

		console.log(
			`Temperature for ${data.name} in Kelvin: ${data.main.temp}°K`
		);
		console.log(
			`Temperature for ${data.name} in Fahrenheit: ${degFahrenheitInteger}°F`
		);
		console.log(
			`Temperature for ${data.name} in Celsius: ${degCelsiusInteger}°C`
		);

		tempSpan.innerHTML = `<h2>London</h2>
        <h3>${degCelsiusInteger}°C / ${degFahrenheitInteger}°F</h3>
        <p>Feels like ${feelsLikeCelsius}°C / ${feelsLikeFahrenheit}°F</p>
        <p>${clouds}, ${typeOfClouds}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Visibility: ${visibility}km</p>
        `;

		openWeatherIcon(data);
	});

// Users type in City, press Get Weather button and returns data for the city specified

getTemp.addEventListener("click", function () {
	const cityText = cityInputField.value;

	const cityWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=1680f86f99f9722f2e92efbfac0afa4a`;

	fetch(cityWeather)
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then((data) => {
			console.log("Custom city:", data);

			showTemp(data);

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
