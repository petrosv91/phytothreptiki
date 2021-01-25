import React from 'react';

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
import RecipeFooter from './recipeFooter';
import RecipeHeader from './recipeHeader';
import RecipeMiddle from './recipeMiddle';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';

function Recipe() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const printRef = React.useRef();
  const [printLoading, setPrintLoading] = React.useState(false);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforePrint: () => setPrintLoading(true),
    onAfterPrint: () => setPrintLoading(false),
  });

  const { getValues, reset } = useFormContext();
  const [state, send] = useMainMachine();
  const isLoading = state.matches('gettingMaxCode');
  const isSubmitting = state.matches('recipeSubmitting');

  function onConfirm() {
    onClose();
    console.log(getValues());
    send({ type: 'DELETE_RECIPE', callback: reset });
    console.log(getValues());
  }

  return (
    <Flex
      p={[3, 5, 10]}
      maxW={[450, 800]}
      minW={[300, 400]}
      bg='background'
      boxShadow='md'
      direction='column'
    >
      <Loading isLoading={isSubmitting || isLoading} />
      <ComponentToPrint printRef={printRef} />
      <ConfirmationModal
        message={MESSAGE}
        isOpen={isOpen}
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

export default Recipe;
