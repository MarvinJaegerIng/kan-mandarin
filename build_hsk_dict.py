# Builds hsk-dict.js from official HSK 2.0 word lists (drkameleon/complete-hsk-vocabulary).
# Run: python build_hsk_dict.py
# Requires: hsk1.json ... hsk6.json in the same folder.

import json
import os

def load_json(name):
    path = os.path.join(os.path.dirname(__file__), name)
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def escape_js(s):
    if s is None:
        return ""
    s = str(s).replace("\\", "\\\\").replace('"', '\\"').replace("\r", "").replace("\n", " ")
    return s

def word_level(simplified, sets):
    for level in range(1, 7):
        if simplified in sets[level]:
            return level
    return 6

hsk1 = load_json("hsk1.json")
hsk2 = load_json("hsk2.json")
hsk3 = load_json("hsk3.json")
hsk4 = load_json("hsk4.json")
hsk5 = load_json("hsk5.json")
hsk6 = load_json("hsk6.json")

sets = {
    1: {e["simplified"] for e in (hsk1 or [])},
    2: {e["simplified"] for e in (hsk2 or [])},
    3: {e["simplified"] for e in (hsk3 or [])},
    4: {e["simplified"] for e in (hsk4 or [])},
    5: {e["simplified"] for e in (hsk5 or [])},
    6: {e["simplified"] for e in (hsk6 or [])},
}

out = []
for entry in (hsk6 or []):
    word = entry.get("simplified")
    if not word:
        continue
    forms = entry.get("forms") or []
    form = forms[0] if forms else {}
    trans = form.get("transcriptions") or {}
    pinyin = (trans.get("pinyin") or "?").replace("\n", " ").strip()
    meanings = form.get("meanings") or []
    meaning = "; ".join(meanings[:3]).replace("\n", " ").strip() or "—"
    hsk = word_level(word, sets)
    line = '"%s":{word:"%s",pinyin:"%s",meaning:"%s",hsk:%d}' % (
        escape_js(word), escape_js(word), escape_js(pinyin), escape_js(meaning), hsk
    )
    out.append(line)

js = "// HSK 1-6 vocabulary (official lists, drkameleon/complete-hsk-vocabulary)\nvar HSK_DICT={" + ",".join(out) + "};\n"
out_path = os.path.join(os.path.dirname(__file__), "hsk-dict.js")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(js)
print("Wrote hsk-dict.js with", len(out), "entries.")
