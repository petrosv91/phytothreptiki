import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useHistory } from 'react-router';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Menu, Modal } from '../../lib/ui';
import CreateElement from '../element/createElement';
import CreateProduct from '../product/createProduct';

function CreateMenu({ drawerClose = () => {} }) {
  const history = useHistory();
  const [, send] = useMainMachine();
  const { reset } = useFormContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ comp, label }, setComponent] = React.useState({});
  const options = [
    { label: 'Συνταγής', path: '/' },
    { label: 'Ά Ύλης', comp: <CreateElement /> },
    { label: 'Προϊόντος', comp: <CreateProduct /> },
  ];

  async function handleClick(opt) {
    if (opt.path) {
      await new Promise((resolve) => {
        return resolve(send({ type: 'DELETE_RECIPE', callback: reset }));
      });
      drawerClose();
      return history.push(opt.path);
    }
    onOpen();
    setComponent(opt);
  }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} header={`Δημιουργία ${label}`}>
        {comp}
      </Modal>
      <Menu options={options} title='Δημιουργία' handleClick={handleClick} />
    </Box>
  );
}

export default CreateMenu;
