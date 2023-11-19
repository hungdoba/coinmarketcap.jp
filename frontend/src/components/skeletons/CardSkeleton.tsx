// CardSkeleton.tsx
// This component provides a skeleton loading card used to represent content while it's loading.
// It uses Material-UI components and styles to create a consistent loading card appearance.
// Usage: Import and use this component in places where loading placeholders are needed.

import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardHeader } from '@mui/material';
import { Skeleton } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  skeletonContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.card.default,
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 12,
  },
  skeletonContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '32px !important',
  },
}));

const CardSkeleton: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.skeletonContainer}>
      <CardHeader
        disableTypography
        title={<Skeleton height={32} width="60%" />}
        subheader={<Skeleton height={21} width="40%" />}
        avatar={
          <Skeleton
            variant="circular"
            height={theme.spacing(4)}
            width={theme.spacing(4)}
          />
        }
      />
      <CardContent className={classes.skeletonContent}>
        <Skeleton height={32} width="20%" />
        <Skeleton height={20} width="40%" />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
