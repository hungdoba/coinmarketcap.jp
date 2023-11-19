import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  ExchangeVolumeChartDayRanges,
  ExchangeVolumeChartState,
} from '../models';
import { toCamelCase } from '../common/helpers';

interface Reducers extends SliceCaseReducers<ExchangeVolumeChartState> {
  setSelectedDayRange: (
    state: ExchangeVolumeChartState,
    action: PayloadAction<ExchangeVolumeChartDayRanges>
  ) => void;
}

const initialState: ExchangeVolumeChartState = {
  value: [],
  status: 'IDLE',
  selectedDayRange: 30,
};

interface Params {
  exchangeId: string;
  dayRange: ExchangeVolumeChartDayRanges;
}

export const fetchExchangeVolumeChart = createAsyncThunk(
  'exchangeVolumeChart',
  async (params: Params) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/exchange?exchangeId=${params.exchangeId}&days=${params.dayRange}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exchange volume chart');
    }

    const jsonData = await response.json();
    const normalizedResponse = toCamelCase(jsonData);
    return normalizedResponse as [number, string][];
  }
);

export const selectExchangeVolumeChart: (
  state: RootState
) => ExchangeVolumeChartState = (state: RootState) => state.exchangeVolumeChart;

const exchangeVolumeChartSlice: Slice<
  ExchangeVolumeChartState,
  Reducers,
  'exchangeVolumeChart'
> = createSlice({
  name: 'exchangeVolumeChart',
  initialState,
  reducers: {
    setSelectedDayRange: (
      state: ExchangeVolumeChartState,
      action: PayloadAction<ExchangeVolumeChartDayRanges>
    ) => {
      state.selectedDayRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeVolumeChart.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchExchangeVolumeChart.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
      })
      .addCase(fetchExchangeVolumeChart.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedDayRange } = exchangeVolumeChartSlice.actions;

export default exchangeVolumeChartSlice.reducer;
