import { NEW_MESSAGE } from './types';
import uuid from 'uuid/v4'; // returns unique ip string that is partly based on the current timestamp
// allong with some randomly generated characters

export const newMessage = ({ text, username }) => ({
  type: NEW_MESSAGE,
  item: { id: uuid(), timestamp: Date.now(), text, username }
});
