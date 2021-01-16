import React from 'react';

import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Table } from '../../lib/ui';
import { roundToTwo } from '../../utils';

function ElementStore({ printable, ...rest }) {
  const [state, send] = useMainMachine();
  const { getValues } = useFormContext();
  const { elementStore } = state.context;

  const { weights } = getValues();

  function deleteElement(row) {
    send({ type: 'DELETE_ROW', key: 'elementStore', row });
  }

  if (!elementStore.length) return null;
  return (
    <Box w='full' overflowX='auto'>
      <Table.Table {...rest}>
        <Table.Head>
          <Table.Row>
            <Table.Header>Ά ΥΛΕΣ</Table.Header>
            <Table.Header>ΣΥΜΜΕΤΟΧΗ</Table.Header>
            <Table.Header>ΚΙΛΑ</Table.Header>
            {!printable && (
              <>
                <Table.Header>ΤΙΜΗ</Table.Header>
                <Table.Header>ΔΙΑΦΟΡΑ</Table.Header>
                <Table.Header>ΣΥΝΟΛΙΚΟ ΚΟΣΤΟΣ</Table.Header>
                <Table.Header>{/* Actions */}</Table.Header>
              </>
            )}
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
              <Table.Cell>{row.rate}</Table.Cell>
              <Table.Cell>{roundToTwo(weights / row.rate)}</Table.Cell>
              {!printable && (
                <>
                  <Table.Cell>{row.price}</Table.Cell>
                  <Table.Cell>{row.restPrice}</Table.Cell>
                  <Table.Cell>
                    {roundToTwo((row.rate * (row.price + row.restPrice)) / 100)}
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      as={MdDelete}
                      color='red.500'
                      cursor='pointer'
                      _hover={{ color: 'red.400' }}
                      onClick={() => {
                        deleteElement(row);
                      }}
                    />
                  </Table.Cell>
                </>
              )}
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>Σύνολο</Table.Cell>
            <Table.Cell>{elementStore.reduce((prev, curr) => prev + curr.rate, 0)}%</Table.Cell>
            <Table.Cell>
              {elementStore.reduce((prev, curr) => prev + weights / curr.rate, 0)}kg
            </Table.Cell>
            {!printable && (
              <>
                <Table.Cell>
                  {roundToTwo(
                    elementStore.reduce((prev, curr) => {
                      return prev + curr.price;
                    }, 0),
                  )}
                  €
                </Table.Cell>
                <Table.Cell>
                  {roundToTwo(
                    elementStore.reduce((prev, curr) => {
                      return prev + curr.restPrice;
                    }, 0),
                  )}
                  €
                </Table.Cell>
                <Table.Cell>
                  {roundToTwo(
                    elementStore.reduce((prev, curr) => {
                      return prev + (curr.rate * (curr.price + curr.restPrice)) / 100;
                    }, 0),
                  )}
                  €
                </Table.Cell>
                <Table.Cell>{/* Actions */}</Table.Cell>
              </>
            )}
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Box>
  );
}

export default ElementStore;
