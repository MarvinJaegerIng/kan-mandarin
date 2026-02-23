/**
 * Content types for the graded reader.
 * Stories use sentences with timestamps for audio sync.
 */

export type HSKLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SentenceSegment {
  /** Timestamp for audio sync: start time in seconds */
  start: number;
  /** End time in seconds */
  end: number;
  /** Chinese text for this segment */
  text: string;
  /** Pinyin (optional; can be derived) */
  pinyin?: string;
  /** English translation */
  translation: string;
}

export interface Story {
  id: string;
  title: string;
  titlePinyin?: string;
  titleTranslation: string;
  difficulty: HSKLevel;
  thumbnail: string;
  /** Sentences with timestamps for highlighting during playback */
  sentences: SentenceSegment[];
  /** Optional: single audio URL for full story */
  audioUrl?: string;
}
