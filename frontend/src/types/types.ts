/* Types */
export type Status = 'IDLE' | 'LOADING' | 'FAILED' | 'LOADING MORE';
// 'LOADING MORE' is only used when fetched data is appending to current data
export interface GenericState<T> {
  value: T;
  status: Status;
  error?: string;
  param?: string;
}

export interface CoinSparkline {
  price: number[];
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24H: number;
  priceChangePercentage24H: number;
  marketCapChange24H: number;
  marketCapChangePercentage24H: number;
  circulatingSupply: number | null;
  totalSupply: number | null;
  maxSupply: number | null;
  ath: number;
  athChangePercentage: number;
  athDate: Date;
  atl: number;
  atlChangePercentage: number;
  atlDate: Date;
  roi?: any;
  lastUpdated: Date;
  sparklineIn7D?: CoinSparkline;
  priceChangePercentage24HInCurrency: number;
  priceChangePercentage7DInCurrency: number;
}

export interface CoinListTableHeadCell {
  id: keyof Coin;
  label: string;
  numeric: boolean;
  customisable: boolean;
}

export interface CoinListState extends GenericState<Coin[]> {
  coinQueryParams: CoinQueryParams;
  coinListTableColumns: (keyof Coin)[];
  hasMore: boolean;
}

export interface CoinQueryParams {
  sortingKey: CoinSortingKey;
  sortingOrder: CoinSortOrder;
  page: number;
  perPage: number;
  category: string;
}

export type CoinSortingKey = 'market_cap' | 'volume';

export type CoinSortOrder = 'asc' | 'desc';

export interface CoinCategory {
  categoryId: string;
  name: string;
}

export type AvailableDayRanges = 1 | 7 | 30 | 90 | 365 | 730 | 'max';

export type AvailableIntervals = 'minutely' | 'hourly' | 'daily';

export interface CoinMarketChart {
  marketCaps: [number, number][];
  prices: [number, number][];
  totalVolumes: [number, number][];
}

export type CoinMarketChartList = {
  [key in AvailableDayRanges]: {
    [key: string]: CoinMarketChart;
  };
};

export interface DominanceChartList {
  [key: string]: CoinMarketChart;
}

export interface CoinMarketChartListState
  extends GenericState<CoinMarketChartList> {
  selectedDayRange: AvailableDayRanges;
  selectedDataType: keyof CoinMarketChart;
}

export interface CoinDetailsMarketChartState
  extends GenericState<CoinMarketChart> {
  selectedDayRange: AvailableDayRanges;
  selectedDataType: keyof CoinMarketChart;
}

export type ExchangeVolumeChartDayRanges = 1 | 14 | 30 | 90 | 365;

export interface ExchangeVolumeChartState
  extends GenericState<[number, string][]> {
  selectedDayRange: ExchangeVolumeChartDayRanges;
}

export type StatusUpdateCategory =
  | 'general'
  | 'milestone'
  | 'partnership'
  | 'exchangeListing'
  | 'softwareRelease'
  | 'fundMovement'
  | 'newListings'
  | 'event';

export interface AppState {
  darkMode: boolean;
}

export interface Platforms {
  [key: string]: string;
}

export interface Localization {
  en: string;
  [key: string]: string;
}

export interface Description {
  en: string;
  [key: string]: string;
}

export interface ReposUrl {
  github: string[];
  bitbucket: any[];
}

