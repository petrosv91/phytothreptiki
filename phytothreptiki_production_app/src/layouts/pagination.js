import React from 'react';

import { Flex, Icon, Box } from '@chakra-ui/core';

function Pagination({ next, prev, jump, maxPage, canNext, canPrevious, currentPage }) {
  const disabledColor = 'gray.500';
  const enabledColor = 'gray.100';
  return (
    <Flex justifyContent='flex-end' py={4} align='center' ml='auto'>
      <Box fontSize='sm' mr={2} color='gray.200'>
        {currentPage} <span></span>από {maxPage}{' '}
      </Box>
      <Icon
        cursor='pointer'
        color={canPrevious ? enabledColor : disabledColor}
        name='chevron-left'
        size='30px'
        mr={2}
        onClick={prev}
      />
      <Icon
        cursor='pointer'
        color={canNext ? enabledColor : disabledColor}
        name='chevron-right'
        size='30px'
        onClick={next}
      />
    </Flex>
  );
}

export default Pagination;
