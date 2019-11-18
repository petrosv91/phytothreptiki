import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, cancelGame } from '../actions/settings';
import { fetchDeckResult } from '../actions/deck';
import Instructions from './Instructions';

class App extends Component {

    startGame = () => {
        this.props.startGame();

        fetch('https://deckofcardsapi.com/api/deck/new/suffle')
            .then(response => response.json())
            .then(json => this.props.fetchDeckResult(json));
    }

    render() {

        const { gameStarted, cancelGame } = this.props;

        const gameStatus = gameStarted ? (
            <div>
                <h3>The game is on!</h3>
                <br />
                <button onClick={cancelGame}>Cancel Game</button>
            </div>
        ) : (
            <div>
                <h3>A new game awaits</h3>
                <br />
                <button onClick={this.startGame}>Start Game</button>
                <hr />
                <Instructions />
            </div>
        );

        return(
            <div>
                <h2>♤ ♡ Evens or Odds ♢ ♧ </h2>
                {gameStatus}
            </div>
        ) 
    }
}

// allows to attach values to the component according to what we want to read from the redux store
// by returning a function we can customize how we want this component connector to exactly make the connection
// between the component and the redux store. This happenned with a special fucntion called mapStateToProps
// use it to connect our components with the redux store, like provider and store
// share this Component with other files in the codebase

export default connect(
    state => ({ gameStarted: state.gameStarted }),
    { cancelGame, startGame, fetchDeckResult }
)(App);