import React from 'react';

import { Flex, Text } from '@chakra-ui/core';

import { Version } from '../../config/';

function Footer() {
  return (
    <Flex
      p='2'
      mt='auto'
      align='center'
      color='gray.400'
      position='relative'
      justify={{ sm: 'center', xs: 'flex-start' }}
    >
      <Flex>
        MyProject 2020
        <Text ml='.5em' fontSize='lg'>
          &copy;
        </Text>
      </Flex>
      <Flex fontSize='sm' position='absolute' right='1em'>
        Version: {Version}
      </Flex>
    </Flex>
  );
}

export default Footer;
