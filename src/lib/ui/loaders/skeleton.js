import {
  List as ChakraList,
  ListItem as ChakraListItem,
  Skeleton as ChakraSkeleton,
} from '@chakra-ui/react';

import { ITEMS_PER_PAGE } from '../../../hooks/usePagination';

function Skeleton() {
  const SkeletoArray = new Array(ITEMS_PER_PAGE).fill(0);

  return (
    <ChakraList pt={5} spacing={3}>
      {SkeletoArray.map((value, index) => (
        <ChakraSkeleton key={index}>
          <ChakraListItem height={14} width={[250, 300]} rounded='md'>
            {value}
          </ChakraListItem>
        </ChakraSkeleton>
      ))}
    </ChakraList>
  );
}

export default Skeleton;
