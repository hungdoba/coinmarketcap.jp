import path from 'path';
import fs from 'fs';
import axios from 'axios';
import cors from 'cors';
import express from 'express';

// import morgan from 'morgan';

import Redis from 'ioredis';
require('dotenv').config();

const EXPIRATION_TIME = 30 * 60;
const EXECUTE_QUEUE_TIME_WAIT = 20 * 1000;
const BASE_URL = 'localhost';
const BACKEND_PORT = 8000;

import { Queue, Worker } from 'bullmq';
import { Response } from 'express-serve-static-core';
import {
  AvailableDayRanges,
  AvailableIntervals,
  CoinSortingKey,
  ExchangeVolumeChartDayRanges,
  StatusUpdateCategory,
} from './models';
import { CoinSortOrder } from './models/api/Coin';
import Key from './common/helpers/key';

// Create a queue

const redisOptions = {
  connection: {
    host: BASE_URL,
    port: 6379,
  },
};

const queue = new Queue('queue', redisOptions);

const redis = new Redis({
  host: BASE_URL,
  port: 6379,
});

// Process jobs in the queue
const worker = new Worker(
  'queue',
  async (job) => {
    await new Promise((resolve) =>
      setTimeout(resolve, EXECUTE_QUEUE_TIME_WAIT)
    );

    // console.log('Queue job start: Get data ', job.data.data);

    const key = Key.fromKeyString(job.data.data);
    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    // Job completed
    console.log('Job completed:', job.id);
  },
  redisOptions
);

// Listen for completed jobs
worker.on('completed', (job) => {
  console.log('Job completed:', job.id);
});

const deleteKeysByPattern = (pattern: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const stream = redis.scanStream({
      match: pattern,
    });
    stream.on('data', (keys: string[]) => {
      if (keys.length) {
        const pipeline = redis.pipeline();
        keys.forEach((key) => {
          pipeline.del(key);
        });
        pipeline.exec();
      }
    });
    stream.on('end', () => {
      resolve();
    });
    stream.on('error', (e: any) => {
      reject(e);
    });
  });
};

// Reset job when system start
deleteKeysByPattern('bull:queue:*');

const app = express();
const port = 8000;

// app.use(morgan('dev'));
app.use(cors());

async function getValue(key: Key) {
  let cacheValue = await redis.get(key.keyString());

  if (cacheValue) {
    return cacheValue;
  }

  cacheValue = await redis.get(key.persistentKeyString());
  if (cacheValue) {
    await queue.add('callApi', { data: key.keyString() });
    return cacheValue;
  }

  return null;
}

function handleServerError(
  res: Response<any, Record<string, any>, number>,
  message: string,
  error: unknown
) {
  console.error('Error retrieving market data:', error);
  res.status(500).json({ error: message });
}

app.get('/api/markets', async (req, res) => {
  const key = new Key('markets');

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/categories', async (req, res) => {
  const key = new Key('categories');

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/ethGasStation', async (req, res) => {
  const key = new Key('ethGasStation');

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/trending', async (req, res) => {
  const key = new Key('trending');

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/global', async (req, res) => {
  const key = new Key('global');

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/coinMarketChart', async (req, res) => {
  const coinId = req.query.coinId as string;
  const days = req.query.days as AvailableDayRanges;
  const interval = req.query.interval as AvailableIntervals;
  const key = new Key('coinMarketChart')
    .withCoinId(coinId)
    .withDays(days)
    .withInterval(interval);

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/fearGreedIndex', async (req, res) => {
  const days = req.query.dayRange as AvailableDayRanges;
  const key = new Key('fearGreedIndex').withDays(days);

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/bitcoinHashRate', async (req, res) => {
  const key = new Key('bitcoinHashRate');

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/coins', async (req, res) => {
  const page = Number(req.query.page);
  const perPage = Number(req.query.perPage);
  const sortingKey = req.query.sortingKey as CoinSortingKey;
  const sortingOrder = req.query.sortingOrder as CoinSortOrder;
  const sparkline = req.query.sparkline as any as boolean;
  const category = req.query.category as string;
  const key = new Key('coins')
    .withPage(page)
    .withPerPage(perPage)
    .withSortingKey(sortingKey)
    .withSortingOrder(sortingOrder)
    .withSparkline(sparkline)
    .withCategory(category);

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/coinDetails', async (req, res) => {
  const coinId = req.query.coinId as string;
  const key = new Key('coinDetails').withCoinId(coinId);

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/exchanges', async (req, res) => {
  const page = Number(req.query.page);
  const perPage = Number(req.query.perPage);
  const key = new Key('exchanges').withPage(page).withPerPage(perPage);

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/exchange', async (req, res) => {
  const exchangeId = req.query.exchangeId as string;
  const days = req.query.days as unknown as ExchangeVolumeChartDayRanges;
  const key = new Key('exchange')
    .withExchangeId(exchangeId)
    .withExchangeDays(days);

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/coinList', async (req, res) => {
  const key = new Key('coinList');

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/statusUpdates', async (req, res) => {
  const page = Number(req.query.page);
  const perPage = Number(req.query.perPage);
  const category = req.query.category as StatusUpdateCategory;
  const key = new Key('statusUpdates')
    .withPage(page)
    .withPerPage(perPage)
    .withCategory(category);

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/companies', async (req, res) => {
  const coinId = req.query.coinId as string;
  const key = new Key('companies').withCoinId(coinId);

  try {
    const value = await getValue(key);

    if (value) {
      return res.json(JSON.parse(value));
    }

    const response = await axios.request(key.requestConfig());
    const data = response.data;
    const jsonData = JSON.stringify(data);

    redis.set(key.keyString(), jsonData, 'EX', EXPIRATION_TIME);
    redis.set(key.persistentKeyString(), jsonData);

    return res.json(data);
  } catch (error) {
    await queue.add('callApi', { data: key.keyString() });
    handleServerError(res, `Failed to retrieve ${key.keyString()} data`, error);
  }
});

app.get('/api/refLink', (req, res) => {
  const exchangeId = req.query.exchangeId as string;

  fs.readFile('refLinks.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const refLinks = JSON.parse(data);
      const foundRefLink = refLinks[exchangeId];
      if (foundRefLink) {
        return res.json(foundRefLink);
      } else {
        return res.status(404).json({ error: 'RefLink not found' });
      }
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'build');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at ${BASE_URL}:${BACKEND_PORT}`);
});
