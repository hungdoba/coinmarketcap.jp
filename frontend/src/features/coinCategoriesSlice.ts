import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { GenericState, CoinCategory } from '../models';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';

const initialState: GenericState<CoinCategory[]> = {
  value: [],
  status: 'IDLE',
};

export const fetchCoinCategories = createAsyncThunk(
  'coinCategories',
  async () => {
    const cachedData: CoinCategory[] | null = retrieveCache('coinCategories');
    if (cachedData) {
      return cachedData as CoinCategory[];
    } else {
      const fetchData = fetch(
        `${process.env.REACT_APP_BACKEND_URL}/categories`
      );
      return fetchData
        .then((response) => response.json())
        .then((jsonData) => {
          const normalizedResponse = (
            toCamelCase(jsonData) as CoinCategory[]
          ).filter(
            (coinCategory: CoinCategory) =>
              coinCategory.categoryId !== 'recently_added'
          );

          cacheWithExpiry('coinCategories', normalizedResponse, 8.64e7); // Cache Period: 1 day
          return normalizedResponse as CoinCategory[];
        });
    }
  }
);

export const selectCoinCategories: (
  state: RootState
) => GenericState<CoinCategory[]> = (state: RootState) => state.coinCategories;

const coinCategoriesSlice: Slice<
  GenericState<CoinCategory[]>,
  {},
  'coinCategories'
> = createSlice({
  name: 'coinCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinCategories.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoinCategories.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCoinCategories.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export default coinCategoriesSlice.reducer;
