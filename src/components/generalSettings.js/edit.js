import { useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { defaultSettings } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useLocalStorage } from '../../hooks';
import { Buttons, FormInput } from '../../lib/ui';

function Edit() {
  const [state, send] = useMainMachine();
  const { machineCapacity } = state.context;

  const { reset, register } = useForm({
    defaultValues: { machineCapacity },
  });

  const [restoreLoading, setRestoreLoading] = useState(false);
  const [, setValue] = useLocalStorage(`phytothreptikiSettings`);

  function handleOnblur(e) {
    setValue((prev) => ({ ...prev, machineCapacity: Number(e.target.value) }));
    send({
      type: 'ADD_ITEM',
      key: 'machineCapacity',
      data: Number(e.target.value),
    });
  }
  function restoreDefault() {
    setRestoreLoading(true);
    setValue(defaultSettings);
    setTimeout(() => {
      send({ type: 'RESTORE_DEFAULTS', data: defaultSettings });
      reset({ ...defaultSettings });
      setRestoreLoading(false);
    }, 300);
  }
  return (
    <Flex direction='column' align='center'>
      <FormInput
        w={230}
        tag='kg'
        step='any'
        type='number'
        name='machineCapacity'
        label='Χωρητικότητα:'
        horizontal={true}
        onBlur={handleOnblur}
        formRef={register}
      />
      <Buttons.Tertiary onClick={restoreDefault} isLoading={restoreLoading}>
        Επαναφορά Ρυθμίσεων
      </Buttons.Tertiary>
    </Flex>
  );
}

export default Edit;
