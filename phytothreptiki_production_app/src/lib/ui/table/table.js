import React from 'react';

import { Box } from '@chakra-ui/react';

import { useColorMode } from '../../../context/colorModeProvider';

export function Table(props) {
  const { currentColor } = useColorMode();
  return (
    <Box
      as='table'
      w='full'
      overflow='auto'
      borderWidth={2}
      borderBottomWidth={4}
      borderColor={currentColor}
      {...props}
    />
  );
}
export function Head(props) {
  const { currentColor } = useColorMode();
  return <Box as='thead' {...props} bg={`${currentColor}CC`} />;
}
export function Row(props) {
  return <Box as='tr' {...props} _last={{ fontWeight: 'bold' }} />;
}
export function Header(props) {
  return (
    <Box
      as='th'
      p={4}
      fontSize='sm'
      textAlign='left'
      color='colorText'
      lineHeight='1rem'
      fontWeight='bold'
      letterSpacing='wider'
      {...props}
    />
  );
}
export function Body(props) {
  return <Box as='tbody' fontSize='md' fontWeight='500' {...props} />;
}
export function Cell(props) {
  const { currentColor } = useColorMode();
  return (
    <Box
      as='td'
      p={4}
      color='text'
      lineHeight='1.25rem'
      whiteSpace='break-spaces'
      _first={{ color: currentColor, fontSize: 'md' }}
      {...props}
    />
  );
}
