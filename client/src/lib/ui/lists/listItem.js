import React from 'react';

import { ListItem as ChakraListItem, Skeleton } from '@chakra-ui/react';

import ListAnimation from '../../../animations/listAnimation';
import { useColorMode } from '../../../context/colorModeProvider';

function ListItem({ animation, children, onClick, isLoaded = true, ...rest }) {
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
        borderColor={currentColor}
        transition='all 0.25s'
        _hover={{
          color: 'secondaryText',
          borderColor: `${currentColor}AA`,
        }}
        {...rest}
      >
        {children}
      </ChakraListItem>
    </ListAnimation>
  );
}

export default ListItem;
