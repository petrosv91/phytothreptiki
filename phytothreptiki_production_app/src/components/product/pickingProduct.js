import React from 'react';

import { Text } from '@chakra-ui/react';

import useGetProducts from '../../api/queries/useGetProducts';
import { ProductList } from '../../lib/ui/';
import ItemList from '../lists/itemList';

function PickingProduct({ handleProductClick }) {
  const keys = React.useRef(['label']);
  const { data = [], status, error, isFetching } = useGetProducts();

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
      handleClick={handleProductClick}
      isLoading={status === 'loading' || isFetching}
    />
  );
}

export default PickingProduct;
