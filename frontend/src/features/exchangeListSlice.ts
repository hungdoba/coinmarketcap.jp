import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { Exchange, ExchangeListState, ExchangeQueryParams } from '../models';

interface Reducers extends SliceCaseReducers<ExchangeListState> {
  setExchangeQueryParams: (
    state: ExchangeListState,
    action: PayloadAction<ExchangeQueryParams>
  ) => void;
  clearExchangeListValue: (state: ExchangeListState) => void;
}

const initialState: ExchangeListState = {
  value: [],
  status: 'IDLE',
  exchangeQueryParams: {
    page: 1,
    perPage: 36,
  },
  hasMore: true,
};

interface Params {
  exchangeQueryParams: ExchangeQueryParams;
  append: boolean;
}

export const fetchExchangeList = createAsyncThunk(
  'exchangeList',
  async (params: Params) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/exchanges?page=${params.exchangeQueryParams.page}&perPage=${params.exchangeQueryParams.perPage}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exchange list');
    }

    const jsonData = await response.json();
    const normalizedResponse = toCamelCase(jsonData);

    return { data: normalizedResponse, append: params.append } as {
      data: Exchange[];
      append: boolean;
    };
  }
);

export const selectExchangeList: (state: RootState) => ExchangeListState = (
  state: RootState
) => state.exchangeList;

const exchangeListSlice: Slice<ExchangeListState, Reducers, 'exchangeList'> =
  createSlice({
    name: 'exchangeList',
    initialState,
    reducers: {
      setExchangeQueryParams: (
        state: ExchangeListState,
        action: PayloadAction<ExchangeQueryParams>
      ) => {
        state.exchangeQueryParams = action.payload;
      },
      clearExchangeListValue: (state: ExchangeListState) => {
        state.value = state.value.slice(0, state.exchangeQueryParams.perPage);
        state.exchangeQueryParams.page = 1;
        state.hasMore = true;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchExchangeList.pending, (state, action) => {
          state.status = action.meta.arg.append ? 'LOADING MORE' : 'LOADING';
        })
        .addCase(fetchExchangeList.fulfilled, (state, action) => {
          state.status = 'IDLE';
          state.value = action.payload.append
            ? [...state.value, ...action.payload.data]
            : action.payload.data;
          action.payload.data.length === 0
            ? (state.hasMore = false)
            : (state.hasMore = true);
        })
        .addCase(fetchExchangeList.rejected, (state, action) => {
          state.status = 'FAILED';
          state.error = action.error.message;
        });
    },
  });

export const { setExchangeQueryParams, clearExchangeListValue } =
  exchangeListSlice.actions;

export default exchangeListSlice.reducer;
