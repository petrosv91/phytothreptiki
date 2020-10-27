import React from 'react';

import { ListItem as ChakraListItem, Skeleton } from '@chakra-ui/core';
import { AnimatePresence, motion } from 'framer-motion';

function ListItem({ animation, children, onClick, isLoaded = true, ...rest }) {
  if (!isLoaded) {
    return (
      <Skeleton>
        <ChakraListItem height={24} width={300} rounded='md' {...rest}>
          {children}
        </ChakraListItem>
      </Skeleton>
    );
  }
  return (
    <AnimatePresence>
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
        custom={animation.index}
        initial={animation.shouldAnimate ? 'hidden' : 'visible'}
        animate='visible'
        exit='removed'
      >
        <ChakraListItem
          py={4}
          bg='white'
          width={300}
          cursor='pointer'
          onClick={onClick}
          rounded='md'
          color='gray.500'
          fontSize='md'
          fontWeight='semibold'
          borderRightWidth={15}
          borderColor='teal.200'
          _hover={{
            boxShadow: 'lg',
            color: 'gray.600',
            borderColor: 'teal.300',
          }}
          {...rest}
        >
          {children}
        </ChakraListItem>
      </motion.div>
    </AnimatePresence>
  );
}

export default ListItem;
