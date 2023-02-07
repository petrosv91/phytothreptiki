import { memo } from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

function ProductionFileList({ item }) {
  return (
    <Flex px={6} direction='column' align='flex-end' justify='center'>
      <Text textAlign='right'>{item.date}</Text>
      <Flex mt={0.5} wrap='wrap' justify='flex-end'>
        {item.products.map(({ label }) => {
          return (
            <Flex
              key={uuidv4()}
              fontSize='xs'
              color='secondaryText'
              _after={{ content: "','" }}
              _last={{ _after: { content: "''" } }}
            >
              {label}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default memo(ProductionFileList);
