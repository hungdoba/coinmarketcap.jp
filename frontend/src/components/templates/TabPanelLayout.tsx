// TabPanelLayout.tsx
// This component is a tab panel layout for displaying content associated with specific tabs.
// It accepts children components, the current tab value (index), and the selected tab value.
// Props:
// - children: The content to display within the tab panel.
// - index: The index of the tab panel.
// - value: The currently selected tab index.
// Usage: Include this component within a tabbed interface to manage and display content based on selected tabs.

import React from 'react';
import { Box } from '@mui/material';
import { CoinDetailsTabValues } from '../../models';

interface Props {
  children?: React.ReactNode;
  index: CoinDetailsTabValues;
  value: CoinDetailsTabValues;
}

const TabPanelLayout: React.FC<Props> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <Box
      flex="1"
      position="relative"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <>{children}</>}
    </Box>
  );
};

export default TabPanelLayout;
