import React from 'react';

import { ListItem as ChakraListItem } from '@chakra-ui/react';

import ListAnimation from '../../../animations/listAnimation';

function ListItem({ animation, children, onClick, ...rest }) {
  return (
    <ListAnimation animation={animation}>
      <ChakraListItem
        cursor='pointer'
        onClick={onClick}
        width={[250, 300]}
        py={4}
        rounded='md'
        fontSize={['sm', 'md']}
        boxShadow='md'
        fontWeight='500'
        borderRightWidth={15}
        color='text'
        bg='background'
        borderColor='special.500'
        transition='all 0.25s'
        _hover={{
          color: 'secondaryText',
          borderColor: 'special.600',
        }}
        {...rest}
      >
        {children}
      </ChakraListItem>
    </ListAnimation>
  );
}

export default ListItem;
