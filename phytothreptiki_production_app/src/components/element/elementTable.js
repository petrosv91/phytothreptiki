import React from 'react';

import { Icon } from '@chakra-ui/core';
import { CloseIcon } from '@chakra-ui/icons';

import { useFormService } from '../../context/formProvider';
import { Table } from '../../lib/ui';

export default function ElementTable({ ...rest }) {
  const [state] = useFormService();
  const { elements } = state.context;

  if (!elements.length) return null;
  return (
    <Table.Table {...rest}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Ά Ύλες</Table.Header>
          <Table.Header>Συμμετοχή</Table.Header>
          <Table.Header>Αμμωνιακό</Table.Header>
          <Table.Header>Νιτρικό</Table.Header>
          <Table.Header>Ουρικό</Table.Header>
          <Table.Header>Ενεργειες</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {elements.map((el, index) => (
          <Table.Row key={index}>
            <Table.Cell>{el.label}</Table.Cell>
            <Table.Cell>{el.rate}%</Table.Cell>
            {el.formula.map((ingr, index) => (
              <Table.Cell key={index}>{ingr}</Table.Cell>
            ))}
            <Table.Cell>
              <Icon as={CloseIcon} color='red.400' />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Table>
  );
}
