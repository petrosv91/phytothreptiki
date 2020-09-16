import React from 'react';

import { Box } from '@chakra-ui/core';

function Layout({ children }) {
  return (
    <Box color='white' minHeight='100' height='100vh' bg='gray.700' overflowX='hidden'>
      {children}
    </Box>
  );
}

export default Layout;
