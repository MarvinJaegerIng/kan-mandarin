/**
 * Builds hsk-dict.js from official HSK 2.0 word lists (drkameleon/complete-hsk-vocabulary, Hanban/CC-CEDICT).
 * Run: node build-hsk-dict.js
 * Requires: hsk1.json … hsk6.json in the same folder (inclusive wordlists).
 */
const fs = require("fs");
const path = require("path");

const dir = __dirname;

function loadJson(name) {
  const p = path.join(dir, name);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function wordLevel(simplified, sets) {
  for (let level = 1; level <= 6; level++) {
    if (sets[level].has(simplified)) return level;
  }
  return 6;
}

function escapeJs(str) {
  if (str == null) return "";
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "")
    .replace(/\n/g, " ");
}

const hsk1 = loadJson("hsk1.json");
const hsk2 = loadJson("hsk2.json");
const hsk3 = loadJson("hsk3.json");
const hsk4 = loadJson("hsk4.json");
const hsk5 = loadJson("hsk5.json");
const hsk6 = loadJson("hsk6.json");

const sets = {
  1: new Set((hsk1 || []).map((e) => e.simplified)),
  2: new Set((hsk2 || []).map((e) => e.simplified)),
  3: new Set((hsk3 || []).map((e) => e.simplified)),
  4: new Set((hsk4 || []).map((e) => e.simplified)),
  5: new Set((hsk5 || []).map((e) => e.simplified)),
  6: new Set((hsk6 || []).map((e) => e.simplified)),
};

const out = [];
for (const entry of hsk6 || []) {
  const word = entry.simplified;
  if (!word) continue;
  const form = entry.forms && entry.forms[0];
  const pinyin = (form && form.transcriptions && form.transcriptions.pinyin) || "?";
  const meanings = (form && form.meanings && form.meanings.length) ? form.meanings : [];
  const meaning = meanings.slice(0, 3).join("; ").replace(/\s+/g, " ").trim() || "—";
  const hsk = wordLevel(word, sets);
  const py = pinyin.replace(/\s+/g, " ").trim();
  const line = '"' + escapeJs(word) + '":{word:"' + escapeJs(word) + '",pinyin:"' + escapeJs(py) + '",meaning:"' + escapeJs(meaning) + '",hsk:' + hsk + "}";
  out.push(line);
}

const js = "// HSK 1–6 vocabulary (official lists, drkameleon/complete-hsk-vocabulary)\nvar HSK_DICT={" + out.join(",") + "};\n";
fs.writeFileSync(path.join(dir, "hsk-dict.js"), js, "utf8");
console.log("Wrote hsk-dict.js with " + out.length + " entries.");
