import React from 'react';

import { Icon, Box, useDisclosure } from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';

import { DataTabs, Modal } from '../../lib/ui';
import Edit from '../generalSettings.js/edit';
import General from '../generalSettings.js/general';
import Info from '../generalSettings.js/info';

function Settings() {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const data = [
    {
      label: 'Θέμα',
      content: <General />,
    },
    {
      label: 'Επεξεργασία',
      content: <Edit />,
    },
    {
      label: 'Πληροφορίες',
      content: <Info />,
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
