import React, { useState, createContext } from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {

    const [movies, setMovies] = useState([
        {
            label: 'Harry Potter',
            price: '$10',
            id:1234
        },
        {
            label: 'Game of Thrones',
            price: '$20',
            id:5678
        },
        {
            label: 'Inception',
            price: '$30',
            id:8902
        }
    ]);

    return (
        <MovieContext.Provider value={[movies, setMovies]}>
            {props.children}
        </MovieContext.Provider>
    );
}