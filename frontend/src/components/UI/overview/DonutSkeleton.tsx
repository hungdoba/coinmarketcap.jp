import { Box, Skeleton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  skeletonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  circle: {
    height: 100,
    width: 100,
    position: 'absolute',
    backgroundColor: theme.palette.card.default,
    borderRadius: '50%',
  },
  lineGap: {
    position: 'absolute',
    backgroundColor: theme.palette.card.default,
    height: 125,
    width: 5,
  },
}));

const DonutSkeleton: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.skeletonContainer}>
      <Skeleton variant="circular" height={150} width={150} />
      <div className={classes.circle} />
      <div
        className={classes.lineGap}
        style={{ transform: 'rotate(20deg) translateY(14px)' }}
      />
      <div
        className={classes.lineGap}
        style={{ transform: 'rotate(140deg) translateY(14px)' }}
      />
      <div
        className={classes.lineGap}
        style={{ transform: 'rotate(80deg) translateY(-14px)' }}
      />
    </Box>
  );
};

export default DonutSkeleton;
