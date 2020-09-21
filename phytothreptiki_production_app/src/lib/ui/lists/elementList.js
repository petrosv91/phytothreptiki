import React from 'react';

import { List as ChakraList, Flex, Text, PseudoBox } from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';

import { ITEMS_PER_PAGE } from '../../../hooks/usePagination';
import { lot } from '../../../utils';
import ListItem from './listItem';

// const VAGONI_LENGTH = 3;

function WagonList({ data, isLoading, handleClick, ...rest }) {
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
        const key = uuidv4();
        const status = lot.findStatusById(item.STATUS);
        return (
          <ListItem
            key={key}
            position='relative'
            onClick={() => {
              handleClick(item);
            }}
          >
            <Flex align='center' justifyContent='flex-end'>
              {/* <Flex
                ml={3}
                justifyContent='center'
                align='center'
                w={16}
                h={16}
                borderRadius='full'
                bg='teal.200'
                color='teal.500'
                fontSize='md'
              >
                {`${item.DETAIL.length}/${VAGONI_LENGTH}`}
              </Flex> */}
              <Flex mr={6} flexDirection='column'>
                <Text fontSize='md' ml='auto'>
                  {item.CODE}
                </Text>
                <Flex justify='flex-end' pt={1}>
                  {item.DETAIL.map((lot, index) => {
                    return (
                      <PseudoBox
                        mr='1'
                        key={uuidv4()}
                        fontSize='sm'
                        color='gray.300'
                        _last={{ mr: '0' }}
                      >
                        {lot.CODE}
                        {index === item.DETAIL.length - 1 ? '' : ','}
                      </PseudoBox>
                    );
                  })}
                </Flex>
                <Text isTruncated fontSize='md' color='gray.300'>
                  {status?.label}
                </Text>
              </Flex>
            </Flex>
          </ListItem>
        );
      })}
    </ChakraList>
  );
}

export default React.memo(WagonList);
