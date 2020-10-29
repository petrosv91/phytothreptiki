import { theme as defaultTheme } from '@chakra-ui/core';

const breakpoints = ['22em', '48em', '62em', '80em'];
breakpoints.sm = '22em';
breakpoints.md = '48em';
breakpoints.lg = '62em';
breakpoints.xl = '80em';

export const darkTheme = {
  ...defaultTheme,
  breakpoints: breakpoints,
  icons: { ...defaultTheme.icons },
  colors: {
    ...defaultTheme.colors,
    background: defaultTheme.colors.gray[700],
    secondaryBackground: defaultTheme.colors.gray[500],
    text: defaultTheme.colors.white,
    secondaryText: defaultTheme.colors.gray[300],
    colorText: defaultTheme.colors.white,
  },
};

export const lightTheme = {
  ...darkTheme,
  breakpoints: breakpoints,
  icons: { ...defaultTheme.icons },
  colors: {
    ...darkTheme.colors,
    background: defaultTheme.colors.white,
    secondaryBackground: defaultTheme.colors.gray[100],
    text: defaultTheme.colors.blackAlpha[800],
    secondaryText: defaultTheme.colors.gray[500],
    colorText: defaultTheme.colors.white,
  },
};
