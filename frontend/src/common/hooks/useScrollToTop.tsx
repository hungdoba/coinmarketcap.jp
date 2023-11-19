// useScrollToTop Hook
// This custom React hook is designed to create a "Scroll to Top" button that can be used across the application.
// It returns a component called `FloatingButton` that includes the `ScrollToTopButton` with customizable options.
// - `threshold` sets the scroll threshold for showing the button.
// Usage: Call this hook within your components to provide an easily customizable "Scroll to Top" button.

import React, { useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Fab, useScrollTrigger, Zoom } from '@mui/material';
import { KeyboardArrowUpRounded } from '@mui/icons-material';

const useStyles = makeStyles<Theme, { buttonOffset: number }>(
  (theme: Theme) => ({
    container: {
      position: 'absolute',
      bottom: (props) => theme.spacing(props.buttonOffset),
      right: (props) => theme.spacing(props.buttonOffset),
    },
  })
);

interface Props {
  target: React.MutableRefObject<any | null>;
  top: React.MutableRefObject<any | null>;
  threshold: number;
  buttonOffset?: number;
}

const ScrollToTopButton: React.FC<Props> = ({
  target,
  top,
  threshold,
  buttonOffset = 3,
  ...others
}) => {
  const classes = useStyles({ buttonOffset: buttonOffset });

  const trigger = useScrollTrigger({
    target: target.current ? target.current : undefined,
    threshold: threshold,
  });

  const scrollToTop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (top.current) {
      top.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger} style={{ transitionDelay: trigger ? '500ms' : '0ms' }}>
      <div onClick={scrollToTop} className={classes.container}>
        <Fab {...others}>
          <KeyboardArrowUpRounded />
        </Fab>
      </div>
    </Zoom>
  );
};

interface ButtonProps {
  color?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  buttonOffset?: number;
}

interface UseScrollToTopResults {
  FloatingButton: React.FC<ButtonProps>;
  target: React.MutableRefObject<any | null>;
  top: React.MutableRefObject<any | null>;
}

export const useScrollToTop: (threshold?: number) => UseScrollToTopResults = (
  threshold: number = 30
) => {
  const target = useRef<any | null>(null);
  const top = useRef<any | null>(null);

  return {
    FloatingButton: (props: ButtonProps) => (
      <ScrollToTopButton
        target={target}
        top={top}
        threshold={threshold}
        {...props}
      />
    ),
    target: target,
    top: top,
  };
};
