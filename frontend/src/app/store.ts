import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import coinsReducer from '../features/coinsSlice';
import coinListReducer from '../features/coinListSlice';
import coinCategoriesReducer from '../features/coinCategoriesSlice';
import coinMarketChartListReducer from '../features/coinMarketChartListSlice';
import coinDetailsReducer from '../features/coinDetailsSlice';
import coinDetailsMarketChartReducer from '../features/coinDetailsMarketChartSlice';
import exchangeListReducer from '../features/exchangeListSlice';
import exchangeVolumeChartReducer from '../features/exchangeVolumeChartSlice';
import fearGreedIndexReducer from '../features/fearGreedIndexSlice';
import bitcoinHashRateReducer from '../features/bitcoinHashRateSlice';
import statusUpdateListReducer from '../features/statusUpdateListSlice';
import appState from '../features/appStateSlice';
import gasOracleReducer from '../features/gasOracleSlice';
import globalCoinDataReducer from '../features/globalCoinDataSlice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    coinList: coinListReducer,
    coinCategories: coinCategoriesReducer,
    coinMarketChartList: coinMarketChartListReducer,
    coinDetails: coinDetailsReducer,
    coinDetailsMarketChart: coinDetailsMarketChartReducer,
    exchangeList: exchangeListReducer,
    exchangeVolumeChart: exchangeVolumeChartReducer,
    fearGreedIndex: fearGreedIndexReducer,
    bitcoinHashRate: bitcoinHashRateReducer,
    statusUpdateList: statusUpdateListReducer,
    gasOracle: gasOracleReducer,
    appState: appState,
    globalCoinData: globalCoinDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
