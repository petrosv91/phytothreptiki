import { Flex } from '@chakra-ui/layout';
import { useFormContext } from 'react-hook-form';

import ProductStore from '../components/product/productStore';
import { useMainMachine } from '../context/mainMachineProvider';
import { FormInput } from '../lib/ui';

function ProductionFile() {
  const [{ context }] = useMainMachine();
  const { register } = useFormContext();
  return (
    <Flex direction='column'>
      <Flex direction='column' pointerEvents='none'>
        <Flex mt={4} justify='flex-end'>
          <FormInput
            w={['full', '30%']}
            tag='No.'
            fontSize='lg'
            color='red.500'
            cursor='default'
            defaultValue={context.code}
          />
        </Flex>
        <Flex mt={4} align='center' justify='space-between' direction={['column', 'row']}>
          <FormInput
            w={['full', '45%']}
            name='date'
            label='Ημερομηνία'
            formRef={register}
          />
          <FormInput
            w={['full', '45%']}
            name='recipe'
            label='Συνταγή'
            formRef={register}
          />
        </Flex>
      </Flex>
      <ProductStore mt={4} />
    </Flex>
  );
}

export default ProductionFile;
