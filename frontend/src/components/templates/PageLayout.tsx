import React, { useState } from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Hidden } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppBar from '../common/AppBar';
import MobileDrawer from '../common/MobileDrawer';
import { Page, RootModule } from '../../models';
import { appBarHeight, drawerWidth } from '../../common/shared/dimensions';
import MobileAppBar from '../common/MobileAppBar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  content: {
    flexGrow: 1,
    minHeight: `calc(100% - ${appBarHeight}px)`,
    width: `calc(100% - ${drawerWidth}px - 20px)`,
    backgroundColor: theme.palette.background.paper,
    marginTop: appBarHeight,
    marginRight: 20,
    padding: '24px 24px 0 24px',
    borderRadius: 12,
    '& ::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
    },
  },
}));

interface Props {
  rootModule: RootModule[];
}

const PageLayout: React.FC<Props> = ({ rootModule }) => {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pages = rootModule
    .map((moduleObject: RootModule) => moduleObject.pages)
    .reduce((acc, page: Page[]) => acc.concat(page), []);

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <AppBar rootModule={rootModule} />
      </Hidden>
      <Hidden mdUp>
        <MobileAppBar handleDrawerToggle={handleDrawerToggle} />
        <MobileDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          rootModule={rootModule}
        />
      </Hidden>
      <main className={classes.content}>
        <Routes>
          {pages
            .filter((page: Page) => page.subpage)
            .map((page: Page) => {
              return (
                <Route
                  key={`${page.path}/:${page.subpage?.path}`}
                  path={`/coins/:${page.subpage?.path}`}
                  element={page.subpage?.page}
                />
              );
            })}
          {pages
            .slice()
            .sort((a, b) => b.index - a.index)
            .map((page: Page) => {
              return (
                <Route key={page.path} path={page.path} element={page.page} />
              );
            })}
        </Routes>
      </main>
    </div>
  );
};

export default PageLayout;
