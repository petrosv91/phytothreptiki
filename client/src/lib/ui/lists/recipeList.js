import { memo } from 'react';

import { Flex, Text } from '@chakra-ui/react';

function RecipeList({ item }) {
  return (
    <Flex px={6} direction='column' align='flex-end' justify='center'>
      <Text textAlign='right'>{item.recipe}</Text>
      <Text fontSize='sm' textAlign='right' color='secondaryText'>
        {item.date}
      </Text>
    </Flex>
  );
}

export default memo(RecipeList);
