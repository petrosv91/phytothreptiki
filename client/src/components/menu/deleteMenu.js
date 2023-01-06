import { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { Accordion, Modal } from '../../lib/ui';
import DeleteElement from '../element/deleteElement';
import DeleteProduct from '../product/deleteProduct';
import DeleteRecipe from '../recipe/deleteRecipe';

function DeleteMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ comp, label }, setComponent] = useState({});

  const options = [
    { label: 'Συνταγής', comp: <DeleteRecipe /> },
    { label: 'Ά Ύλης', comp: <DeleteElement /> },
    { label: 'Προϊόντος', comp: <DeleteProduct /> },
  ];

  function handleClick(opt) {
    onOpen();
    setComponent(opt);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} header={`Αναζήτηση ${label}`}>
        {comp}
      </Modal>
      <Accordion options={options} title='Διαγραφη' handleClick={handleClick} />
    </>
  );
}

export default DeleteMenu;
