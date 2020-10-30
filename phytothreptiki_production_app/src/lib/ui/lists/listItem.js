import React from 'react';

import { ListItem as ChakraListItem, Skeleton } from '@chakra-ui/core';
import { motion } from 'framer-motion';

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
    <>
      <motion.div
        variants={{
          hidden: (index) => ({
            opacity: 0,
            y: -15 * index,
          }),
          visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
              delay: index * 0.025,
            },
          }),
          removed: {
            opacity: 0,
          },
        }}
        exit='removed'
        animate='visible'
        custom={animation.index}
        initial={animation.shouldAnimate ? 'hidden' : 'visible'}
      >
        <ChakraListItem
          cursor='pointer'
          onClick={onClick}
          py={4}
          width={[250, 300]}
          rounded='md'
          fontSize='md'
          boxShadow='md'
          fontWeight='semibold'
          borderRightWidth={15}
          borderColor={`${currentColor}.500`}
          color='secondaryText'
          bg='secondaryBackground'
          _hover={{
            color: 'text',
            borderColor: `${currentColor}.300`,
          }}
          transition='all 0.25s'
          {...rest}
        >
          {children}
        </ChakraListItem>
      </motion.div>
    </>
  );
}

export default ListItem;
