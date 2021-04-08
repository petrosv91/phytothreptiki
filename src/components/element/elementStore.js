import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';

import { baseElements } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useThemeMode } from '../../context/themeModeProvider';
import { DeleteIcon, Table } from '../../lib/ui';
import { roundToTwo } from '../../utils';

function ElementStore({ printable, ...rest }) {
  const { currentTheme } = useThemeMode();
  const labelColor = currentTheme === 'dark' ? 'special.400' : 'special.500';

  const { control } = useFormContext();
  const weights = useWatch({ control, name: 'weights', defaultValue: 0 });

  const [state, send] = useMainMachine();
  const { elementStore } = state.context;

  function calcBaseElement(row, el) {
    if (row.baseElement?.value !== el.value || !row.formula.length) {
      return 0;
    }
    const [baseElement] = row.formula;
    return (row.rate * baseElement) / 100;
  }
  const calcWeights = React.useCallback(
    (row) => {
      return (weights * row.rate) / 100;
    },
    [weights],
  );
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
            {baseElements.map((el) => (
              <Table.Header key={el.value}>{el.label.toUpperCase()}</Table.Header>
            ))}
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
              <Table.Cell color={labelColor}>
                <Flex id='label' direction='column'>
                  {row.label}
                  <Text id='formula' mt={1} color='secondaryText' fontSize='md'>
                    {row.formula.join('-')}
                  </Text>
                </Flex>
              </Table.Cell>
              <Table.Cell>{row.rate}</Table.Cell>
              {baseElements.map((el) => (
                <Table.Cell key={el.value}>
                  {roundToTwo(calcBaseElement(row, el))}
                </Table.Cell>
              ))}
              <Table.Cell>{roundToTwo(calcWeights(row))}</Table.Cell>
              {!printable && (
                <>
                  <Table.Cell>{row.price || 0}</Table.Cell>
                  <Table.Cell>
                    {roundToTwo((row.rate * (row.price || 0)) / 100)}
                  </Table.Cell>
                </>
              )}
            </Table.Row>
          ))}
          <Table.Row>
            {!printable && <Table.Cell>{/* Actions */}</Table.Cell>}
            <Table.Cell>Σύνολο</Table.Cell>
            <Table.Cell>
              {roundToTwo(
                elementStore.reduce((prev, curr) => prev + curr.rate, 0),
                0,
              )}
              %
            </Table.Cell>
            {baseElements.map((el) => (
              <Table.Cell key={el.value}>
                {roundToTwo(
                  elementStore.reduce((prev, curr) => {
                    return prev + calcBaseElement(curr, el);
                  }, 0),
                )}
              </Table.Cell>
            ))}
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
                      return prev + (curr.rate * (curr.price || 0)) / 100;
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
