import React from 'react';

import { Text } from '@chakra-ui/core';
import { useQuery } from 'react-query';

import { getData } from '../../api';
import { useFiltersData, usePagination } from '../../hooks';
import ElementList from './elementList';

export default function PickingElement({ send, onClose }) {
  const keys = React.useRef(['label']);
  const [query, setQuery] = React.useState('');

  const { data = [], status, error } = useQuery('elements', getData);
  const filterdData = useFiltersData({ data, query, keys });
  const paginationProps = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }
  function handleElementClick(element) {
    onClose();
    send({ type: 'SAVE_ELEMENT', element });
  }

  if (error)
    return (
      <Text color='white' fontSize='md' fontWeight='500'>
        {error.message}
      </Text>
    );
  return (
    <ElementList
      query={query}
      handleChange={handleChange}
      handleClick={handleElementClick}
      paginationProps={paginationProps}
      isLoading={status === 'loading'}
    />
  );
}
