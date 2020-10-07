import React from 'react';

import { Flex, Icon, List, Text } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { menus } from '../../config/menus';
import ListItem from '../../lib/ui/lists/listItem';

export default function Menu() {
  const history = useHistory();
  return (
    <List spacing={3}>
      {menus.map((menu, index) => {
        return (
          <ListItem
            p={8}
            key={index}
            onClick={() => {
              history.push(menu.url);
            }}
          >
            <Flex align='center' justify='space-between'>
              <Icon boxSize={6} as={menu.icon} />
              <Text>{menu.label}</Text>
            </Flex>
          </ListItem>
        );
      })}
    </List>
  );
}
