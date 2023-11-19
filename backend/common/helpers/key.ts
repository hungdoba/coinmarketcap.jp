import { AxiosRequestConfig } from 'axios';
import { API_CONFIG as config } from '../constants';
import type {
  AvailableDayRanges,
  CoinSortingKey,
  ExchangeVolumeChartDayRanges,
  CoinSortingOrder,
  AvailableIntervals,
  StatusUpdateCategory,
} from '../../models';
import {
  alternativeMe,
  blockchainCom,
  coinGecko,
  ethGasStation,
} from '../endpoints';

class Key {
  private endpoint: string;
  private coinId?: string;
  private days?: AvailableDayRanges;
  private interval?: AvailableIntervals;
  private page?: number;
  private perPage?: number;
  private sortingKey?: CoinSortingKey;
  private sortingOrder?: CoinSortingOrder;
  private sparkline?: boolean;
  private category?: string;
  private exchangeId?: string;
  private exchangeDays?: ExchangeVolumeChartDayRanges;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public withCoinId(coinId: string): Key {
    this.coinId = coinId;
    return this;
  }

  public withDays(days: AvailableDayRanges): Key {
    this.days = days;
    return this;
  }

  public withInterval(interval: AvailableIntervals): Key {
    this.interval = interval;
    return this;
  }

  public withPage(page: number): Key {
    this.page = page;
    return this;
  }

  public withPerPage(perPage: number): Key {
    this.perPage = perPage;
    return this;
  }

  public withSortingKey(sortingKey: CoinSortingKey): Key {
    this.sortingKey = sortingKey;
    return this;
  }

  public withSortingOrder(sortingOrder: CoinSortingOrder): Key {
    this.sortingOrder = sortingOrder;
    return this;
  }

  public withSparkline(sparkline: boolean): Key {
    this.sparkline = sparkline;
    return this;
  }

  public withCategory(category: string): Key {
    this.category = category;
    return this;
  }

  public withExchangeId(exchangeId: string): Key {
    this.exchangeId = exchangeId;
    return this;
  }

  public withExchangeDays(
    exchangeVolumeChartDayRanges: ExchangeVolumeChartDayRanges
  ): Key {
    this.exchangeDays = exchangeVolumeChartDayRanges;
    return this;
  }

  public keyString(): string {
    const {
      endpoint,
      coinId,
      days,
      interval,
      page,
      perPage,
      sortingKey,
      sortingOrder,
      sparkline,
      category,
      exchangeId,
      exchangeDays,
    } = this;

    const values: (
      | string
      | AvailableDayRanges
      | number
      | boolean
      | undefined
    )[] = [
      endpoint,
      coinId,
      days,
      interval,
      page,
      perPage,
      sortingKey,
      sortingOrder,
      sparkline,
      category,
      exchangeId,
      exchangeDays,
    ];
    const formattedValues = values.map((value) =>
      value !== undefined ? value : ''
    );
    return formattedValues.join('_');
  }

  public persistentKeyString(): string {
    return `PERSISTENT_${this.keyString()}`;
  }

  public static fromKeyString(keyString: string): Key {
    const values = keyString.split('_');
    const configKey = values.shift() || '';

    const key = new Key(configKey);

    key.coinId = values[0] || undefined;
    key.days = (values[1] as AvailableDayRanges) || undefined;
    key.interval = (values[2] as AvailableIntervals) || undefined;
    key.page = parseInt(values[3]) || undefined;
    key.perPage = parseInt(values[4]) || undefined;
    key.sortingKey = (values[5] as CoinSortingKey) || undefined;
    key.sortingOrder = (values[6] as CoinSortingOrder) || undefined;
    key.sparkline = values[7] === 'true' || undefined;
    key.category = values[8] || undefined;
    key.exchangeId = values[9] || undefined;
    key.exchangeDays =
      (values[10] as unknown as ExchangeVolumeChartDayRanges) || undefined;

    return key;
  }

  public requestConfig(): AxiosRequestConfig {
    const key: Key = this;

    switch (key.endpoint) {
      case 'markets':
        return {
          ...config('coinGecko'),
          url: coinGecko.coins('market_cap', 'desc', 1, 250, false, ''),
        };
      case 'categories':
        return {
          ...config('coinGecko'),
          url: coinGecko.categories,
        };
      case 'ethGasStation':
        return {
          ...config('ethGasStation'),
          url: ethGasStation.gasOracle,
        };
      case 'trending':
        return {
          ...config('coinGecko'),
          url: coinGecko.trending,
        };
      case 'global':
        return {
          ...config('coinGecko'),
          url: coinGecko.global,
        };
      case 'coinMarketChart':
        return {
          ...config('coinGecko'),
          url: coinGecko.coinMarketChart(key.coinId!, key.days!, key.interval!),
        };
      case 'fearGreedIndex':
        return {
          ...config('alternative.me'),
          url: alternativeMe.fearGreedIndex(key.days!),
        };
      case 'bitcoinHashRate':
        return {
          ...config('blockchain.com'),
          url: blockchainCom.bitcoinHashRate,
        };
      case 'coins':
        return {
          ...config('coinGecko'),
          url: coinGecko.coins(
            key.sortingKey!,
            key.sortingOrder!,
            key.page!,
            key.perPage!,
            key.sparkline!,
            key.category!
          ),
        };
      case 'coinDetails':
        return {
          ...config('coinGecko'),
          url: coinGecko.coinDetails(key.coinId!),
        };
      case 'exchanges':
        return {
          ...config('coinGecko'),
          url: coinGecko.exchanges(key.page!, key.perPage!),
        };
      case 'exchange':
        return {
          ...config('coinGecko'),
          url: coinGecko.exchangeVolumeChart(
            key.exchangeId!,
            key.exchangeDays!
          ),
        };
      case 'coinList':
        return {
          ...config('coinGecko'),
          url: coinGecko.supportedCoins,
        };
      case 'statusUpdates':
        return {
          ...config('coinGecko'),
          url: coinGecko.statusUpdates(
            key.page!,
            key.perPage!,
            key.category as StatusUpdateCategory
          ),
        };
      case 'companies':
        return {
          ...config('coinGecko'),
          url: coinGecko.companies(key.coinId!),
        };
      default:
        return {
          ...config('coinGecko'),
          url: coinGecko.coins('market_cap', 'desc', 1, 250, false, ''),
        };
    }
  }
}

export default Key;
