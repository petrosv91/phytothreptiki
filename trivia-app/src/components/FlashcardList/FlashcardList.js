/** @format */

import React from 'react';
import { CardGrid } from './FlashcardList.style';
import Flashcard from '../Flashcard/Flashcard';
import Loading from '../Loading/Loading';

const FlashcardList = ({ flashcards, loading, error }) => {
  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;
  return (
    <CardGrid>
      {flashcards.map(flashcard => {
        return <Flashcard key={flashcard.id} flashcard={flashcard} />;
      })}
    </CardGrid>
  );
};

export default FlashcardList;
