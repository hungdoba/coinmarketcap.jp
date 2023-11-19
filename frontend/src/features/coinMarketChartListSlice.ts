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
  CoinMarketChart,
  CoinMarketChartList,
  CoinMarketChartListState,
} from '../models';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';

interface Reducers extends SliceCaseReducers<CoinMarketChartListState> {
  setSelectedDayRange: (
    state: CoinMarketChartListState,
    action: PayloadAction<AvailableDayRanges>
  ) => void;
  setSelectedDataType: (
    state: CoinMarketChartListState,
    action: PayloadAction<keyof CoinMarketChart>
  ) => void;
}

const initialState: CoinMarketChartListState = {
  value: {
    1: {},
    7: {},
    30: {},
    90: {},
    365: {},
    730: {},
    max: {},
  },
  selectedDayRange: 90,
  // selectedDayRange: 30,
  selectedDataType: 'prices',
  status: 'IDLE',
};

interface Params {
  coinIdList: string[];
  dayRange: AvailableDayRanges;
}

export const fetchCoinMarketChartList = createAsyncThunk(
  'coinMarketChartList',
  async (params: Params, { getState }) => {
    const state = getState() as RootState;

    const cachedData: CoinMarketChartList | null = retrieveCache(
      `coinMarketChartList-dayRange${params.dayRange}`
    );

    if (cachedData) {
      return {
        ...state.coinMarketChartList.value,
        [params.dayRange]: cachedData,
      } as CoinMarketChartList;
    } else {
      const fetchPromises = params.coinIdList.map((coinId) =>
        fetch(
          `${
            process.env.REACT_APP_BACKEND_URL
          }/coinMarketChart?coinId=${coinId}&days=${params.dayRange}&interval=${
            params.dayRange !== 'max' && params.dayRange < 30
              ? 'hourly'
              : 'daily'
          }`
        )
          .then((response) => response.json())
          .then((jsonData) => toCamelCase(jsonData))
      );

      const responses = await Promise.all(fetchPromises);
      const normalizedResponse = {} as any;

      for (let i = 0; i < params.coinIdList.length; i++) {
        normalizedResponse[params.coinIdList[i]] = responses[i];
      }

      cacheWithExpiry(
        `coinMarketChartList-dayRange${params.dayRange}`,
        normalizedResponse,
        params.dayRange === 1 ? 3600000 : 8.64e7 // Cache Period: 1 hour or 1 day
      );

      return {
        ...state.coinMarketChartList.value,
        [params.dayRange]: normalizedResponse,
      } as CoinMarketChartList;
    }
  }
);

export const selectCoinMarketChartList: (
  state: RootState
) => CoinMarketChartListState = (state: RootState) => state.coinMarketChartList;

const coinMarketChartListSlice: Slice<
  CoinMarketChartListState,
  Reducers,
  'coinMarketChartList'
> = createSlice({
  name: 'coinMarketChartList',
  initialState,
  reducers: {
    setSelectedDayRange: (
      state: CoinMarketChartListState,
      action: PayloadAction<AvailableDayRanges>
    ) => {
      state.selectedDayRange = action.payload;
    },
    setSelectedDataType: (
      state: CoinMarketChartListState,
      action: PayloadAction<keyof CoinMarketChart>
    ) => {
      state.selectedDataType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinMarketChartList.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoinMarketChartList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchCoinMarketChartList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDayRange, setSelectedDataType } =
  coinMarketChartListSlice.actions;

export default coinMarketChartListSlice.reducer;
