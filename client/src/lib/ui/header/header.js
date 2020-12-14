import React from 'react';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';

import { Buttons } from '..';
import { useColorMode } from '../../../context/colorModeProvider';
import { useNavbarTitle } from '../../../hooks';

function Header({ handleback, submit = false, ...rest }) {
  const { title } = useNavbarTitle();
  const { currentColor } = useColorMode();
  return (
    <Flex align='center' {...rest}>
      <Icon
        as={MdArrowBack}
        onClick={handleback}
        boxSize={9}
        cursor='pointer'
        color={currentColor}
        _hover={{ color: currentColor }}
      />
      <Box px='2' w='full' textAlign='center'>
        <Text as='h2' fontSize='lg' fontWeight='semibold' color='text'>
          {title}
        </Text>
      </Box>
      {submit && (
        <Buttons.Secondary w={200} type='submit'>
          Καταχώρηση
        </Buttons.Secondary>
      )}
    </Flex>
  );
}

export default Header;
