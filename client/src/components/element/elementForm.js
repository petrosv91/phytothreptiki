import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { baseElements } from '../../config/';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useReactFormSchema } from '../../hooks';
import useStoreValidation from '../../hooks/useStoreValidation';
import { Modal, Buttons, FormInput, FormSwitch } from '../../lib/ui';
import { convertStringToArrayOfNumbers } from '../../utils';
import PickingElement from './pickingElement';

function ElementForm() {
  const { validate } = useStoreValidation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { elementFormSchema } = useReactFormSchema();
  const { register, handleSubmit, setValue, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(elementFormSchema),
  });

  const [state, send] = useMainMachine();
  const { elementSwitch = false } = state.context.switches;

  function onSubmit(formData) {
    if (!validate(formData, 'element')) {
      return;
    }
    send({
      type: 'ADD_ROW',
      key: 'elementStore',
      data: { id: uuidv4(), ...formData },
      callback: reset,
    });
  }
  function handleElementClick(el) {
    onClose();
    Object.entries(el).forEach(([key, value]) => {
      if (key === 'formula') {
        const formula = value.join('-');
        return setValue(key, formula);
      }
      if (key === 'baseElement') {
        return setValue(key, value?.label);
      }
      setValue(key, value);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης'>
        <PickingElement handleElementClick={handleElementClick} />
      </Modal>
      <Flex direction='column'>
        <FormSwitch
          size='lg'
          name='elementSwitch'
          label={`${elementSwitch ? 'Απενεργοποίηση' : 'Ενεργοποίηση'} πεδίων για Ά Ύλες`}
          isChecked={elementSwitch}
          onChange={() => send({ type: 'TOGGLE', key: 'elementSwitch' })}
        />
        {elementSwitch && (
          <>
            <FormInput
              name='label'
              label='Ά Ύλη'
              onClick={onOpen}
              leftIcon={MdSearch}
              rightIcon={MdClose}
              rightIconClick={reset}
              errors={errors}
              formRef={register}
            />
            <Flex direction={['column', 'row']} align='center' justify='space-between'>
              <FormInput
                w={['full', '45%']}
                name='rate'
                label='Συμμετοχή'
                tag='%'
                type='number'
                errors={errors}
                formRef={register}
              />
              <FormInput
                w={['full', '45%']}
                name='price'
                label='Τιμή'
                tag='€'
                type='number'
                step='any'
                errors={errors}
                formRef={register}
              />
            </Flex>
            <Flex direction={['column', 'row']} align='center' justify='space-between'>
              <FormInput
                w={['full', '45%']}
                name='formula'
                label='Στοιχεία'
                cursor='default'
                pointerEvents='none'
                errors={errors}
                formRef={register({
                  setValueAs: (formula) => {
                    return convertStringToArrayOfNumbers(formula, '-');
                  },
                })}
              />
              <FormInput
                w={['full', '45%']}
                name='baseElement'
                label='Βασικό Στοιχείο'
                cursor='default'
                pointerEvents='none'
                errors={errors}
                formRef={register({
                  setValueAs: (baseElement) => {
                    return baseElements.find((el) => el.label === baseElement);
                  },
                })}
              />
            </Flex>
            <Buttons.Primary mt={4} ml='auto' type='submit'>
              Προσθήκη
            </Buttons.Primary>
          </>
        )}
      </Flex>
    </form>
  );
}

export default React.memo(ElementForm);
