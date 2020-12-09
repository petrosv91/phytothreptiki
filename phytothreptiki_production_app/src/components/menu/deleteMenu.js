import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { Menu, Modal } from '../../lib/ui';

function DeleteMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Component, setComponent] = React.useState();
  const options = [{ label: 'Συνταγής' }, { label: 'Στοιχείου' }, { label: 'Προιόντος' }];

  function handleClick(opt) {
    onOpen();
    setComponent(opt.comp);
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} header='Διαγραφη'>
        {Component}
      </Modal>
      <Menu options={options} title='Διαγραφη' handleClick={handleClick} />
    </div>
  );
}

export default DeleteMenu;
