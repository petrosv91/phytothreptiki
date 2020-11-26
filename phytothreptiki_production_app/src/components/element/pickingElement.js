import React from 'react';

import { Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { getData } from '../../api';
import { ElementList } from '../../lib/ui';
import ItemList from '../lists/itemList';

export default function PickingElement({ send, onClose }) {
  const keys = React.useRef(['label']);
  const { data = [], status, error } = useQuery('elements', getData);

  function handleElementClick(el) {
    onClose();
    send({ type: 'ADD_ITEM', key: 'element', data: el });
  }

  if (error)
    return (
      <Text color='red.500' fontSize='md' fontWeight='500'>
        {error.message}
      </Text>
    );
  return (
    <ItemList
      keys={keys}
      data={data}
      List={ElementList}
      isLoading={status === 'loading'}
      handleClick={handleElementClick}
    />
  );
}
