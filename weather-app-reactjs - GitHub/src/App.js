import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const api_info ={
  access_token:"6801f552c9a5793f0ef66d28a7c4f5d9",
  base:"http://api.openweathermap.org/data/2.5/"
}

function App() {
  //function to generate today's date in the required format --> day-date-month-year
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]; //d.getDay returns a number between 0 and 6
    let date = d.getDate();
    let month = months[d.getMonth()]; //d.getMonth returns a number between 0 and 11
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}` //returning a template string
  }

  const[Location,setLocation] =useState('');
  const[weather,setWeather] =useState({});

  //function to search the weather for the given location on pressing Enter Key
  const search =(e)=>
  {
    if(e.key==="Enter")
    {
      //js promise
      fetch(`${api_info.base}weather?q=${Location}&units=metric&APPID=${api_info.access_token}`)
      .then(res=>res.json())
      .then(result => {setWeather(result);
        setLocation('')});
        //after accessing the API by the url + api-token(GET type request) we are getting a json response as a result then that is passed to weather variable
    }
  }

  return (
    <div className="mainContainer" >
        <div className={
          (typeof weather.main != "undefined") 
          ? ((weather.main.temp > 18) 
          ? 'app warm' 
          : 'app') 
          : 'app'}>
          <main>
                <div className='search-box'>
                    <input type="text" className='search-bar'onChange={(e)=>setLocation(e.target.value)} value={Location} onKeyPress={search} placeholder='Search..'/>
                </div>
                {(typeof weather.main!="undefined")?(
                  // if part
                <div className='location-box'>
                    <div className='location'>
                      {weather.name},{weather.sys.country}
                      <br></br>
                      <div>
                        <h6>
                            Lat:<strong>{weather.coord.lat}</strong>, 
                            Long:<strong>{weather.coord.lon}</strong>
                          </h6> 
                      </div>
                      

                    </div>
                    <div className='date'>
                      {dateBuilder(new Date())}  {/* js function defined above */}
                    </div>
                    <div className="weather-box">
                      <div className="temp">
                        {Math.round(weather.main.temp)}°c
                        
                        <h6>Feels Like: {Math.round(weather.main.feels_like)}°c</h6>
                        <h6>Humidity: {Math.round(weather.main.humidity)}%</h6>
                      </div>
                      <div className="weather">{weather.weather[0].main}</div>
                    </div>
                </div>
                ):(
                  // else part
                  <div className="weather-box text-center text-justify">
                  <div className="temp2">
                    <p className='h3'>
                    <figure className="text-center">
                    <blockquote className="blockquote">
                      <p className='fs-4 text-light'><strong>Weather App.</strong></p>
                    </blockquote>
                    <figcaption className="blockquote-footer text-light">
                     <h6>Aritra Basak,
                      <cite title="Source Title">EY</cite>
                      </h6>
                    </figcaption>
              </figure>
                    </p>
                  </div>
                  <div className="weather"></div>
                </div>
                )}
            </main>
        </div>
    </div>
  );
}

export default App;
