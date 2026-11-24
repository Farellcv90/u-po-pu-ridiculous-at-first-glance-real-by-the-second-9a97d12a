// Bees Sniff Out Fake Perfume — make.fun entry
// Writes one single-sentence startup pitch to /output/entry.txt.
// The pitch is built for the judge's criteria in priority order:
// bizarre at first glance (bees as lab equipment), business logic
// that survives a second look (luxury houses pay per bottle, a bee
// beats a lab on speed, cost, and theatre), and a turn from laughing
// to nodding in a single sentence.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "We train bees to sniff out counterfeit perfume, and luxury houses pay per bottle because a bee's nose beats a lab test on speed, cost, and theatre.";

const MAX_CHARS = 200;

// The gate counts the file's characters as-is, so the entry is written
// with no trailing newline: a newline would add a character and a line.
const OUTPUT_PATH = "/output/entry.txt";

function validate(entry: string): void {
  // Must be valid UTF-8 text: re-encoding round-trips only for valid UTF-8.
  const encoded = Buffer.from(entry, "utf8");
  if (encoded.toString("utf8") !== entry) {
    throw new Error("entry is not valid UTF-8 text");
  }
  if (entry.length < 1 || entry.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${entry.length}`);
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (entry !== entry.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
