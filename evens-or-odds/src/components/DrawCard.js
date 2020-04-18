import React from 'react';
import { connect } from 'react-redux';
import { fetchNewCard } from '../actions/deck';

const DrawCard = ({ deck_id, fetchNewCard }) => {
  return (
    <>
      <button onClick={() => fetchNewCard(deck_id)}>Draw the next card!</button>
    </>
  );
};

export default connect(({ deck: { deck_id } }) => ({ deck_id }), {
  fetchNewCard
})(DrawCard);
