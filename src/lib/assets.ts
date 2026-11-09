/**
 * Server-only helpers that check whether a file exists in /public.
 * This is what lets you "just drop a photo in" — placeholders switch off
 * automatically at build time once the real asset is there.
 */
import fs from "node:fs";
import path from "node:path";

export function assetExists(src?: string | null): boolean {
  if (!src) return false;
  if (/^https?:\/\//.test(src)) return true;
  return fs.existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

/** Resolves a src to itself if the file exists, otherwise `undefined`. */
export const resolveAsset = (src?: string | null) => (assetExists(src) ? src! : undefined);


