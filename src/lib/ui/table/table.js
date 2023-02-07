import { Box } from '@chakra-ui/react';

export function Table(props) {
  return (
    <Box
      as='table'
      minW='full'
      className='print'
      borderWidth={2}
      borderBottomWidth={4}
      borderColor='special.500'
      {...props}
    />
  );
}
export function Head(props) {
  return <Box as='thead' bg='special.600' {...props} />;
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
  return <Box as='td' p={4} color='text' lineHeight='1.25rem' {...props} />;
}
