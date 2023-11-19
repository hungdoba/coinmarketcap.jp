import { AxiosRequestConfig } from 'axios';

export const appBarHeight = 88;
export const drawerWidth = 260;
export const toggleButtonsHeight = 36;
export const coinDetailsGaugeHeight = 220;

export const API_CONFIG: (
  server: 'coinGecko' | 'ethGasStation' | 'alternative.me' | 'blockchain.com'
) => AxiosRequestConfig = (
  server: 'coinGecko' | 'ethGasStation' | 'alternative.me' | 'blockchain.com'
) => {
  switch (server) {
    case 'coinGecko':
      return {
        baseURL: 'https://api.coingecko.com/api/v3',
        responseType: 'json',
        method: 'GET',
        headers: {
          'X-XSS-Protection': '1; mode=block',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Strict-Transport-Security':
            'max-age=63072000; includeSubDomains; preload',
        },
      };
    case 'ethGasStation':
      return {
        baseURL: 'https://api.etherscan.io',
        responseType: 'json',
        method: 'GET',
      };
    case 'alternative.me':
      return {
        baseURL: ' https://api.alternative.me',
        responseType: 'json',
        method: 'GET',
      };
    case 'blockchain.com':
      return {
        baseURL: 'https://api.blockchain.info',
        responseType: 'json',
        method: 'GET',
      };
  }
};
