import { Icon } from '@chakra-ui/react';
import { FaRegFilePdf } from 'react-icons/fa';

function PdfIcon({ ...rest }) {
  return (
    <Icon
      as={FaRegFilePdf}
      boxSize={9}
      cursor='pointer'
      color='red.400'
      _hover={{ color: 'red.500' }}
      {...rest}
    />
  );
}

export default PdfIcon;
