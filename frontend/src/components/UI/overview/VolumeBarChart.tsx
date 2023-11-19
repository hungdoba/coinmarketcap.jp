import React from 'react';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import chroma from 'chroma-js';
import { makeStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material/styles';
import { useAppSelector } from '../../../app/reduxHooks';
import { selectCoins } from '../../../features/coinsSlice';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';
import { useWindowSize } from '../../../common/hooks/useWindowSize';
import { Coin } from '../../../models';
import ChartSkeleton from '../../skeletons/ChartSkeleton';
import { Box, Typography } from '@mui/material';
import { shortenNumber } from '../../../common/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(3),
    '& .recharts-surface': {
      cursor: 'pointer',
      '& .recharts-tooltip-cursor': {
        fill: theme.palette.card.paper,
      },
    },
  },
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`,
  },
}));

interface DataFormat {
  coinName: string;
  coinSymbol: string;
  value: number;
}

const VolumeBarChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const windowSize = useWindowSize();
  const coinsToDisplay =
    windowSize.width < theme.breakpoints.values.sm
      ? windowSize.width / 80
      : windowSize.width < theme.breakpoints.values.md
      ? windowSize.width / 150
      : windowSize.width / 250;

  const formatRawData = () => {
    const newData: DataFormat[] = [];

    const coinsValueDesc = [...coins.value];
    coinsValueDesc.sort((a: Coin, b: Coin) => b.totalVolume - a.totalVolume);

    const topCoins = coinsValueDesc.slice(0, coinsToDisplay);

    topCoins.forEach((coin: Coin) => {
      newData.push({
        coinName: coin.name,
        coinSymbol: coin.symbol.toUpperCase(),
        value: coin.totalVolume,
      });
    });

    return newData;
  };

  return (
    <>
      {coins.value.length === 0 ||
      coins.status === 'LOADING' ||
      globalCoinData.value === null ? (
        <ChartSkeleton />
      ) : (
        <Box className={classes.container}>
          <ResponsiveContainer height="100%" width="100%">
            <BarChart
              data={formatRawData()}
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="coinSymbol" />
              <YAxis tickFormatter={(tick) => shortenNumber(tick)} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Box className={classes.customTooltip}>
                        <Typography variant="body2">
                          {payload[0].payload.coinName}
                        </Typography>
                        <Typography variant="body2">
                          {`${label}: US$${shortenNumber(
                            payload[0].payload.value
                          )}`}
                        </Typography>
                      </Box>
                    );
                  } else {
                    return null;
                  }
                }}
              />
              <Bar
                dataKey="value"
                fill={theme.palette.secondary.main}
                animationDuration={2000}
              >
                {formatRawData().map((data: DataFormat, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      chroma
                        .scale([
                          theme.palette.primary.main,
                          theme.palette.secondary.main,
                        ])
                        .gamma(0.4)
                        .colors(coinsToDisplay)[index]
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </>
  );
};

export default VolumeBarChart;
