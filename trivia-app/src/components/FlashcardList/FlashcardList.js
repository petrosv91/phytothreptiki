/** @format */

import React from 'react';
import { CardGrid } from './FlashcardList.style';
import Flashcard from '../Flashcard/Flashcard';

const FlashcardList = ({ flashcards }) => {
  return (
    <CardGrid>
      {flashcards.map(flashcard => {
        return <Flashcard key={flashcard.id} flashcard={flashcard} />;
      })}
    </CardGrid>
  );
};

export default FlashcardList;
