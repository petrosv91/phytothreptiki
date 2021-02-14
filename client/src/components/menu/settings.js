import React from 'react';

import { Text, Icon, Box, useDisclosure, Flex } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

import { Version } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useThemeMode } from '../../context/themeModeProvider';
import { DataTabs, FormInput, Modal } from '../../lib/ui';

function Settings() {
  const [state, send] = useMainMachine();
  const { machineCapacity } = state.context;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { toggleTheme, currentTheme } = useThemeMode();

  function handleOnblur(e) {
    send({ type: 'ADD_ITEM', key: 'machineCapacity', data: Number(e.target.value) });
  }

  const data = [
    {
      label: 'Θέμα',
      content: (
        <Flex align='center' cursor='pointer' onClick={toggleTheme}>
          <Icon as={currentTheme === 'dark' ? FaSun : FaMoon} />
          <Text ml={2}>{currentTheme === 'dark' ? 'Φωτεινό Θέμα' : 'Σκούρο Θέμα'}</Text>
        </Flex>
      ),
    },
    {
      label: 'Επεξεργασία',
      content: (
        <FormInput
          w={230}
          tag='kg'
          label='Χωρητικότητα:'
          horizontal={true}
          onBlur={handleOnblur}
          defaultValue={machineCapacity}
        />
      ),
    },
    {
      label: 'Έκδοση',
      content: (
        <Flex align='center'>
          <Text fontWeight='semibold'>Version:</Text>
          <Text ml={4} fontWeight={500} color='gray.500'>
            {Version}
          </Text>
        </Flex>
      ),
    },
  ];

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} header='Ρυθμίσεις'>
        <DataTabs data={data} />
      </Modal>
      <Icon as={MdSettings} ml={4} cursor='pointer' boxSize={[7, 6, 5]} onClick={onOpen} />
    </Box>
  );
}

export default Settings;
