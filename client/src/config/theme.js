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
      50: '#ddffee',
      100: '#b0ffd5',
      200: '#80ffbb',
      300: '#50ffa1',
      400: '#27ff87',
      500: '#008D42',
      600: '#0ab355',
      700: '#00803c',
      800: '#004d23',
      900: '#001b08',
    },
  },
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
