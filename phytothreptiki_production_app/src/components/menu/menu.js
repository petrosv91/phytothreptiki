import React from 'react';

import { Flex, Icon, SimpleGrid, Text, Box } from '@chakra-ui/core';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import { menus } from '../../config/menus';

export default function Menu() {
  const history = useHistory();
  const [active, setActive] = React.useState(false);
  const MotionBox = motion.custom(Box);

  return (
    <SimpleGrid px={5} pt={30} columns={2}>
      {menus.map((menu) => (
        <Flex key={menu.id} direction='column' align='center' justify='center'>
          <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Flex
              size='100px'
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
          <Text mt={2} color='gray.300' textAlign='center' fontWeight='bold'>
            {menu.label}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
}
