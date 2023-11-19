// DialogLayout.tsx
// This component provides a template for a dialog layout with various customizable elements.
// Props:
// - open: A boolean value indicating whether the dialog is open or closed.
// - toggleClose: A function to toggle the visibility of the dialog.
// - title: The main title or header of the dialog.
// - subheader: An optional subheader or additional information.
// - refLink: An optional link to navigate to an external resource.
// - contentText: Optional content text or JSX elements within the dialog.
// - maxWidth: An optional setting for the maximum width of the dialog.
// - children: Any additional React components or content to be displayed within the dialog.
// Usage: Include this component to create dialog layouts with flexible content and actions.

import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) => ({
  dialogPaper: {
    borderRadius: 12,
  },
  title: {
    maxWidth: 'calc(100% - 48px)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  gotoButton: {
    backgroundColor: '#FF5722',
    color: 'white',
  },
}));

interface Props {
  open: boolean;
  toggleClose: () => void;
  title: string;
  subheader?: string;
  refLink?: string;
  contentText?: JSX.Element | string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  children?: React.ReactNode;
}

const DialogLayout: React.FC<Props> = ({
  children,
  open,
  toggleClose,
  title,
  refLink,
  subheader,
  contentText,
  maxWidth = 'sm',
  ...other
}) => {
  const classes = useStyles();

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={toggleClose}
      maxWidth={maxWidth}
    >
      <DialogTitle component="div">
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {subheader && (
          <Typography variant="caption" color="textSecondary">
            {subheader}
          </Typography>
        )}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={toggleClose}
        >
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent {...other}>
        {contentText && <DialogContentText>{contentText}</DialogContentText>}
        {children}
      </DialogContent>
      {refLink && (
        <Button
          className={classes.gotoButton}
          variant="contained"
          onClick={() => window.open(refLink, '_blank')}
        >
          Trading Now
        </Button>
      )}
    </Dialog>
  );
};

export default DialogLayout;
