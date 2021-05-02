import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

function SearchIcon({ ...rest }) {
  return <Icon as={MdSearch} color='secondaryText' {...rest} />;
}

export default SearchIcon;
