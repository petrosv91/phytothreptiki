import React from 'react';

import { Box } from '@chakra-ui/react';

import { useColorMode } from '../../../context/colorModeProvider';

export function Table(props) {
  const { currentColor } = useColorMode();
  return (
    <Box
      as='table'
      minW='full'
      className='print'
      borderWidth={2}
      borderBottomWidth={4}
      borderColor={currentColor}
      {...props}
    />
  );
}
export function Head(props) {
  const { currentColor } = useColorMode();
  return <Box as='thead' bg={`${currentColor}CC`} {...props} />;
}
export function Row(props) {
  return <Box as='tr' _last={{ fontWeight: 'bold' }} {...props} />;
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
  return <Box as='tbody' fontSize={['sm', 'sm', 'md']} fontWeight='500' {...props} />;
}
export function Cell(props) {
  const { currentColor } = useColorMode();
  return (
    <Box
      as='td'
      p={4}
      color='text'
      lineHeight='1.25rem'
      _first={{ color: currentColor, fontSize: ['sm', 'sm', 'md'] }}
      {...props}
    />
  );
}
