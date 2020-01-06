/** @format */

import React, { useState } from 'react';
import '../style/recipe.css';

const Recipe = props => {
    const { title, calories, image, ingredients, healthLabels } = props;
    const [displayHealth, setDisplayHealth] = useState(false);

    const toggleHealth = () => {
        setDisplayHealth(!displayHealth);
    };

    const health = displayHealth ? (
        <>
            <ul>
                {healthLabels.map((healthLabel, index) => (
                    <li key={index}>{healthLabel}</li>
                ))}
            </ul>
            <button className='toggleBtn' onClick={toggleHealth}>
                Hide Health Labels
            </button>
        </>
    ) : (
        <button className='toggleBtn' onClick={toggleHealth}>
            Show Health Labels
        </button>
    );

    return (
        <div className='recipe'>
            <h1 className='title'>{title}</h1>
            <h4>{health}</h4>
            <img className='image' src={image} alt='' />
            <ol>
                {ingredients.map((ingredient, index) => (
                    <li key={index} className='ingredient'>
                        {ingredient.text}
                    </li>
                ))}
            </ol>
            <p>Calories: {Math.round(Math.floor(calories) / 10)}</p>
        </div>
    );
};

export default Recipe;
