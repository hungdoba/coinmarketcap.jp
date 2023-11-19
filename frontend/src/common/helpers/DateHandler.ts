// Date Handler
// This module contains utility functions for handling dates and timestamps.
// - formatDay: Formats a number as a two-digit day (e.g., 01, 02, ...).
// - getTodayDate: Returns the current date in the format "DD Month YYYY" (e.g., 01 January 2023).
// - convertTimestamp: Converts a timestamp to a date string (e.g., "01 January 2023").
// - formatTimestampToTimeString: Formats a timestamp to a time string (e.g., "12:34:56 AM").
// - convertIsoString: Converts an ISO date string to a date string (e.g., "01 January 2023").
// - getTimeFromNow: Calculates the time difference from a given ISO date string to now and returns it (e.g., "5m" for 5 minutes ago).

import { roundDecimals } from './NumberHandler';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDay = (num: number) => {
  return num < 10 ? `0${num}` : num;
};

export const getTodayDate = () => {
  const date = new Date();

  return `${formatDay(date.getDate())} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const convertTimestamp = (timestamp: number, year: boolean = false) => {
  const date = new Date(timestamp);

  return `${formatDay(date.getDate())} ${monthNames[date.getMonth()]} ${
    year ? date.getFullYear() : ''
  }`;
};

export const formatTimestampToTimeString = (timestamp: number) => {
  const date = new Date(timestamp);
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  } as const;

  return date.toLocaleString('en-US', options);
};

export const convertIsoString = (IsoString: string) => {
  const date = new Date(IsoString);

  return `${formatDay(date.getDate())} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};

export const getTimeFromNow = (IsoString: string) => {
  const date = new Date(IsoString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  if (diff < 3.6e6) return `${roundDecimals(diff / 60000, 0)}m`;
  if (diff < 8.64e7) return `${roundDecimals(diff / 3.6e6, 0)}h`;
  return `${roundDecimals(diff / 8.64e7, 0)}d`;
};
