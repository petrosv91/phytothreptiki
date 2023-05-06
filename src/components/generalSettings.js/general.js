import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useThemeMode } from '../../context/themeModeProvider';

function General() {
  const { toggleTheme, currentTheme } = useThemeMode();
  return (
    <Flex align='center' cursor='pointer' onClick={toggleTheme}>
      <Icon as={currentTheme === 'dark' ? FaSun : FaMoon} />
      <Text ml={2}>{currentTheme === 'dark' ? 'Φωτεινό Θέμα' : 'Σκούρο Θέμα'}</Text>
    </Flex>
  );
}

export default General;
