import React from 'react';

import { Box, Icon, Menu, MenuButton, MenuItem, MenuList, SimpleGrid } from '@chakra-ui/core';
import { MoonIcon, SettingsIcon, SunIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

import { useColorMode } from '../../context/colorModeProvider';
import { useThemeMode } from '../../context/themeModeProvider';

const MAX_LINEITEMS = 3;
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'messenger',
  'cyan',
  'purple',
  'pink',
  'blackAlpha',
  'whiteAlpha',
];

function Circle({ color }) {
  return <Box bg={`${color}.500`} borderRadius='full' height={5} width={5} />;
}

function Colorpicker() {
  const { colorChange } = useColorMode();
  const { toggleTheme, currentTheme } = useThemeMode();
  const MotionIcon = motion.custom(SettingsIcon);
  return (
    <Menu>
      <MenuButton>
        <MotionIcon boxSize={5} whileHover={{ rotate: 30 }} />
      </MenuButton>
      <MenuList minWidth='50px' bg='background'>
        <SimpleGrid columns={MAX_LINEITEMS}>
          {colors.map((color, index) => (
            <MenuItem
              key={index}
              mb={2}
              _focus={{ bg: `${color}.300` }}
              borderBottomWidth={1}
              borderBottomColor='secondaryText'
              onClick={() => colorChange(color)}
            >
              <Circle color={color} />
            </MenuItem>
          ))}
        </SimpleGrid>
        <MenuItem _focus={{ bg: 'gray.500' }} onClick={toggleTheme}>
          <Icon color='text' as={currentTheme === 'dark' ? SunIcon : MoonIcon} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Colorpicker;
