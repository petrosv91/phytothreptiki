import { Flex, Text } from '@chakra-ui/react';

import { Version } from '../../config';

function Info() {
  return (
    <Flex align='center'>
      <Text fontWeight='semibold'>Version:</Text>
      <Text ml={4} fontWeight={500} color='gray.500'>
        {Version}
      </Text>
    </Flex>
  );
}

export default Info;
