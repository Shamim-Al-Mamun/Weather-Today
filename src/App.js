import React, { useState } from 'react';
import DateBuilder from './utils/DateFormat';

const api = {
  key:"3a88351900e8bf244a68e2541c5fa6b8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() { 
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

const search = (event) => {
  if (event.key === "Enter") {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        setError('');
        if(result.message){
          setError(result.message);
        }
      });
    }
  }

  return (
    <>
      <main className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'warm' : 'cold') : 'bg-none'}>
        <section className='container'>
          <h3>Weather Today</h3>
          <input 
            type="text"
            placeholder="Enter a city name"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          {error && (
          <div className='error'>{error}</div>
           )}
          {(typeof weather.main != "undefined") ? (
            <>
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{DateBuilder(new Date())}</div>
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].main}</div>
            </>
          ) : (
          <div className="date">{DateBuilder(new Date())}</div>
        )}
          <a href="https://github.com/Shamim-Al-Mamun/Weather-Today"><i class="fab fa-github"></i> Source</a>
        </section>
      </main>
    </>
  );
}

export default App;
