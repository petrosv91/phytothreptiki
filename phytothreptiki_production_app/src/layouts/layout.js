import React from 'react';

import { Box } from '@chakra-ui/core';

function Layout({ children }) {
  return (
    <Box
      bg='gray.700'
      color='white'
      height='100vh'
      minHeight='100'
      overflowY='auto'
      overflowX='hidden'
    >
      {children}
    </Box>
  );
}

export default Layout;