import React from 'react';

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  Text,
  Flex,
} from '@chakra-ui/core';

function FormSlider({ value = 0, onChange, label, ...rest }) {
  console.log(value);
  return (
    <FormControl mt={2}>
      {label && (
        <Flex mb={1}>
          <FormLabel>{label}</FormLabel>
          <Text>({value}%)</Text>
        </Flex>
      )}
      <Slider min={0} max={100} onChange={onChange} {...rest}>
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb />
      </Slider>
    </FormControl>
  );
}

export default React.memo(FormSlider);
