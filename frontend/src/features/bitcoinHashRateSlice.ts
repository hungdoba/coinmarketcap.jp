import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {
  BitcoinHashRate,
  BitcoinHashRateRootObject,
  BitcoinHashRateState,
  CoinMarketChart,
} from '../models';
import { cacheWithExpiry, retrieveCache, toCamelCase } from '../common/helpers';

interface Reducers extends SliceCaseReducers<BitcoinHashRateState> {
  setShowBitcoinCorrelation: (
    state: BitcoinHashRateState,
    action: PayloadAction<boolean>
  ) => void;
}

const initialState: BitcoinHashRateState = {
  value: [],
  today: null,
  showBitcoinCorrelation: false,
  status: 'IDLE',
};

export const fetchBitcoinHashRate = createAsyncThunk(
  'bitcoinHashRate',
  async () => {
    const cachedData: BitcoinHashRate[] | null =
      retrieveCache('bitcoinHashRate');

    if (cachedData) {
      return cachedData as BitcoinHashRate[];
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/bitcoinHashRate`
      );
      const jsonData = await response.json();

      const bitcoinMarketChartResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/coinMarketChart?coinId=bitcoin&days=365&interval=daily`
      );
      const bitcoinMarketChart = await bitcoinMarketChartResponse.json();

      const normalizedResponse = toCamelCase(
        jsonData
      ) as BitcoinHashRateRootObject;

      const normalizedBitcoinMarketChart = toCamelCase(
        bitcoinMarketChart
      ) as CoinMarketChart;
      normalizedResponse.values.forEach(
        (hashRateData: BitcoinHashRate, index: number) => {
          hashRateData.bitcoinPrice =
            normalizedBitcoinMarketChart.prices[index][1];
        }
      );

      cacheWithExpiry('bitcoinHashRate', normalizedResponse.values, 3600000); // Cache Period: 1 hour

      return normalizedResponse.values as BitcoinHashRate[];
    }
  }
);

export const selectBitcoinHashRate: (
  state: RootState
) => BitcoinHashRateState = (state: RootState) => state.bitcoinHashRate;

const bitcoinHashRateSlice: Slice<
  BitcoinHashRateState,
  Reducers,
  'bitcoinHashRate'
> = createSlice({
  name: 'bitcoinHashRate',
  initialState,
  reducers: {
    setShowBitcoinCorrelation: (
      state: BitcoinHashRateState,
      action: PayloadAction<boolean>
    ) => {
      state.showBitcoinCorrelation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBitcoinHashRate.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchBitcoinHashRate.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload;
        state.today = action.payload[action.payload.length - 1];
      })
      .addCase(fetchBitcoinHashRate.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export const { setShowBitcoinCorrelation } = bitcoinHashRateSlice.actions;

export default bitcoinHashRateSlice.reducer;