export interface Links {
  homepage: string[];
  blockchainSite: string[];
  officialForumUrl: string[];
  chatUrl: string[];
  announcementUrl: string[];
  twitterScreenName: string;
  facebookUsername: string;
  bitcointalkThreadIdentifier?: any;
  telegramChannelIdentifier: string;
  subredditUrl: string;
  reposUrl: ReposUrl;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface ValuesInCurrency {
  aed: number;
  ars: number;
  aud: number;
  bch: number;
  bdt: number;
  bhd: number;
  bmd: number;
  bnb: number;
  brl: number;
  btc: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  dot: number;
  eos: number;
  eth: number;
  eur: number;
  gbp: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  ltc: number;
  mmk: number;
  mxn: number;
  myr: number;
  ngn: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  usd: number;
  vef: number;
  vnd: number;
  xag: number;
  xau: number;
  xdr: number;
  xlm: number;
  xrp: number;
  yfi: number;
  zar: number;
  bits: number;
  link: number;
  sats: number;
}

export interface DatesInCountries {
  aed: string;
  ars: string;
  aud: string;
  bch: string;
  bdt: string;
  bhd: string;
  bmd: string;
  bnb: string;
  brl: string;
  btc: string;
  cad: string;
  chf: string;
  clp: string;
  cny: string;
  czk: string;
  dkk: string;
  dot: string;
  eos: string;
  eth: string;
  eur: string;
  gbp: string;
  hkd: string;
  huf: string;
  idr: string;
  ils: string;
  inr: string;
  jpy: string;
  krw: string;
  kwd: string;
  lkr: string;
  ltc: string;
  mmk: string;
  mxn: string;
  myr: string;
  ngn: string;
  nok: string;
  nzd: string;
  php: string;
  pkr: string;
  pln: string;
  rub: string;
  sar: string;
  sek: string;
  sgd: string;
  thb: string;
  try: string;
  twd: string;
  uah: string;
  usd: string;
  vef: string;
  vnd: string;
  xag: string;
  xau: string;
  xdr: string;
  xlm: string;
  xrp: string;
  yfi: string;
  zar: string;
  bits: string;
  link: string;
  sats: string;
}

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface MarketData {
  currentPrice: ValuesInCurrency;
  totalValueLocked: ValuesInCurrency | null;
  mcapToTvlRatio: number | null;
  fdvToTvlRatio: number | null;
  roi?: any;
  ath: ValuesInCurrency;
  athChangePercentage: ValuesInCurrency;
  athDate: DatesInCountries;
  atl: ValuesInCurrency;
  atlChangePercentage: ValuesInCurrency;
  atlDate: DatesInCountries;
  marketCap: ValuesInCurrency;
  marketCapRank: number;
  fullyDilutedValuation: ValuesInCurrency;
  totalVolume: ValuesInCurrency;
  high24H: ValuesInCurrency;
  low24H: ValuesInCurrency;
  priceChange24H: number;
  priceChangePercentage24H: number;
  priceChangePercentage7D: number;
  priceChangePercentage14D: number;
  priceChangePercentage30D: number;
  priceChangePercentage60D: number;
  priceChangePercentage200D: number;
  priceChangePercentage_1y: number;
  marketCapChange24H: number;
  marketCapChangePercentage24H: number;
  priceChange24HInCurrency: ValuesInCurrency;
  priceChangePercentage1HInCurrency: ValuesInCurrency;
  priceChangePercentage24HInCurrency: ValuesInCurrency;
  priceChangePercentage7DInCurrency: ValuesInCurrency;
  priceChangePercentage14DInCurrency: ValuesInCurrency;
  priceChangePercentage30DInCurrency: ValuesInCurrency;
  priceChangePercentage60DInCurrency: ValuesInCurrency;
  priceChangePercentage200DInCurrency: ValuesInCurrency;
  priceChangePercentage1YInCurrency: ValuesInCurrency;
  marketCapChange24HInCurrency: ValuesInCurrency;
  marketCapChangePercentage24HInCurrency: ValuesInCurrency;
  totalSupply: number;
  maxSupply: number;
  circulatingSupply: number;
  lastUpdated: Date;
}

export interface CommunityData {
  facebookLikes?: any;
  twitterFollowers: number;
  redditAveragePosts48H: number;
  redditAverageComments48H: number;
  redditSubscribers: number;
  redditAccountsActive48H: number;
  telegramChannelUserCount?: any;
}

export interface CodeAdditionsDeletions4Weeks {
  additions: number;
  deletions: number;
}

export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  totalIssues: number;
  closedIssues: number;
  pullRequestsMerged: number;
  pullRequestContributors: number;
  codeAdditionsDeletions4Weeks: CodeAdditionsDeletions4Weeks;
  commitCount4Weeks: number;
  last4WeeksCommitActivitySeries: number[];
}

export interface PublicInterestStats {
  alexaRank: number;
  bingMatches?: any;
}

export interface Market {
  name: string;
  identifier: string;
  hasTradingIncentive: boolean;
}

export interface ConvertedLast {
  btc: number;
  eth: number;
  usd: number;
}

export interface ConvertedVolume {
  btc: number;
  eth: number;
  usd: number;
}

