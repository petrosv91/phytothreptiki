import { Switch as ChakraSwitch } from '@chakra-ui/react';

function Switch({ formRef, name, ...rest }) {
  return (
    <ChakraSwitch
      name={name}
      ref={formRef}
      colorScheme='special'
      outline='none'
      {...rest}
    />
  );
}

export default Switch;
