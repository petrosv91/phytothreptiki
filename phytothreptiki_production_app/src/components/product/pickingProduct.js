import React from 'react';

import { Text } from '@chakra-ui/react';

import useGetProducts from '../../api/queries/useGetProducts';
import { ProductList } from '../../lib/ui/';
import ItemList from '../lists/itemList';

function PickingProduct({ send, onClose }) {
  const keys = React.useRef(['label']);
  const { data = [], status, error } = useGetProducts();

  function handleProductClick(product) {
    onClose();
    send({ type: 'ADD_ITEM', key: 'product', data: product });
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
      List={ProductList}
      isLoading={status === 'loading'}
      handleClick={handleProductClick}
    />
  );
}

export default PickingProduct;
