import React from 'react';

import { Text } from '@chakra-ui/react';

import useGetElements from '../../api/queries/useGetElements';
import { ElementList } from '../../lib/ui';
import ItemList from '../lists/itemList';

function PickingElement({ handleElementClick }) {
  const keys = React.useRef(['label']);
  const { data = [], status, error, isFetching } = useGetElements();

  if (error)
    return (
      <Text color='red.500' fontSize={['sm', 'md']} fontWeight='500'>
        {error.message}
      </Text>
    );
  return (
    <ItemList
      keys={keys}
      data={data}
      List={ElementList}
      handleClick={handleElementClick}
      isLoading={status === 'loading' || isFetching}
    />
  );
}

export default PickingElement;
