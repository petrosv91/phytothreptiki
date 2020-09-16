import React from 'react';

import { Flex, Icon, SimpleGrid, Text, Box } from '@chakra-ui/core';
import { menus } from '../../config/menus';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Menu() {
  const history = useHistory();
  const [active, setActive] = React.useState(false);
  const MotionBox = motion.custom(Box);

  return (
    <SimpleGrid h='full' px={5} pt={30} spacing={8} columns={2}>
      {menus.map((menu) => (
        <Flex key={menu.id} direction='column' align='center' justify='center'>
          <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Flex
              h={100}
              w={100}
              bg='gray.200'
              align='center'
              justify='center'
              cursor='pointer'
              borderRadius='lg'
              border='10px solid'
              borderColor='gray.400'
              onClick={() => history.push(menu.url)}
            >
              <Icon size='32px' color='gray.600' name={menu.iconName} />
            </Flex>
          </MotionBox>
          <MotionBox animate={{ opactiy: active ? 1 : 0 }}>
            <Text mt={2} color='gray.300' textAlign='center' fontWeight='bold'>
              {menu.label}
            </Text>
          </MotionBox>
        </Flex>
      ))}
    </SimpleGrid>
  );
}
