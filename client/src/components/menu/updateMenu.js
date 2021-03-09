import React from 'react';

import { Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { MdKeyboardBackspace } from 'react-icons/md';

import useGetElements from '../../api/queries/useGetElements';
import useGetProducts from '../../api/queries/useGetProducts';
import { useMainMachine } from '../../context/mainMachineProvider';
import { ElementList, Menu, Modal, ProductList } from '../../lib/ui';
import { isObjEmpty } from '../../utils';
import CreateElement from '../element/createElement';
import PickingItem from '../lists/pickingItem';
import CreateProduct from '../product/createProduct';

function UpdateMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, send] = useMainMachine();
  const { updatedItem } = state.context;

  const getElements = useGetElements();
  const getProducts = useGetProducts();

  const productKeys = React.useRef(['label']);
  const elementKeys = React.useRef(['label', 'formula']);

  const [{ baseComp, secondComp, label }, setComponent] = React.useState({});

  const options = [
    {
      label: 'Στοιχείου',
      baseComp: (
        <PickingItem
          keys={elementKeys}
          List={ElementList}
          promiseData={getElements}
          handleClick={handleItemClick}
        />
      ),
      secondComp: <CreateElement resetItem={handleResetItem} />,
    },
    {
      label: 'Προϊόντος',
      baseComp: (
        <PickingItem
          keys={productKeys}
          List={ProductList}
          promiseData={getProducts}
          handleClick={handleItemClick}
        />
      ),
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

  function Header() {
    return (
      <Flex justify='center'>
        <Flex w={300} align='center'>
          <Icon
            boxSize={8}
            cursor='pointer'
            color='special.500'
            as={MdKeyboardBackspace}
            onClick={handleResetItem}
          />
          <Text w='full' textAlign='center'>{`Μεταβολή ${label}`}</Text>
        </Flex>
      </Flex>
    );
  }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={handleOnClose} header={<Header />}>
        {isObjEmpty(updatedItem) ? baseComp : secondComp}
      </Modal>
      <Menu options={options} title='Μεταβολή' handleClick={handleOptionClick} />
    </Box>
  );
}

export default UpdateMenu;
