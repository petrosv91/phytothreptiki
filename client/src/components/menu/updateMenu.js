import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Menu, Modal } from '../../lib/ui';
import { isObjEmpty } from '../../utils';
import CreateElement from '../element/createElement';
import PickingElement from '../element/pickingElement';
import CreateProduct from '../product/createProduct';
import PickingProduct from '../product/pickingProduct';

function UpdateMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, send] = useMainMachine();
  const { updatedItem } = state.context;

  const [{ baseComp, secondComp, label }, setComponent] = React.useState({});

  const options = [
    {
      label: 'Στοιχείου',
      baseComp: <PickingElement handleElementClick={handleItemClick} />,
      secondComp: <CreateElement resetItem={handleResetItem} />,
    },
    {
      label: 'Προϊόντος',
      baseComp: <PickingProduct handleProductClick={handleItemClick} />,
      secondComp: <CreateProduct resetItem={handleResetItem} />,
    },
  ];

  function handleOptionClick(opt) {
    onOpen();
    setComponent(opt);
  }
  function handleItemClick(item) {
    send({ type: 'ADD_ITEM', key: 'updatedItem', data: item });
  }
  function handleResetItem() {
    send({ type: 'DELETE_ITEM', key: 'updatedItem' });
  }
  function handleOnClose() {
    send({ type: 'DELETE_ITEM', key: 'updatedItem', callback: onClose });
  }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={handleOnClose} header={`Μεταβολή ${label}`}>
        {isObjEmpty(updatedItem) ? baseComp : secondComp}
      </Modal>
      <Menu options={options} title='Μεταβολή' handleClick={handleOptionClick} />
    </Box>
  );
}

export default UpdateMenu;
