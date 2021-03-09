import React from 'react';

import { Box, ChakraProvider, Flex, Image } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import Logo from '../../assets/logo.png';
import { lightTheme } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { FormInput } from '../../lib/ui';
import ElementStore from '../element/elementStore';
import ProductStore from '../product/productStore';

function ComponentToPrint({ printRef }) {
  const [{ context }] = useMainMachine();
  const { getValues } = useFormContext();
  const { date, type, recipe, totalWeights, loops, weights } = getValues();

  return (
    <div style={{ display: 'none' }}>
      <ChakraProvider theme={lightTheme}>
        <Flex direction='column' ref={printRef}>
          <Flex justify='flex-end'>
            <FormInput
              w={150}
              tag='No.'
              fontSize='lg'
              color='red.500'
              defaultValue={context.code}
            />
          </Flex>
          <Box
            position='relative'
            _after={{
              content: "'ΣΥΝΤΑΓΕΣ ΥΔΑΤΟΔΙΑΛΥΤΩΝ'",
              w: '80%',
              position: 'absolute',
              top: '50%',
              left: '20%',
              color: 'white',
              bg: '#008D42',
              fontSize: 'sm',
              textAlign: 'center',
            }}
          >
            <Image src={Logo} boxSize='120px' />
          </Box>
          <Flex align='center' justify='space-between'>
            <FormInput w='30%' label='Ημερομηνία' defaultValue={date} />
            <FormInput w='30%' label='Τύπος' defaultValue={type} />
            <FormInput w='30%' label='Συνταγή' defaultValue={recipe} />
          </Flex>
          <Flex align='center' justify='space-between'>
            <FormInput label='Χαρμάνια' w='30%' defaultValue={loops} />
            <FormInput label='Κιλά' w='30%' tag='kg' defaultValue={weights} />
            <FormInput label='Συνολικά Κιλά' w='30%' tag='kg' defaultValue={totalWeights} />
          </Flex>
          <ElementStore mt={2} />
          <ProductStore mt={2} />
        </Flex>
      </ChakraProvider>
    </div>
  );
}

export default ComponentToPrint;
