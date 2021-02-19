import React from 'react';

import ReactDatePicker from 'react-datepicker';

import { CalendarIcon, FormInput } from '..';
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

  const DateInput = React.forwardRef(function dateInput(props, ref) {
    return (
      <FormInput
        formRef={ref}
        rightIconClick={open}
        rightIcon={CalendarIcon}
        {...props}
        {...rest}
      />
    );
  });

  return (
    <DatePickerWrapper>
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
        customInput={<DateInput />}
        placeholderText={placeholder}
      />
    </DatePickerWrapper>
  );
}

export default React.memo(DatePicker);
