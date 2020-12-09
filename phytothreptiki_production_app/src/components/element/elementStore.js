import React from 'react';

import { Flex, Icon, Text } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Table } from '../../lib/ui';

function ElementStore({ ...rest }) {
  const [state, send] = useMainMachine();
  const { elementStore } = state.context;

  function deleteElement(row) {
    send({ type: 'DELETE_ROW', key: 'elementStore', row });
  }

  if (!elementStore.length) return null;
  return (
    <Table.Table {...rest}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Ά ΥΛΕΣ</Table.Header>
          <Table.Header>ΣΥΜΜΕΤΟΧΗ</Table.Header>
          <Table.Header>ΤΙΜΗ</Table.Header>
          <Table.Header>ΔΙΑΦΟΡΑ</Table.Header>
          <Table.Header>Συνολικό Κόστος</Table.Header>
          <Table.Header>Ε</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {elementStore.map((row, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Flex direction='column'>
                {row.label}
                <Text mt={1} color='secondaryText' fontSize='sm'>
                  {row.formula?.join('-')}
                </Text>
              </Flex>
            </Table.Cell>
            <Table.Cell>{row.rate} %</Table.Cell>
            <Table.Cell>{row.price} €</Table.Cell>
            <Table.Cell>{row.restPrice} €</Table.Cell>
            <Table.Cell>{(row.rate / 100) * (row.price + row.restPrice)} €</Table.Cell>
            <Table.Cell>
              <Icon
                as={MdDelete}
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
        <Table.Row>
          <Table.Cell>Σύνολο</Table.Cell>
          <Table.Cell>{elementStore.reduce((prev, curr) => prev + curr.rate, 0)} %</Table.Cell>
          <Table.Cell>{elementStore.reduce((prev, curr) => prev + curr.price, 0)} €</Table.Cell>
          <Table.Cell>{elementStore.reduce((prev, curr) => prev + curr.restPrice, 0)} €</Table.Cell>
          <Table.Cell>
            {elementStore.reduce((prev, curr) => {
              return prev + (curr.rate / 100) * curr.price + curr.restPrice;
            }, 0)}{' '}
            €
          </Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Table>
  );
}

export default ElementStore;
