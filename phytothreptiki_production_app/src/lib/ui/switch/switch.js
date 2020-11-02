import React from 'react';

import { Switch as ChakraSwitch } from '@chakra-ui/core';

import { useColorMode } from '../../../context/colorModeProvider';

function Switch({ formRef, ...rest }) {
  const { currentColor } = useColorMode();

  return <ChakraSwitch ref={formRef} size='lg' border={0} color={currentColor} {...rest} />;
}

export default Switch;
