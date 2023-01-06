import { useState } from 'react';

import { Box, Flex, Icon, Image, Stack, useDisclosure } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

import Logo from '../../assets/logo.png';
import { Drawer, Loading } from '../../lib/ui';
import CreateMenu from '../menu/createMenu';
import DeleteMenu from '../menu/deleteMenu';
import SearchMenu from '../menu/searchMenu';
import Settings from '../menu/settings';
import UpdateMenu from '../menu/updateMenu';

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  function handleClick() {
    onClose();
    setLoading((bool) => !bool);
  }

  return (
    <Flex
      px={10}
      bg='background'
      color='special.600'
      align='center'
      justify='space-between'
      boxShadow='md'
      zIndex={99}
      position='relative'
    >
      <Loading isLoading={loading} />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        heading={<Image src={Logo} m='0 auto' boxSize='100px' objectFit='scale-down' />}
        footer={<Settings drawerClose={onClose} />}
      >
        <Stack mt={10} direction='column' align='center'>
          <SearchMenu type='drawer' toggleLoading={handleClick} />
          <CreateMenu type='drawer' drawerClose={onClose} />
          <UpdateMenu type='drawer' />
          <DeleteMenu type='drawer' />
        </Stack>
      </Drawer>
      <Image src={Logo} boxSize='100px' objectFit='scale-down' />
      <Box display={['none', 'none', 'none', 'inline-block']}>
        <Stack direction='row' align='center' justify='flex-end'>
          <SearchMenu toggleLoading={handleClick} />
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
