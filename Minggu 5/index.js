function fetchCurrentWeather() {
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-7.2492&longitude=112.7508&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const currentWeather = data.current_weather;
        const weatherCode = currentWeather.weathercode;

        const parsedTime = new Date(currentWeather.time);
        const currentTime = parsedTime.toLocaleString();

        const weatherDescriptions = {
          0: "Cerah sekali",
          1: "Mayoritas Cerah",
          2: "Beberapa Berawan",
        };

        const weatherDescription = weatherDescriptions[weatherCode] || "Unknown";

        document.getElementById("current-temperature").textContent = currentWeather.temperature;
        document.getElementById("current-time").textContent = currentTime;
        document.getElementById("current-weather-description").textContent = weatherDescription;
        document.getElementById("current-wind-speed").textContent = currentWeather.windspeed;
        document.getElementById("current-wind-direction").textContent = currentWeather.winddirection;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

fetchCurrentWeather();