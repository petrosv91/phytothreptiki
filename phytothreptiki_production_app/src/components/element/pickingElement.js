import React from 'react';

import { Flex } from '@chakra-ui/core';

import { elements } from '../../config';
import { useFiltersData, usePagination } from '../../hooks';
import ElementList from './elementList';

export default function PickingElement({ send, onClose }) {
  const keys = React.useRef(['label']);
  const [query, setQuery] = React.useState('');
  const filterdData = useFiltersData({ data: elements, query, keys });
  const paginationProps = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }
  function handleElementClick(element) {
    send({
      type: 'PICK_ELEMENT',
      callback: onClose,
      element,
    });
  }

  return (
    <Flex justify='center' align='center' direction='column'>
      <ElementList
        query={query}
        handleClick={handleElementClick}
        handleChange={handleChange}
        paginationProps={paginationProps}
        isLoading={false}
      />
    </Flex>
  );
}
