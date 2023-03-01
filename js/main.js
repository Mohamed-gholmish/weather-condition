
let res;
let finalRes;

async function getWeather(city){
res=await fetch(`https://api.weatherapi.com/v1/current.json?key=ed134372d9ca436abb0173133232602&q=${city}&days=1`);
 finalRes=await res.json()
 const {temp_f}=finalRes.current;
 const {text}=finalRes.current.condition;


console.log(temp_f,text)

}

getWeather("london");

 
