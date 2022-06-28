const city = document.querySelector("#searchBar"),
searchBtn = document.querySelector("#search");
cityName = document.querySelector(".card h3");
imgContainer = document.querySelector("#img-container");
cityName = document.querySelector(".card h3");
weather = document.querySelector(".card .weather");
temp = document.querySelector(".card .Temp");
warning  =document.querySelector("#error");
warningSpan =document.querySelector("#error span");
loading = document.querySelector(".spinner-border");
locationBtn = document.querySelector("#locationBtn");
locWarn= document.querySelector(".warning");
let darkMode = document.querySelector(".dark-mode-toggler");
let moon = document.querySelector(".dark-mode-toggler i");
console.log(moon);
darkMode.addEventListener("click",()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        moon.classList.replace("fa-moon","fa-sun");
    }else{
        moon.classList.replace("fa-sun","fa-moon");
    }
})




locationBtn.addEventListener("click",(getLocation));

async function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSucc,onErr)
    }
}
 async function onSucc(onSucc){
    let lat =  onSucc.coords.latitude;
    let long =  onSucc.coords.longitude;
    let key = "8588f4674358406b99e3f2552e2744d3";
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${key}`;

    let request = await fetch(url);
    let response = await request.json();
    console.log(response);
    let cityName = await response.results[0].components.province;
    console.log(city);

    city.value = cityName;
    searchBtn.click();
   
}
function onErr(onErr){
locWarn.classList.add("active");
setTimeout(()=>{
    locWarn.classList.remove("active");
},3000);
};


searchBtn.addEventListener("click",()=>{
    loading.classList.add("active");
    getWeather(city.value);
})
async function getWeather(city){
    try {
        let url = await fetch(`https://api.weatherapi.com/v1/current.json?key=%209e5454216194494784b215325222606&q=${city}&aqi=yes`);
        let response = await url.json();
        loading.classList.remove("active");
        console.log(response);
        cityName.innerHTML=`${response.location.region} , ${response.location.country}`;
        let img = `<img src="${response.current.condition.icon}" alt="">`;
        imgContainer.innerHTML = img;
        weather.innerText = `${response.current.condition.text}`;
        temp.innerText = `${response.current.temp_c}°C`;
    } catch (err) {
          error();
    };
    
};
function error(){
    warning.classList.add("active");
    setTimeout(()=>{
        warning.classList.remove("active");
    },3000);
    cityName.innerText = "X";
    weather.innerText = "X";
    temp.innerText = "X";
    imgContainer.innerHTML = `<i class="fa-solid fa-x"></i>`;
};

