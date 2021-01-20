import React from 'react';

import { Switch as ChakraSwitch } from '@chakra-ui/react';

import { useColorMode } from '../../../context/colorModeProvider';

function Switch({ formRef, name, ...rest }) {
  const { currentColor } = useColorMode();
  return <ChakraSwitch name={name} ref={formRef} colorScheme={currentColor} {...rest} />;
}

export default Switch;
