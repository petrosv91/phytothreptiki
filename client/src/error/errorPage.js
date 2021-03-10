import React from 'react';

import { Flex, Image, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router';

import { ReactComponent as ErrorSVG } from '../assets/error.svg';
import { Buttons } from '../lib/ui';

export default function ErrorPage({ changeError }) {
  const history = useHistory();

  function goHome() {
    console.clear();
    changeError({ error: null, errorInfo: null });
    history.push('/');
  }

  return (
    <Flex direction='column' justify='space-evenly' align='center' boxSize='100%'>
      <Text fontWeight='bold' color='red.500' fontSize='lg' textAlign='center'>
        Κάτι πήγε στραβά!
      </Text>
      <Image as={ErrorSVG} boxSize={['70%', '50%']} />
      <Buttons.Primary onClick={goHome}>Αρχική</Buttons.Primary>
    </Flex>
  );
}
