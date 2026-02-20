#!/usr/bin/env tsx
/**
 * Discord bot process entry point.
 *
 * Usage:
 *   DISCORD_BOT_TOKEN=... GATEWAY_URL=... GATEWAY_MASTER_KEY=... npx tsx scripts/start-discord-bot.ts
 *   or: npm run bot:discord
 *
 * Required env vars:
 *   DISCORD_BOT_TOKEN   — Discord bot token
 *   GATEWAY_URL         — any-llm gateway URL
 *   GATEWAY_MASTER_KEY  — Gateway master key for user lookup + LLM calls
 */

import "dotenv/config";
import { startBot } from "../src/lib/discord-bot";

startBot().catch((err) => {
  console.error("[discord-bot] Fatal error:", err);
  process.exit(1);
});
