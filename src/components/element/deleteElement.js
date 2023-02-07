import { useRef, useState, useMemo } from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';
import { queryCache } from 'react-query';

import useDeleteElement from '../../api/mutations/useDeleteElement';
import useGetElements from '../../api/queries/useGetElements';
import { ConfirmationModal, ElementList } from '../../lib/ui';
import { createToast } from '../../utils';
import PickingItem from '../lists/pickingItem';

function DeleteElement() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const keys = useRef(['label', 'formula']);
  const getElements = useGetElements();
  const [mutate, { status }] = useDeleteElement({
    onSuccess: () => {
      onClose();
      queryCache.refetchQueries(queryCache.refetchQueries(['elements'], { exact: true }));
      createToast(toast, { type: 'success', title: 'Επιτυχής Διαγραφή!' });
    },
  });

  const [item, setItem] = useState(undefined);
  const message = useMemo(() => {
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
      <PickingItem
        keys={keys}
        List={ElementList}
        promiseData={getElements}
        handleClick={deleteItem}
      />
    </div>
  );
}

export default DeleteElement;
