import React from 'react';

import { Flex } from '@chakra-ui/react';

function Layout({ children }) {
  return (
    <Flex
      color='text'
      direction='column'
      overflowY='scroll'
      overflowX='hidden'
      bg='secondaryBackground'
      height='calc(100vh - 100px)'
    >
      {children}
    </Flex>
  );
}

export default Layout;
