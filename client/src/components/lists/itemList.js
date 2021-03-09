import React from 'react';

import { List as ChakraList } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

import ListItem from '../../lib/ui/lists/listItem';

function ItemList({ handleClick, data, Item }) {
  const shouldAnimate = React.useRef(true);

  React.useEffect(() => {
    if (data.length) {
      shouldAnimate.current = false;
    } else {
      shouldAnimate.current = true;
    }
  }, [data]);

  return (
    <AnimatePresence initial={false}>
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
