import React from 'react';

import { Box, Flex, Icon, Text } from '@chakra-ui/core';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { Buttons } from '..';
import { useNavbarTitle } from '../../../hooks';

export default function Header({ handleback, submit = false, ...rest }) {
  const { title } = useNavbarTitle();
  return (
    <Flex align='center' {...rest}>
      <Icon
        boxSize={8}
        cursor='pointer'
        color='teal.300'
        as={ArrowBackIcon}
        onClick={handleback}
        _hover={{ color: 'teal.400' }}
        _focus={{ boxShadow: 'none' }}
      />
      <Box px='2' w='full' textAlign='center'>
        <Text as='h2' fontSize='lg' fontWeight='semibold' color='gray.700'>
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
