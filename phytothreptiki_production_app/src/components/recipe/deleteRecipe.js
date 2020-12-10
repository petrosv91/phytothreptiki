import React from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';
import { queryCache } from 'react-query';

import useDeleteRecipe from '../../api/mutations/useDeleteRecipe';
import { ConfirmationModal } from '../../lib/ui';
import { createToast } from '../../utils';
import PickingRecipe from './pickingRecipe';

function DeleteRecipe() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutate, { status }] = useDeleteRecipe({
    onSuccess: () => {
      onClose();
      queryCache.refetchQueries(queryCache.refetchQueries(['recipes'], { exact: true }));
      createToast(toast, { type: 'success', title: 'Επιτυχής Διαγραφή!' });
    },
  });

  const [item, setItem] = React.useState(undefined);
  const message = React.useMemo(() => {
    return `Θέλετε να διαγράψετε τη συνταγή ${item?.recipe}`;
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
      <PickingRecipe handleRecipeClick={deleteItem} />
    </div>
  );
}

export default DeleteRecipe;
