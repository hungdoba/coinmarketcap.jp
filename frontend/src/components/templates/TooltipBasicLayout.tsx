// TooltipBasicLayout.tsx
// This component provides a custom tooltip layout for enhanced user experience. It wraps around a target element
// and displays a tooltip when hovering over the element. You can specify the tooltip title, placement, and additional styles.
// Props:
// - children: The target element to which the tooltip is attached.
// - title: The text displayed in the tooltip.
// - placement: The placement of the tooltip relative to the target element (default is 'top').
// - additionalStyles: Additional CSS styles to customize the tooltip's appearance.
// Usage: Wrap an element with this component and specify the desired tooltip properties to improve user interactions.

import React, { ReactElement, forwardRef } from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  customTooltip: {
    fontSize: 11,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
    padding: 8,
  },
}));

interface Props {
  children: ReactElement<any, any>;
  title: string;
  placement?:
    | 'top'
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start';
  additionalStyles?: string;
}

const TooltipBasicLayout: React.FC<Props> = forwardRef(
  ({ children, title, placement, additionalStyles }, ref) => {
    const classes = useStyles();

    return (
      <Tooltip
        title={title}
        placement={placement}
        classes={{ tooltip: `${classes.customTooltip} ${additionalStyles}` }}
        ref={ref}
      >
        {children}
      </Tooltip>
    );
  }
);

export default TooltipBasicLayout;
