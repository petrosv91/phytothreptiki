/** @format */

import React from 'react';
import {
  LoaderContainer,
  Spinner,
  FrontBounce,
  BackBounce
} from './Loading.style';

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner>
        <FrontBounce />
        <BackBounce />
      </Spinner>
    </LoaderContainer>
  );
};

export default Loader;
