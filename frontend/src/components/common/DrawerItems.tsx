// DrawerItems.tsx
// This component is responsible for rendering navigation items within a drawer or sidebar.
// It takes a list of module objects, where each module has a name and a list of associated pages.
// The component uses MUI's List and ListSubheader to group the pages by module names, making it easy to navigate.
// Each navigation item is represented by the NavListItem component, and the handleDrawerToggle function is used to toggle the drawer (if provided).
// Usage: Include this component to render the navigation items within a drawer or sidebar.

import React from 'react';
import { Page } from '../../models';
import NavListItem from './NavListItem';
import { List, ListSubheader } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { RootModule } from '../../models/common/RootModule';

const useStyles = makeStyles((theme: Theme) => ({
  navItemsWrapper: {
    padding: '0 22px',
    '& .MuiListItem-root.Mui-selected': {
      color: theme.palette.secondary.main,
      backgroundColor: `${theme.palette.secondary.main}15`,
      '& .MuiListItemIcon-root': {
        color: theme.palette.secondary.main,
      },
    },
  },
  filterItemsWrapper: {
    padding: '0 22px',
  },
}));

interface Props {
  rootModule: RootModule[];
  handleDrawerToggle?: () => void;
}

const DrawerItems: React.FC<Props> = ({ rootModule, handleDrawerToggle }) => {
  const classes = useStyles();

  return (
    <div className={classes.navItemsWrapper}>
      {rootModule.map((moduleObject: RootModule) => {
        return (
          <List
            key={moduleObject.moduleName}
            subheader={
              <ListSubheader component="div">
                {moduleObject.moduleName}
              </ListSubheader>
            }
          >
            {moduleObject.pages.map((page: Page) => {
              return (
                <NavListItem
                  key={page.path}
                  page={page}
                  handleDrawerToggle={handleDrawerToggle}
                />
              );
            })}
          </List>
        );
      })}
    </div>
  );
};

export default DrawerItems;
