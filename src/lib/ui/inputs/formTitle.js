import { Flex } from '@chakra-ui/react';

function FormTitle({ children }) {
  return (
    <Flex
      w={['full', 200]}
      px={4}
      pt={4}
      bg='background'
      align='center'
      gridGap={4}
      boxShadow='md'
      borderTopRightRadius='lg'
    >
      {children}
    </Flex>
  );
}

export default FormTitle;
