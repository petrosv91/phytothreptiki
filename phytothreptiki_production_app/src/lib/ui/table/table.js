import React from 'react';

import { Box } from '@chakra-ui/core';

export function Table(props) {
  return (
    <Box
      as='table'
      w='full'
      overflow='auto'
      borderColor='teal.400'
      borderBottomWidth={4}
      {...props}
    />
  );
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
      p={4}
      fontSize='xs'
      textAlign='left'
      color='white'
      lineHeight='1rem'
      fontWeight='bold'
      letterSpacing='wider'
      textTransform='uppercase'
      {...props}
    />
  );
}
export function Body(props) {
  return <Box as='tbody' color='gray.500' fontSize='md' fontWeight='500' {...props} />;
}
export function Cell(props) {
  return <Box as='td' p={4} lineHeight='1.25rem' whiteSpace='break-spaces' {...props} />;
}
