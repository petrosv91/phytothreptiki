import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  breakpoints: createBreakpoints({
    xs: '10em',
    sm: '22em',
    md: '48em',
    lg: '62em',
    xl: '80em',
  }),
});

export const darkTheme = {
  ...customTheme,
  colors: {
    ...customTheme.colors,
    background: customTheme.colors.gray[700],
    secondaryBackground: customTheme.colors.gray[500],
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
