import React, { useContext } from 'react';
import { MovieContext } from './MovieContext';

const MovieList = () => {

    const [movies, setMovies] = useContext(MovieContext);

    return(
        <div className='list'>
            {
                movies.map(movie => (
                    <div key={movie.id}>
                        <h3>{movie.label}</h3>
                        <p>{movie.price}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default MovieList;