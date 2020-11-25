import React from 'react';

import { Box, chakra, Flex, Icon, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import ListAnimation from '../../animations/listAnimation';
import { menus } from '../../config/menus';

function Menu() {
  const history = useHistory();
  const MotionBox = chakra(motion.div);
  return (
    <AnimatePresence initial={true}>
      <Flex wrap='wrap' px={2} pt={30} justify='center' align='center'>
        {menus.map((menu, index) => {
          return (
            <MotionBox key={index} whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
              <ListAnimation index={index}>
                <Box
                  w={200}
                  mr={5}
                  mt={5}
                  cursor='pointer'
                  borderRadius='lg'
                  overflow='hidden'
                  onClick={() => history.push(menu.url)}
                >
                  <Flex p={4} h={130} align='center' justify='center' bg='secondaryBackground'>
                    <Icon as={menu.icon} mr={4} boxSize={7} color='text' />
                    <Text color='text' fontWeight='bold' textAlign='center'>
                      {menu.label}
                    </Text>
                  </Flex>
                </Box>
              </ListAnimation>
            </MotionBox>
          );
        })}
      </Flex>
    </AnimatePresence>
  );
}

export default Menu;
