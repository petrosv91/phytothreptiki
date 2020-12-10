import React from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';
import { queryCache } from 'react-query';

import useDeleteElement from '../../api/mutations/useDeleteElement';
import { ConfirmationModal } from '../../lib/ui';
import { createToast } from '../../utils';
import PickingElement from './pickingElement';

function DeleteElement() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutate, { status }] = useDeleteElement({
    onSuccess: () => {
      onClose();
      queryCache.refetchQueries(queryCache.refetchQueries(['elements'], { exact: true }));
      createToast(toast, { type: 'success', title: 'Επιτυχής Διαγραφή!' });
    },
  });

  const [item, setItem] = React.useState(undefined);
  const message = React.useMemo(() => {
    return `Θέλετε να διαγράψετε το στοιχείο ${item?.label}`;
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
      <PickingElement handleElementClick={deleteItem} />
    </div>
  );
}

export default DeleteElement;
