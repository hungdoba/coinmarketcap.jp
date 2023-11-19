// NavListItem.tsx
// This component represents a navigation list item that is used in the application's side navigation menu.
// It provides a clickable list item with an icon and label, and it highlights the currently selected page.
// Usage: Include this component within the navigation menu to create list items for different pages in the application.

import React from 'react';
import { makeStyles } from '@mui/styles';
import { Page } from '../../models';
import { Theme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  navListItem: {
    borderRadius: 12,
    marginBottom: 5,
  },
}));

interface Props {
  page: Page;
  handleDrawerToggle?: () => void;
}

const NavListItem: React.FC<Props> = ({ page, handleDrawerToggle }) => {
  const classes = useStyles();

  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (handleDrawerToggle) handleDrawerToggle();
    navigate(page.path);
  };

  const pathGroup =
    /(.+)\//.exec(location.pathname) === null
      ? location.pathname
      : /(.+)\//.exec(location.pathname)![1];

  return (
    <ListItem
      button
      className={classes.navListItem}
      onClick={handleClick}
      selected={pathGroup === page.path}
    >
      <ListItemIcon>{page.icon}</ListItemIcon>
      <ListItemText primary={page.label} />
    </ListItem>
  );
};

export default NavListItem;
