"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DictionaryEntry } from "@/lib/dictionary";

interface WordPopupProps {
  entry: DictionaryEntry | null;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onPlayAudio?: (word: string) => void;
}

export function WordPopup({ entry, position, onClose, onPlayAudio }: WordPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {entry && position && (
      <motion.div
        ref={popupRef}
        initial={{ opacity: 0, scale: 0.95, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 4 }}
        transition={{ duration: 0.15 }}
        className="fixed z-50 w-64 rounded-lg border border-border bg-popover p-3 shadow-lg"
        style={{
          left: position.x,
          top: position.y - 8,
          transform: "translate(-50%, -100%)",
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-medium text-foreground">{entry.word}</span>
              <span className="text-sm text-muted-foreground">{entry.pinyin}</span>
            </div>
            <p className="mt-1 text-sm text-foreground">{entry.meaning}</p>
            {entry.hskLevel != null && (
              <span className="mt-1.5 inline-block rounded bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground">
                HSK {entry.hskLevel}
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onPlayAudio?.(entry.word)}
              aria-label="Play audio"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
