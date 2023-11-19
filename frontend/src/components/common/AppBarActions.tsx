// AppBarActions.tsx
// This component represents the actions in the app bar. It displays a main logo and buttons for navigating to different pages.
// The buttons are generated based on the provided `rootModule` which contains information about the available pages.
// Usage: Include this component in the app bar to display the main logo and navigation buttons.

import React from 'react';
import { Box, Button } from '@mui/material';
import MainLogo from './MainLogo';
import { Page, RootModule } from '../../models';
import { useNavigate } from 'react-router';

interface Props {
  rootModule: RootModule[];
}

const AppBarActions: React.FC<Props> = ({ rootModule }) => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <Box display="flex">
      <MainLogo />
      {rootModule.map((moduleObject: RootModule) => {
        return (
          <>
            {moduleObject.pages
              .filter((page: Page) => page.path != '/')
              .map((page: Page) => {
                return (
                  <Button
                    key={page.label}
                    onClick={() => handleClick(page.path)}
                  >
                    {page.label}
                  </Button>
                );
              })}
          </>
        );
      })}
    </Box>
  );
};

export default AppBarActions;
