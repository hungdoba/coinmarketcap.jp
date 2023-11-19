import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useAppSelector } from '../../../app/reduxHooks';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';
import CardLayout from '../../templates/CardLayout';
import { Avatar, CardHeader, Skeleton } from '@mui/material';
import { shortenNumber } from '../../../common/helpers';
import { BarChartRounded } from '@mui/icons-material';
import VolumeBarChart from './VolumeBarChart';

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    flex: 1,
    width: '100%',
  },
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
  },
}));

const VolumeCard: React.FC = () => {
  const classes = useStyles(0);

  const globalCoinData = useAppSelector(selectGlobalCoinData);

  return (
    <CardLayout>
      <CardHeader
        title="Total Volume"
        titleTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
        subheader={
          globalCoinData.value !== null ? (
            `${
              globalCoinData.value.totalVolume.usd < 0 ? '-' : ''
            }US$${shortenNumber(globalCoinData.value.totalVolume.usd)}`
          ) : (
            <Skeleton height={32} width={150} />
          )
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            <BarChartRounded />
          </Avatar>
        }
      />
      <div className={classes.chartWrapper}>
        <VolumeBarChart />
      </div>
    </CardLayout>
  );
};

export default VolumeCard;
