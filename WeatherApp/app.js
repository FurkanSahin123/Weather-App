const city = document.querySelector("#searchBar"),
searchBtn = document.querySelector("#search");
cityName = document.querySelector(".card h3");
img = document.querySelector(".card img");
cityName = document.querySelector(".card h3");
weather = document.querySelector(".card .weather");
temp = document.querySelector(".card .Temp");
warning  =document.querySelector("#error");
warningSpan =document.querySelector("#error span");
console.log(warningSpan.innerText);
searchBtn.addEventListener("click",()=>{
    getWeather(city.value);
})
setTimeout(console.log("sea"),3000);
async function getWeather(city){
    try {
        let url = await fetch(`https://api.weatherapi.com/v1/current.json?key=%209e5454216194494784b215325222606&q=${city}&aqi=yes`);
        let response = await url.json();
        console.log(response);
        cityName.innerHTML=`${response.location.region} , ${response.location.country}`;
        img.src = `${response.current.condition.icon}`;
        weather.innerText = `${response.current.condition.text}`;
        temp.innerText = `${response.current.feelslike_c}°C`;
    } catch (err) {
          error();
    }
    
   
};
function error(){
    warning.classList.add("active");
    setTimeout(()=>{
        warning.classList.remove("active");
    },3000);
};
