import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleSearchChange,Search}) => {
  return (
    <div>
      filter countries
      <input onChange={handleSearchChange} value={Search} />
    </div>
  )
}

const Countries = ({countries, showCountry, getWeather, weather}) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, narrow the seach</div>
    )
  } else if (countries.length === 0) {
    return (
      <div>No countries to show</div>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    if (weather === '') {
      getWeather(country.capital)
      return (
        <div></div>
      )
    } else {
      return (
        <div>
          <h1>{country.name}</h1>
          <b>Capital:</b> {country.capital}<br/>
          <b>Population: </b> {country.population}
          <h2>Languages</h2>
          <ul>
            {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
          </ul>
          <img src={country.flag} alt={country.name} width="200"/>
          <h2>Weather in {country.capital}</h2>
          <Weather weather={weather.current}/>
        </div>
      )
    }
  }
  else {
    return (
      <div>
        {countries.map(country =>
        <div key={country.name}>{country.name} 
        <Button handleClick={showCountry} countryToShow={country.name} />
        </div>)}
      </div>
    )
  }
}

const Weather = ({weather}) => {
  return (
    <div>
      <img src={weather.weather_icons[0]} alt='weather'/><br/>
      <b>Temperature:</b> {weather.temperature} °C<br/>
      <b>Wind:</b> {Math.round(weather.wind_speed/3.6)} m/s, direction {weather.wind_dir}<br/>
      <b>Pressure:</b> {weather.pressure} hPa<br/>
      <b>Precipitation:</b> {weather.precip} mm/h<br/>
      <b>UV index:</b> {weather.uv_index}<br/>
      <b>Visibility:</b> {weather.visibility} km<br/>
      <b>Cloudiness:</b> {weather.cloudcover} %
    </div>
  )
}

const Button = ({handleClick, countryToShow}) => {
  return (
    <button onClick={() => handleClick(countryToShow)}>
        show
    </button>
  )
  }

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow,setCountriesToShow] = useState([])
  const [Search, setSearch] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    const search = event.target.value
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(search.toLowerCase()))
    
    setCountriesToShow(filteredCountries)
    setSearch(search)
    setWeather('')
  }

  const showCountry = (countryToShow) => {
    const filteredCountry = countries.filter(country =>
      country.name.includes(countryToShow))
    setCountriesToShow(filteredCountry)
    setSearch(countryToShow)
  }

  const getWeather = (city) => {
    const key = '3d033de51e4c0eadb9d213cb78c8faac'
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`
    return axios.get(url).then(response => {
       setWeather(response.data)
     })
  }

  return (
    <div>
      <Filter handleSearchChange={handleSearchChange} Search={Search}/>
      <Countries
        countries={countriesToShow}
        showCountry={showCountry}
        getWeather={getWeather}
        weather={weather}
      />
    </div>
  )
}

export default App;
