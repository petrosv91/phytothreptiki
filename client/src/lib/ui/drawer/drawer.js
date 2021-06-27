import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
} from '@chakra-ui/react';

import useWindowSize from '../../../hooks/useWindowSize';

function Drawer({ isOpen, onClose, heading, children, footer }) {
  const { width } = useWindowSize();
  return (
    <ChakraDrawer
      size='xs'
      overflow='auto'
      isOpen={isOpen}
      onClose={onClose}
      placement={width < 480 ? 'bottom' : 'right'}
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
        {width < 480 && <DrawerHeader>{heading}</DrawerHeader>}
        <DrawerBody overflow='auto'>{children}</DrawerBody>
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
}

export default Drawer;
