import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { Divider, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/reduxHooks';
import { appBarHeight } from '../../common/shared/dimensions';
import { fetchCoins, selectCoins } from '../../features/coinsSlice';
import {
  fetchCoinCategories,
  selectCoinCategories,
} from '../../features/coinCategoriesSlice';
import { useCleanReduxState } from '../../common/hooks/useCleanReduxState';
import SideUtils from './SideUtils';
import MobileAppBarActions from './MobileAppBarActions';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    '& .MuiToolbar-root': {
      minHeight: appBarHeight,
      justifyContent: 'space-between',
    },
  },
}));

interface Props {
  handleDrawerToggle: () => void;
}

const MobileAppBar: React.FC<Props> = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinCategories = useAppSelector(selectCoinCategories);

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === 'IDLE') {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.status, coins.value.length]);

  useEffect(() => {
    if (coinCategories.value.length === 0 && coinCategories.status === 'IDLE') {
      dispatch(fetchCoinCategories());
    }
  }, [dispatch, coinCategories.value, coinCategories.status]);

  useCleanReduxState();

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <MobileAppBarActions handleDrawerToggle={handleDrawerToggle} />
        <SideUtils />
      </Toolbar>
      <Divider />
    </MuiAppBar>
  );
};

export default MobileAppBar;
