import React from 'react';

import { List as ChakraList, Flex, Text, PseudoBox } from '@chakra-ui/core';
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
            <Flex align='center' justifyContent='flex-end'>
              <Flex mr={6} flexDirection='column'>
                <Text color='gray.200' fontSize='md' ml='auto'>
                  {item.label}
                </Text>
                <Flex justify='flex-end' pt={1}>
                  {item.formula.map((ingr, index) => {
                    return (
                      <PseudoBox
                        mr='1'
                        key={uuidv4()}
                        fontSize='sm'
                        color='gray.200'
                        _last={{ mr: '0' }}
                      >
                        {ingr}
                        {index === item.formula.length - 1 ? '' : '-'}
                      </PseudoBox>
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
