import React from 'react';
import { Theme } from '@mui/material/styles';
import { makeStyles, withStyles } from '@mui/styles';
import { Switch } from '@mui/material';
import { useAppDispatch } from '../../../../app/reduxHooks';
import { bitcoinOrange } from '../../../../common/shared/colors';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import TooltipBasicLayout from '../../../templates/TooltipBasicLayout';

const useStyles = makeStyles((theme: Theme) => ({
  bitcoinCorrelationSwitch: {
    margin: '12px 12px 0 0',
  },
}));

const CustomSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: bitcoinOrange,
    },
    '&$checked + $track': {
      backgroundColor: bitcoinOrange,
    },
  },
  checked: {},
  track: {},
})(Switch);

interface Props {
  currentState: boolean;
  toggleFunction: ActionCreatorWithPayload<boolean, string>;
}

const ShowBitcoinCorrelationSwitch: React.FC<Props> = ({
  currentState,
  toggleFunction,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <TooltipBasicLayout
      title={`${currentState ? 'Hide' : 'Show'} Bitcoin Price`}
    >
      <CustomSwitch
        className={classes.bitcoinCorrelationSwitch}
        checked={currentState}
        onChange={() => dispatch(toggleFunction(!currentState))}
      />
    </TooltipBasicLayout>
  );
};

export default ShowBitcoinCorrelationSwitch;
