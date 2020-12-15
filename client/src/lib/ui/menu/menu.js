import React from 'react';

import { Button, Menu as ChakraMenu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { MdExpandMore } from 'react-icons/md';

function Menu({ handleClick, options, title }) {
  return (
    <ChakraMenu placement='bottom'>
      <MenuButton
        w={150}
        as={Button}
        fontWeight='500'
        fontSize={['md', 'lg']}
        cursor='pointer'
        variant='ghost'
        rightIcon={<MdExpandMore />}
        _active={{ bg: 'none' }}
        _hover={{ color: 'secondaryText' }}
        _expanded={{ bg: 'none', color: 'text' }}
      >
        {title}
      </MenuButton>
      <MenuList p={1} minWidth={150} bg='background' borderRadius='sm'>
        {options.map((opt, index) => {
          return (
            <MenuItem
              key={index}
              p={2}
              color='text'
              fontWeight='400'
              fontSize={['sm', 'md']}
              borderBottomWidth={1}
              borderBottomColor='secondaryText'
              _last={{ borderBottomWidth: 0 }}
              _hover={{ bg: 'secondaryBackground' }}
              _focus={{ bg: 'secondaryBackground' }}
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
