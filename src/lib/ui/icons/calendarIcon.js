import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdDateRange } from 'react-icons/md';

function CalendarIcon({ ...rest }) {
  return <Icon as={MdDateRange} color='special.500' _hover={{ color: 'special.600' }} {...rest} />;
}

export default CalendarIcon;
