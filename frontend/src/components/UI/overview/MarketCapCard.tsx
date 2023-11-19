import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/reduxHooks';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';
import CardLayout from '../../templates/CardLayout';
import {
  Avatar,
  CardHeader,
  Skeleton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { shortenNumber } from '../../../common/helpers';
import {
  DashboardRounded,
  DonutLargeRounded,
  PieChartRounded,
} from '@mui/icons-material';
import TooltipBasicLayout from '../../templates/TooltipBasicLayout';
import MarketCapDonutChart from './MarketCapDonutChart';
import MarketCapTreemap from './MarketCapTreemap';

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    flex: 1,
    width: '100%',
    marginTop: -20,
  },
  chartToggleButtons: {
    margin: '12px 12px 0 0',
  },
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
  },
}));

const MarketCapCard: React.FC = () => {
  const classes = useStyles(0);

  const globalCoinData = useAppSelector(selectGlobalCoinData);
  const [chartType, setChartType] = useState<'donut' | 'treemap'>('donut');

  return (
    <CardLayout>
      <CardHeader
        title="Market Cap"
        titleTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
        subheader={
          globalCoinData && globalCoinData.value !== null ? (
            `US$${shortenNumber(globalCoinData.value.totalMarketCap.usd)}`
          ) : (
            <Skeleton height={32} width={150} />
          )
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            <PieChartRounded />
          </Avatar>
        }
        action={
          <ToggleButtonGroup
            size="small"
            className={classes.chartToggleButtons}
            value={chartType}
            exclusive
            onChange={(
              event: React.MouseEvent<HTMLElement>,
              newChart: 'donut' | 'treemap' | null
            ): void => {
              if (newChart !== null) {
                setChartType(newChart);
              }
            }}
          >
            <ToggleButton value="donut">
              <TooltipBasicLayout title="Donut Chart" placement="top">
                <DonutLargeRounded />
              </TooltipBasicLayout>
            </ToggleButton>
            <ToggleButton value="treemap">
              <TooltipBasicLayout title="Coin Map" placement="top">
                <DashboardRounded />
              </TooltipBasicLayout>
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <div className={classes.chartWrapper}>
        {chartType === 'donut' ? (
          <MarketCapDonutChart coinsToDisplay={5} />
        ) : (
          <MarketCapTreemap coinsToDisplay={58} />
        )}
      </div>
    </CardLayout>
  );
};

export default MarketCapCard;
