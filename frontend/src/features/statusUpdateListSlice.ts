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
  StatusUpdate,
  StatusUpdateListState,
  StatusUpdateQueryParams,
  StatusUpdateRootObject,
} from '../models';

interface Reducers extends SliceCaseReducers<StatusUpdateListState> {
  setStatusUpdateQueryParams: (
    state: StatusUpdateListState,
    action: PayloadAction<StatusUpdateQueryParams>
  ) => void;
  clearStatusUpdateListValue: (state: StatusUpdateListState) => void;
}

const initialState: StatusUpdateListState = {
  value: [],
  status: 'IDLE',
  statusUpdateQueryParams: {
    page: 1,
    perPage: 50,
    category: 'general',
  },
  hasMore: true,
};

interface Params {
  statusUpdateQueryParams: StatusUpdateQueryParams;
  append: boolean;
}

export const fetchStatusUpdateList = createAsyncThunk(
  'statusUpdateList',
  async (params: Params) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/statusUpdates?page=${params.statusUpdateQueryParams.page}&perPage=${params.statusUpdateQueryParams.perPage}&category=${params.statusUpdateQueryParams.category}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch status update list');
    }

    const jsonData = await response.json();
    const normalizedResponse = toCamelCase(jsonData) as StatusUpdateRootObject;

    return {
      data: normalizedResponse.statusUpdates,
      append: params.append,
    } as { data: StatusUpdate[]; append: boolean };
  }
);

export const selectStatusUpdateList: (
  state: RootState
) => StatusUpdateListState = (state: RootState) => state.statusUpdateList;

const statusUpdateListSlice: Slice<
  StatusUpdateListState,
  Reducers,
  'statusUpdateList'
> = createSlice({
  name: 'statusUpdateList',
  initialState,
  reducers: {
    setStatusUpdateQueryParams: (
      state: StatusUpdateListState,
      action: PayloadAction<StatusUpdateQueryParams>
    ) => {
      state.statusUpdateQueryParams = action.payload;
    },
    clearStatusUpdateListValue: (state: StatusUpdateListState) => {
      state.value = state.value.slice(0, state.statusUpdateQueryParams.perPage);
      state.statusUpdateQueryParams.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatusUpdateList.pending, (state, action) => {
        state.status = action.meta.arg.append ? 'LOADING MORE' : 'LOADING';
      })
      .addCase(fetchStatusUpdateList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload.append
          ? [...state.value, ...action.payload.data]
          : action.payload.data;
        action.payload.data.length === 0
          ? (state.hasMore = false)
          : (state.hasMore = true);
      })
      .addCase(fetchStatusUpdateList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      });
  },
});

export const { setStatusUpdateQueryParams, clearStatusUpdateListValue } =
  statusUpdateListSlice.actions;

export default statusUpdateListSlice.reducer;
