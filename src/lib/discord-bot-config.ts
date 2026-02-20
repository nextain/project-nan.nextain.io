/**
 * Discord bot configuration.
 * All values are read from environment variables.
 */

export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN ?? "";
export const DISCORD_OAUTH2_URL = process.env.DISCORD_OAUTH2_URL ?? "";
export const GATEWAY_URL =
  process.env.GATEWAY_URL ?? "http://localhost:8000";
export const GATEWAY_MASTER_KEY = process.env.GATEWAY_MASTER_KEY ?? "";

/** Discord message character limit */
export const MAX_MESSAGE_LENGTH = 2000;

/** Rate limit: max messages per user per minute */
export const RATE_LIMIT_PER_MINUTE = 10;
