
const searchCity = async () => {
    let city = document.querySelector("input").value;
    if (city) {

    let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

        current= await(await fetch(url1)).json();
        forecast= await(await fetch(url2)).json();

        currentDiv.innerHTML = `
            <h2>${current.name} (${ new Date(current.dt).toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${current.weather[0].icon}.png"</h2>
            <p>Temperature: ${current.main.temp} °F</p>
            <p>Humidity: ${current.main.humidity}%</p>
            <p>Wind Speed: ${current.wind.speed} MPH</p>
        `;
        console.log (current, forecast);
    
}}


btn.onclick = searchCity;
