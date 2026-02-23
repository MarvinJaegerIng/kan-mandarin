"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ReaderContent } from "./ReaderContent";
import type { Story } from "@/types/story";
import { cn } from "@/lib/utils";

interface ReaderProps {
  story: Story;
}

export function Reader({ story }: ReaderProps) {
  const [showPinyin, setShowPinyin] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mockIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const segments = story.sentences;

  // Determine which segment is active based on currentTime
  useEffect(() => {
    const index = segments.findIndex(
      (s) => currentTime >= s.start && currentTime < s.end
    );
    setCurrentSegmentIndex(index >= 0 ? index : null);
  }, [currentTime, segments]);

  // Sync time from audio (mock if no audio URL)
  const updateTime = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration)) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    } else if (!story.audioUrl && segments.length > 0) {
      // Mock: advance through segments for demo
      const total = segments[segments.length - 1].end;
      setDuration(total);
    }
  }, [story.audioUrl, segments]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
    };
  }, [updateTime]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (story.audioUrl && audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    } else {
      // Mock playback: just cycle time for demo
      if (isPlaying) {
        if (mockIntervalRef.current) {
          clearInterval(mockIntervalRef.current);
          mockIntervalRef.current = null;
        }
        setIsPlaying(false);
        return;
      }
      setIsPlaying(true);
      const total = segments.length ? segments[segments.length - 1].end : 10;
      const start = Date.now();
      mockIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        if (elapsed >= total) {
          if (mockIntervalRef.current) {
            clearInterval(mockIntervalRef.current);
            mockIntervalRef.current = null;
          }
          setIsPlaying(false);
          setCurrentTime(total);
          return;
        }
        setCurrentTime(elapsed);
      }, 100);
    }
  }, [isPlaying, story.audioUrl, segments]);

  useEffect(() => {
    if (!story.audioUrl) return;
    const audio = new Audio(story.audioUrl);
    audioRef.current = audio;
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, [story.audioUrl]);

  const handleSeek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (audio && story.audioUrl) {
      audio.currentTime = value;
      setCurrentTime(value);
    } else {
      setCurrentTime(value);
    }
  }, [story.audioUrl]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Pinyin toggle – sticky, so you can always toggle pinyin over the characters */}
      <div className="sticky top-0 z-10 mb-4 flex items-center gap-2 border-b border-border bg-background/95 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <button
          type="button"
          onClick={() => setShowPinyin((v) => !v)}
          className={cn(
            "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
            showPinyin
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-muted-foreground hover:bg-accent"
          )}
          aria-pressed={showPinyin}
          aria-label={showPinyin ? "Pinyin aus" : "Pinyin an"}
        >
          Pinyin {showPinyin ? "An" : "Aus"}
        </button>
        <span className="text-xs text-muted-foreground">
          Pinyin über den Schriftzeichen ein-/ausschalten
        </span>
      </div>

      {/* Story content */}
      <div className="flex-1 overflow-y-auto pb-4">
        <ReaderContent
          sentences={story.sentences}
          showPinyin={showPinyin}
          currentSegmentIndex={currentSegmentIndex}
        />
      </div>

      {/* Audio player */}
      <div className="mt-6 shrink-0 space-y-2 border-t border-border pt-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <span className="text-sm tabular-nums text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <Slider
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onValueChange={handleSeek}
        />
      </div>

      {!story.audioUrl && (
        <p className="mt-2 text-xs text-muted-foreground">
          No audio file. Playback simulates sentence timings.
        </p>
      )}
    </div>
  );
}
