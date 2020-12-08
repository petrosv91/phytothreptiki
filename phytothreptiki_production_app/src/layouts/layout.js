import React from 'react';

import { Flex } from '@chakra-ui/react';

function Layout({ children }) {
  return (
    <Flex
      bg='background'
      color='text'
      height='100vh'
      minHeight='100'
      overflowY='auto'
      overflowX='hidden'
      direction='column'
    >
      {children}
    </Flex>
  );
}

export default Layout;
