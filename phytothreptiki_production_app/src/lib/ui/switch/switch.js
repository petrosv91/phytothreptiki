import React from 'react';

import { Switch as ChakraSwitch } from '@chakra-ui/core';

function Switch({ formRef, ...rest }) {
  return <ChakraSwitch ref={formRef} size='lg' border={0} color='teal' {...rest} />;
}

export default Switch;
