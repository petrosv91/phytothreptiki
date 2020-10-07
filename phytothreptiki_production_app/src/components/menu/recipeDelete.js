import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/core';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { deleteData } from '../../api';
import { useNavbarTitle } from '../../hooks';
import { ConfirmationModal } from '../../lib/ui';
import Header from '../../lib/ui/header/header';
import { createToast } from '../../utils';
import PickingRecipe from '../recipe/pickingRecipe';

export default function RecipeDelete() {
  const toast = useToast();
  const history = useHistory();
  const { title } = useNavbarTitle();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutate, { status, error }] = useMutation(deleteData);

  const [item, setItem] = React.useState(undefined);
  const message = React.useMemo(
    () => `Θέλετε να διαγράψετε το στοιχείο ${item?.label}`,
    [item],
  );

  function handleback() {
    history.push('/');
  }
  async function onConfirm() {
    const response = await mutate({ id: item._id });
    onClose();
    if (error || !response) {
      createToast(toast, {
        type: 'error',
        content: error?.message,
        title: 'Προέκυψε Σφάλμα',
      });
      return;
    }
    createToast(toast, { type: 'success', title: 'Επιτυχής Διαγραφή!' });
  }
  function deleteItem(selectedItem) {
    onOpen();
    setItem(selectedItem);
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
      <Header my={4} handleback={handleback} title={title} />
      <PickingRecipe handleItemClick={deleteItem} />
    </Flex>
  );
}
