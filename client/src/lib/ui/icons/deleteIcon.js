import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';

function DeleteIcon({ ...rest }) {
  return (
    <Icon as={MdDelete} color='red.500' cursor='pointer' _hover={{ color: 'red.400' }} {...rest} />
  );
}

export default DeleteIcon;
