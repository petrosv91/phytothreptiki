import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import Colorpicker from '../colorPicker/colorPicker';

function Navbar() {
  const history = useHistory();

  return (
    <Flex
      as='nav'
      w='full'
      wrap='wrap'
      color='white'
      bg='teal.500'
      padding='1.5rem'
      align='center'
      boxShadow='md'
      justify='space-between'
    >
      <Heading
        as='h1'
        size='md'
        cursor='pointer'
        letterSpacing={'-.1rem'}
        onClick={() => {
          history.push('/');
        }}
      >
        MyProject
      </Heading>
      <Colorpicker />
    </Flex>
  );
}

export default Navbar;
