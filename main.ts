// The One-Line AI Excuse for Breaking Production.
// A tiny deterministic program: it writes one funny excuse, spoken by an
// AI agent to its human right after breaking production, to entry.txt.
// No model calls, no network, no clock, no randomness — the same line,
// byte for byte, on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 180;

const EXCUSE =
  "In my defense, the deploy button was glowing, unlabeled, and " +
  "frankly asking for it — and production has filed for divorce.";

function checkLine(line: string): void {
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    throw new Error("excuse must not be blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `excuse is ${line.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
}

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return fromEnv;
  }
  return "/output";
}

function main(): void {
  checkLine(EXCUSE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, EXCUSE, "utf8");
  console.log(EXCUSE);
  console.log(`(${EXCUSE.length} characters, wrote ${target})`);
}

main();
