// CurrencyIndicator.tsx
// This component displays a currency indicator, indicating that prices are in US dollars.
// Usage: Include this component to indicate that the prices on the page are displayed in USD.

import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { LanguageRounded } from '@mui/icons-material';
import TooltipBasicLayout from '../templates/TooltipBasicLayout';

const useStyles = makeStyles((theme: Theme) => ({
  contentWrapper: {
    cursor: 'pointer',
  },
  currencyIcon: {
    marginRight: 8,
  },
}));

const CurrencyIndicator: React.FC = () => {
  const classes = useStyles();

  return (
    <TooltipBasicLayout title="Prices are displayed in US dollars">
      <Box
        width="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        className={classes.contentWrapper}
      >
        <LanguageRounded className={classes.currencyIcon} />
        <Typography variant="body1">USD</Typography>
      </Box>
    </TooltipBasicLayout>
  );
};

export default CurrencyIndicator;
