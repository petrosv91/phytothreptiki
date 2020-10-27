import React from 'react';

import { Icon } from '@chakra-ui/core';
import { DeleteIcon } from '@chakra-ui/icons';

import { useFormService } from '../../context/formProvider';
import { Table } from '../../lib/ui';

function ElementStore({ ...rest }) {
  const [state, send] = useFormService();
  const { store } = state.context;

  function deleteElement(row) {
    send({ type: 'DELETE', row });
  }

  if (!store.length) return null;
  return (
    <Table.Table {...rest}>
      <Table.Head bg='teal.400'>
        <Table.Row>
          <Table.Header>Ά Ύλες</Table.Header>
          <Table.Header>Συμμετοχή</Table.Header>
          <Table.Header>Φόρμουλα</Table.Header>
          <Table.Header>Ενεργειες</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {store.map((row, index) => (
          <Table.Row key={index}>
            <Table.Cell>{row.label}</Table.Cell>
            <Table.Cell>{row.rate}%</Table.Cell>
            <Table.Cell key={index}>{row.formula?.join('-')}</Table.Cell>
            <Table.Cell>
              <Icon
                as={DeleteIcon}
                color='red.400'
                cursor='pointer'
                _hover={{ color: 'red.500' }}
                onClick={() => {
                  deleteElement(row);
                }}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Table>
  );
}

export default ElementStore;
