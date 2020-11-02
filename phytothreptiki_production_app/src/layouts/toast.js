import React from 'react';

import { Flex, Icon, Text } from '@chakra-ui/core';
import { WarningIcon, CheckIcon, SmallCloseIcon } from '@chakra-ui/icons';

const colors = {
  success: 'teal.500',
  error: 'yellow.500',
};
const icons = {
  success: CheckIcon,
  error: WarningIcon,
};

function Toast({ type = 'error', title, content, onClose }) {
  return (
    <Flex
      px={6}
      py={4}
      mb={[5, 2]}
      w={['sm', 'md']}
      rounded='md'
      bg='gray.300'
      align='center'
      justify='space-between'
      borderRightWidth={12}
      borderColor={colors[type]}
    >
      <Icon as={icons[type]} color={colors[type]} boxSize={5} />
      <Flex direction='column' justify='center' color='gray.700'>
        <Text as='h3' fontWeight='semibold'>
          {title}
        </Text>
        <Text maxW='90%' px={3}>
          {content}
        </Text>
      </Flex>
      <Icon
        onClick={onClose}
        as={SmallCloseIcon}
        boxSize={5}
        cursor='pointer'
        color='red.500'
        _hover={{ color: 'red.400' }}
      />
    </Flex>
  );
}

export default Toast;
