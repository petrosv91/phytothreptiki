import React from 'react';

import { List as ChakraList, Flex, Text, Box } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import { ITEMS_PER_PAGE } from '../../../hooks/usePagination';
import ListItem from './listItem';

function ElementList({ data, isLoading, handleClick, ...rest }) {
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
              onClick={() => {
                handleClick(item);
              }}
            >
              <Flex px={6} align='center' justify='flex-end'>
                <Flex flexDirection='column'>
                  <Text textAlign='right'>{item.label}</Text>
                  <Flex mt={0.5} justify='flex-end'>
                    {item.formula.map((ingr) => {
                      return (
                        <Box
                          key={uuidv4()}
                          fontSize='sm'
                          _after={{ content: "'-'" }}
                          _last={{ _after: { content: "''" } }}
                        >
                          {ingr}
                        </Box>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>
            </ListItem>
          );
        })}
      </ChakraList>
    </AnimatePresence>
  );
}

export default React.memo(ElementList);
