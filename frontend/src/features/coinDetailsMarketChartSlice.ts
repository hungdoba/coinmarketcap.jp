import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  AvailableDayRanges,
  CoinDetailsMarketChartState,
  CoinMarketChart,
} from '../models';
import { toCamelCase } from '../common/helpers';

interface Reducers extends SliceCaseReducers<CoinDetailsMarketChartState> {
  setSelectedDayRange: (
    state: CoinDetailsMarketChartState,
    action: PayloadAction<AvailableDayRanges>
  ) => void;
  setSelectedDataType: (
    state: CoinDetailsMarketChartState,
    action: PayloadAction<keyof CoinMarketChart>
  ) => void;
}

const initialState: CoinDetailsMarketChartState = {
  value: {
    marketCaps: [],
    prices: [],
    totalVolumes: [],
  },
  selectedDayRange: 1,
  selectedDataType: 'prices',
  status: 'IDLE',
};

interface Params {
  coinId: string;
  dayRange: AvailableDayRanges;
}

export const fetchCoinDetailsMarketChart = createAsyncThunk(
  'coinDetailsMarketChart',
  async (params: Params) => {
    const fetchData = fetch(
      `${process.env.REACT_APP_BACKEND_URL}/coinMarketChart?coinId=${
        params.coinId
      }&days=${params.dayRange}&interval=${
        params.dayRange !== 'max' && params.dayRange < 30 ? 'hourly' : 'daily'
      }`
    );
    return fetchData
      .then((response) => response.json())
      .then((jsonData) => {
        const normalizedResponse = toCamelCase(jsonData);
        return normalizedResponse as CoinMarketChart;
      });
  }
);

export const selectCoinDetailsMarketChart: (
  state: RootState
) => CoinDetailsMarketChartState = (state: RootState) =>
  state.coinDetailsMarketChart;

const coinDetailsMarketChartSlice: Slice<
  CoinDetailsMarketChartState,
  Reducers,
  'coinDetailsMarketChart'
> = createSlice({
  name: 'coinDetailsMarketChart',
  initialState,
  reducers: {
    setSelectedDayRange: (
      state: CoinDetailsMarketChartState,
      action: PayloadAction<AvailableDayRanges>
    ) => {
      state.selectedDayRange = action.payload;
    },
    setSelectedDataType: (
      state: CoinDetailsMarketChartState,
      action: PayloadAction<keyof CoinMarketChart>
    ) => {
      state.selectedDataType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinDetailsMarketChart.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoinDetailsMarketChart.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCoinDetailsMarketChart.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDayRange, setSelectedDataType } =
  coinDetailsMarketChartSlice.actions;

export default coinDetailsMarketChartSlice.reducer;
