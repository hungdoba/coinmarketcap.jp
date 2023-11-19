import '@material-ui/core/styles';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    card: Palette['background'];
    gauge: {
      needle: string;
    };
  }
  interface PaletteOptions {
    card: PaletteOptions['background'];
    gauge: {
      needle: string;
    };
  }
}
