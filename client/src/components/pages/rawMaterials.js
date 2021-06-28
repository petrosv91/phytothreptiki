import { Flex } from '@chakra-ui/layout';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { FormInput } from '../../lib/ui';
import ElementStore from '../element/elementStore';
import RecipeFooter from '../recipe/recipeFooter';
import RecipeMiddle from '../recipe/recipeMiddle';

function RawMaterials() {
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
            w={['full', '30%']}
            name='date'
            label='Ημερομηνία'
            formRef={register}
          />
          <FormInput w={['full', '30%']} name='type' label='Τύπος' formRef={register} />
          <FormInput
            w={['full', '30%']}
            name='recipe'
            label='Συνταγή'
            formRef={register}
          />
        </Flex>
        <RecipeMiddle mt={4} />
      </Flex>
      <ElementStore mt={4} />
      <RecipeFooter mt={4} />
    </Flex>
  );
}

export default RawMaterials;
