/** @format */

import styled from 'styled-components';

export const CardGrid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  margin: 1rem 0;
`;
