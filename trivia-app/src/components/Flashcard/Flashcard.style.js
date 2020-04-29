/** @format */

import styled from 'styled-components';

export const FlipCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  position: relative;
  border-radius: 0.25rem;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
  background-color: white;
  cursor: pointer;
  transform: perspective(1000px) translateY(var(--translate-y, 0))
    ${props => (props.flip ? 'rotateY(180deg)' : 'rotateY(0)')};
  transform-style: preserve-3d;
  transition: transform 0.3s linear;
  :hover {
    --translate-y: -2px;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
  }
`;
export const Front = styled.div`
  position: absolute;
  left: 0;
  padding: 1em;
  backface-visibility: hidden;
`;
export const Back = styled.div`
  position: absolute;
  padding: 1em;
  text-align: center;
  transform: rotateY(180deg);
  backface-visibility: hidden;
`;
export const FlashcardOptions = styled.div`
  margin-top: 0.5rem;
`;
export const FlashcardOption = styled.div`
  margin-top: 0.25rem;
  color: #555;
  font-size: 0.75rem;
  :first-child {
    margin-top: 0;
  }
`;
