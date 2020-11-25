import React from 'react';

import { Box } from '@chakra-ui/react';

function Layout({ children }) {
  return (
    <Box
      bg='background'
      color='text'
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
