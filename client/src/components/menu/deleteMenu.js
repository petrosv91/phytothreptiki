import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';

import { Menu, Modal } from '../../lib/ui';
import DeleteElement from '../element/deleteElement';
import DeleteProduct from '../product/deleteProduct';
import DeleteProductionFile from '../productionFile/DeleteProductionFile';
import DeleteRecipe from '../recipe/deleteRecipe';

function DeleteMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ comp, label }, setComponent] = React.useState({});

  const options = [
    { label: 'Συνταγής', comp: <DeleteRecipe /> },
    { label: 'Στοιχείου', comp: <DeleteElement /> },
    { label: 'Προϊόντος', comp: <DeleteProduct /> },
    { label: 'Αρχείου Παραγωγής', comp: <DeleteProductionFile /> },
  ];

  function handleClick(opt) {
    onOpen();
    setComponent(opt);
  }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} header={`Αναζήτηση ${label}`}>
        {comp}
      </Modal>
      <Menu options={options} title='Διαγραφη' handleClick={handleClick} />
    </Box>
  );
}

export default DeleteMenu;
