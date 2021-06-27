import { memo } from 'react';

import { Flex, Text } from '@chakra-ui/react';

function RawMaterialList({ item }) {
  return (
    <Flex px={6} direction='column' align='flex-end' justify='center'>
      <Text>{item.date}</Text>
      <Text fontSize='xs' color='secondaryText'>
        {item.type}
      </Text>
    </Flex>
  );
}

export default memo(RawMaterialList);
