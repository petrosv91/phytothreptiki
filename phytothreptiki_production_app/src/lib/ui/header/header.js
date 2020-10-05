import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/core';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { Buttons } from '..';

export default function Header({ handleback, title, submit = false, ...rest }) {
  return (
    <Flex align='center' {...rest}>
      <Buttons.Icon icon={<ArrowBackIcon />} onClick={handleback} />
      <Box px='2' w='full' textAlign='center'>
        <Text as='h2' fontSize='md' fontWeight='bold'>
          {title}
        </Text>
      </Box>
      {submit && (
        <Buttons.Tertiary w={200} type='submit'>
          Καταχώρηση
        </Buttons.Tertiary>
      )}
    </Flex>
  );
}
