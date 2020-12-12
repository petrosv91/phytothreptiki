import React from 'react';

import { Flex, Image, Stack } from '@chakra-ui/react';

import Logo from '../../assets/logo.png';
import { useColorMode } from '../../context/colorModeProvider';
import Colorpicker from '../colorPicker/colorPicker';
import CreateMenu from '../menu/createMenu';
import DeleteMenu from '../menu/deleteMenu';
import SearchMenu from '../menu/searchMenu';

function Navbar() {
  const { currentColor } = useColorMode();
  return (
    <Flex
      px={10}
      bg='background'
      color={currentColor}
      boxShadow='md'
      align='center'
      justify='space-between'
    >
      <Image src={Logo} boxSize='100px' objectFit='scale-down' />
      <Stack direction='row' spacing={5} align='center' justify='flex-end'>
        <SearchMenu />
        <CreateMenu />
        <DeleteMenu />
        <Colorpicker />
      </Stack>
    </Flex>
  );
}

export default Navbar;
