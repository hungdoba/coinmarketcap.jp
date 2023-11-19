// Local Storage Cache
// This module provides functions to cache data in the browser's local storage with expiry.
// - cacheWithExpiry: Caches data with a specified expiry time.
// - retrieveCache: Retrieves cached data and checks for expiry.

export const cacheWithExpiry = (key: string, data: any, expiryTime: number) => {
  const now = new Date();

  const item = {
    value: data,
    expiry: now.getTime() + expiryTime,
  };

  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log('Local Storage Full');
  }
};

export const retrieveCache = (key: string) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};
