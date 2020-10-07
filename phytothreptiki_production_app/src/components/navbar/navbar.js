import React from 'react';

import { Flex, Heading } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

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
      justify='flex-start'
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
    </Flex>
  );
}

export default Navbar;
