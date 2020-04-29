/** @format */

import React from 'react';
import styled from 'styled-components';
import Category from './components/Category/Category';
import FlashcardList from './components/FlashcardList/FlashcardList';
import { useApi } from './hooks/useApi';
import { GlobalStyle } from './config/GlobalStyle';

export const AppWrapper = styled.div`
  max-width: 100%;
  margin: 1rem 2rem;
`;

function App() {
  const [data, loading, error, fetchdata] = useApi();

  return (
    <AppWrapper>
      <GlobalStyle />
      <Category fetchdata={fetchdata} />
      <FlashcardList flashcards={data} loading={loading} error={error} />
    </AppWrapper>
  );
}

export default App;
