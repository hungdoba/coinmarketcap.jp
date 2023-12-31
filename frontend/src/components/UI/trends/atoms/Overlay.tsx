import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  overlay: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100% - 153px)',
    width: '100%',
    transform: 'translateY(-100%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 1,
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
}));

interface Props {
  loadingIcon: React.ReactNode;
  children?: React.ReactNode;
}

const Overlay: React.FC<Props> = ({ loadingIcon, children }) => {
  const classes = useStyles();

  return (
    <>
      {children}
      <Box className={classes.overlay}>{loadingIcon}</Box>
    </>
  );
};

export default Overlay;
