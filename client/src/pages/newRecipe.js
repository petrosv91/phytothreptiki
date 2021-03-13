import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';

import ElementForm from '../components/element/elementForm';
import ElementStore from '../components/element/elementStore';
import ComponentToPrint from '../components/print/componentToPrint';
import ProductForm from '../components/product/productForm';
import ProductStore from '../components/product/productStore';
import RecipeFooter from '../components/recipe/recipeFooter';
import RecipeHeader from '../components/recipe/recipeHeader';
import RecipeMiddle from '../components/recipe/recipeMiddle';
import { useMainMachine } from '../context/mainMachineProvider';
import { ConfirmationModal, Loading } from '../lib/ui';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';

function NewRecipe() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const printRef = React.useRef();
  const [printLoading, setPrintLoading] = React.useState(false);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => setPrintLoading(false),
  });
  const onPrint = React.useCallback(() => {
    setPrintLoading(true);
    handlePrint();
  }, [handlePrint]);

  const { reset } = useFormContext();
  const [state, send] = useMainMachine();
  const isLoading = state.matches('gettingMaxCode');
  const isSubmitting = state.matches('recipeSubmitting') || state.matches('productionSubmitting');

  function onConfirm() {
    onClose();
    send({ type: 'DELETE_RECIPE', callback: reset });
  }

  return (
    <Flex w='full' direction='column'>
      <Loading isLoading={isSubmitting || isLoading} />
      <ComponentToPrint printRef={printRef} />
      <ConfirmationModal
        isOpen={isOpen}
        message={MESSAGE}
        onClose={onClose}
        onConfirm={onConfirm}
      />
      <RecipeHeader
        onOpen={onOpen}
        onConfirm={onConfirm}
        handlePrint={onPrint}
        printLoading={printLoading}
      />
      <ElementForm mt={4} />
      <ElementStore mt={4} editable />
      <RecipeMiddle mt={4} />
      <ProductForm mt={4} />
      <ProductStore mt={4} editable />
      <RecipeFooter mt={4} />
    </Flex>
  );
}

export default NewRecipe;
