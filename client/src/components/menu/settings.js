import React from 'react';

import { Text, Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

import { Version } from '../../config';
import { useThemeMode } from '../../context/themeModeProvider';

function Settings({ drawerClose = () => {} }) {
  const { toggleTheme, currentTheme } = useThemeMode();

  return (
    <div>
      <Menu>
        <MenuButton ml={4} cursor='pointer'>
          <Icon as={MdSettings} boxSize={[7, 6, 5]} />
        </MenuButton>
        <MenuList px={1} py={1} minWidth='50px' bg='background'>
          <MenuItem
            _hover={{ bg: 'secondaryBackground' }}
            _focus={{ bg: 'secondaryBackground' }}
            color='text'
            onClick={() => {
              drawerClose();
              toggleTheme();
            }}
          >
            <Icon as={currentTheme === 'dark' ? FaSun : FaMoon} />
            <Text ml={2}>{currentTheme === 'dark' ? 'Φωτεινό Θέμα' : 'Σκούρο Θέμα'}</Text>
          </MenuItem>
          <MenuItem
            _hover={{ bg: 'secondaryBackground' }}
            _focus={{ bg: 'secondaryBackground' }}
            color='secondaryText'
            pointerEvents='none'
          >
            <Text w='full' textAlign='right'>
              Version: {Version}
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Settings;
