import React from 'react';

import { ListItem as ChakraListItem, Skeleton } from '@chakra-ui/core';

function ListItem({ children, onClick, isLoaded = true, ...rest }) {
  const listItem = (
    <ChakraListItem
      width={300}
      cursor='pointer'
      onClick={onClick}
      rounded='md'
      bg='gray.500'
      textAlign='center'
      fontWeight='semibold'
      borderRightWidth={15}
      borderColor='teal.400'
      py={4}
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
      <ChakraListItem
        rounded='md'
        width={300}
        bg='gray.500'
        textAlign='center'
        fontWeight='semibold'
        borderRightWidth={15}
        borderColor='teal.400'
        height={24}
        {...rest}
      >
        {children}
      </ChakraListItem>
    </Skeleton>
  );
}

export default ListItem;
