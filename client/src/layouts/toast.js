import React from 'react';

import { Flex, Icon, Text } from '@chakra-ui/react';
import { MdWarning, MdCheck, MdClose } from 'react-icons/md';

const colors = {
  success: 'teal.500',
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
      py={4}
      mb={5}
      w={['sm', 'md']}
      align='center'
      justify='space-between'
      rounded='sm'
      boxShadow='md'
      bg='background'
      borderRightWidth={12}
      borderColor={colors[type]}
    >
      <Icon as={icons[type]} color={colors[type]} boxSize={5} />
      <Flex direction='column' justify='center' color='text'>
        <Text as='h3' fontWeight='semibold'>
          {title}
        </Text>
        <Text maxW='90%' px={3}>
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
