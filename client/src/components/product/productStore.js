import React from 'react';

import { Box, Flex, Icon } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Table } from '../../lib/ui';

function ProductStore({ printable, ...rest }) {
  const [state, send] = useMainMachine();
  const { productStore } = state.context;

  function deleteProduct(row) {
    send({ type: 'DELETE_ROW', key: 'productStore', row });
  }

  if (!productStore.length) return null;
  return (
    <Box w='full' overflowX='auto'>
      <Table.Table {...rest}>
        <Table.Head>
          <Table.Row>
            <Table.Header>ΕΠΩΝΥΜΙΑ</Table.Header>
            <Table.Header>ΚΙΛΑ</Table.Header>
            <Table.Header>ΤΕΜΑΧΙΑ</Table.Header>
            <Table.Header>ΣΥΝΟΛΙΚΑ ΚΙΛΑ</Table.Header>
            {!printable && <Table.Header></Table.Header>}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {productStore.map((row, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Flex direction='column'>{row.label}</Flex>
              </Table.Cell>
              <Table.Cell>{row.weights} kg</Table.Cell>
              <Table.Cell>{row.units} </Table.Cell>
              <Table.Cell>{row.weights * row.units} kg</Table.Cell>
              {!printable && (
                <Table.Cell>
                  <Icon
                    as={MdDelete}
                    color='red.500'
                    cursor='pointer'
                    _hover={{ color: 'red.400' }}
                    onClick={() => {
                      deleteProduct(row);
                    }}
                  />
                </Table.Cell>
              )}
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>Σύνολο</Table.Cell>
            <Table.Cell>
              {productStore.reduce((prev, curr) => prev + curr.weights, 0)} kg
            </Table.Cell>
            <Table.Cell>{productStore.reduce((prev, curr) => prev + curr.units, 0)} </Table.Cell>
            <Table.Cell>
              {productStore.reduce((prev, curr) => prev + curr.weights * curr.units, 0)} kg
            </Table.Cell>
            {!printable && <Table.Cell></Table.Cell>}
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Box>
  );
}

export default ProductStore;