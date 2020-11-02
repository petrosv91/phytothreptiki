import React from 'react';

import { Flex, Icon, List, Text } from '@chakra-ui/core';
import { AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import { menus } from '../../config/menus';
import ListItem from '../../lib/ui/lists/listItem';

function Menu() {
  const history = useHistory();
  return (
    <AnimatePresence initial={true}>
      <List spacing={3}>
        {menus.map((menu, index) => {
          return (
            <ListItem
              p={8}
              key={index}
              itemIndex={index}
              listLength={menus.length}
              onClick={() => {
                history.push(menu.url);
              }}
            >
              <Flex align='center' justify='space-between'>
                <Icon boxSize={6} as={menu.icon} />
                <Text textAlign='right'>{menu.label}</Text>
              </Flex>
            </ListItem>
          );
        })}
      </List>
    </AnimatePresence>
  );
}

export default Menu;
