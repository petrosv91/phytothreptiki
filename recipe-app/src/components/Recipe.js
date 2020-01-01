/** @format */

import React, { useState, Fragment } from 'react';
import style from '../style/recipe.module.css';

const Recipe = props => {
    const { title, calories, image, ingredients, healthLabels } = props;
    const [health, setHealth] = useState(false);
    const getCalories = () => {
        return Math.floor(calories);
    };

    const toggleHealth = () => {
        setHealth(!health);
    };

    const displayHealth = health ? (
        <Fragment>
            <ul>
                {healthLabels.map((healthLabel, index) => (
                    <li key={index}>{healthLabel}</li>
                ))}
            </ul>
            <button className={style.toggleBtn} onClick={toggleHealth}>
                Hide Health Labels
            </button>
        </Fragment>
    ) : (
        <button className={style.toggleBtn} onClick={toggleHealth}>
            Show Health Labels
        </button>
    );

    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <h4>{displayHealth}</h4>
            <img className={style.image} src={image} alt='' />
            <ol>
                {ingredients.map((ingredient, index) => (
                    <li key={index} className={style.ingredient}>
                        {ingredient.text}
                    </li>
                ))}
            </ol>
            <p>Calories: {getCalories()}</p>
        </div>
    );
};

export default Recipe;
