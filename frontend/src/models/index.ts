import { AppState as AppStateInterface } from './globals/AppState';
import {
  Status as StatusInterface,
  GenericState as GenericStateInterface,
} from './common/GenericState';
import {
  Page as PageInterface,
  RootModule as RootModuleInterface,
} from './common/RootModule';
import {
  CoinSortingKey as CoinSortingKeyInterface,
  CoinSortOrder as CoinSortingOrderInterface,
  CoinQueryParams as CoinQueryParamsInterface,
  Coin as CoinInterface,
  CoinListState as CoinListStateInterface,
} from './api/Coin';
import { CoinCategory as CoinCategoryInterface } from './api/CoinCategory';
import {
  AvailableDayRanges as AvailableDayRangesInterface,
  CoinMarketChart as CoinMarketChartInterface,
  CoinMarketChartList as CoinMarketChartListInterface,
  CoinMarketChartListState as CoinMarketChartListStateInterface,
  CoinDetailsMarketChartState as CoinDetailsMarketChartStateInterface,
} from './api/CoinMarketChart';
import {
  CoinDetails as CoinDetailsInterface,
  CoinDetailsState as CoinDetailsStateInterface,
} from './api/CoinDetails';
import {
  Exchange as ExchangeInterface,
  ExchangeQueryParams as ExchangeQueryParamsInterface,
  ExchangeListState as ExchangeListStateInterface,
} from './api/Exchange';
import {
  ExchangeVolumeChartDayRanges as ExchangeVolumeChartDayRangesInterface,
  ExchangeVolumeChartState as ExchangeVolumeChartStateInterface,
} from './api/ExchangeVolumeChart';
import {
  FearGreedIndex as FearGreedIndexInterface,
  FearGreedIndexMetadata as FearGreedIndexMetadataInterface,
  FearGreedIndexRootObject as FearGreedIndexRootObjectInterface,
  FearGreedIndexState as FearGreedIndexStateInterface,
} from './api/FearGreedIndex';
import {
  BitcoinHashRate as BitcoinHashRateInterface,
  BitcoinHashRateRootObject as BitcoinHashRateRootObjectInterface,
  BitcoinHashRateState as BitcoinHashRateStateInterface,
} from './api/BitcoinHashRate';
import {
  StatusUpdateCategory as StatusUpdateCategoryInterface,
  StatusUpdateCategoryMenuItem as StatusUpdateCategoryMenuItemInterface,
  StatusUpdateQueryParams as StatusUpdateQueryParamsInterface,
  StatusUpdateImage as StatusUpdateImageInterface,
  StatusUpdateProject as StatusUpdateProjectInterface,
  StatusUpdate as StatusUpdateInterface,
  StatusUpdateRootObject as StatusUpdateRootObjectInterface,
  StatusUpdateListState as StatusUpdateListStateInterface,
} from './api/StatusUpdate';
import { CoinDetailsTabValues as CoinDetailsTabValuesInterface } from './UI/TabValues';
import { CoinListTableHeadCell as CoinListTableHeadCellInterface } from './UI/HeadCells';

export type AppState = AppStateInterface;
export type Coin = CoinInterface;
export type CoinCategory = CoinCategoryInterface;
export type CoinListState = CoinListStateInterface;
export type CoinQueryParams = CoinQueryParamsInterface;
export type GenericState<T> = GenericStateInterface<T>;
export type ExchangeQueryParams = ExchangeQueryParamsInterface;
export type Exchange = ExchangeInterface;
export type ExchangeListState = ExchangeListStateInterface;
export type ExchangeVolumeChartDayRanges =
  ExchangeVolumeChartDayRangesInterface;
export type ExchangeVolumeChartState = ExchangeVolumeChartStateInterface;
export type Page = PageInterface;
export type RootModule = RootModuleInterface;
export type Status = StatusInterface;
export type StatusUpdate = StatusUpdateInterface;
export type StatusUpdateListState = StatusUpdateListStateInterface;
export type StatusUpdateRootObject = StatusUpdateRootObjectInterface;
export type StatusUpdateQueryParams = StatusUpdateQueryParamsInterface;
export type CoinSortingKey = CoinSortingKeyInterface;
export type CoinSortingOrder = CoinSortingOrderInterface;
export type AvailableDayRanges = AvailableDayRangesInterface;
export type CoinMarketChart = CoinMarketChartInterface;
export type CoinMarketChartList = CoinMarketChartListInterface;
export type CoinMarketChartListState = CoinMarketChartListStateInterface;
export type CoinDetailsMarketChartState = CoinDetailsMarketChartStateInterface;
export type CoinDetails = CoinDetailsInterface;
export type CoinDetailsState = CoinDetailsStateInterface;
export type FearGreedIndex = FearGreedIndexInterface;
export type FearGreedIndexMetadata = FearGreedIndexMetadataInterface;
export type FearGreedIndexRootObject = FearGreedIndexRootObjectInterface;
export type FearGreedIndexState = FearGreedIndexStateInterface;
export type BitcoinHashRate = BitcoinHashRateInterface;
export type BitcoinHashRateRootObject = BitcoinHashRateRootObjectInterface;
export type BitcoinHashRateState = BitcoinHashRateStateInterface;
export type CoinDetailsTabValues = CoinDetailsTabValuesInterface;
export type CoinListTableHeadCell = CoinListTableHeadCellInterface;
