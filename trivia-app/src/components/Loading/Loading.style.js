/** @format */

import styled, { css } from 'styled-components';

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Spinner = styled.div`
  width: 4rem;
  height: 4rem;
  position: relative;
  margin: 10rem auto;
  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;

export const bounceStyle = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: hsl(200, 100%, 50%);
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2s infinite ease-in-out;
`;

export const FrontBounce = styled.div`
  ${bounceStyle};
`;
export const BackBounce = styled.div`
  ${bounceStyle};
  animation-delay: -1s;
`;
