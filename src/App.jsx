import { useState } from 'react'
import bg from './assets/b-image.jpg'
import './App.css'

function App() {

  const [city, setcity] = useState('')
  const [weather, setweather] = useState(null)

  const fetchWeather = async () => {
    if (!city) return

    const apiKey = "33d81447b7e6d51829031851861b75ab"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const result = await fetch(url)
    const final = await result.json()

    if (final.cod === 200) {
      setweather(final)
    } else {
      setweather(null)
      alert("City not found")
    }

    setcity("")
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="main">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setcity(e.target.value)}
        />

        <button onClick={fetchWeather}>Search</button>

        {weather && (
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
    </div>
  )
}

export default App
