import React from 'react';

import { List as ChakraList, Flex, Text } from '@chakra-ui/core';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import { ITEMS_PER_PAGE } from '../../../hooks/usePagination';
import ListItem from './listItem';

function RecipeList({ data, isLoading, handleClick, ...rest }) {
  const SkeletoArray = new Array(ITEMS_PER_PAGE).fill(0);

  if (isLoading) {
    return (
      <ChakraList spacing={3} {...rest}>
        {SkeletoArray.map((value, index) => (
          <ListItem isLoaded={false} key={index}>
            {value}
          </ListItem>
        ))}
      </ChakraList>
    );
  }
  return (
    <AnimatePresence initial={false}>
      <ChakraList spacing={3} {...rest}>
        {data.map((item, index) => {
          return (
            <ListItem
              key={uuidv4()}
              itemIndex={index}
              listLength={data.length}
              onClick={() => {
                handleClick(item);
              }}
            >
              <Flex px={6} align='center' justify='flex-end'>
                <Text textAlign='right'>{item.label}</Text>
              </Flex>
            </ListItem>
          );
        })}
      </ChakraList>
    </AnimatePresence>
  );
}

export default React.memo(RecipeList);
