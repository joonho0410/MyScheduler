import colors from '@/Style/colors';
import { PaletteOptions } from '@mui/material';

const palette: PaletteOptions = {
  primary: {
    main: colors.primaryMain,
    contrastText: colors.primaryContrast,
  },
  background: {
    default: '#fff',
  },
  success: {
    main: colors.successMain,
    light: colors.successLight,
    dark: colors.successDark,
    contrastText: '#fff',
  },
  error: {
    main: colors.errorMain,
    light: colors.errorLight,
    dark: colors.errorDark,
    contrastText: '#fff',
  },
  custom: {
    button: {
      primary: colors.primaryLight,
      hover: colors.primaryLightHover,
      darker: colors.primaryLightDarker,
    },
    card: {
      bg: colors.surfaceVariant,
    },
  },
};

export default palette;
