import React, {useContext} from 'react';
import { MovieContext } from './MovieContext';

const ShowMovie = props => {

    const [movies, setMovies] = useContext(MovieContext);

    return (
        <div>
            {
                movies.map(movie => {
                    if(movie.label === props.find)
                        return (
                            <div key={movie.id}>
                                <h3>{movie.label}</h3>
                                <p>{movie.price}</p>
                            </div>
                        );
                })
            }
        </div>
    );
}

export default ShowMovie;