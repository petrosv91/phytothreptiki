/** @format */

import React, { Fragment } from 'react';
import '../style/search.css';

const Search = props => {
    const { getWeather } = props;

    const handleSubmit = e => {
        e.preventDefault();
        const city = e.target.city.value;
        const country = e.target.country.value;
        getWeather(city, country);
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='city'
                    autoComplete='off'
                    placeholder='City'
                />
                <input
                    type='text'
                    name='country'
                    autoComplete='off'
                    placeholder='Country'
                />
                <button type='submit'>Get Weather</button>
            </form>
        </Fragment>
    );
};

export default Search;
