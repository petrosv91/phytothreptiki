import { useRef, useEffect } from 'react';

import { List as ChakraList } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import { Skeleton } from '../../lib/ui';
import ListItem from '../../lib/ui/lists/listItem';

function ItemList({ handleClick, data, Item, loading }) {
  const shouldAnimate = useRef(true);

  useEffect(() => {
    if (data.length && !loading) {
      shouldAnimate.current = false;
    } else {
      shouldAnimate.current = true;
    }
  }, [data, loading]);

  if (loading) {
    return <Skeleton />;
  }
  return (
    <AnimatePresence initial={true}>
      <ChakraList pt={5} spacing={3}>
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
              <Item item={item} />
            </ListItem>
          );
        })}
      </ChakraList>
    </AnimatePresence>
  );
}

export default ItemList;
