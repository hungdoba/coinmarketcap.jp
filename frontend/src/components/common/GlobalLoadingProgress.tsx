import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useStore } from 'react-redux';
import { RootState } from '../../app/store';
import UpdateDataButton from './UpdateDataButton';

const GlobalLoadingProgress: React.FC = () => {
  const store = useStore();
  const [allStates, setAllStates] = useState<RootState>(
    store.getState() as RootState
  );
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const updatedState = store.getState() as RootState;
      setAllStates(updatedState);
      const isLoading = !!Object.values(updatedState).find(
        (item: any) =>
          item.status === 'LOADING' || item.status === 'LOADING MORE'
      );
      setGlobalLoading(isLoading);
    });

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [store]);

  return (
    <React.Fragment>
      {globalLoading ? (
        <Box sx={{ display: 'flex', margin: '8px' }}>
          <CircularProgress size={24} />
        </Box>
      ) : (
        <UpdateDataButton />
      )}
    </React.Fragment>
  );
};

export default GlobalLoadingProgress;
