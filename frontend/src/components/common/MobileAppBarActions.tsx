import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { MenuRounded } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) => ({
  actionButton: {
    marginRight: 16,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12,
    '&:hover': {
      backgroundColor: `${theme.palette.text.secondary}80`,
    },
  },
  searchContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: 100,
    padding: '4px 24px',
    backgroundColor: theme.palette.background.default,
  },
}));

interface Props {
  handleDrawerToggle: () => void;
}

const AppBarActions: React.FC<Props> = ({ handleDrawerToggle }) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <IconButton
        className={classes.actionButton}
        onClick={handleDrawerToggle}
        color="primary"
      >
        <MenuRounded />
      </IconButton>
    </Box>
  );
};

export default AppBarActions;
