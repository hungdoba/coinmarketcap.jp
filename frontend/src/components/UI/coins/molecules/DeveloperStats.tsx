import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { useAppSelector } from '../../../../app/reduxHooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import LargeProgressCard from '../atoms/LargeProgressCard';
import RepositoryCard from '../atoms/RepositoryCard';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    minHeight: 400,
    '& > .MuiGrid-item': {
      height: '100%',
    },
  },
}));

const DeveloperStats: React.FC = () => {
  const classes = useStyles();

  const coinDetails = useAppSelector(selectCoinDetails);

  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item xs={4}>
        <LargeProgressCard
          title="Developer Score"
          value={coinDetails.value?.developerScore || 0}
        />
      </Grid>
      <Grid item xs={8}>
        <RepositoryCard />
      </Grid>
    </Grid>
  );
};

export default DeveloperStats;
