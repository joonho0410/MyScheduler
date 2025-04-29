import { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      button: {
        primary: string;
        secondary: string;
      };
      card: {
        bg: string;
      };
    };
  }

  interface PaletteOptions {
    custom?: {
      button?: {
        primary?: string;
        hover?: string;
        darker?: string;
      };
      card?: {
        bg?: string;
        hover?: string;
        darker?: string;
      };
    };
  }
}
