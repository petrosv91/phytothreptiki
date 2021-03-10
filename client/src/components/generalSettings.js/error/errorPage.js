import React from 'react';

import {  Flex, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';

import { Warning } from '../../assets';
import { useColorMode } from '../../context/colorModeProvider';
import { Buttons } from '../../lib/ui';

const StyledWarning = styled(Warning)`
  height: 100%;
  width: 100%;
  fill: ${({ theme, color }) => theme.colors[color][400]};
`;

export default function ErrorPage({ changeError }) {
  const history = useHistory();
  const { currentColor } = useColorMode();

  function goHome() {
    console.clear();
    changeError({ error: null, errorInfo: null });
    history.push('/');
  }

  return (
    <Flex mt={2} direction='column' justify='center' align='center' w={[250, 300]}>
      <Text fontWeight='bold' fontSize='lg' textAlign='center'>
        Κάτι πήγε πάρα πολύ στραβά!
      </Text>
      <StyledWarning color={currentColor} />
      <Buttons.Primary mt={2} onClick={goHome}>
        Αρχική
      </Buttons.Primary>
    </Flex>
  );
}
