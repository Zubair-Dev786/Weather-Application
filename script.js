let searchCity = document.getElementById("city-search-input");
let searchBtn = document.getElementById("city-search-btn");
let temprature = document.getElementById("temp-value");
let temp_max = document.getElementById("temp-max");
let temp_min = document.getElementById("temp-min");
let location_Name = document.getElementById("location-name");
let condition_text = document.getElementById("condition-text");
let feels_like = document.getElementById("feels-like");
let humidity = document.getElementById("humidity");
let wind_speed = document.getElementById("wind-speed");
let location_date = document.getElementById("location-date");
let pressure = document.getElementById("pressure");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let visibility = document.getElementById("visibility");
let cloudiness = document.getElementById("cloudiness");
let wind_direction = document.getElementById("wind-direction");
let wind_gust = document.getElementById("wind-gust");
let local_time = document.getElementById("local-time");


const API_KEY = `4cdc2ca5c723f3720e57ffcf6acbd4ca`;

searchBtn.onclick = async () => {

    let city = searchCity.value.trim();

    if (city === "") {
        Swal.fire({
            text: "Please Enter a City Name!",
            icon: "warning"
        });
        return;
    };

    searchBtn.innerHTML = "Searching...";

    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        let convertedData = await data.json();

        if (!data.ok) {
            throw new Error("City Not Found!");
        }

        console.log(convertedData);

        temprature.innerHTML = `${Math.ceil(convertedData.main.temp)}°`;

        temp_max.innerHTML = `${Math.ceil(convertedData.main.temp_max)}°`;

        temp_min.innerHTML = `${Math.ceil(convertedData.main.temp_min)}°`;

        location_Name.innerHTML = `${convertedData.name},${convertedData.sys.country}`;

        condition_text.innerHTML = `${convertedData.weather[0].description}`;

        feels_like.innerHTML = `${Math.ceil(convertedData.main.feels_like)}°`;

        humidity.innerHTML = `${convertedData.main.humidity}%`;

        wind_speed.innerHTML = `${Math.ceil(convertedData.wind.speed)} m/s`;

        pressure.innerHTML = `${convertedData.main.pressure} hPa`;

        visibility.innerHTML = `${convertedData.visibility / 1000} km`;

        cloudiness.innerHTML = `${convertedData.clouds.all}%`;

        wind_direction.innerHTML = `${convertedData.wind.deg}°`;

        wind_gust.innerHTML = `${Math.ceil(convertedData.wind.gust)} m/s`;

        location_date.innerHTML = new Date().toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });

        const now = Math.floor(Date.now() / 1000);

        local_time.textContent = new Date((now + convertedData.timezone) * 1000).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            timeZone: "UTC"
        });

        searchCity.value = "";

    } catch (error) {

        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
        searchCity.value = "";

    }

    searchBtn.innerHTML = "Search"
}

