import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import GaugeChart from 'react-gauge-chart';
import { useAppSelector } from '../../../../app/reduxHooks';
import { selectFearGreedIndex } from '../../../../features/fearGreedIndexSlice';

const useStyles = makeStyles((theme: Theme) => ({
  gaugeChart: {
    height: 80,
    width: '180px !important',
  },
}));

const FearGreedIndexGaugeChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  return (
    <GaugeChart
      className={classes.gaugeChart}
      nrOfLevels={20}
      textColor={theme.palette.text.primary}
      needleColor={theme.palette.gauge.needle}
      needleBaseColor={theme.palette.gauge.needle}
      colors={[theme.palette.error.main, theme.palette.success.main]}
      percent={
        fearGreedIndex.today === null
          ? 0
          : Number(fearGreedIndex.today.value) / 100
      }
    />
  );
};

export default FearGreedIndexGaugeChart;
