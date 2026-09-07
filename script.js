let searchCity = document.getElementById("city-search-input");
let searchBtn = document.getElementById("city-search-btn");
let temprature = document.getElementById("temp-value");
let location_Name = document.getElementById("location-name");
let condition_text = document.getElementById("condition-text");
let feels_like = document.getElementById("feels-like");
let humidity = document.getElementById("humidity");
let wind_speed = document.getElementById("wind-speed");
let location_date = document.getElementById("location-date");

const API_KEY = `4cdc2ca5c723f3720e57ffcf6acbd4ca`;

function checkWeather() {

    let city = searchCity.value.trim();

    if (city === "") {
        Swal.fire({
            text: "Please Enter a City Name!",
            icon: "warning"
        });
        return
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then((data) => data.json())
        .then((convertedData) => {
            console.log(convertedData);

            temprature.innerHTML = `${Math.ceil(convertedData.main.temp)}°`;
            location_Name.innerHTML = `${convertedData.name},${convertedData.sys.country}`;
            condition_text.innerHTML = `${convertedData.weather[0].description}`;
            feels_like.innerHTML = `${Math.ceil(convertedData.main.feels_like)}°`;
            humidity.innerHTML = `${convertedData.main.humidity}%`;
            wind_speed.innerHTML = `${Math.ceil(convertedData.wind.speed)} m/s`;
            location_date.innerHTML = new Date().toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });

            searchCity.value = "";

        })
        .catch((eror) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "City Not Found!",
            });

            searchCity.value = "";
        });
}

searchBtn.onclick = checkWeather;
