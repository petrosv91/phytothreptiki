/** @format */

import React, { useState, useEffect, useRef } from 'react';
import {
  FlipCard,
  Front,
  Back,
  FlashcardOptions,
  FlashcardOption
} from './Flashcard.style';

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');
  const frontEl = useRef();
  const backEl = useRef();

  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  };

  useEffect(setMaxHeight, []);
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <FlipCard
      flip={flip}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <Front ref={frontEl}>
        {flashcard.question}
        <FlashcardOptions>
          {flashcard.options.map(option => {
            return <FlashcardOption key={option}>{option}</FlashcardOption>;
          })}
        </FlashcardOptions>
      </Front>
      <Back ref={backEl}>{flashcard.answer}</Back>
    </FlipCard>
  );
};

export default Flashcard;
