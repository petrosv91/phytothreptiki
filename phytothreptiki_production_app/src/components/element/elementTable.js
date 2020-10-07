import React from 'react';

import { Flex, Icon } from '@chakra-ui/core';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';

import { useFormService } from '../../context/formProvider';
import { Table } from '../../lib/ui';

export default function ElementTable({ ...rest }) {
  const [state, send] = useFormService();
  const { elements } = state.context;

  function editElement() {}
  function deleteElement(el) {
    send({ type: 'DELETE', el });
  }

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
            <Table.Cell w='full'>
              <Flex justify='space-between'>
                <Icon
                  as={EditIcon}
                  size='10px'
                  color='gray.300'
                  cursor='pointer'
                  onClick={() => editElement(el)}
                />
                <Icon
                  as={CloseIcon}
                  size='10px'
                  color='red.400'
                  cursor='pointer'
                  onClick={() => deleteElement(el)}
                />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Table>
  );
}
