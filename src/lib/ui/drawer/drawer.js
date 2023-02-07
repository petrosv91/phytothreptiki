import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  useMediaQuery,
} from '@chakra-ui/react';

function Drawer({ isOpen, onClose, heading, children, footer }) {
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');
  return (
    <ChakraDrawer
      size='xs'
      overflow='auto'
      isOpen={isOpen}
      onClose={onClose}
      placement={isLargerThan480 ? 'right' : 'bottom'}
      isFullHeight={true}
    >
      <DrawerOverlay />
      <DrawerContent
        pt={8}
        pb={4}
        textAlign='center'
        borderRadius='sm'
        bg='secondaryBackground'
        color='special.500'
      >
        <DrawerCloseButton />
        {!isLargerThan480 && <DrawerHeader>{heading}</DrawerHeader>}
        <DrawerBody overflow='auto'>{children}</DrawerBody>
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
}

export default Drawer;
