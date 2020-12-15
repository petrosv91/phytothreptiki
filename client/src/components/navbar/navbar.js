import React from 'react';

import { Box, Flex, Icon, Image, Stack, useDisclosure } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

import Logo from '../../assets/logo.png';
import { useColorMode } from '../../context/colorModeProvider';
import { Drawer } from '../../lib/ui';
import Colorpicker from '../colorPicker/colorPicker';
import CreateMenu from '../menu/createMenu';
import DeleteMenu from '../menu/deleteMenu';
import SearchMenu from '../menu/searchMenu';

function Navbar() {
  const { currentColor } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      px={10}
      bg='background'
      color={currentColor}
      boxShadow='md'
      align='center'
      justify='space-between'
    >
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        heading={<Image src={Logo} m='0 auto' boxSize='100px' objectFit='scale-down' />}
        footer={<Colorpicker drawerClose={onClose} />}
      >
        <Stack mt={10} spacing={8} direction='column' align='center'>
          <SearchMenu drawerClose={onClose} />
          <CreateMenu />
          <DeleteMenu />
        </Stack>
      </Drawer>
      <Image src={Logo} boxSize='100px' objectFit='scale-down' />
      <Box display={['none', 'none', 'inline-block']}>
        <Stack direction='row' align='center' justify='flex-end'>
          <SearchMenu />
          <CreateMenu />
          <DeleteMenu />
          <Colorpicker />
        </Stack>
      </Box>
      <Icon
        as={MdMenu}
        boxSize={30}
        fill={currentColor}
        cursor='pointer'
        onClick={onOpen}
        display={{ sm: 'inline-block', md: 'none' }}
      />
    </Flex>
  );
}

export default Navbar;
