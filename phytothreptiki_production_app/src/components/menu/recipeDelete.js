import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/react';

import useDeleteElements from '../../api/mutations/useDeleteElement';
import { ConfirmationModal } from '../../lib/ui';
import { createToast } from '../../utils';
import PickingRecipe from '../recipe/pickingRecipe';

function RecipeDelete() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutate, { status }] = useDeleteElements({
    onSuccess: () => {
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
    onClose();
    await mutate({ id: item });
  }

  return (
    <Flex direction='column'>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        message={message}
        callback={onConfirm}
        isLoading={status === 'loading'}
      />
      <PickingRecipe handleItemClick={deleteItem} />
    </Flex>
  );
}

export default RecipeDelete;
