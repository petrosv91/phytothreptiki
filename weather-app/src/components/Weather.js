/** @format */

import React from 'react';
import '../style/weather.css';

const Weather = props => {
    const {
        city,
        country,
        celcius,
        icon_id,
        temp_max,
        temp_min,
        description
    } = props;

    return (
        <div className='container'>
            <h1>
                {city}, {country}
            </h1>
            <i className={`wi wi-owm-${icon_id}`} />
            <h1>{celcius}&deg;</h1>
            <h2>
                <span>{temp_min}&deg;</span>
                <span>{temp_max}&deg;</span>
            </h2>
            <h2>{description}</h2>
        </div>
    );
};

export default Weather;
