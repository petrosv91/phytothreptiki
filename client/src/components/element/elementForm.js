import React from 'react';

import { Collapse, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import useGetElements from '../../api/queries/useGetElements';
import { baseElements } from '../../config/';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useReactFormSchema } from '../../hooks';
import { Modal, Buttons, FormInput, FormSwitch, CloseIcon, ElementList } from '../../lib/ui';
import SearchIcon from '../../lib/ui/icons/searchIcon';
import { convertStringToArrayOfNumbers, createToast, isRateValid } from '../../utils';
import PickingItem from '../lists/pickingItem';

function ElementForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getElements = useGetElements();
  const keys = React.useRef(['label', 'formula']);

  const { elementFormSchema } = useReactFormSchema();
  const { register, handleSubmit, getValues, setValue, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(elementFormSchema),
  });

  const [{ context }, send] = useMainMachine();
  const { elementSwitch = false } = context.switches;

  function onSubmit(formData) {
    if (!isRateValid(context, formData)) {
      return createToast(toast, {
        type: 'error',
        title: 'Αποτυχία',
        content: 'Το ποσοστό έχει ξεπεράσει το 100%',
      });
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
        <PickingItem
          keys={keys}
          List={ElementList}
          promiseData={getElements}
          handleClick={handleElementClick}
        />
      </Modal>
      <Flex direction='column'>
        <FormSwitch
          size='lg'
          name='elementSwitch'
          label={`${elementSwitch ? 'Απενεργοποίηση' : 'Ενεργοποίηση'} πεδίων για Ά Ύλες`}
          isChecked={elementSwitch}
          onChange={() => send({ type: 'TOGGLE', key: 'elementSwitch' })}
        />
        <Collapse in={elementSwitch} animateOpacity>
          <FormInput
            name='label'
            label='Ά Ύλη'
            onClick={onOpen}
            leftIcon={SearchIcon}
            rightIcon={getValues('label') && CloseIcon}
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
              tabIndex='-1'
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
              tabIndex='-1'
              pointerEvents='none'
              errors={errors}
              formRef={register({
                setValueAs: (baseElement) => {
                  const findElement = baseElements.find((el) => el.label === baseElement);
                  return findElement || {};
                },
              })}
            />
          </Flex>
          <Flex justify='flex-end'>
            <Buttons.Primary mt={4} ml='auto' type='submit'>
              Προσθήκη
            </Buttons.Primary>
          </Flex>
        </Collapse>
      </Flex>
    </form>
  );
}

export default React.memo(ElementForm);
