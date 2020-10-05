import React from 'react';

import { Flex, Icon, Box } from '@chakra-ui/core';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function Pagination({ next, prev, jump, maxPage, canNext, canPrevious, currentPage }) {
  const disabledColor = 'gray.500';
  const enabledColor = 'gray.100';
  return (
    <Flex justifyContent='flex-end' py={4} align='center' ml='auto'>
      <Box fontSize='sm' mr={2} color='gray.200'>
        {currentPage} <span></span>από {maxPage}{' '}
      </Box>
      <Icon
        mr={2}
        boxSize='30px'
        cursor='pointer'
        onClick={prev}
        as={ChevronLeftIcon}
        color={canPrevious ? enabledColor : disabledColor}
      />
      <Icon
        boxSize='30px'
        cursor='pointer'
        onClick={next}
        as={ChevronRightIcon}
        color={canNext ? enabledColor : disabledColor}
      />
    </Flex>
  );
}

export default Pagination;
