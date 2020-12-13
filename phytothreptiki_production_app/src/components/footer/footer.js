import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { Version } from '../../config/';

function Footer() {
  return (
    <Flex
      py={2}
      px='1.5rem'
      mt='auto'
      align='center'
      color='gray.500'
      position='relative'
      justify={{ md: 'flex-start', lg: 'center' }}
    >
      <Flex>
        ΦΥΤΟΘΡΕΠΤΙΚΗ 2020
        <Text ml='.5em' fontSize={{ sm: 'sm', md: 'lg' }}>
          &copy;
        </Text>
      </Flex>
      <Flex fontSize='sm' position='absolute' right='2em'>
        Version: {Version}
      </Flex>
    </Flex>
  );
}

export default Footer;
