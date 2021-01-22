import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  breakpoints: createBreakpoints({
    sm: '26em',
    md: '48em',
    lg: '62em',
    xl: '80em',
  }),
  colors: {
    special: {
      100: '#008D42AA',
      400: '#008D42DD',
      500: '#008D42',
    },
  },
  // shadows: {
  //   outline: 'none',
  // },
});

export const darkTheme = {
  ...customTheme,
  colors: {
    ...customTheme.colors,
    background: customTheme.colors.gray[600],
    secondaryBackground: customTheme.colors.gray[700],
    text: customTheme.colors.white,
    secondaryText: customTheme.colors.gray[300],
    colorText: customTheme.colors.white,
  },
};

export const lightTheme = {
  ...customTheme,
  colors: {
    ...customTheme.colors,
    background: customTheme.colors.white,
    secondaryBackground: customTheme.colors.gray[100],
    text: customTheme.colors.blackAlpha[800],
    secondaryText: customTheme.colors.gray[500],
    colorText: customTheme.colors.white,
  },
};
