import React from 'react';

import { ListItem as ChakraListItem, Skeleton } from '@chakra-ui/react';

import ListAnimation from '../../../animations/listAnimation';
import { useColorMode } from '../../../context/colorModeProvider';

function ListItem({ itemIndex, children, onClick, isLoaded = true, ...rest }) {
  const { currentColor } = useColorMode();
  if (!isLoaded) {
    return (
      <Skeleton>
        <ChakraListItem height={14} width={[250, 300]} rounded='md' {...rest}>
          {children}
        </ChakraListItem>
      </Skeleton>
    );
  }
  return (
    <ListAnimation index={itemIndex}>
      <ChakraListItem
        cursor='pointer'
        onClick={onClick}
        width={[250, 300]}
        py={4}
        rounded='md'
        fontSize='md'
        boxShadow='md'
        fontWeight='semibold'
        borderRightWidth={15}
        color='secondaryText'
        bg='secondaryBackground'
        borderColor={`${currentColor}.500`}
        transition='all 0.25s'
        _hover={{
          color: 'text',
          borderColor: `${currentColor}.300`,
        }}
        {...rest}
      >
        {children}
      </ChakraListItem>
    </ListAnimation>
  );
}

export default ListItem;
