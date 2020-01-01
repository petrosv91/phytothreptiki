/** @format */

import React, { useState, Fragment } from 'react';
import Weather from './Weather';
import Search from './Search';
import FadeIn from 'react-fade-in';
import 'weather-icons/css/weather-icons.css';

const API_KEY = '5f42f2768df46391b00caf5dff044b9f';
const API_URL = 'api.openweathermap.org/data/2.5/weather?q';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);

    const calcToCelcius = temp => {
        return Math.floor(temp - 273.15);
    };

    const getWeather = async (city, country) => {
        if (weatherData) setWeatherData(null); // makes animation reappear
        await fetch(`http://${API_URL}=${city},${country}&appid=${API_KEY}`)
            .then(response => response.json())
            .then(json => {
                setWeatherData({
                    city: json.name,
                    country: json.sys.country,
                    icon_id: json.weather[0].id,
                    description: json.weather[0].description,
                    celcius: calcToCelcius(json.main.temp),
                    temp_max: calcToCelcius(json.main.temp_max),
                    temp_min: calcToCelcius(json.main.temp_min)
                });
                console.log('Weather-Object:', json);
            })
            .catch(error => alert(error.message));
    };

    return (
        <Fragment>
            <Search getWeather={getWeather} />
            {weatherData ? (
                <FadeIn transitionDuration='600'>
                    <Weather {...weatherData} />
                </FadeIn>
            ) : null}
        </Fragment>
    );
};

export default App;
