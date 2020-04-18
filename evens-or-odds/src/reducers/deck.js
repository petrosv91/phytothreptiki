import { DECK, DECK_DRAW } from '../actions/types';

const fetchStates = {
  success: 'success',
  error: 'error'
};

const DEFAULT_DECK = {
  deck_id: '',
  remaining: 0,
  fetchState: '',
  message: '',
  cards: []
};

const deckReducer = (state = DEFAULT_DECK, action) => {
  const { remaining, deck_id, cards, message } = action;

  switch (action.type) {
    case DECK.FETCH_SUCCESS:
      return {
        ...state,
        remaining,
        deck_id,
        fetchState: fetchStates.success
      };
    case DECK.FETCH_ERROR:
      return {
        ...state,
        message,
        fetchState: fetchStates.error
      };
    case DECK_DRAW.FETCH_SUCCESS:
      return { ...state, cards, remaining, fetchState: fetchStates.success };
    case DECK_DRAW.FETCH_ERROR:
      return { ...state, cards, remaining, fetchState: fetchStates.error };
    default:
      return state;
  }
};

export default deckReducer;
