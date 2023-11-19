// useCleanReduxState Hook
// This custom React hook is used to clean up Redux state data based on the current location.
// It is designed to clear state slices when navigating to different sections of the app.
// It observes the length of data in Redux state slices and clears them if they exceed certain limits.
// It should be used in components that need to manage the cleanup of specific state slices.

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/reduxHooks';
import {
  clearCoinListValue,
  selectCoinList,
} from '../../features/coinListSlice';
import {
  clearExchangeListValue,
  selectExchangeList,
} from '../../features/exchangeListSlice';
import {
  clearStatusUpdateListValue,
  selectStatusUpdateList,
} from '../../features/statusUpdateListSlice';

export const useCleanReduxState = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);
  const exchangeList = useAppSelector(selectExchangeList);
  const statusUpdateList = useAppSelector(selectStatusUpdateList);

  useEffect(() => {
    if (
      location.pathname !== '/coins' &&
      coinList.value.length > coinList.coinQueryParams.perPage
    ) {
      dispatch(clearCoinListValue());
    }
    if (
      location.pathname !== '/exchanges' &&
      exchangeList.value.length > exchangeList.exchangeQueryParams.perPage
    ) {
      dispatch(clearExchangeListValue());
    }
    if (
      location.pathname !== '/updates' &&
      statusUpdateList.value.length >
        statusUpdateList.statusUpdateQueryParams.perPage
    ) {
      dispatch(clearStatusUpdateListValue());
    }
  }, [
    coinList.coinQueryParams.perPage,
    coinList.value.length,
    dispatch,
    exchangeList.exchangeQueryParams.perPage,
    exchangeList.value.length,
    location,
    statusUpdateList.statusUpdateQueryParams.perPage,
    statusUpdateList.value.length,
  ]);
};
