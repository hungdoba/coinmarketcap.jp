// CardLayout.tsx
// This component provides a template for a card layout with customizable minimum width.
// It is designed to be used for displaying content within a card structure.
// Props:
// - minWidth: An optional prop to set a minimum width for the card. If not provided, it defaults to 'none'.
// - children: The content to be displayed inside the card.
// Usage: Include this component to create card layouts with flexible or specific minimum widths.

import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Card } from '@mui/material';

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
  card: {
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    backgroundColor: theme.palette.card.default,
    height: '100%',
    borderRadius: 12,
    border: `1px solid ${theme.palette.background.default}`,
    overflowX: (props: Props) => (props.minWidth ? 'scroll' : 'visible'),
    '& > *': {
      minWidth: (props: Props) => (props.minWidth ? props.minWidth : 'none'),
    },
    '& .MuiCardHeader-avatar': {
      marginRight: 8,
    },
  },
}));

interface Props {
  minWidth?: number;
  children?: React.ReactNode;
}

const CardLayout: React.FC<Props> = ({ children, minWidth }) => {
  const classes = useStyles({ minWidth });

  return (
    <Card className={classes.card} elevation={0}>
      {children}
    </Card>
  );
};

export default CardLayout;
