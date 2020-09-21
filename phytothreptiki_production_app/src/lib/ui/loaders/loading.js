import React from 'react';

import { Flex, Spinner } from '@chakra-ui/core';

function Loading({ isLoading }) {
  if (!isLoading) return null;
  return (
    <Flex
      zIndex={999}
      position='fixed'
      bg='rgba(0,0, 0,0.6) '
      top='0'
      right='0'
      left='0'
      bottom='0'
      justifyContent='center'
      alignItems='center'
    >
      <Spinner size='xl' borderColor='teal.400' />
    </Flex>
  );
}

export default Loading;
