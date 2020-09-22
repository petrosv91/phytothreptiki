import React from 'react';

import { Flex, Icon, Box } from '@chakra-ui/core';
import { motion } from 'framer-motion';

export default function CreateNewEntry({ label, ...rest }) {
  const MotionBox = motion.custom(Box);

  return (
    <MotionBox whileTap={{ scale: 0.9 }} {...rest}>
      <Flex
        p='4'
        mt='2'
        w='full'
        bg='gray.500'
        align='center'
        direction='column'
        cursor='pointer'
        borderWidth='2px'
        borderStyle='dashed'
        borderColor='white'
      >
        {label}
        <Icon name='add' p='2' size='2em' rounded='full' border='1px solid white' />
      </Flex>
    </MotionBox>
  );
}
