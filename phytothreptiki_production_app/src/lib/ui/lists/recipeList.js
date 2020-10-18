import React from 'react';

import { List as ChakraList, Flex, Text } from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';

import { ITEMS_PER_PAGE } from '../../../hooks/usePagination';
import ListItem from './listItem';
import { AnimatePresence } from 'framer-motion';

function RecipeList({ data, isLoading, handleClick, ...rest }) {
  const shouldAnimate = React.useRef(true);
  const SkeletoArray = new Array(ITEMS_PER_PAGE).fill(0);

  React.useEffect(() => {
    if (data.length) {
      shouldAnimate.current = false;
    } else {
      shouldAnimate.current = true;
    }
  }, [data]);

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
              onClick={() => {
                handleClick(item);
              }}
              animation={{ index, shouldAnimate: shouldAnimate.current }}
            >
              <Flex align='center' justify='flex-end'>
                <Text mr={6}>{item.label}</Text>
              </Flex>
            </ListItem>
          );
        })}
      </ChakraList>
    </AnimatePresence>
  );
}

export default React.memo(RecipeList);
