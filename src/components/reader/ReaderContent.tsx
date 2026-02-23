"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { lookupWord } from "@/lib/dictionary";
import type { DictionaryEntry } from "@/lib/dictionary";
import type { SentenceSegment } from "@/types/story";
import { WordPopup } from "./WordPopup";
import { cn } from "@/lib/utils";

interface ReaderContentProps {
  sentences: SentenceSegment[];
  showPinyin: boolean;
  currentSegmentIndex: number | null;
}

/**
 * Splits Chinese text into characters for clickable segments.
 * We could plug in a word-segmentation library later for multi-char words.
 */
function segmentText(text: string, pinyin?: string): { char: string; pinyin?: string }[] {
  const chars = Array.from(text);
  const pinyinSyllables = pinyin?.split(/\s+/) ?? [];
  return chars.map((char, i) => ({
    char,
    pinyin: pinyinSyllables[i] ?? undefined,
  }));
}

export function ReaderContent({
  sentences,
  showPinyin,
  currentSegmentIndex,
}: ReaderContentProps) {
  const [popup, setPopup] = useState<{
    entry: DictionaryEntry | null;
    position: { x: number; y: number };
  } | null>(null);

  const handleWordClick = useCallback(
    async (word: string, event: React.MouseEvent) => {
      const entry = await lookupWord(word);
      setPopup({
        entry,
        position: { x: event.clientX, y: event.clientY },
      });
    },
    []
  );

  const handlePlayAudio = useCallback((_word: string) => {
    // TODO: plug in TTS or pre-recorded audio API
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(_word);
      u.lang = "zh-CN";
      window.speechSynthesis.speak(u);
    }
  }, []);

  return (
    <div className="space-y-8">
      {sentences.map((segment, segmentIndex) => {
        const tokens = segmentText(segment.text, segment.pinyin);
        const isHighlighted = currentSegmentIndex === segmentIndex;

        return (
          <motion.div
            key={segmentIndex}
            initial={false}
            animate={{
              backgroundColor: isHighlighted ? "hsl(var(--primary) / 0.08)" : "transparent",
              borderRadius: "0.5rem",
            }}
            transition={{ duration: 0.25 }}
            className={cn(
              "px-3 py-2 -mx-3",
              isHighlighted && "ring-1 ring-primary/20"
            )}
          >
            {showPinyin && segment.pinyin && (
              <div className="reader-pinyin mb-1 flex flex-wrap gap-[0.35em]">
                {tokens.map((t, i) => (
                  <span key={i} className="inline-block min-w-[1.2em] text-center">
                    {t.pinyin ?? ""}
                  </span>
                ))}
              </div>
            )}
            <div className="reader-text flex flex-wrap">
              {tokens.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => handleWordClick(t.char, e)}
                  className="rounded px-0.5 py-0.5 text-inherit transition-colors hover:bg-primary/15 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1"
                  aria-label={`Look up ${t.char}`}
                >
                  {t.char}
                </button>
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{segment.translation}</p>
          </motion.div>
        );
      })}

      <WordPopup
        entry={popup?.entry ?? null}
        position={popup?.position ?? null}
        onClose={() => setPopup(null)}
        onPlayAudio={handlePlayAudio}
      />
    </div>
  );
}
