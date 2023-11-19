import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';
import { GenericState } from '../models';
import { GlobalCoinData, GlobalCoinDataRootObject } from '../types/types';

const initialState: GenericState<GlobalCoinData | null> = {
  value: null,
  status: 'IDLE',
};

export const fetchGlobalCoinData = createAsyncThunk(
  'globalCoinData',
  async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/global`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch coin list');
    }

    const jsonData = await response.json();

    const normalizedResponse = toCamelCase(jsonData.data);

    return normalizedResponse as GlobalCoinData;
  }
);

export const selectGlobalCoinData: (
  state: RootState
) => GenericState<GlobalCoinData | null> = (state: RootState) =>
  state.globalCoinData;

const globalCoinDataSlice: Slice<
  GenericState<GlobalCoinData | null>,
  {},
  'globalCoinData'
> = createSlice({
  name: 'globalCoinData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalCoinData.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchGlobalCoinData.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchGlobalCoinData.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default globalCoinDataSlice.reducer;
