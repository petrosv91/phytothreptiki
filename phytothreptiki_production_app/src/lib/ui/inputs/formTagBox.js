import React from 'react';

import { FormControl, FormLabel, Box, InputRightElement, Tag, Text } from '@chakra-ui/core';

function FormTagBox({ defaultValue, label, tagLabel, tagRest, ...rest }) {
  return (
    <FormControl mt='2'>
      <FormLabel color='white'>{label}</FormLabel>
      <Box bg='white' py={2} px={4} borderRadius='md' position='relative' {...rest}>
        <Text color='gray.900'>{defaultValue}</Text>
        {tagLabel && (
          <InputRightElement mr='1' h='full'>
            <Tag size='md' w={50} justifyContent='center' {...tagRest}>
              {tagLabel}
            </Tag>
          </InputRightElement>
        )}
      </Box>
    </FormControl>
  );
}

export default FormTagBox;
