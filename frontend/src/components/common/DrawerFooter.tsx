// DrawerFooter.tsx
// This component represents the footer of a drawer or sidebar. It displays information related to currency, theme toggle, and the prices of the top two coins.
// The component uses the `CurrencyIndicator`, `ThemeToggleSwitch`, and `CoinPriceIndicator` components for displaying the respective information.
// Usage: Include this component at the bottom of a drawer or sidebar.

import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../app/reduxHooks';
import CurrencyIndicator from '../indicators/CurrencyIndicator';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import CoinPriceIndicator from '../indicators/CoinPriceIndicator';
import { selectCoins } from '../../features/coinsSlice';

const DrawerFooter: React.FC = () => {
  const coins = useAppSelector(selectCoins);
  const top2Coins = coins.value.slice(0, 2);

  return (
    <Box position="absolute" bottom={0} width="100%" padding="0 22px 12px">
      <Box display="flex" alignItems="center" paddingBottom={2}>
        {top2Coins.length === 2 && (
          <>
            <CoinPriceIndicator coin={top2Coins[0]} />
            <CoinPriceIndicator coin={top2Coins[1]} />
          </>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <ThemeToggleSwitch />
        <CurrencyIndicator />
      </Box>
    </Box>
  );
};

export default DrawerFooter;
