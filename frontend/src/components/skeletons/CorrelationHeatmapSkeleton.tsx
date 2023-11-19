// CorrelationHeatmapSkeleton.tsx
// This component provides a skeleton loading representation for a correlation heatmap chart.
// It uses ReactApexChart to display a skeleton of the chart with placeholder data.
// The skeleton is used for visual loading while the actual data is being fetched.
// Usage: Include this component as a placeholder for a correlation heatmap chart during loading.

import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { useAppSelector } from '../../app/reduxHooks';
import { selectAppState } from '../../features/appStateSlice';
import { selectCoins } from '../../features/coinsSlice';
import ReactApexChart from 'react-apexcharts';
import { Coin } from '../../models';
import { ApexOptions } from 'apexcharts';
import HeatmapLoadingProgress from '../UI/trends/atoms/HeatmapLoadingProgress';
import Overlay from '../UI/trends/atoms/Overlay';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    opacity: 0.15,
  },
}));

const CorrelationHeatmapSkeleton: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const appState = useAppSelector(selectAppState);
  const coins = useAppSelector(selectCoins);

  const options: ApexOptions = {
    chart: {
      id: 'CryptoscapesCorrelationHeatmap',
      height: '100%',
      fontFamily: 'Gilroy, sans-serif',
      type: 'heatmap',
      background: theme.palette.card.default,
      animations: {
        speed: 1000,
      },
    },
    theme: {
      mode: appState.darkMode ? 'dark' : 'light',
    },
    tooltip: {
      custom: (data) => {
        const value = data.series[data.seriesIndex][data.dataPointIndex];
        return `<div class="custom-tooltip">
        <div class="header">${coins.value[data.seriesIndex].name} vs ${
          coins.value[data.dataPointIndex].name
        }</div>
        <div class="content">Correlation: ${value}</div>
        </div>`;
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '20px',
      },
    },
    legend: {
      fontSize: '14px',
    },
    colors: ['#000000'],
    xaxis: {
      categories: coins.value
        .slice(0, 15)
        .map((coin: Coin) => coin.symbol.toUpperCase()),
      labels: {
        style: {
          fontSize: `${theme.typography.subtitle2.fontSize}`,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: `${theme.typography.subtitle2.fontSize}`,
        },
      },
    },
  };

  const data = coins.value.slice(0, 15).map((coin: Coin) => {
    return {
      name: coin.symbol.toUpperCase(),
      data: Array.from(Array(15).keys()),
    };
  });

  return (
    <Overlay loadingIcon={<HeatmapLoadingProgress />}>
      <Box className={classes.container}>
        <ReactApexChart
          options={options}
          series={data}
          type="heatmap"
          height="100%"
        />
      </Box>
    </Overlay>
  );
};

export default CorrelationHeatmapSkeleton;
