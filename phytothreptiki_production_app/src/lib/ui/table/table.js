import React from 'react';

import { Box } from '@chakra-ui/core';

import { useColorMode } from '../../../context/colorModeProvider';

export function Table(props) {
  const { currentColor } = useColorMode();
  return (
    <Box
      as='table'
      w='full'
      overflow='auto'
      borderColor={`${currentColor}.400`}
      borderBottomWidth={4}
      {...props}
    />
  );
}
export function Head(props) {
  const { currentColor } = useColorMode();
  return <Box as='thead' {...props} bg={`${currentColor}.400`} />;
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
      color='text'
      lineHeight='1rem'
      fontWeight='bold'
      letterSpacing='wider'
      textTransform='uppercase'
      {...props}
    />
  );
}
export function Body(props) {
  return <Box as='tbody' fontSize='md' fontWeight='500' color='secondaryBackground' {...props} />;
}
export function Cell(props) {
  return <Box as='td' p={4} lineHeight='1.25rem' whiteSpace='break-spaces' {...props} />;
}
