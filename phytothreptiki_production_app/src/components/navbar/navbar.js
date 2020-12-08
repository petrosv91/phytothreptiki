import React from 'react';

import { Flex, Heading } from '@chakra-ui/react';

import { useColorMode } from '../../context/colorModeProvider';
import Colorpicker from '../colorPicker/colorPicker';

function Navbar() {
  const { currentColor } = useColorMode();
  return (
    <Flex
      as='nav'
      w='full'
      wrap='wrap'
      color='colorText'
      boxShadow='md'
      padding='1.5rem'
      align='center'
      justify='space-between'
      bg={`${currentColor}.500`}
    >
      <Heading as='h1' size='md' cursor='pointer' letterSpacing={'-.1rem'}>
        MyProject
      </Heading>
      <Colorpicker />
    </Flex>
  );
}

export default Navbar;
