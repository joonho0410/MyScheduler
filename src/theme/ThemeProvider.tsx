'use client';

import theme from '@/theme';
import { ThemeProvider } from '@mui/material';

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
