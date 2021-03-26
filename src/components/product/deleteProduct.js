import React from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';
import { queryCache } from 'react-query';

import useDeleteProduct from '../../api/mutations/useDeleteProduct';
import useGetProducts from '../../api/queries/useGetProducts';
import { ConfirmationModal, ProductList } from '../../lib/ui';
import { createToast } from '../../utils';
import PickingItem from '../lists/pickingItem';

function DeleteProduct() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const keys = React.useRef(['label']);
  const getProducts = useGetProducts();
  const [mutate, { status }] = useDeleteProduct({
    onSuccess: () => {
      onClose();
      queryCache.refetchQueries(queryCache.refetchQueries(['products'], { exact: true }));
      createToast(toast, { type: 'success', title: 'Επιτυχής Διαγραφή!' });
    },
  });

  const [item, setItem] = React.useState(undefined);
  const message = React.useMemo(() => {
    return `Θέλετε να διαγράψετε το προϊόν ${item?.label}`;
  }, [item]);

  function deleteItem(selectedItem) {
    onOpen();
    setItem(selectedItem);
  }
  async function onConfirm() {
    await mutate({ id: item._id });
  }

  return (
    <div>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        message={message}
        onConfirm={onConfirm}
        isLoading={status === 'loading'}
      />
      <PickingItem
        keys={keys}
        List={ProductList}
        promiseData={getProducts}
        handleClick={deleteItem}
      />
    </div>
  );
}

export default DeleteProduct;
