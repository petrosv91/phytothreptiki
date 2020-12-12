import React from 'react';

import { Flex, Spinner } from '@chakra-ui/react';

import { useColorMode } from '../../../context/colorModeProvider';

function Loading({ isLoading }) {
  const { currentColor } = useColorMode();
  if (!isLoading) return null;
  return (
    <Flex
      zIndex={999}
      position='fixed'
      bg='rgba(0,0,0,0.7)'
      top='0'
      right='0'
      left='0'
      bottom='0'
      justifyContent='center'
      alignItems='center'
    >
      <Spinner boxSize={20} borderColor={currentColor} borderWidth={4} />
    </Flex>
  );
}

export default Loading;
