import { memo } from 'react';

import { Flex, Text } from '@chakra-ui/react';

function RecipeList({ item }) {
  const company = item.company?.label || '';
  return (
    <Flex px={4} gridGap={2} align='flex-start' justify='space-between'>
      <Text
        p={2}
        minW='max-content'
        shadow='sm'
        rounded='md'
        bg='special.500'
        color='white'
        fontWeight='semibold'
      >
        {item.date}
      </Text>
      <Flex direction='column' textAlign='right' overflow='hidden'>
        <Text fontWeight='semibold' isTruncated={Boolean(company)}>
          {item.recipe}
        </Text>
        {company && <Text>{company}</Text>}
      </Flex>
    </Flex>
  );
}

export default memo(RecipeList);
