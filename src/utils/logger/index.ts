/* eslint-disable no-console */
const isDev = process.env.NODE_ENV === "development";

// Console log
export function log(...theArgs: unknown[]) {
  if (!isDev) return;

  console.log(...theArgs);
}

// Error
export const logError = console.error;

export default {
  log,
  logError,
};
