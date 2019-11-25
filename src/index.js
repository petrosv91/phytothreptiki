import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import { MovieProvider } from './MovieContext'; // curly braces need cause this is not export by default but seperatedly
import App from './App';
import history from './history';
//import * as serviceWorker from './serviceWorker';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
import Nav from './Nav';
import ShowMovie from './ShowMovie';

ReactDOM.render(
    <Router history={history} >
        <MovieProvider>
            <Nav />
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/movieList' component={MovieList} />
                <Route exact path='/addMovie' component={AddMovie} />
                <Route exact path='/showMovie' component={ShowMovie} />
            </Switch>
        </MovieProvider>
    </Router>, 
    document.getElementById('root')
);

//serviceWorker.unregister();
