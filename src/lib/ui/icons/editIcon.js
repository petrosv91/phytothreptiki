import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';

function EditIcon({ edit, ...rest }) {
  return (
    <Icon
      as={MdEdit}
      mb={2}
      mr={2}
      boxSize={7}
      cursor='pointer'
      display={['none', 'none', 'inline-block']}
      color={edit ? 'special.500' : 'special.600'}
      _hover={edit ? { color: 'special.600' } : { color: 'special.500' }}
      {...rest}
    />
  );
}

export default EditIcon;
