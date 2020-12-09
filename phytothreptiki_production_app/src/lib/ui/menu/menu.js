import React from 'react';

import { Button, Menu as ChakraMenu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { MdExpandMore } from 'react-icons/md';

function Menu({ handleClick, options, title }) {
  return (
    <ChakraMenu>
      <MenuButton
        w={150}
        as={Button}
        fontSize='md'
        cursor='pointer'
        variant='ghost'
        color='secondaryText'
        borderRadius={0}
        borderBottomWidth={1}
        borderBottomColor='text'
        rightIcon={<MdExpandMore />}
        _hover={{ color: 'text' }}
      >
        {title}
      </MenuButton>
      <MenuList minWidth={150} px={1} py={1} bg='background'>
        {options.map((opt, index) => {
          return (
            <MenuItem
              key={index}
              p={2}
              color='text'
              borderBottomWidth={1}
              borderBottomColor='secondaryText'
              _last={{ borderBottomWidth: 0 }}
              _hover={{ bg: 'gray.500' }}
              _focus={{ bg: 'gray.500' }}
              onClick={() => {
                handleClick(opt);
              }}
            >
              {opt.label}
            </MenuItem>
          );
        })}
      </MenuList>
    </ChakraMenu>
  );
}

export default Menu;
