import React from 'react';

import { Box } from '@chakra-ui/react';

import { useFiltersData, usePagination } from '../../hooks';
import { Pagination } from '../../layouts';
import { CalendarIcon, DatePicker, FormInput } from '../../lib/ui';
import { formatDate } from '../../utils';

function ItemList({ isLoading, handleClick, data, keys, List, showDate }) {
  const [query, setQuery] = React.useState('');
  const [datePickerState, setDatePickerState] = React.useState(false);

  const filterdData = useFiltersData({ data, query, keys });
  const paginationProps = usePagination(filterdData);

  function open() {
    setDatePickerState(true);
  }
  function close() {
    setDatePickerState(false);
  }
  function handleChange(e) {
    setQuery(e.target.value);
  }
  function handleDateChange(date) {
    setQuery(formatDate(date, '/'));
    setDatePickerState(false);
  }

  return (
    <Box>
      <FormInput
        w={[250, 300]}
        value={query}
        onChange={handleChange}
        placeholder='Αναζήτηση...'
        rightIconClick={showDate && open}
        rightIcon={showDate && CalendarIcon}
      />
      {showDate && (
        <DatePicker
          close={close}
          datePickerState={datePickerState}
          handleDateChange={handleDateChange}
        />
      )}
      <List
        pt={5}
        isLoading={isLoading}
        handleClick={handleClick}
        data={paginationProps.currentData}
      />
      {!isLoading && <Pagination {...paginationProps} />}
    </Box>
  );
}

export default ItemList;
