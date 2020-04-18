import React from 'react';
import { connect } from 'react-redux';
import { toggleInstructions } from '../actions/settings';

const Instructions = ({ instructionsExpanded, toggleInstructions }) => {
  return (
    <>
      {instructionsExpanded ? (
        <>
          <h3>Instructions</h3>
          <p>Welcome to Even or Odds. The game goes like this</p>
          <p>
            The deck is shuffled. Then choose: will the next card be even or
            odd?
          </p>
          <p>Make a choice on every draw, and see how many you get right!</p>
          <br />
          <button onClick={() => toggleInstructions(instructionsExpanded)}>
            Show Less
          </button>
        </>
      ) : (
        <>
          <h3>Instructions</h3>
          <p>Welcome to Even or Odds. The game goes like this...</p>
          <button onClick={() => toggleInstructions(instructionsExpanded)}>
            Read More
          </button>
        </>
      )}
    </>
  );
};

export default connect(
  ({ settings: { instructionsExpanded } }) => ({ instructionsExpanded }),
  { toggleInstructions }
)(Instructions);
