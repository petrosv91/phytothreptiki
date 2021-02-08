import React from 'react';

import { List as ChakraList, Flex, Text, Box } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import { ITEMS_PER_PAGE } from '../../../hooks/usePagination';
import ListItem from './listItem';

function ProductionFileList({ data, isLoading, handleClick, ...rest }) {
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
              animation={{
                index,
                shouldAnimate: shouldAnimate.current,
              }}
              onClick={() => {
                handleClick(item);
              }}
            >
              <Flex px={6} align='center' justify='flex-end'>
                <Flex direction='column'>
                  <Text textAlign='right'>{item.date}</Text>
                  <Flex mt={0.5} wrap='wrap' justify='flex-end'>
                    {item.productStore.map(({ label }) => {
                      return (
                        <Flex
                          key={uuidv4()}
                          fontSize='xs'
                          color='secondaryText'
                          _after={{ content: "','" }}
                          _last={{ _after: { content: "''" } }}
                        >
                          {label}
                        </Flex>
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

export default React.memo(ProductionFileList);
