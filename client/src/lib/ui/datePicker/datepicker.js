import React from 'react';

import { Input } from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';

import { CalendarIcon } from '..';
import { DatePickerWrapper } from './datePickerWrapper';

import 'react-datepicker/dist/react-datepicker.css';

function DatePicker({ placeholder, value, handleChange, handleDateChange, ...rest }) {
  const [datePickerState, setDatePickerState] = React.useState(false);

  function open() {
    setDatePickerState(true);
  }
  function close() {
    setDatePickerState(false);
  }

  return (
    <DatePickerWrapper>
      <CalendarIcon boxSize={6} onClick={open} />
      <ReactDatePicker
        value={value}
        autoFocus={true}
        open={datePickerState}
        onClickOutside={close}
        onChangeRaw={handleChange}
        onSelect={(date) => {
          close();
          handleDateChange(date);
        }}
        dateFormat='dd/MM/yyyy'
        customInput={
          <Input
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
        placeholderText={placeholder}
      />
    </DatePickerWrapper>
  );
}

export default React.memo(DatePicker);
