import React from 'react';

import { Box } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';

import { useFiltersData, usePagination } from '../../hooks';
import { Pagination } from '../../layouts';
import { CalendarIcon, FormInput, Input } from '../../lib/ui';
import { findDelimiter } from '../../utils';

function ItemList({ isLoading, handleClick, data, keys, List, showDate }) {
  const [query, setQuery] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const dateFormat = 'dd/MM/yyyy';
  const delimiter = findDelimiter(dateFormat);

  const filterdData = useFiltersData({ data, query, keys });
  const paginationProps = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }
  function handleDateChange(date, e) {
    setStartDate(date);
    setQuery(e.target.value);
  }

  return (
    <Box>
      {/* <DatePicker
        autoFocus={true}
        open={openDatePicker}
        selected={startDate || undefined}
        dateFormat={
          query && query.split(delimiter || '').length === 1
            ? dateFormat.split(delimiter || '').join('')
            : dateFormat
        }
        placeholderText='Αναζήτηση...'
        customInput={
          <FormInput
            w={[250, 300]}
            rightIcon={CalendarIcon}
            rightIconClick={() => setOpenDatePicker(true)}
          />
        }
        onChange={handleDateChange}
        onClickOutside={() => setOpenDatePicker(false)}
      /> */}
      <FormInput
        w={[250, 300]}
        rightIcon={CalendarIcon}
        rightIconClick={() => setOpenDatePicker(true)}
      />
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
