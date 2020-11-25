import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { deleteData } from '../../api';
import { ConfirmationModal } from '../../lib/ui';
import Header from '../../lib/ui/header/header';
import { createToast } from '../../utils';
import PickingRecipe from '../recipe/pickingRecipe';

function RecipeDelete() {
  const toast = useToast();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutate, { status, error }] = useMutation(deleteData);

  const [item, setItem] = React.useState(undefined);
  const message = React.useMemo(() => {
    return `Θέλετε να διαγράψετε το στοιχείο ${item?.label}`;
  }, [item]);

  function handleback() {
    history.push('/');
  }
  function deleteItem(selectedItem) {
    onOpen();
    setItem(selectedItem);
  }
  async function onConfirm() {
    onClose();
    if (error) {
      createToast(toast, {
        type: 'error',
        content: 'Το στοιχείο δε μπόρεσε να διαγραφεί',
        title: 'Προέκυψε Σφάλμα',
      });
      return;
    }
    createToast(toast, { type: 'success', title: 'Επιτυχής Διαγραφή!' });
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
      <Header my={4} handleback={handleback} />
      <PickingRecipe handleItemClick={deleteItem} />
    </Flex>
  );
}

export default RecipeDelete;
