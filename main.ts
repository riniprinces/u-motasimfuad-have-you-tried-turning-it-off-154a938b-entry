// Have You Tried Turning It Off? — make.fun bounty entry.
//
// One funny line, spoken by a hopeless tech support agent to a desperate
// customer. The joke lives in the agent's cheerful uselessness: the classic
// restart advice, followed by the honest admission that the next person in
// line will only repeat it.
//
// This program writes that single line to /output/entry.txt. It is fully
// deterministic: no randomness, no clock, no network, no environment input,
// so two runs produce byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. Kept as one constant so the output can never drift.
const ENTRY_LINE =
  "Have you tried turning it off and on again? If that doesn't work, I'll transfer you to someone who'll ask you the exact same thing.";

// Where the grader looks for the entry.
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The gate allows 1-199 characters of UTF-8 text, not only whitespace.
const MIN_LENGTH = 1;
const MAX_LENGTH = 199;

function validate(line: string): void {
  if (line.length < MIN_LENGTH || line.length > MAX_LENGTH) {
    throw new Error(
      `Entry line must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${line.length}.`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Entry line must not be only whitespace.");
  }
}

function main(): void {
  validate(ENTRY_LINE);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, ENTRY_LINE, "utf8");
  console.log(`Wrote ${ENTRY_LINE.length} characters to ${OUTPUT_FILE}`);
}

main();
