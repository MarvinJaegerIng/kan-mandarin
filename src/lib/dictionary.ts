/**
 * Dictionary lookup interface.
 * Replace the mock implementation with HanziJS, a custom DB, or any API.
 */

import type { HSKLevel } from "@/types/story";

export interface DictionaryEntry {
  word: string;
  pinyin: string;
  meaning: string;
  hskLevel?: HSKLevel;
  /** Optional: URL or base64 for TTS/recorded audio */
  audioUrl?: string;
}

/**
 * Look up a word or phrase. Plug in your API here.
 * @example
 * // HanziJS: import { getCharacter } from 'hanzi'; getCharacter(word)
 * // Custom API: const res = await fetch(`/api/dict?q=${encodeURIComponent(word)}`);
 */
export async function lookupWord(word: string): Promise<DictionaryEntry | null> {
  // Mock: return a stub for any single character or short phrase
  if (!word || word.length > 20) return null;

  // Simulated delay
  await new Promise((r) => setTimeout(r, 80));

  const mockEntries: Record<string, DictionaryEntry> = {
    你: { word: "你", pinyin: "nǐ", meaning: "you", hskLevel: 1 },
    好: { word: "好", pinyin: "hǎo", meaning: "good; well; fine", hskLevel: 1 },
    我: { word: "我", pinyin: "wǒ", meaning: "I; me", hskLevel: 1 },
    是: { word: "是", pinyin: "shì", meaning: "to be; yes", hskLevel: 1 },
    的: { word: "的", pinyin: "de", meaning: "possessive particle; of", hskLevel: 1 },
    在: { word: "在", pinyin: "zài", meaning: "at; in; exist", hskLevel: 1 },
    今天: { word: "今天", pinyin: "jīntiān", meaning: "today", hskLevel: 1 },
    天气: { word: "天气", pinyin: "tiānqì", meaning: "weather", hskLevel: 1 },
    很: { word: "很", pinyin: "hěn", meaning: "very", hskLevel: 1 },
    喜欢: { word: "喜欢", pinyin: "xǐhuan", meaning: "to like; to enjoy", hskLevel: 1 },
    学习: { word: "学习", pinyin: "xuéxí", meaning: "to study; to learn", hskLevel: 1 },
    中文: { word: "中文", pinyin: "zhōngwén", meaning: "Chinese (language)", hskLevel: 1 },
    这: { word: "这", pinyin: "zhè", meaning: "this", hskLevel: 1 },
    爸爸: { word: "爸爸", pinyin: "bàba", meaning: "father", hskLevel: 1 },
    妈妈: { word: "妈妈", pinyin: "māma", meaning: "mother", hskLevel: 1 },
    有: { word: "有", pinyin: "yǒu", meaning: "to have", hskLevel: 1 },
    很多: { word: "很多", pinyin: "hěn duō", meaning: "many", hskLevel: 1 },
    朋友: { word: "朋友", pinyin: "péngyou", meaning: "friend(s)", hskLevel: 1 },
    小: { word: "小", pinyin: "xiǎo", meaning: "small; little", hskLevel: 1 },
    明: { word: "明", pinyin: "míng", meaning: "bright; clear", hskLevel: 1 },
    太: { word: "太", pinyin: "tài", meaning: "too; very", hskLevel: 1 },
    阳: { word: "阳", pinyin: "yáng", meaning: "sun", hskLevel: 1 },
    大: { word: "大", pinyin: "dà", meaning: "big; large", hskLevel: 1 },
    去: { word: "去", pinyin: "qù", meaning: "to go", hskLevel: 1 },
    公: { word: "公", pinyin: "gōng", meaning: "public", hskLevel: 1 },
    园: { word: "园", pinyin: "yuán", meaning: "garden; park", hskLevel: 1 },
    里: { word: "里", pinyin: "lǐ", meaning: "inside; in", hskLevel: 1 },
    人: { word: "人", pinyin: "rén", meaning: "person; people", hskLevel: 1 },
    走: { word: "走", pinyin: "zǒu", meaning: "to walk", hskLevel: 1 },
    路: { word: "路", pinyin: "lù", meaning: "road; path", hskLevel: 1 },
    也: { word: "也", pinyin: "yě", meaning: "also; too", hskLevel: 1 },
    再: { word: "再", pinyin: "zài", meaning: "again", hskLevel: 1 },
    见: { word: "见", pinyin: "jiàn", meaning: "to see", hskLevel: 1 },
    老: { word: "老", pinyin: "lǎo", meaning: "old", hskLevel: 1 },
    师: { word: "师", pinyin: "shī", meaning: "teacher", hskLevel: 1 },
    医: { word: "医", pinyin: "yī", meaning: "medical", hskLevel: 1 },
    生: { word: "生", pinyin: "shēng", meaning: "life; to be born", hskLevel: 1 },
    一: { word: "一", pinyin: "yī", meaning: "one", hskLevel: 1 },
    个: { word: "个", pinyin: "ge", meaning: "measure word", hskLevel: 1 },
    哥: { word: "哥", pinyin: "gē", meaning: "older brother", hskLevel: 1 },
    们: { word: "们", pinyin: "men", meaning: "plural suffix", hskLevel: 1 },
    幸: { word: "幸", pinyin: "xìng", meaning: "lucky", hskLevel: 1 },
    福: { word: "福", pinyin: "fú", meaning: "blessing; happiness", hskLevel: 1 },
    叫: { word: "叫", pinyin: "jiào", meaning: "to be called", hskLevel: 1 },
    李: { word: "李", pinyin: "lǐ", meaning: "plum; surname Li", hskLevel: 1 },
    华: { word: "华", pinyin: "huá", meaning: "magnificent; China", hskLevel: 1 },
    每: { word: "每", pinyin: "měi", meaning: "every", hskLevel: 1 },
    天: { word: "天", pinyin: "tiān", meaning: "day; sky", hskLevel: 1 },
    都: { word: "都", pinyin: "dōu", meaning: "all; both", hskLevel: 1 },
    忙: { word: "忙", pinyin: "máng", meaning: "busy", hskLevel: 1 },
    早: { word: "早", pinyin: "zǎo", meaning: "early", hskLevel: 1 },
    上: { word: "上", pinyin: "shang", meaning: "on; above", hskLevel: 1 },
    喝: { word: "喝", pinyin: "hē", meaning: "to drink", hskLevel: 1 },
    然: { word: "然", pinyin: "rán", meaning: "so; thus", hskLevel: 1 },
    后: { word: "后", pinyin: "hòu", meaning: "after", hskLevel: 1 },
    工: { word: "工", pinyin: "gōng", meaning: "work", hskLevel: 1 },
    作: { word: "作", pinyin: "zuò", meaning: "to do", hskLevel: 1 },
    晚: { word: "晚", pinyin: "wǎn", meaning: "evening; late", hskLevel: 1 },
    看: { word: "看", pinyin: "kàn", meaning: "to look; to read", hskLevel: 1 },
    书: { word: "书", pinyin: "shū", meaning: "book", hskLevel: 1 },
    周: { word: "周", pinyin: "zhōu", meaning: "week", hskLevel: 1 },
    末: { word: "末", pinyin: "mò", meaning: "end", hskLevel: 1 },
    和: { word: "和", pinyin: "hé", meaning: "and; with", hskLevel: 1 },
    吃: { word: "吃", pinyin: "chī", meaning: "to eat", hskLevel: 1 },
    饭: { word: "饭", pinyin: "fàn", meaning: "meal; rice", hskLevel: 1 },
    活: { word: "活", pinyin: "huó", meaning: "to live", hskLevel: 1 },
    美: { word: "美", pinyin: "měi", meaning: "beautiful", hskLevel: 1 },
  };

  const normalized = word.trim();
  return mockEntries[normalized] ?? {
    word: normalized,
    pinyin: "(lookup)",
    meaning: "Translation not found. Plug in HanziJS or your API in src/lib/dictionary.ts",
    hskLevel: undefined,
  };
}
