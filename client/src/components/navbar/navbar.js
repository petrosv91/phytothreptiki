import React from 'react';

import { Box, Flex, Icon, Image, Stack, useDisclosure } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

import Logo from '../../assets/logo.png';
import { Drawer } from '../../lib/ui';
import CreateMenu from '../menu/createMenu';
import DeleteMenu from '../menu/deleteMenu';
import SearchMenu from '../menu/searchMenu';
import Settings from '../menu/settings';
import UpdateMenu from '../menu/updateMenu';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      px={10}
      bg='background'
      color='special.600'
      boxShadow='md'
      align='center'
      justify='space-between'
    >
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        heading={<Image src={Logo} m='0 auto' boxSize='100px' objectFit='scale-down' />}
        footer={<Settings drawerClose={onClose} />}
      >
        <Stack mt={10} spacing={8} direction='column' align='center'>
          <SearchMenu drawerClose={onClose} />
          <CreateMenu drawerClose={onClose} />
          <UpdateMenu />
          <DeleteMenu />
        </Stack>
      </Drawer>
      <Image src={Logo} boxSize='100px' objectFit='scale-down' />
      <Box display={['none', 'none', 'none', 'inline-block']}>
        <Stack direction='row' align='center' justify='flex-end'>
          <SearchMenu />
          <CreateMenu />
          <UpdateMenu />
          <DeleteMenu />
          <Settings />
        </Stack>
      </Box>
      <Icon
        as={MdMenu}
        boxSize={30}
        fill='special.500'
        cursor='pointer'
        onClick={onOpen}
        display={{ md: 'inline-block', lg: 'none' }}
      />
    </Flex>
  );
}

export default Navbar;
