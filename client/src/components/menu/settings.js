import React from 'react';

import { Text, Icon, Box, useDisclosure, Flex } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

import { Version } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useThemeMode } from '../../context/themeModeProvider';
import { DataTabs, Input, Modal } from '../../lib/ui';

function Settings({ drawerClose = () => {} }) {
  const [state, send] = useMainMachine();
  const { machineCapacity } = state.context;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { toggleTheme, currentTheme } = useThemeMode();
  const [query, setQuery] = React.useState(machineCapacity);

  function handleChange(e) {
    setQuery(e.target.value);
  }
  function handleOnblur() {
    send({ type: 'ADD_ITEM', key: 'machineCapacity', data: Number(query) });
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
        <Flex align='flex-end'>
          <Text fontWeight='semibold'>Χωρητικότητα</Text>
          <Input
            ml={4}
            w={100}
            size='sm'
            variant='flushed'
            value={query}
            onChange={handleChange}
            onBlur={handleOnblur}
          />
        </Flex>
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
