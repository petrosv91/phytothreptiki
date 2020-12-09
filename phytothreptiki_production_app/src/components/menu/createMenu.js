import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { Menu, Modal } from '../../lib/ui';
import CreateElement from '../element/createElement';
import CreateProduct from '../product/createProduct';

function CreateMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Component, setComponent] = React.useState();
  const options = [
    { label: 'Στοιχείου', comp: <CreateElement onClose={onClose} /> },
    { label: 'Προιόντος', comp: <CreateProduct onClose={onClose} /> },
  ];

  function handleClick(opt) {
    onOpen();
    setComponent(opt.comp);
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} header='Δημιουργία'>
        {Component}
      </Modal>
      <Menu options={options} title='Δημιουργία' handleClick={handleClick} />
    </div>
  );
}

export default CreateMenu;
