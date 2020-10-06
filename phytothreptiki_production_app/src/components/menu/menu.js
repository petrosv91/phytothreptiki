import React from 'react';

import { Flex, Icon, SimpleGrid, Text } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { menus } from '../../config/menus';

export default function Menu() {
  const history = useHistory();

  return (
    <SimpleGrid px={5} pt={30} columns={2} spacing={8}>
      {menus.map((menu) => (
        <Flex key={menu.id} direction='column' align='center' justify='center'>
          <Flex
            bg='gray.200'
            boxSize='100px'
            align='center'
            justify='center'
            cursor='pointer'
            borderRadius='lg'
            border='10px solid'
            borderColor='gray.400'
            onClick={() => {
              history.push(menu.url);
            }}
          >
            <Icon boxSize='32px' color='gray.600' as={menu.icon} />
          </Flex>
          <Text mt={2} color='gray.300' textAlign='center' fontWeight='bold'>
            {menu.label}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
}
