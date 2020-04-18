import { combineReducers } from 'redux';
import settingsReducer from './settings';
import deckReduser from './deck';
import gameStateReducer from './gameState';

export default combineReducers({
  settings: settingsReducer,
  deck: deckReduser,
  gameState: gameStateReducer
});
