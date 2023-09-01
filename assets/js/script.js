let store = [];

const handleStorage = async () => {
    store = await localStorage.cities ? JSON.parse(localStorage.cities) : [];

    if (store.length) {
        historyDiv.innerHTML = "";
        store.forEach(city => {
            historyDiv.innerHTML += `<button onclick="historyCity('${city}')">${city}</button>`;
        });
    };
};

const historyCity = async (city) => {
    document.querySelector("input").value = city;
    searchCity();
};

handleStorage();

const searchCity = async () => {
    let city = document.querySelector("input").value;
    if (city) {

        let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

        let current = await (await fetch(url1)).json();
        let { list: forecast } = await (await fetch(url2)).json();

        if(!store.includes(current.name)){
            store.push(current.name);
            localStorage.setItem("cities", JSON.stringify(store));
            handleStorage();
        }

        currentDiv.innerHTML = `
            <h2>${current.name} (${new Date(current.dt).toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${current.weather[0].icon}.png"</h2>
            <p>Temperature: ${current.main.temp} °F</p>
            <p>Humidity: ${current.main.humidity}%</p>
            <p>Wind Speed: ${current.wind.speed} MPH</p>
        `;

        forecastDiv.innerHTML = "";
        for (let i = 0; i < forecast.length; i = i + 8) {
            forecastDiv.innerHTML += `
                    <div class="card">
                        <h3>${new Date(forecast[i].dt_txt).toLocaleDateString()}</h3>
                        <img src="https://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png">
                        <p>Temp: ${forecast[i].main.temp} °F</p>
                        <p>Humidity: ${forecast[i].main.humidity}%</p>
                    </div>
                `;
        }
    }
}


btn.onclick = searchCity;
