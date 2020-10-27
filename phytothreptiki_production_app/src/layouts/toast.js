import React from 'react';

import { Flex, Icon, Text, Box } from '@chakra-ui/core';

const colors = {
  success: 'teal.500',
  error: 'yellow.500',
};
const icons = {
  success: 'check',
  error: 'warning',
};

function Toast({ type = 'error', title, content, onClose }) {
  return (
    <Flex
      w={['sm', 'sm', 'md', 'md']}
      mb={[5, 5, 2, 2]}
      px={6}
      py={4}
      rounded='md'
      bg='gray.300'
      align='center'
      borderRightWidth={12}
      borderColor={colors[type]}
    >
      <Icon name={icons[type]} color={colors[type]} size='20px' />
      <Flex direction='column' w='full' justify='center' color='gray.700'>
        <Text as='h3' fontWeight='semibold'>
          {title}
        </Text>
        <Text maxW='90%' px={3}>
          {content}
        </Text>
      </Flex>
      <Box>
        <Icon onClick={onClose} cursor='pointer' name='close' color='gray.500' size='15px' />
      </Box>
    </Flex>
  );
}

export default Toast;
