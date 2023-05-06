import { Flex, Image, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router';

import { ReactComponent as ErrorSVG } from '../../assets/error.svg';
import { Buttons } from '../../lib/ui';

export default function ErrorPage({ changeError }) {
  const history = useHistory();

  function goHome() {
    console.clear();
    changeError({ error: null, errorInfo: null });
    history.push('/');
  }

  return (
    <Flex p={10} direction='column' align='center'>
      <Text mb={10} color='red.500' fontWeight='bold' fontSize='lg' textAlign='center'>
        Κάτι πήγε στραβά!
      </Text>
      <Image as={ErrorSVG} boxSize={[250, 300, 350, 450]} />
      <Buttons.Primary mt={10} onClick={goHome}>
        Αρχική
      </Buttons.Primary>
    </Flex>
  );
}
