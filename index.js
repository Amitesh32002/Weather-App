const key = "f826e6d9f6a7556b350405fb9e31c590";

const formEl = document.querySelector('form');
const details = document.querySelector(".details");
const inputEl = document.querySelector('input');

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    details.innerHTML = "Loading....";
    weatherApp(inputEl.value);
});

async function weatherApp(location) {
    const data = await fetchData(location);
    generatehtml(data);
}


async function fetchData(inputLocation) {

    const baseUrl = `http://api.weatherstack.com/current?access_key=${key}&query=${inputLocation}`;
    const resposne = await fetch(baseUrl);
    const data = await resposne.json();
    return data;
}

function generatehtml(data) {
    const html = `
    <h1 class="temp">${data.current.temperature}°C</h1>
    <h1 class="status">${data.current.weather_descriptions[0]}</h1>
    <div class="more_info">
        <p>Humidity- ${data.current.humidity}</p>
        <p>Obeserv. Time- ${data.current.observation_time}</p>
        <p>Visibility- ${data.current.visibility}</p>
        <p>Wind Dir.- ${data.current.wind_dir}</p>
        <h2>${data.location.name}</h2>
        </div>
        `

    details.innerHTML = html;
    inputEl.value = " ";
}