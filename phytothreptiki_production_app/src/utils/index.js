import React from 'react';

import { Toast } from '../layouts';

export const createToast = (toast, props) => {
  toast({
    position: 'bottom',
    isClosable: true,
    duration: 3000,
    render: ({ onClose }) => <Toast {...props} onClose={onClose} />,
  });
};
