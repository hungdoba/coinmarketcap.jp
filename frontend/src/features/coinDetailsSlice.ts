import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { CoinDetails, CoinDetailsState } from '../models';
import { toCamelCase } from '../common/helpers';

const initialState: CoinDetailsState = {
  value: null,
  status: 'IDLE',
};

export const fetchCoinDetails = createAsyncThunk(
  'coinDetails',
  async (coinId: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/coinDetails?coinId=${coinId}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch coin details');
    }

    const jsonData = await response.json();
    const normalizedResponse = toCamelCase(jsonData);

    return normalizedResponse as CoinDetails;
  }
);

export const selectCoinDetails: (state: RootState) => CoinDetailsState = (
  state: RootState
) => state.coinDetails;

const coinDetailsSlice: Slice<CoinDetailsState, {}, 'coinDetails'> =
  createSlice({
    name: 'coinDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCoinDetails.pending, (state) => {
          state.status = 'LOADING';
        })
        .addCase(fetchCoinDetails.fulfilled, (state, action) => {
          state.status = 'IDLE';
          state.value = action.payload;
        })
        .addCase(fetchCoinDetails.rejected, (state, action) => {
          state.status = 'FAILED';
          state.error = action.error.message;
        });
    },
  });

export default coinDetailsSlice.reducer;
