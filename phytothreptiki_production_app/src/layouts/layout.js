import React from 'react';

import { Flex } from '@chakra-ui/react';

function Layout({ children }) {
  return (
    <Flex
      direction='column'
      height='100vh'
      minHeight='100'
      overflowY='auto'
      overflowX='hidden'
      color='text'
      bg='secondaryBackground'
    >
      {children}
    </Flex>
  );
}

export default Layout;
