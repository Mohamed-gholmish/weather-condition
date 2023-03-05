let res;
let finalRes;
let cites = document.querySelectorAll("#city");
let degrees = document.querySelectorAll(".degree");
let img = document.querySelectorAll("#img");
let day = document.querySelectorAll(".day");

// ============ events ====>
document.querySelector("#search").addEventListener("search", (e) => {
  let city = search.value;
  getWeather(city);
});

// ========= api===>
async function getWeather(city = "london") {
  try {
    res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=ed134372d9ca436abb0173133232602&q=${city}&days=3`
    );
    finalRes = await res.json();
  } catch (error) {
    console.log(error);
  }
  displayTodayWeather();
  getDateDay();
  diplayNexDate();
}

// ========= dealing with html===>
function displayTodayWeather() {
  const { temp_c } = finalRes.current;
  const { icon } = finalRes.current.condition;
  const { name: cityResponse } = finalRes.location;
  let { humidity, wind_kph, is_day } = finalRes.current;
  console.log(finalRes);
  if (is_day == 0) {
    is_day = "night";
  } else if (is_day == 1) {
    is_day = "light";
  }
  console.log(city);
  cites[0].innerHTML = cityResponse ;
  degrees[0].innerHTML = `<div class="num">${temp_c}<sup>o</sup>C</div>`;
  img[0].setAttribute("src", `https:${icon}`);
  document.querySelector(".foteer" ).innerHTML = ` <div class="others mt-5 d-flex justify-content-evenly"> <span>humidity : ${humidity} %</span><span> ${is_day}</span> <span>wind_kph : ${wind_kph}</span></div>`;
}

function diplayNexDate() {
  for (let i = 1; i < cites.length; i++) {
    img[i].setAttribute("src",`https:${finalRes.forecast.forecastday[i].day.condition.icon}` );
    degrees[i].innerHTML = finalRes.forecast.forecastday[i].day.maxtemp_c;
    day[i].innerHTML = getDateDay(finalRes.forecast.forecastday[i].date);
  }
}

function getDateDay(nexDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date();
  console.log(date.getDate());
  document.querySelector(".date").innerHTML = `${date.getDate()} ${
    months[date.getMonth()]
  }`;
  day[0].innerHTML = ` ${days[date.getDay()]}`;
  return days[new Date(nexDate).getDay()];
}

// ======= the first display ===>
getWeather();
