import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Drawer as MuiDrawer } from '@mui/material';
import DrawerItems from './DrawerItems';
import DrawerFooter from './DrawerFooter';
import { RootModule } from '../../models/common/RootModule';
import { appBarHeight, drawerWidth } from '../../common/shared/dimensions';
import MainLogo from './MainLogo';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    border: 'none',
    background: theme.palette.background.default,
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  rootModule: RootModule[];
  anchor?: 'bottom' | 'left' | 'right' | 'top';
}

const MobileDrawer: React.FC<Props> = ({
  mobileOpen,
  handleDrawerToggle,
  rootModule,
  anchor,
}) => {
  const classes = useStyles();

  return (
    <MuiDrawer
      className={classes.drawer}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      anchor={anchor}
    >
      <Box
        display="flex"
        justifyContent="center"
        height={appBarHeight}
        padding={2}
      >
        <MainLogo />
      </Box>
      <div className={classes.drawerContainer}>
        <DrawerItems
          rootModule={rootModule}
          handleDrawerToggle={handleDrawerToggle}
        />
        <DrawerFooter />
      </div>
    </MuiDrawer>
  );
};

export default MobileDrawer;
