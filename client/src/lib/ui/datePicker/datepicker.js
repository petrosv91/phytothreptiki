import React from 'react';

import { Input } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import ReactDatePicker from 'react-datepicker';

import { CalendarIcon } from '..';
import { DatePickerWrapper } from './datePickerWrapper';

import 'react-datepicker/dist/react-datepicker.css';

function DatePicker({ placeholder, value, handleChange, handleDateChange, ...rest }) {
  const { breakpoints } = useTheme();
  const [datePickerState, setDatePickerState] = React.useState(false);

  function open() {
    setDatePickerState(true);
  }
  function close() {
    setDatePickerState(false);
  }

  return (
    <DatePickerWrapper breakpoints={breakpoints}>
      <CalendarIcon boxSize={6} onClick={open} />
      <ReactDatePicker
        value={value}
        dateFormat='dd/MM/yyyy'
        autoFocus={true}
        open={datePickerState}
        onClickOutside={close}
        onChangeRaw={handleChange}
        placeholderText={placeholder}
        customInput={
          <Input
            w='full'
            color='text'
            fontWeight='500'
            autoComplete='off'
            borderRadius='sm'
            borderColor='secondaryText'
            errorBorderColor='red.500'
            focusBorderColor='special.600'
            _hover={{ borderColor: 'text' }}
            {...rest}
          />
        }
        onSelect={(date) => {
          close();
          handleDateChange(date);
        }}
      />
    </DatePickerWrapper>
  );
}

export default React.memo(DatePicker);
