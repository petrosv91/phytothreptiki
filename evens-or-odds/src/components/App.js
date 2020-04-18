import React, { useEffect } from 'react';
import Instructions from './Instructions';
import { connect } from 'react-redux';
import { toggleGame } from '../actions/settings';
import { fetchNewDeck } from '../actions/deck';
import DrawCard from '../components/DrawCard';
import Card from './Card';
import Guess from './Guess';
import GameState from './GameState';
import './App.css';

const App = props => {
  const { gameStarted, toggleGame, fetchNewDeck, fetchState, message } = props;
  useEffect(() => {
    fetchNewDeck();
  }, [fetchNewDeck]);
  return (
    <div className="App">
      <h2>♤ ♥ Evens or Odds ♢ ♧</h2>
      {fetchState === 'error' ? (
        <>
          <p>Please try reloading the app. An error occured.</p>
          <p>{message}</p>
        </>
      ) : gameStarted ? (
        <>
          <h3>The Game is on!</h3>
          <button onClick={() => toggleGame(gameStarted)}>Cancel Game</button>
          <GameState />
          <br />
          <Guess />
          <br />
          <DrawCard />
          <br />
          <Card />
        </>
      ) : (
        <>
          <h3>A new game awaits</h3>
          <br />
          <button onClick={() => toggleGame(gameStarted)}>Start Game</button>
          <hr />
          <Instructions />
        </>
      )}
    </div>
  );
};

export default connect(
  ({ settings: { gameStarted }, deck: { fetchState, message } }) => ({
    gameStarted,
    fetchState,
    message
  }),
  {
    toggleGame,
    fetchNewDeck
  }
)(App);
