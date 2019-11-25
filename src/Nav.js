import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

    return(
        <div className='nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/movieList'>MovieList</Link></li>
            <li><Link to='/addMovie'>AddMovie</Link></li>
        </div>
    );
}

export default Nav;