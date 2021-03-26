import React from 'react';

import { Flex, Text, Box } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

function ElementList({ item }) {
  return (
    <Flex px={6} direction='column' align='flex-end' justify='center'>
      <Text textAlign='right'>{item.label}</Text>
      <Flex mt={0.5} justify='flex-end'>
        {item.formula.map((ingr) => {
          return (
            <Box
              key={uuidv4()}
              fontSize='sm'
              color='secondaryText'
              _after={{ content: "'-'" }}
              _last={{ _after: { content: "''" } }}
            >
              {ingr}
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default React.memo(ElementList);
