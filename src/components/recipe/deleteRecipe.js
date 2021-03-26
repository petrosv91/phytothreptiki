import React from 'react';

import { useDisclosure, useToast } from '@chakra-ui/react';
import { queryCache } from 'react-query';

import useDeleteRecipe from '../../api/mutations/useDeleteRecipe';
import useGetRecipes from '../../api/queries/useGetRecipes';
import { ConfirmationModal, RecipeList } from '../../lib/ui';
import { createToast } from '../../utils';
import PickingItem from '../lists/pickingItem';

function DeleteRecipe() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getRecipes = useGetRecipes();
  const recipeKeys = React.useRef(['recipe', 'date']);
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
      <PickingItem
        showDate={true}
        keys={recipeKeys}
        List={RecipeList}
        promiseData={getRecipes}
        handleClick={deleteItem}
      />
    </div>
  );
}

export default DeleteRecipe;
