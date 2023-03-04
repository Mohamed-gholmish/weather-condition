let res;
let finalRes;

let search=document.querySelector("#search");

search.addEventListener("search",(e)=>{
  let cit=search.value;
  console.log(cit)
  getWeather(cit);
})


async function getWeather(city) {
  console.log(city)
  if(city===''||city==undefined){
    city='london'
  }
  res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=ed134372d9ca436abb0173133232602&q=${city}&days=1`
  );
  finalRes = await res.json();
  const { temp_f } = finalRes.current;
  const { text } = finalRes.current.condition;
  const { icon } = finalRes.current.condition;
  document.querySelector("#cit").innerHTML=city;
  let img = document.querySelector("#img");
  img.setAttribute("src", `${icon}`);

  console.log(temp_f, text);
}

getWeather();
