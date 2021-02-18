import React from 'react';

import { Box } from '@chakra-ui/react';

import { useMainMachine } from '../../context/mainMachineProvider';
import { useThemeMode } from '../../context/themeModeProvider';
import { DeleteIcon, Table } from '../../lib/ui';
import { roundToTwo } from '../../utils';

function ProductStore({ printable, ...rest }) {
  const { currentTheme } = useThemeMode();
  const labelColor = printable
    ? 'special.500'
    : currentTheme === 'dark'
    ? 'special.600'
    : 'special.500';

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
            {!printable && <Table.Header>{/* Actions */}</Table.Header>}
            <Table.Header>ΕΠΩΝΥΜΙΑ</Table.Header>
            <Table.Header>ΤΕΜΑΧΙΑ</Table.Header>
            <Table.Header>ΚΙΛΑ</Table.Header>
            <Table.Header>ΣΥΝΟΛΙΚΑ ΚΙΛΑ</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {productStore.map((row, index) => (
            <Table.Row key={index}>
              {!printable && (
                <Table.Cell>
                  <DeleteIcon
                    onClick={() => {
                      deleteProduct(row);
                    }}
                  />
                </Table.Cell>
              )}
              <Table.Cell color={labelColor}>{row.label}</Table.Cell>
              <Table.Cell>{row.units} </Table.Cell>
              <Table.Cell>{row.weights} kg</Table.Cell>
              <Table.Cell>{roundToTwo(row.weights * row.units)}</Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            {!printable && <Table.Cell>{/* Actions */}</Table.Cell>}
            <Table.Cell>Σύνολο</Table.Cell>
            <Table.Cell>
              {roundToTwo(
                productStore.reduce((prev, curr) => {
                  return prev + curr.units;
                }, 0),
              )}
            </Table.Cell>
            <Table.Cell>{/* Weights */}</Table.Cell>
            <Table.Cell>
              {roundToTwo(
                productStore.reduce((prev, curr) => {
                  return prev + curr.weights * curr.units;
                }, 0),
              )}
              kg
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Box>
  );
}

export default React.memo(ProductStore);
