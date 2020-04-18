import React from 'react';
import { connect } from 'react-redux';
import { setGuessEven, setGuessOdd } from '../actions/guess';

const Guess = ({ guess, setGuessEven, setGuessOdd }) => {
  return (
    <>
      <h3>Will it be even or odd?</h3>
      <button
        style={guess === 'even' ? { border: '2px solid #43a047' } : null}
        onClick={setGuessEven}
      >
        Even
      </button>{' '}
      <button
        style={guess === 'odd' ? { border: '2px solid #43a047' } : null}
        onClick={setGuessOdd}
      >
        Odd
      </button>
    </>
  );
};

export default connect(({ gameState: { guess } }) => ({ guess }), {
  setGuessEven,
  setGuessOdd
})(Guess);
