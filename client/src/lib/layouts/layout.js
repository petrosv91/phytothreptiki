import { Box, Flex, Tag, Text } from '@chakra-ui/react';

import { useMainMachine } from '../../context/mainMachineProvider';

function Layout({ children }) {
  const [state] = useMainMachine();
  const { code } = state.context;
  return (
    <Box
      p={[3, 5, 10]}
      color='text'
      overflowY='scroll'
      overflowX='hidden'
      bg='secondaryBackground'
      height='calc(100vh - 100px)'
    >
      <Flex direction='column' justify='center'>
        <Flex
          w={['full', '20%']}
          px={4}
          pt={4}
          bg='background'
          align='center'
          gridGap={4}
          boxShadow='md'
          borderTopRightRadius='lg'
        >
          <Tag p={0} size='lg' borderRadius='sm' bg='special.500'>
            <Text w='full' textAlign='center' color='colorText'>
              No.
            </Text>
          </Tag>
          <Text color='red.500' fontSize='lg'>
            {code}
          </Text>
        </Flex>
        <Flex
          p={[3, 5, 10]}
          bg='background'
          boxShadow='md'
          direction='column'
          minH={['70vh', '70vh', '70vh', 'auto']}
          maxW={[450, 650, 850, 1000]}
          minW={[300, 400, 600, 1000]}
        >
          {children}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Layout;
