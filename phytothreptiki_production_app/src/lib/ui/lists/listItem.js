import React from 'react';

import { ListItem as ChakraListItem, Skeleton } from '@chakra-ui/core';

function ListItem({ children, onClick, isLoaded = true, ...rest }) {
  const listItem = (
    <ChakraListItem
      py={4}
      bg='white'
      width={300}
      cursor='pointer'
      onClick={onClick}
      rounded='md'
      boxShadow='md'
      color='gray.500'
      fontSize='md'
      fontWeight='semibold'
      borderRightWidth={15}
      borderColor='teal.200'
      _hover={{ boxShadow: 'lg', color: 'gray.600', borderColor: 'teal.300' }}
      {...rest}
    >
      {children}
    </ChakraListItem>
  );
  if (isLoaded) {
    return listItem;
  }
  return (
    <Skeleton>
      <ChakraListItem height={24} width={300} rounded='md' {...rest}>
        {children}
      </ChakraListItem>
    </Skeleton>
  );
}

export default ListItem;
