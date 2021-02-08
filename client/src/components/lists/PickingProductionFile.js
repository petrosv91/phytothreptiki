import React from 'react';

import { Text } from '@chakra-ui/react';

import useGetProductionFile from '../../api/queries/useGetProductionFile';
import { ProductionFileList } from '../../lib/ui';
import ItemList from './itemList';

function PickingProductionFile({ handleProductionClick }) {
  const keys = React.useRef(['date']);
  const { data = [], status, error, isFetching } = useGetProductionFile();

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
      List={ProductionFileList}
      handleClick={handleProductionClick}
      isLoading={status === 'loading' || isFetching}
    />
  );
}

export default PickingProductionFile;
