import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {
  cacheWithExpiry,
  retrieveCache,
  roundDecimals,
  toCamelCase,
} from '../common/helpers';
import { GasOracle, GasOracleState } from '../types/types';

interface Reducers extends SliceCaseReducers<GasOracleState> {
  setSelectedGasFee: (
    state: GasOracleState,
    action: PayloadAction<number>
  ) => void;
  setGasLimit: (state: GasOracleState, action: PayloadAction<number>) => void;
}

const initialState: GasOracleState = {
  value: null,
  status: 'IDLE',
  selectedGasFee: null,
  gasLimit: 21000,
};

export const fetchGasOracle = createAsyncThunk('gasOracle', async () => {
  const cachedData: GasOracle | null = retrieveCache('gasOracle');

  if (cachedData) {
    return cachedData as GasOracle;
  } else {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/ethGasStation}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch coin list');
    }

    const jsonData = await response.json();

    const normalizedResponse = toCamelCase(jsonData) as GasOracle;

    normalizedResponse.safeLow = roundDecimals(
      normalizedResponse.safeLow / 10,
      0
    );
    normalizedResponse.average = roundDecimals(
      normalizedResponse.average / 10,
      0
    );
    normalizedResponse.fast = roundDecimals(normalizedResponse.fast / 10, 0);
    normalizedResponse.fastest = roundDecimals(
      normalizedResponse.fastest / 10,
      0
    );

    return normalizedResponse;
  }
});

export const selectGasOracle: (state: RootState) => GasOracleState = (
  state: RootState
) => state.gasOracle;

const gasOracleSlice: Slice<GasOracleState, Reducers, 'gasOracle'> =
  createSlice({
    name: 'gasOracle',
    initialState,
    reducers: {
      setSelectedGasFee: (
        state: GasOracleState,
        action: PayloadAction<number>
      ) => {
        state.selectedGasFee = action.payload;
      },
      setGasLimit: (state: GasOracleState, action: PayloadAction<number>) => {
        state.gasLimit = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchGasOracle.pending, (state) => {
          state.status = 'LOADING';
        })
        .addCase(fetchGasOracle.fulfilled, (state, action) => {
          state.status = 'IDLE';
          state.value = action.payload;
          state.selectedGasFee = action.payload.average;
        })
        .addCase(fetchGasOracle.rejected, (state, action) => {
          state.status = 'FAILED';
          state.error = action.error.message;
        });
    },
  });

export const { setSelectedGasFee, setGasLimit } = gasOracleSlice.actions;

export default gasOracleSlice.reducer;
