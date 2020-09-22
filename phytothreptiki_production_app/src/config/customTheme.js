import React from 'react';

import { theme as defaultTheme } from '@chakra-ui/core';

const customIcons = {
  user: {
    path: (
      <path
        fillRule='evenodd'
        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
        clipRule='evenodd'
      />
    ),
    viewBox: '0 0 20 20',
  },
};

const customTheme = {
  ...defaultTheme,
  icons: {
    ...defaultTheme.icons,
    ...customIcons,
  },
  colors: {
    ...defaultTheme.colors,
    primary: '#008D42',
    secondary: '#F5F5F5',
    tertiary: '#5E5E5E',
    quaternary: '#FFFFFF',
    quinary: '#C7E7F3',
    senary: '#01491A',
  },
};

export default customTheme;