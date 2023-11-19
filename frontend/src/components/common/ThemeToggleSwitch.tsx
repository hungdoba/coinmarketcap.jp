// ThemeToggleSwitch.tsx
// This component represents a theme toggle switch that allows users to switch between light and dark themes.
// It displays two theme icons, a sun and a moon, and the user can click on these icons to toggle the theme.
// Usage: Include this component in the application's user interface to provide a theme switch option.

import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/reduxHooks';
import { selectAppState, setDarkMode } from '../../features/appStateSlice';
import { NightsStayOutlined, WbSunnyOutlined } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) => ({
  themeButton: {
    padding: 8,
  },
}));

const ThemeToggleSwitch: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const appState = useAppSelector(selectAppState);

  return (
    <Box width="50%" display="flex" alignItems="center" justifyContent="center">
      <IconButton
        onClick={() => dispatch(setDarkMode(false))}
        className={classes.themeButton}
        style={{
          color: appState.darkMode
            ? `${theme.palette.text.secondary}80`
            : theme.palette.text.primary,
        }}
      >
        <WbSunnyOutlined />
      </IconButton>
      <Typography variant="h6" component="span">
        <b>/</b>
      </Typography>
      <IconButton
        onClick={() => dispatch(setDarkMode(true))}
        className={classes.themeButton}
        style={{
          color: appState.darkMode
            ? theme.palette.text.primary
            : `${theme.palette.text.secondary}80`,
        }}
      >
        <NightsStayOutlined />
      </IconButton>
    </Box>
  );
};

export default ThemeToggleSwitch;
