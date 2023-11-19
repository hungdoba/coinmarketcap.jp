// CoinPriceIndicator.tsx
// This component displays a small avatar and the current price of a cryptocurrency.
// Props:
// - coin: The Coin object containing information about the cryptocurrency.
// Usage: Include this component to display the current price of a cryptocurrency along with its avatar.

import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Typography } from '@mui/material';
import { Coin } from '../../models';
import { formatNumber, roundDecimals } from '../../common/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  avatarSmall: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    marginRight: 8,
  },
}));

interface Props {
  coin: Coin;
}

const CoinPriceIndicator: React.FC<Props> = ({ coin }) => {
  const classes = useStyles();

  return (
    <Box width="50%" display="flex" alignItems="center" justifyContent="center">
      <Avatar
        src={coin.image}
        alt={coin.name}
        className={classes.avatarSmall}
      />
      <Typography variant="body2">
        US${formatNumber(roundDecimals(coin.currentPrice, 0))}
      </Typography>
    </Box>
  );
};

export default CoinPriceIndicator;
