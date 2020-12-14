import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { Menu, Modal } from '../../lib/ui';
import CreateElement from '../element/createElement';
import CreateProduct from '../product/createProduct';

function CreateMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ comp, label }, setComponent] = React.useState({});
  const options = [
    { label: 'Στοιχείου', comp: <CreateElement /> },
    { label: 'Προιόντος', comp: <CreateProduct /> },
  ];

  function handleClick(opt) {
    onOpen();
    setComponent(opt);
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} header={`Δημιουργία ${label}`}>
        {comp}
      </Modal>
      <Menu options={options} title='Δημιουργία' handleClick={handleClick} />
    </div>
  );
}

export default CreateMenu;