import { combineReducers } from 'redux';
import messagesReducer from './message';
import usernameReducer from './username';
import reactionsReducer from './reactions';

export default combineReducers({
  messages: messagesReducer,
  username: usernameReducer,
  reactions: reactionsReducer
});
