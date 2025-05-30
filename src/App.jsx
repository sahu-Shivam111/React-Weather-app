import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const[city,setcity]=useState('')
  const[weather,setweather]=useState(null)

  const fetechWeather= async ()=>{
     const apiKey = "33d81447b7e6d51829031851861b75ab"
     const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
   const result= await fetch(url)

   const final =await result.json();
   if(final.cod==200)
    setweather(final)
   else{
    setweather(null)
    alert("city not found")
   }

   
   setcity("")
  }


  return (

    <>
  
    <div className='main'> <input type="text" value={city}
    placeholder='enter city name'

    onChange={(e)=>setcity(e.target.value)} />

    <button onClick={fetechWeather}>Search</button>
   {weather && weather.weather && (
  <div className="detail">
    <h1>{weather.name}</h1>
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt="Weather Icon"
    />
    <h2>Temperature: {weather.main.temp} °C</h2>
    <h3>Condition: {weather.weather[0].description}</h3>
    <h3>Humidity: {weather.main.humidity}%</h3>
  </div>
)}
</div>


    
    </>
  )
}

export default App