export interface Ticker {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  convertedLast: ConvertedLast;
  convertedVolume: ConvertedVolume;
  trustScore: string;
  bidAskSpreadPercentage: number;
  timestamp: Date;
  lastTradedAt: Date;
  lastFetchAt: Date;
  isAnomaly: boolean;
  isStale: boolean;
  tradeUrl: string;
  tokenInfoUrl?: any;
  coinId: string;
  targetCoinId: string;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  assetPlatformId?: any;
  platforms: Platforms;
  blockTimeInMinutes: number;
  hashingAlgorithm: string;
  categories: string[];
  publicNotice?: any;
  additionalNotices: any[];
  localization: Localization;
  description: Description;
  links: Links;
  image: Image;
  countryOrigin: string;
  genesisDate: string;
  sentimentVotesUpPercentage: number;
  sentimentVotesDownPercentage: number;
  marketCapRank: number;
  coingeckoRank: number;
  coingeckoScore: number;
  developerScore: number;
  communityScore: number;
  liquidityScore: number;
  publicInterestScore: number;
  marketData: MarketData;
  communityData: CommunityData;
  developerData: DeveloperData;
  publicInterestStats: PublicInterestStats;
  statusUpdates: any[];
  lastUpdated: Date;
  tickers: Ticker[];
}

export interface CoinDetailsState extends GenericState<CoinDetails | null> {}

export type CoinDetailsTabValues =
  | 'charts'
  | 'marketData'
  | 'community'
  | 'developer';

export interface ExchangeQueryParams {
  page: number;
  perPage: number;
}

export interface Exchange {
  id: string;
  name: string;
  yearEstablished: number;
  country: string;
  description: string;
  url: string;
  image: string;
  hasTradingIncentive: boolean;
  trustScore: number;
  trustScoreRank: number;
  tradeVolume24HBtc: number;
  tradeVolume24HBtcNormalized: number;
}

export interface ExchangeListState extends GenericState<Exchange[]> {
  exchangeQueryParams: ExchangeQueryParams;
  hasMore: boolean;
}

export interface GasOracle {
  blockNum: number;
  safeLow: number;
  average: number;
  fast: number;
  fastest: number;
}

export interface GasOracleState extends GenericState<GasOracle | null> {
  selectedGasFee: number | null;
  gasLimit: number;
}

export interface TotalMarketCap {
  btc: number;
  eth: number;
  ltc: number;
  bch: number;
  bnb: number;
  eos: number;
  xrp: number;
  xlm: number;
  link: number;
  dot: number;
  yfi: number;
  usd: number;
  aed: number;
  ars: number;
  aud: number;
  bdt: number;
  bhd: number;
  bmd: number;
  brl: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  eur: number;
  gbp: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  mmk: number;
  mxn: number;
  myr: number;
  ngn: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  vef: number;
  vnd: number;
  zar: number;
  xdr: number;
  xag: number;
  xau: number;
  bits: number;
  sats: number;
}

export interface TotalVolume {
  btc: number;
  eth: number;
  ltc: number;
  bch: number;
  bnb: number;
  eos: number;
  xrp: number;
  xlm: number;
  link: number;
  dot: number;
  yfi: number;
  usd: number;
  aed: number;
  ars: number;
  aud: number;
  bdt: number;
  bhd: number;
  bmd: number;
  brl: number;
  cad: number;
  chf: number;
  clp: number;
  cny: number;
  czk: number;
  dkk: number;
  eur: number;
  gbp: number;
  hkd: number;
  huf: number;
  idr: number;
  ils: number;
  inr: number;
  jpy: number;
  krw: number;
  kwd: number;
  lkr: number;
  mmk: number;
  mxn: number;
  myr: number;
  ngn: number;
  nok: number;
  nzd: number;
  php: number;
  pkr: number;
  pln: number;
  rub: number;
  sar: number;
  sek: number;
  sgd: number;
  thb: number;
  try: number;
  twd: number;
  uah: number;
  vef: number;
  vnd: number;
  zar: number;
  xdr: number;
  xag: number;
  xau: number;
  bits: number;
  sats: number;
}

export interface MarketCapPercentage {
  btc: number;
  eth: number;
  usdt: number;
  bnb: number;
  ada: number;
  doge: number;
  xrp: number;
  dot: number;
  usdc: number;
  uni: number;
}

export interface GlobalCoinData {
  activeCryptocurrencies: number;
  upcomingIcos: number;
  ongoingIcos: number;
  endedIcos: number;
  markets: number;
  totalMarketCap: TotalMarketCap;
  totalVolume: TotalVolume;
  marketCapPercentage: MarketCapPercentage;
  marketCapChangePercentage24HUsd: number;
  updatedAt: number;
}

export interface GlobalCoinDataRootObject {
  data: GlobalCoinData;
}
