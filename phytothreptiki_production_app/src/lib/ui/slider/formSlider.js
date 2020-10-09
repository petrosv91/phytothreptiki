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
  return (
    <FormControl mt={2} {...rest}>
      {label && (
        <Flex mb={1} color='gray.600'>
          <FormLabel>{label}</FormLabel>
          <Text>({value}%)</Text>
        </Flex>
      )}
      <Slider defaultValue={0} min={0} max={100} onChange={onChange}>
        <SliderTrack bg='gray.300'>
          <SliderFilledTrack bg='teal.400' />
        </SliderTrack>
        <SliderThumb bg='teal.300' />
      </Slider>
    </FormControl>
  );
}

export default React.memo(FormSlider);
