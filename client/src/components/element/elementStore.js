import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { DeleteIcon, Table } from '../../lib/ui';
import { roundToTwo } from '../../utils';

function ElementStore({ printable, ...rest }) {
  const [state, send] = useMainMachine();
  const { elementStore } = state.context;
  const { getValues } = useFormContext();

  function calcWeights(row) {
    const { weights = 0 } = getValues();
    return (weights * row.rate) / 100;
  }
  function deleteElement(row) {
    send({ type: 'DELETE_ROW', key: 'elementStore', row });
  }

  if (!elementStore.length) return null;
  return (
    <Box w='full' overflowX='auto'>
      <Table.Table {...rest}>
        <Table.Head>
          <Table.Row>
            {!printable && <Table.Header>{/* Actions */}</Table.Header>}
            <Table.Header>Ά ΥΛΕΣ</Table.Header>
            <Table.Header>ΣΥΜΜΕΤΟΧΗ</Table.Header>
            <Table.Header>ΚΙΛΑ</Table.Header>
            {!printable && (
              <>
                <Table.Header>ΤΙΜΗ</Table.Header>
                <Table.Header>ΣΥΝΟΛΙΚΟ ΚΟΣΤΟΣ</Table.Header>
              </>
            )}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {elementStore.map((row, index) => (
            <Table.Row key={index}>
              {!printable && (
                <Table.Cell>
                  <DeleteIcon
                    onClick={() => {
                      deleteElement(row);
                    }}
                  />
                </Table.Cell>
              )}
              <Table.Cell>
                <Flex direction='column'>
                  {row.label}
                  <Text mt={1} color='secondaryText' fontSize='sm'>
                    {row.formula?.join('-')}
                  </Text>
                </Flex>
              </Table.Cell>
              <Table.Cell>{row.rate}</Table.Cell>
              <Table.Cell>{roundToTwo(calcWeights(row))}</Table.Cell>
              {!printable && (
                <>
                  <Table.Cell>{row.price}</Table.Cell>
                  <Table.Cell>{roundToTwo((row.rate * row.price) / 100)}</Table.Cell>
                </>
              )}
            </Table.Row>
          ))}
          <Table.Row>
            {!printable && <Table.Cell>{/* Actions */}</Table.Cell>}
            <Table.Cell>Σύνολο</Table.Cell>
            <Table.Cell>{elementStore.reduce((prev, curr) => prev + curr.rate, 0)}%</Table.Cell>
            <Table.Cell>
              {roundToTwo(
                elementStore.reduce((prev, curr) => {
                  return prev + calcWeights(curr);
                }, 0),
              )}
              kg
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
                      return prev + (curr.rate * curr.price) / 100;
                    }, 0),
                  )}
                  €
                </Table.Cell>
              </>
            )}
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Box>
  );
}

export default React.memo(ElementStore);
