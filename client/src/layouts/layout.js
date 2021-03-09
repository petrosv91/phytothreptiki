import React from 'react';

import { Box, Flex } from '@chakra-ui/react';

function Layout({ children }) {
  return (
    <Box
      p={[3, 5, 10]}
      color='text'
      overflowY='scroll'
      overflowX='hidden'
      bg='secondaryBackground'
      height='calc(100vh - 100px)'
    >
      <Flex justify='center'>
        <Flex
          p={[3, 5, 10]}
          bg='background'
          boxShadow='md'
          direction='column'
          maxW={[450, 650, 850, 1000]}
          minW={[300, 400, 600, 1000]}
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Layout;
