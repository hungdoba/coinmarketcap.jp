import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import {
  AvailableDayRanges,
  CoinMarketChart,
  FearGreedIndex,
  FearGreedIndexRootObject,
  FearGreedIndexState,
} from '../models';

interface Reducers extends SliceCaseReducers<FearGreedIndexState> {
  setShowBitcoinCorrelation: (
    state: FearGreedIndexState,
    action: PayloadAction<boolean>
  ) => void;
}

const initialState: FearGreedIndexState = {
  value: [],
  today: null,
  showBitcoinCorrelation: false,
  status: 'IDLE',
};

export const fetchFearGreedIndex = createAsyncThunk(
  'fearGreedIndex',
  async () => {
    const dayRange: AvailableDayRanges = 30;

    const bitcoinMarketChartResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/coinMarketChart?coinId=bitcoin&days=${dayRange}&interval=daily`
    );
    const bitcoinMarketChart = await bitcoinMarketChartResponse.json();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/fearGreedIndex?dayRange=${dayRange}`
    );
    const jsonData = await response.json();

    const normalizedResponse = toCamelCase(
      jsonData
    ) as FearGreedIndexRootObject;
    // Sort here since endpoint returns data in date descending order, which does NOT work for the charts
    normalizedResponse.data.sort(
      (a: FearGreedIndex, b: FearGreedIndex) =>
        Number(a.timestamp) - Number(b.timestamp)
    );

    const normalizedBitcoinMarketChart = toCamelCase(
      bitcoinMarketChart
    ) as CoinMarketChart;
    normalizedResponse.data.forEach(
      (indexData: FearGreedIndex, index: number) => {
        indexData.bitcoinPrice = normalizedBitcoinMarketChart.prices[index][1];
      }
    );

    return normalizedResponse.data as FearGreedIndex[];
  }
);

export const selectFearGreedIndex: (state: RootState) => FearGreedIndexState = (
  state: RootState
) => state.fearGreedIndex;

const fearGreedIndexSlice: Slice<
  FearGreedIndexState,
  Reducers,
  'fearGreedIndex'
> = createSlice({
  name: 'fearGreedIndex',
  initialState,
  reducers: {
    setShowBitcoinCorrelation: (
      state: FearGreedIndexState,
      action: PayloadAction<boolean>
    ) => {
      state.showBitcoinCorrelation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFearGreedIndex.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchFearGreedIndex.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
        state.today = action.payload[action.payload.length - 1];
      })
      .addCase(fetchFearGreedIndex.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export const { setShowBitcoinCorrelation } = fearGreedIndexSlice.actions;

export default fearGreedIndexSlice.reducer;
