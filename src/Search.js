import React, { useState, useContext } from 'react';
import { MovieContext } from './MovieContext';
import Select from 'react-select';
import ShowMovie from './ShowMovie';


const Search = () => {

    const [find, setFind] = useState([]);
    const [movies, setMovies] = useContext(MovieContext);

    const handleChange = find  => {
        setFind(find);
    }

    return (
        <div>
            <Select
                style={{margin:100}}
                className='select'
                value={find}
                options={movies}
                onChange={handleChange}
                placeholder= "Search for a movie..."
                openMenuOnClick={false}
            />
            <ShowMovie find={find.label} />
        </div>
    );
}

export default Search;