/** @format */

import React from 'react';
import styled from 'styled-components';
import FlashcardList from './components/FlashcardList/FlashcardList';
import { useApi } from './hooks/useApi';
import Category from './components/Category/Category';

export const AppWrapper = styled.div`
  max-width: 100%;
  margin: 1rem 2rem;
`;

function App() {
  const [data, loading, error, fetchdata] = useApi();

  const handleSubmit = (e, amount, category) => {
    e.preventDefault();
    fetchdata(amount, category);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  else
    return (
      <AppWrapper>
        <Category handleSubmit={handleSubmit} />
        <FlashcardList flashcards={data} />
      </AppWrapper>
    );
}

export default App;
