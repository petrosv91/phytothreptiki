import React from 'react';

import { Box } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { DeleteIcon, Table } from '../../lib/ui';
import { roundToTwo } from '../../utils';

function ProductStore({ printable, ...rest }) {
  const [state, send] = useMainMachine();
  const { productStore } = state.context;

  const { setValue } = useFormContext();

  function deleteProduct(row) {
    send({ type: 'DELETE_ROW', key: 'productStore', row });
  }

  const calcTotalWeights = React.useCallback(() => {
    const totalWeights = roundToTwo(
      productStore.reduce((prev, curr) => {
        return prev + curr.weights * curr.units;
      }, 0),
    );
    setValue('totalWeights', totalWeights);
    return totalWeights;
  }, [setValue, productStore]);

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
              <Table.Cell>{row.label}</Table.Cell>
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
              {calcTotalWeights()}
              kg
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </Box>
  );
}

export default React.memo(ProductStore);
