# Kan Mandarin

A web-based Chinese graded reading application inspired by Du Chinese, built with Next.js, Tailwind CSS, and Lucide icons.

## Features

- **Interactive Reader**: Click any character to see translation, pinyin, HSK level, and play audio (browser TTS for now).
- **Pinyin Toggle**: Show or hide pinyin above the text globally.
- **Audio Sync**: Bottom audio player with sentence highlighting; timestamps are in JSON (`start`, `end`, `text`). Works with real audio or simulated playback.
- **Content**: Mock stories with title, HSK level, thumbnail, and sentences (pinyin + English).
- **UI**: Clean layout with sidebar (Library, Favorites, Settings) and Focus Mode (hide sidebar while reading).

## Tech Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Framer Motion (popups, highlighting)
- Shadcn-style components (Button, Slider) via CVA + Tailwind
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Library** to pick a story, then read and click words for the dictionary popup.

## Project Structure

- `src/app/` – Pages (library, story/[id], favorites, settings)
- `src/components/reader/` – Reader, ReaderContent, WordPopup
- `src/components/layout/` – AppLayout, Sidebar
- `src/components/ui/` – Button, Slider
- `src/data/stories.ts` – Mock story data
- `src/lib/dictionary.ts` – Dictionary lookup (mock; plug in HanziJS or your API)
- `src/types/story.ts` – Story and sentence types

## Dictionary API

Replace the mock in `src/lib/dictionary.ts` with your backend or HanziJS:

```ts
export async function lookupWord(word: string): Promise<DictionaryEntry | null> {
  // e.g. const res = await fetch(`/api/dict?q=${encodeURIComponent(word)}`);
  // return res.json();
}
```

## Standalone App & HSK Dictionary

The single-file app is `app-standalone.html`. Its dictionary uses the **official HSK 1–6 vocabulary** (Hanban/HSK 2.0) from [drkameleon/complete-hsk-vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary) (CC-CEDICT-based). The file `hsk-dict.js` (~5000 entries) is loaded at runtime. To rebuild it after updating the source JSON:

1. Place `hsk1.json` … `hsk6.json` (inclusive wordlists from that repo) in the project root.
2. Run: `py build_hsk_dict.py` (or `node build-hsk-dict.js`).

## Audio

Add `audioUrl` to a story and place the file in `public/audio/` (e.g. `public/audio/story-1.mp3`). Sentence timestamps in `sentences[].start` and `sentences[].end` (seconds) drive highlighting during playback.
