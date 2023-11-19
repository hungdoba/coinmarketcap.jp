import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme, useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import TopCoinsCard from '../../components/UI/coins/molecules/TopCoinsCard';
import BannerCardSmall from '../../components/UI/overview/BannerCardSmall';
import MarketCapCard from '../../components/UI/overview/MarketCapCard';
import VolumeCard from '../../components/UI/overview/VolumeCard';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    overflow: 'scroll',
    '& > .MuiGrid-item': {
      height: '100%',
      minHeight: 850,
    },
    [theme.breakpoints.only('md')]: {
      minHeight: 0,
    },
  },
  innerWrapper: {
    height: '100%',
    '& > .MuiGrid-item:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      overflow: 'scroll',
    },
  },
}));

const Overview: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={3}
      direction="row"
      alignItems="stretch"
    >
      <Grid item lg={8}>
        <TopCoinsCard />
      </Grid>
      <Grid item lg={4}>
        <Grid container className={classes.innerWrapper} spacing={0}>
          <Grid item xs={12} style={{ height: 85 }}>
            <BannerCardSmall />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ height: `calc(50% - ${42.5 + theme.spacing(3)}px)` }}
          >
            <MarketCapCard />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ height: `calc(50% - ${42.5 + theme.spacing(3)}px)` }}
          >
            <VolumeCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Overview;
