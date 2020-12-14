import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { Menu, Modal } from '../../lib/ui';
import DeleteElement from '../element/deleteElement';
import DeleteProduct from '../product/deleteProduct';
import DeleteRecipe from '../recipe/deleteRecipe';

function DeleteMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ comp, label }, setComponent] = React.useState({});

  const options = [
    { label: 'Συνταγής', comp: <DeleteRecipe /> },
    { label: 'Στοιχείου', comp: <DeleteElement /> },
    { label: 'Προιόντος', comp: <DeleteProduct /> },
  ];

  function handleClick(opt) {
    onOpen();
    setComponent(opt);
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} header={`Αναζήτηση ${label}`}>
        {comp}
      </Modal>
      <Menu options={options} title='Διαγραφη' handleClick={handleClick} />
    </div>
  );
}

export default DeleteMenu;
