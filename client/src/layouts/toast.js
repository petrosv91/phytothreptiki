import React from 'react';

import { Flex, Icon, Text } from '@chakra-ui/react';
import { MdWarning, MdCheck, MdClose } from 'react-icons/md';

const colors = {
  success: 'special.500',
  error: 'yellow.500',
};
const icons = {
  success: MdCheck,
  error: MdWarning,
};

function Toast({ type = 'error', title, content, onClose }) {
  return (
    <Flex
      px={6}
      py={8}
      mb={5}
      maxW={[450, 400, 500]}
      minW={[300, 350, 450]}
      align='center'
      justify='space-between'
      rounded='sm'
      boxShadow='md'
      bg='secondaryBackground'
      borderWidth={2}
      borderColor={colors[type]}
    >
      <Icon as={icons[type]} color={colors[type]} boxSize={5} />
      <Flex direction='column' justify='center' align='center' color='text'>
        <Text lineHeight='1.5rem' fontWeight='semibold' fontSize='lg'>
          {title}
        </Text>
        <Text w='90%' px={3} textAlign='center' fontSize='md' fontWeight='400'>
          {content}
        </Text>
      </Flex>
      <Icon
        onClick={onClose}
        as={MdClose}
        boxSize={5}
        cursor='pointer'
        color='red.500'
        _hover={{ color: 'red.400' }}
      />
    </Flex>
  );
}

export default Toast;
