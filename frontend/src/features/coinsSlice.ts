import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { GenericState, Coin } from '../models';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';

// initialState
const initialState: GenericState<Coin[]> = {
  value: [],
  status: 'IDLE',
};

export const fetchCoins = createAsyncThunk('coins', async () => {
  const cachedData: Coin[] | null = retrieveCache('coins');

  if (cachedData) {
    return cachedData as Coin[];
  } else {
    const url = `${process.env.REACT_APP_BACKEND_URL}/markets`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch coin list');
    }

    const jsonData = await response.json();

    const normalizedResponse = toCamelCase(jsonData);

    return normalizedResponse as Coin[];
  }
});

export const selectCoins: (state: RootState) => GenericState<Coin[]> = (
  state: RootState
) => state.coins;

const coinsSlice: Slice<GenericState<Coin[]>, {}, 'coins'> = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default coinsSlice.reducer;
