import React from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import CoinDetailsCard from '../../components/UI/coins/organisms/CoinDetailsCard';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%',
    },
  },
}));

const CoinDetails: React.FC = () => {
  const classes = useStyles();
  const { coinId } = useParams<{ coinId: string }>();

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item xs={12}>
        {coinId && <CoinDetailsCard coinId={coinId} />}
      </Grid>
    </Grid>
  );
};

export default CoinDetails;
