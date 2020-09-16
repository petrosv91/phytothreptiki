import React from 'react';

import { Flex, Heading, Text } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import useNavbarTitle from '../../hooks/useNavbarTitle';

function Navbar() {
  const history = useHistory();
  const title = useNavbarTitle();

  return (
    <Flex
      as='nav'
      w='full'
      wrap='wrap'
      color='white'
      bg='teal.400'
      padding='1.5rem'
      align='center'
      justify='space-between'
    >
      <Heading
        as='h1'
        size='md'
        cursor='pointer'
        letterSpacing={'-.1rem'}
        onClick={() => history.push('/')}
      >
        MyProject
      </Heading>
      <Text fontWeight='semibold' fontSize='md'>
        {title}
      </Text>
    </Flex>
  );
}

export default Navbar;
