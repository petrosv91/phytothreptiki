import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/core';

import { Buttons } from '..';

export default function Header({ handleback, title, ...rest }) {
  return (
    <Flex align='center' {...rest}>
      <Buttons.Icon icon='arrow-back' onClick={handleback} />
      <Box px='2' w='full' textAlign='center'>
        <Text as='h2' fontSize='md' fontWeight='bold'>
          {title}
        </Text>
      </Box>
      <Buttons.Tertiary w={200} type='submit'>
        Καταχώρηση
      </Buttons.Tertiary>
    </Flex>
  );
}
