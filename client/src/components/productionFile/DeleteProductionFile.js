import React from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';
import { queryCache } from 'react-query';

import useDeleteProductionFile from '../../api/mutations/useDeleteProductionFile';
import { ConfirmationModal } from '../../lib/ui';
import { createToast } from '../../utils';
import PickingProductionFile from './PickingProductionFile';

function DeleteProductionFile() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutate, { status }] = useDeleteProductionFile({
    onSuccess: () => {
      onClose();
      queryCache.refetchQueries(queryCache.refetchQueries(['productionFile'], { exact: true }));
      createToast(toast, { type: 'success', title: 'Επιτυχής Διαγραφή!' });
    },
  });

  const [item, setItem] = React.useState(undefined);
  const message = React.useMemo(() => {
    return `Θέλετε να διαγράψετε το αρχείο παραγωγής ${item?.date}`;
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
      <PickingProductionFile handleProductionClick={deleteItem} />
    </div>
  );
}

export default DeleteProductionFile;
