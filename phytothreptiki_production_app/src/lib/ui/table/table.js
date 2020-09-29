import React from 'react';

import { Box } from '@chakra-ui/core';

export function Table(props) {
  return <Box as='table' w='full' overflow='auto' {...props} />;
}
export function Head(props) {
  return <Box as='thead' {...props} />;
}
export function Row(props) {
  return <Box as='tr' {...props} />;
}
export function Header(props) {
  return (
    <Box
      as='th'
      p={3}
      fontSize='xs'
      textAlign='left'
      color='gray.500'
      lineHeight='1rem'
      fontWeight='medium'
      letterSpacing='wider'
      textTransform='uppercase'
      backgroundColor='gray.50'
      borderBottomWidth='1px'
      {...props}
    />
  );
}
export function Body(props) {
  return <Box as='tbody' {...props} />;
}
export function Cell(props) {
  return <Box as='td' p={3} lineHeight='1.25rem' whiteSpace='break-spaces' {...props} />;
}
