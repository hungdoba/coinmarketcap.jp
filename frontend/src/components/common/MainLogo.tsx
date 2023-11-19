// MainLogo.tsx
// This component represents the main logo of the application, which includes an icon and the application name.
// Usage: Include this component in the application header to display the logo. Clicking on it redirects to the home page.

import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { DonutSmall } from '@mui/icons-material';
import { drawerWidth } from '../../common/shared/dimensions';
import { useNavigate } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
  logoWrapper: {
    width: `calc(${drawerWidth}px - 48px)`,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: 4,
    },
    cursor: 'pointer',
  },
}));

const MainLogo: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Box onClick={handleLogoClick} className={classes.logoWrapper}>
      <svg width="0" height="0">
        <linearGradient id="landscapeGradient">
          <stop offset="20%" stopColor={theme.palette.primary.main} />
          <stop offset="80%" stopColor={theme.palette.secondary.main} />
        </linearGradient>
      </svg>
      <DonutSmall sx={{ fill: 'url(#landscapeGradient)' }} />
      <Typography variant="h5" noWrap>
        oinmarket
      </Typography>
    </Box>
  );
};

export default MainLogo;
