import React from 'react';

import { Flex, Text } from '@chakra-ui/core';

import { Version } from '../../config/version';

function Footer() {
  return (
    <Flex w='full' color='gray.400' bottom='1' position='fixed' align='center' justify='center'>
      <Flex>
        MyProject 2020
        <Text ml='.5em' fontSize='lg'>
          &copy;
        </Text>
      </Flex>
      <Flex fontSize='sm' position='absolute' right='2'>
        Version: {Version}
      </Flex>
    </Flex>
  );
}

export default Footer;
