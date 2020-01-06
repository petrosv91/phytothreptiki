/** @format */

import React, { useState } from 'react';
import Recipe from './Recipe';
import Axios from 'axios';
import '../style/App.css';

const APP_ID = '01eb9223';
const APP_KEY = 'e8e89a4f4de711e701213371938fc3a2';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const getRecipes = async value => {
        await Axios.get(
            `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${value}&app_id=${APP_ID}&app_key=${APP_KEY}`
        )
            .then(response => {
                console.log(response.data.hits);
                setRecipes(response.data.hits);
            })
            .catch(error => alert(error.message));
    };

    const handleChange = e => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        getRecipes(searchValue);
    };

    const recipeData = recipes.map((recipe, index) => (
        <Recipe
            key={index}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            healthLabels={recipe.recipe.healthLabels}
        />
    ));

    return (
        <div className='App'>
            <form className='search-form' onSubmit={handleSubmit}>
                <input
                    className='search-bar'
                    type='text'
                    onChange={handleChange}
                />
                <button className='search-button' type='submit'>
                    Search
                </button>
            </form>
            <div className='recipes'>{recipeData}</div>
        </div>
    );
};

export default App;
