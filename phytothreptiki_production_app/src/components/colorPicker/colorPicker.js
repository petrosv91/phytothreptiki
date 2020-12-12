import React from 'react';

import {
  Text,
  // Box,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  // SimpleGrid,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

// import { useColorMode } from '../../context/colorModeProvider';
import { useThemeMode } from '../../context/themeModeProvider';

// const MAX_LINEITEMS = 3;
// const colors = [
//   'red',
//   'orange',
//   'yellow',
//   'green',
//   'teal',
//   'blue',
//   'messenger',
//   'cyan',
//   'purple',
//   'pink',
//   'blackAlpha',
//   'whiteAlpha',
// ];

// function Circle({ color }) {
//   return <Box bg={`${color}.500`} borderRadius='full' height={5} width={5} />;
// }

function Colorpicker() {
  // const { colorChange } = useColorMode();
  const { toggleTheme, currentTheme } = useThemeMode();

  return (
    <div>
      <Menu>
        <MenuButton ml={4} cursor='pointer'>
          <Icon as={MdSettings} boxSize={5} />
        </MenuButton>
        <MenuList px={1} py={1} minWidth='50px' bg='background'>
          {/* <SimpleGrid columns={MAX_LINEITEMS}>
            {colors.map((color, index) => (
              <MenuItem
                mb={1}
                key={index}
                borderBottomWidth={1}
                borderBottomColor='secondaryText'
                onClick={() => colorChange(color)}
              >
                <Circle color={color} />
              </MenuItem>
            ))}
          </SimpleGrid> */}
          <MenuItem _hover={{ bg: 'secondaryBackground' }} color='text' onClick={toggleTheme}>
            <Icon as={currentTheme === 'dark' ? FaSun : FaMoon} />
            <Text ml={2}>{currentTheme === 'dark' ? 'Φωτεινό Θέμα' : 'Σκούρο Θέμα'}</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Colorpicker;
