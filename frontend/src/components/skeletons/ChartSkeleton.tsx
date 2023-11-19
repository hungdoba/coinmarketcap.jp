// ChartSkeleton.tsx
// This component provides a skeleton loading chart representation with placeholders for data.
// It utilizes Material-UI's Skeleton component to create the loading animation.
// Usage: Include this component in places where you want to display loading indicators for charts.

import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  skeletonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  skeletonBody: {
    display: 'flex',
    alignItems: 'flex-end',
    '& .MuiSkeleton-root': {
      margin: '0 2px',
    },
  },
}));

const ChartSkeleton: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.skeletonContainer}>
      <Box className={classes.skeletonBody}>
        <Skeleton variant="rectangular" height={25} width={15} />
        <Skeleton variant="rectangular" height={40} width={15} />
        <Skeleton variant="rectangular" height={59} width={15} />
        <Skeleton variant="rectangular" height={78} width={15} />
        <Skeleton variant="rectangular" height={47} width={15} />
      </Box>
    </Box>
  );
};

export default ChartSkeleton;
