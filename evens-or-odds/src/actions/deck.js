import { DECK, DECK_DRAW } from './types';

const API_ADDRESS = 'https://deck-of-cards-api-wrapper.appspot.com';

export const fetchDeckSuccess = deckJason => {
  const { remaining, deck_id } = deckJason;
  return { type: DECK.FETCH_SUCCESS, remaining, deck_id };
};

export const fetchCardSuccess = cardJason => {
  const { remaining, cards } = cardJason;
  return { type: DECK_DRAW.FETCH_SUCCESS, cards, remaining };
};

export const fetchDeckError = error => {
  return { type: DECK.FETCH_ERROR, message: error.message };
};

export const fetchNewDeck = () => dispatch => {
  return fetch(`${API_ADDRESS}/deck/new/shuffle`)
    .then(response => {
      if (response.status !== 200)
        throw new Error('Unsuccessful request to deckofcardsapi.com');
      else return response.json();
    })
    .then(json => dispatch(fetchDeckSuccess(json)))
    .catch(error => dispatch(fetchDeckError(error)));
};

export const fetchNewCard = deck_id => dispatch => {
  return fetch(`${API_ADDRESS}/deck/${deck_id}/draw`)
    .then(response => {
      if (response.status !== 200)
        throw new Error('Unsuccessful request to deckofcardsapi.com');
      else return response.json();
    })
    .then(json => dispatch(fetchCardSuccess(json)))
    .catch(error => dispatch(fetchDeckError(error)));
};
