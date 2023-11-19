import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Hidden } from '@mui/material';
import GlobalLoadingProgress from './GlobalLoadingProgress';
import { useAppSelector } from '../../app/reduxHooks';
import { selectCoins } from '../../features/coinsSlice';
import CoinPriceIndicator from '../indicators/CoinPriceIndicator';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import CurrencyIndicator from '../indicators/CurrencyIndicator';

const useStyles = makeStyles((theme: Theme) => ({
  sideUtils: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-root': {
      marginRight: theme.spacing(2),
    },
  },
}));

const SideUtils: React.FC = () => {
  const classes = useStyles();

  const coins = useAppSelector(selectCoins);
  const top2Coins = coins.value.slice(0, 2);

  return (
    <Box className={classes.sideUtils}>
      <Hidden smDown>
        {top2Coins.length === 2 && (
          <>
            <CoinPriceIndicator coin={top2Coins[0]} />
            <CoinPriceIndicator coin={top2Coins[1]} />
          </>
        )}
        <CurrencyIndicator />
      </Hidden>
      <ThemeToggleSwitch />
      <GlobalLoadingProgress />
    </Box>
  );
};

export default SideUtils;
