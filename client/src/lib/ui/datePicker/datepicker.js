import React from 'react';

import { Input } from '@chakra-ui/react';
import ReactDatePicker from 'react-datepicker';

import { DatePickerWrapper } from './datePickerWrapper';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker({ close, datePickerState, handleDateChange, ...rest }) {
  return (
    <DatePickerWrapper>
      <ReactDatePicker
        autoFocus={true}
        open={datePickerState}
        onClickOutside={close}
        dateFormat='dd/MM/yyyy'
        onSelect={handleDateChange}
        customInput={<Input display='none' />}
        {...rest}
      />
    </DatePickerWrapper>
  );
}

export default DatePicker;
