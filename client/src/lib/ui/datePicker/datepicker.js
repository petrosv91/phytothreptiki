import React from 'react';

import ReactDatePicker from 'react-datepicker';

import { CalendarIcon, FormInput } from '..';
import { DatePickerWrapper } from './datePickerWrapper';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker({ handleDateChange, ...rest }) {
  const [datePickerState, setDatePickerState] = React.useState(false);

  function open() {
    setDatePickerState(true);
  }
  function close() {
    setDatePickerState(false);
  }

  const DateInput = React.forwardRef(function dateInput(props, ref) {
    return (
      <FormInput
        {...props}
        formRef={ref}
        rightIconClick={open}
        rightIcon={CalendarIcon}
        {...rest}
      />
    );
  });

  return (
    <DatePickerWrapper>
      <ReactDatePicker
        autoFocus={true}
        open={datePickerState}
        onClickOutside={close}
        dateFormat='dd/MM/yyyy'
        customInput={<DateInput />}
        onSelect={(date) => {
          close();
          handleDateChange(date);
        }}
      />
    </DatePickerWrapper>
  );
}

export default DatePicker;
