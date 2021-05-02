import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

function ProductList({ item }) {
  return (
    <Flex px={6} align='center' justify='flex-end'>
      <Text textAlign='right'>{item.label}</Text>
    </Flex>
  );
}

export default React.memo(ProductList);
