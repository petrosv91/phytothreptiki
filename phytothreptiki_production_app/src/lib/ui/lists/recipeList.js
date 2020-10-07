import React from 'react';

import { List as ChakraList, Flex, Text, Icon } from '@chakra-ui/core';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
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
              {/* <Flex ml={4} direction='column' justify='space-between'>
                <Icon as={EditIcon} color='gray.300' size='md' cursor='pointer' />
                <Icon mt={4} as={CloseIcon} color='red.400' size='md' cursor='pointer' />
              </Flex> */}
              <Text mr={6}>{item.label}</Text>
            </Flex>
          </ListItem>
        );
      })}
    </ChakraList>
  );
}

export default React.memo(RecipeList);
