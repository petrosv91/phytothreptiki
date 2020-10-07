import React from 'react';

import { List as ChakraList, Flex, Text, Box } from '@chakra-ui/core';
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
    <ChakraList spacing={3} {...rest}>
      {data.map((item) => {
        return (
          <ListItem
            key={uuidv4()}
            onClick={() => {
              handleClick(item);
            }}
          >
            <Flex align='center' justify='flex-end'>
              <Flex mr={6} flexDirection='column'>
                <Text>{item.label}</Text>
                <Flex mt={0.5} justify='flex-end'>
                  {item.formula.map((ingr) => {
                    return (
                      <Box
                        key={uuidv4()}
                        fontSize='sm'
                        color='gray.500'
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
  );
}

export default React.memo(ElementList);
