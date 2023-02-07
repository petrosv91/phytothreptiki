import { Icon } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

function CloseIcon({ ...rest }) {
  return <Icon as={MdClose} color='red.500' _hover={{ color: 'red.400' }} {...rest} />;
}

export default CloseIcon;
