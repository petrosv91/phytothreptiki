import { useRef, useState } from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';

import { useMainMachine } from '../../context/mainMachineProvider';
import { ConfirmationModal, Loading } from '../../lib/ui';
import ElementForm from '../element/elementForm';
import ElementStore from '../element/elementStore';
import ComponentToPrint from '../print/componentToPrint';
import ProductForm from '../product/productForm';
import ProductStore from '../product/productStore';
import RecipeFooter from '../recipe/recipeFooter';
import RecipeHeader from '../recipe/recipeHeader';
import RecipeMiddle from '../recipe/recipeMiddle';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';

function NewRecipe() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const printRef = useRef();
  const [printLoading, setPrintLoading] = useState(false);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforePrint: () => setPrintLoading(true),
    onAfterPrint: () => setPrintLoading(false),
  });

  const { reset } = useFormContext();
  const [state, send] = useMainMachine();
  const isLoading = state.matches('gettingMaxCode');
  const isSubmitting =
    state.matches('recipeSubmitting') || state.matches('productionSubmitting');

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
        handlePrint={handlePrint}
        printLoading={printLoading}
      />
      <ElementForm mt={4} />
      <ElementStore mt={4} />
      <RecipeMiddle mt={4} />
      <ProductForm mt={4} />
      <ProductStore mt={4} />
      <RecipeFooter mt={4} />
    </Flex>
  );
}

export default NewRecipe;
