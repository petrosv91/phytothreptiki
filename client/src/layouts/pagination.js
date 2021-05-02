import React from 'react';

import { Flex, Icon, Box } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Pagination({ next, prev, maxPage, canNext, canPrevious, currentPage }) {
  const disabledColor = 'gray.500';
  const enabledColor = 'text';
  return (
    <Flex justifyContent='flex-end' py={4} align='center'>
      <Box fontSize='sm' mr={2} color='text'>
        {currentPage} <span></span>από {maxPage}{' '}
      </Box>
      <Icon
        mr={2}
        boxSize={5}
        cursor='pointer'
        onClick={prev}
        as={FaChevronLeft}
        color={canPrevious ? enabledColor : disabledColor}
      />
      <Icon
        boxSize={5}
        cursor='pointer'
        onClick={next}
        as={FaChevronRight}
        color={canNext ? enabledColor : disabledColor}
      />
    </Flex>
  );
}

export default Pagination;
