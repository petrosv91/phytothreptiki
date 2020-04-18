import { SET_GAME_STARTED, SET_INSTRUCTIONS_EXPANDED } from '../actions/types';

export const toggleGame = value => {
  return {
    type: SET_GAME_STARTED,
    gameStarted: !value
  };
};

export const toggleInstructions = value => {
  return {
    type: SET_INSTRUCTIONS_EXPANDED,
    instructionsExpanded: !value
  };
};
