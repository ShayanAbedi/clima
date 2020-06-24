const API_URL =
  "http://api.weatherstack.com/current?access_key=808d0d8ef8bee473af81a7d37ff2a74f&query=";

// DOM selection
const form = document.querySelector(".search-form");

const spinner = document.querySelector(".spinner");

const locName = document.querySelector(".location-name");
const locRegion = document.querySelector(".location-region");
const locCountry = document.querySelector(".location-country");
const locTime = document.querySelector(".location-time");

const currentDesc = document.querySelector(".current-desc");
const currentTemp = document.querySelector(".current-temp");
const currentFeels = document.querySelector(".current-feels");
const currentImg = document.querySelector(".current-img");

spinner.style.display = "none";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const searched = formData.get("search");
  const unit = formData.get("unit");
  form.reset();
  callApi(searched, unit);
});

const callApi = async (location, unit) => {
  spinner.style.display = "";
  let response;
  if (unit === "C") {
    response = await fetch(`${API_URL}${location}`);
    // console.log(data);
  } else {
    response = await fetch(`${API_URL}${location}&units=f`);
    // console.log(data);
  }

  const data = await response.json();
  spinner.style.display = "none";

  // location name
  const name = data.location.name;
  locName.textContent = `${name}, `;
  // location region/state/province
  const region = data.location.region;
  locRegion.textContent = `${region}, `;
  // location country
  const country = data.location.country;
  locCountry.textContent = country;
  // local time
  const time = data.location.localtime;
  locTime.textContent = time;
  // temperature
  const temp = data.current.temperature;

  unit === "C"
    ? (currentTemp.textContent = `${temp} °C `)
    : (currentTemp.textContent = `${temp} °F`);
  // feels like
  const feels = data.current.feelslike;
  unit === "C"
    ? (currentFeels.textContent = `${feels} °C`)
    : (currentFeels.textContent = `${feels} °F`);
  // weather description
  const desc = data.current.weather_descriptions[0];
  currentDesc.textContent = desc;
  // weather icon
  const icon = data.current.weather_icons[0];
  currentImg.src = icon;
};
